import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router'
import { ChevronLeft, ChevronRight, Edit3, FileUp, PackagePlus, Search, Trash2, X } from 'lucide-react'
import { deleteProduct, createProduct, getProducts } from '../../services/productService.js'
import { firebaseConfigured } from '../../services/firebase.js'

const EMPTY_PRODUCTS = []
const PAGE_SIZE = 12

function parseCsv(source) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]
    if (character === '"' && quoted && source[index + 1] === '"') {
      field += '"'
      index += 1
    } else if (character === '"') {
      quoted = !quoted
    } else if (character === ',' && !quoted) {
      row.push(field.trim())
      field = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && source[index + 1] === '\n') index += 1
      row.push(field.trim())
      if (row.some(Boolean)) rows.push(row)
      row = []
      field = ''
    } else {
      field += character
    }
  }
  row.push(field.trim())
  if (row.some(Boolean)) rows.push(row)
  if (rows.length < 2) throw new Error('The CSV needs a header row and at least one product.')

  const headers = rows[0].map((header) => header.toLowerCase().replace(/[^a-z0-9]/g, ''))
  const value = (cells, ...aliases) => {
    const fieldIndex = aliases.map((alias) => headers.indexOf(alias)).find((candidate) => candidate >= 0)
    return fieldIndex === undefined ? '' : cells[fieldIndex] || ''
  }

  return rows.slice(1).map((cells, index) => {
    const name = value(cells, 'name', 'productname')
    const category = value(cells, 'category', 'productcategory')
    const price = Number(value(cells, 'price', 'regularprice'))
    const discountPriceText = value(cells, 'discountprice', 'disprice', 'saleprice')
    const stockText = value(cells, 'stock', 'quantity', 'inventory')
    const sequenceText = value(cells, 'sequence', 'sortorder', 'position')
    if (!name || !category || !Number.isFinite(price) || price <= 0) {
      throw new Error(`Row ${index + 2} needs a product name, category, and price greater than zero.`)
    }
    const discountPrice = discountPriceText ? Number(discountPriceText) : price
    const stock = stockText ? Number(stockText) : 0
    const sequence = sequenceText ? Number(sequenceText) : 0
    if (!Number.isFinite(discountPrice) || discountPrice < 0 || !Number.isInteger(stock) || stock < 0 || !Number.isInteger(sequence) || sequence < 0) {
      throw new Error(`Row ${index + 2} has an invalid discount price, stock, or sequence.`)
    }
    return {
      name,
      category,
      subcategory: value(cells, 'subcategory', 'subcat'),
      description: value(cells, 'description', 'details'),
      price,
      discountPrice,
      stock,
      sequence,
      imageUrl: value(cells, 'imageurl', 'image', 'photo', 'productimage'),
      active: true,
      createdAt: new Date().toISOString(),
    }
  })
}

function formatCreatedDate(value) {
  if (!value) return '—'
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-GB').format(date)
}

function Products() {
  const queryClient = useQueryClient()
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [subcategory, setSubcategory] = useState('all')
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [importOpen, setImportOpen] = useState(false)
  const [importRows, setImportRows] = useState([])
  const [importError, setImportError] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const productsQuery = useQuery({ queryKey: ['admin', 'products'], queryFn: getProducts, enabled: firebaseConfigured, retry: 1 })
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      setDeleteTarget(null)
      setDeleteError('')
    },
    onError: (error) => setDeleteError(error.message || 'The product could not be deleted.'),
  })
  const products = productsQuery.data || EMPTY_PRODUCTS
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].sort()
  const subcategories = [...new Set(products
    .filter((product) => category === 'all' || product.category === category)
    .map((product) => product.subcategory)
    .filter(Boolean))].sort()
  const filteredProducts = useMemo(() => products.filter((product) => {
    const productText = `${product.name || ''} ${product.category || ''} ${product.subcategory || ''}`.toLowerCase()
    return productText.includes(search.toLowerCase())
      && (category === 'all' || product.category === category)
      && (subcategory === 'all' || product.subcategory === subcategory)
  }), [products, search, category, subcategory])
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const firstIndex = (currentPage - 1) * PAGE_SIZE
  const pageProducts = filteredProducts.slice(firstIndex, firstIndex + PAGE_SIZE)

  function applySearch(event) {
    event.preventDefault()
    setSearch(searchInput.trim())
    setPage(1)
  }

  async function handleImportFile(event) {
    const file = event.target.files?.[0]
    setImportRows([])
    setImportError('')
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setImportError('Choose a .csv file to import products.')
      return
    }
    try {
      const rows = parseCsv(await file.text())
      setImportRows(rows)
    } catch (error) {
      setImportError(error.message)
    }
  }

  async function importProducts() {
    setIsImporting(true)
    setImportError('')
    try {
      for (const product of importRows) await createProduct(product)
      await queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      setImportOpen(false)
      setImportRows([])
    } catch (error) {
      setImportError(error.message || 'Some products could not be imported. Check Firebase permissions and retry.')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="product-list-page">
      <header className="product-list-header">
        <h1>Product List</h1>
        <div className="product-list-controls">
          <label className="product-list-select"><span>Filter by categories</span><select value={category} onChange={(event) => { setCategory(event.target.value); setSubcategory('all'); setPage(1) }}><option value="all">Select All</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className="product-list-select"><span>Filter by subcategories</span><select value={subcategory} onChange={(event) => { setSubcategory(event.target.value); setPage(1) }}><option value="all">Select All</option>{subcategories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <form className="product-list-search" onSubmit={applySearch}><label className="sr-only" htmlFor="admin-product-search">Search products</label><input id="admin-product-search" placeholder="Search products" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} /><button type="submit"><Search size={15} /><span>Search</span></button></form>
          <button className="product-list-action secondary" type="button" onClick={() => { setImportOpen(true); setImportError(''); setImportRows([]) }}><FileUp size={15} /><span>Import Products</span></button>
          <Link className="product-list-action" to="/admin/products/new"><PackagePlus size={15} /><span>Add Product</span></Link>
        </div>
      </header>
      {!firebaseConfigured ? <div className="admin-alert">Connect Firebase in <code>.env.local</code> to manage your catalog.</div> : null}
      {productsQuery.isError ? <div className="admin-alert admin-alert-error">Products could not be loaded. Check Firebase permissions and retry.</div> : null}
      {deleteMutation.isError ? <div className="admin-alert admin-alert-error">{deleteError}</div> : null}
      <section className="product-table-card" aria-label="Product catalog">
        <div className="product-table-scroll">
          <table className="product-list-table">
            <thead><tr><th>Product Image</th><th>Product Name</th><th>Category</th><th>Price</th><th>Dis Price</th><th>Stock</th><th>Sequence</th><th>Created Date</th><th>Edit</th><th>Del</th></tr></thead>
            <tbody>
              {productsQuery.isLoading ? <tr><td className="product-table-empty" colSpan="10">Loading products…</td></tr> : pageProducts.length ? pageProducts.map((product) => <tr key={product.id}>
                <td><img className="product-list-thumb" src={product.imageUrl || product.image || ''} alt={product.name || 'Product'} /></td>
                <td className="product-list-name">{product.name || 'Untitled product'}</td>
                <td>{product.category || '—'}{product.subcategory ? <small className="product-subcategory">{product.subcategory}</small> : null}</td>
                <td>{Number(product.price || 0).toLocaleString('en-PK')}</td>
                <td>{Number(product.discountPrice ?? product.disPrice ?? product.compareAtPrice ?? product.price ?? 0).toLocaleString('en-PK')}</td>
                <td>{product.stock ?? '—'}</td>
                <td>{product.sequence ?? '—'}</td>
                <td>{formatCreatedDate(product.createdAt || product.createdDate)}</td>
                <td><Link className="product-row-icon edit" to={`/admin/products/${product.id}/edit`} aria-label={`Edit ${product.name}`}><Edit3 size={17} /></Link></td>
                <td><button className="product-row-icon delete" type="button" aria-label={`Delete ${product.name}`} onClick={() => { setDeleteTarget(product); setDeleteError('') }}><Trash2 size={17} /></button></td>
              </tr>) : <tr><td className="product-table-empty" colSpan="10">{products.length ? 'No products match these filters.' : 'No products yet. Add a product or import a CSV file.'}</td></tr>}
            </tbody>
          </table>
        </div>
        <footer className="product-pagination"><span>{filteredProducts.length ? `${firstIndex + 1}–${Math.min(firstIndex + PAGE_SIZE, filteredProducts.length)} of ${filteredProducts.length}` : '0 products'}</span><div><button type="button" aria-label="First page" disabled={currentPage <= 1} onClick={() => setPage(1)}>«</button><button type="button" aria-label="Previous page" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft size={14} /></button>{Array.from({ length: Math.min(pageCount, 3) }, (_, index) => { const pageNumber = Math.max(1, Math.min(currentPage - 1, pageCount - 2)) + index; return <button className={currentPage === pageNumber ? 'current' : ''} type="button" key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</button> })}<button type="button" aria-label="Next page" disabled={currentPage >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}><ChevronRight size={14} /></button><button type="button" aria-label="Last page" disabled={currentPage >= pageCount} onClick={() => setPage(pageCount)}>»</button></div></footer>
      </section>

      {deleteTarget ? <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteTarget(null) }}><section className="admin-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-product-title"><button className="admin-modal-close" type="button" aria-label="Close" onClick={() => setDeleteTarget(null)}><X size={17} /></button><span className="admin-modal-icon danger"><Trash2 size={21} /></span><h2 id="delete-product-title">Delete this product?</h2><p><strong>{deleteTarget.name}</strong> will be permanently removed from the catalog.</p>{deleteError ? <p className="error-message" role="alert">{deleteError}</p> : null}<div className="admin-modal-actions"><button type="button" onClick={() => setDeleteTarget(null)}>Cancel</button><button className="danger-button" type="button" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(deleteTarget.id)}>{deleteMutation.isPending ? 'Deleting…' : 'Delete product'}</button></div></section></div> : null}

      {importOpen ? <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isImporting) setImportOpen(false) }}><section className="admin-import-modal" role="dialog" aria-modal="true" aria-labelledby="import-products-title"><button className="admin-modal-close" type="button" aria-label="Close" disabled={isImporting} onClick={() => setImportOpen(false)}><X size={17} /></button><span className="admin-modal-icon"><FileUp size={21} /></span><h2 id="import-products-title">Import products</h2><p>Upload a CSV with columns for name, category, price, stock, sequence, imageUrl, subcategory and discountPrice.</p><label className="admin-import-drop"><FileUp size={22} /><strong>Choose a CSV file</strong><small>Product image URLs can be included in the imageUrl column.</small><input type="file" accept=".csv,text/csv" onChange={handleImportFile} /></label>{importRows.length ? <p className="admin-import-count">{importRows.length} products are ready to import.</p> : null}{importError ? <p className="error-message" role="alert">{importError}</p> : null}<div className="admin-modal-actions"><button type="button" disabled={isImporting} onClick={() => setImportOpen(false)}>Cancel</button><button className="admin-import-submit" type="button" disabled={!importRows.length || isImporting || !firebaseConfigured} onClick={importProducts}>{isImporting ? 'Importing…' : `Import ${importRows.length || ''} products`}</button></div></section></div> : null}
    </div>
  )
}

export default Products

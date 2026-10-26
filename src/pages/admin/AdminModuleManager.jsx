import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, Edit3, ImagePlus, Plus, Search, Trash2, Upload, X } from 'lucide-react'
import { adminModules, adminOptionSets } from '../../data/adminModules.js'
import {
  createAdminRecord,
  deleteAdminRecord,
  getAdminRecord,
  getAdminRecords,
  updateAdminRecord,
  uploadAdminAsset,
} from '../../services/adminContentService.js'
import { firebaseConfigured } from '../../services/firebase.js'

const EMPTY = []
const PAGE_SIZE = 12

function displayValue(value) {
  if (Array.isArray(value)) return value.map((item) => typeof item === 'object' ? item.name || item.title || '' : item).filter(Boolean).join(', ')
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (value == null || value === '') return '—'
  return value
}

function moduleSources(module) {
  return [...new Set(module.fields.map((field) => field.source).filter((source) => source && !adminOptionSets[source]))]
}

function AdminModuleManager({ moduleId: moduleIdProp }) {
  const { moduleId: routeModuleId } = useParams()
  const moduleId = moduleIdProp || routeModuleId
  const module = adminModules[moduleId]
  if (!module) return <div className="admin-alert admin-alert-error">This admin module does not exist.</div>
  if (module.singleton) return <AdminModuleForm moduleId={moduleId} module={module} />
  return <AdminModuleList moduleId={moduleId} module={module} />
}

export function AdminModuleFormRoute({ mode = 'edit' }) {
  const { moduleId, recordId } = useParams()
  const module = adminModules[moduleId]
  if (!module) return <div className="admin-alert admin-alert-error">This admin module does not exist.</div>
  return <AdminModuleForm key={`${moduleId}-${recordId || mode}`} moduleId={moduleId} module={module} recordId={recordId} forceNew={mode === 'new'} />
}

export function ProductFormRoute() {
  const { productId } = useParams()
  return <AdminModuleForm key={`products-${productId || 'new'}`} moduleId="products" module={adminModules.products} recordId={productId} forceNew={!productId} successPath="/admin/product-list" />
}

function AdminModuleList({ moduleId, module }) {
  const client = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const recordsQuery = useQuery({ queryKey: ['admin-module', moduleId], queryFn: () => getAdminRecords(module.collection), enabled: firebaseConfigured, retry: 1 })
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAdminRecord(module.collection, id),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['admin-module', moduleId] })
      setDeleteTarget(null)
      setDeleteError('')
    },
    onError: (error) => setDeleteError(error.message || 'This item could not be deleted.'),
  })
  const records = recordsQuery.data || EMPTY
  const filteredRecords = useMemo(() => records.filter((record) => JSON.stringify(record).toLowerCase().includes(search.toLowerCase())), [records, search])
  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filteredRecords.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const basePath = `/admin/manage/${moduleId}`

  return (
    <div className="admin-module-page">
      <header className="admin-module-header">
        <div><p className="admin-eyebrow">Candle Fort admin</p><h1>{module.listTitle || `${module.title} List`}</h1></div>
        <Link className="admin-primary-button" to={`${basePath}/new`}><Plus size={15} /> Add {module.title}</Link>
      </header>
      {!firebaseConfigured ? <div className="admin-alert">Connect Firebase in <code>.env.local</code> to manage this section.</div> : null}
      {recordsQuery.isError ? <div className="admin-alert admin-alert-error">{module.listTitle} could not be loaded. Check Firebase permissions.</div> : null}
      {deleteError ? <div className="admin-alert admin-alert-error">{deleteError}</div> : null}
      <section className="admin-module-table-card">
        <div className="admin-module-toolbar"><label><Search size={16} /><span className="sr-only">Search {module.title}</span><input value={search} placeholder={`Search ${module.title.toLowerCase()}s`} onChange={(event) => { setSearch(event.target.value); setPage(1) }} /></label><span>{filteredRecords.length} records</span></div>
        <div className="admin-module-table-scroll"><table className="admin-module-table"><thead><tr>{module.listColumns.map(([, label]) => <th key={label}>{label}</th>)}<th>Edit</th><th>Del</th></tr></thead><tbody>
          {recordsQuery.isLoading ? <tr><td colSpan={module.listColumns.length + 2} className="admin-module-empty">Loading…</td></tr> : visible.length ? visible.map((record) => <tr key={record.id}>
            {module.listColumns.map(([key]) => <td key={key}>{key.toLowerCase().includes('image') && record[key] ? <img className="admin-module-thumb" src={Array.isArray(record[key]) ? record[key][0] : record[key]} alt="" /> : displayValue(record[key])}</td>)}
            <td><Link className="product-row-icon edit" to={`${basePath}/${record.id}/edit`} aria-label={`Edit ${record.name || record.title || module.title}`}><Edit3 size={16} /></Link></td>
            <td><button className="product-row-icon delete" type="button" aria-label={`Delete ${record.name || record.title || module.title}`} onClick={() => { setDeleteTarget(record); setDeleteError('') }}><Trash2 size={16} /></button></td>
          </tr>) : <tr><td colSpan={module.listColumns.length + 2} className="admin-module-empty">{recordsQuery.isError ? 'Records could not be loaded.' : records.length ? 'No records match your search.' : `No ${module.title.toLowerCase()} records yet.`}</td></tr>}
        </tbody></table></div>
        <footer className="admin-module-pagination"><span>{filteredRecords.length ? `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filteredRecords.length)} of ${filteredRecords.length}` : '0 records'}</span><div><button type="button" disabled={currentPage <= 1} onClick={() => setPage(1)}>«</button><button type="button" disabled={currentPage <= 1} onClick={() => setPage((value) => value - 1)}>‹</button><strong>{currentPage}</strong><button type="button" disabled={currentPage >= pageCount} onClick={() => setPage((value) => value + 1)}>›</button><button type="button" disabled={currentPage >= pageCount} onClick={() => setPage(pageCount)}>»</button></div></footer>
      </section>
      {deleteTarget ? <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteTarget(null) }}><section className="admin-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title"><button className="admin-modal-close" type="button" aria-label="Close" onClick={() => setDeleteTarget(null)}><X size={16} /></button><span className="admin-modal-icon danger"><Trash2 size={20} /></span><h2 id="admin-delete-title">Delete this {module.title.toLowerCase()}?</h2><p><strong>{deleteTarget.name || deleteTarget.title || module.title}</strong> will be removed from the admin collection.</p><div className="admin-modal-actions"><button type="button" onClick={() => setDeleteTarget(null)}>Cancel</button><button className="danger-button" type="button" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(deleteTarget.id)}>{deleteMutation.isPending ? 'Deleting…' : `Delete ${module.title}`}</button></div></section></div> : null}
    </div>
  )
}

function getDefaults(module, initialRecord) {
  return Object.fromEntries(module.fields.map((field) => {
    const value = initialRecord?.[field.name]
    if (field.type === 'keyValues' && value && !Array.isArray(value)) {
      return [field.name, Object.entries(value).map(([key, pairValue]) => ({ key, value: pairValue }))]
    }
    if (value !== undefined && value !== null) return [field.name, value]
    if (module.collection === 'products' && field.name === 'images') {
      return [field.name, [initialRecord?.imageUrl || initialRecord?.image].filter(Boolean)]
    }
    if (module.collection === 'products' && field.name === 'discountPrice') {
      return [field.name, initialRecord?.disPrice ?? initialRecord?.compareAtPrice ?? '']
    }
    return [field.name, field.defaultValue ?? (field.type === 'toggle' ? false : field.type === 'multiSelect' || field.type === 'images' || field.type === 'keyValues' ? [] : '')]
  }))
}

function AdminModuleForm({ moduleId, module, recordId, forceNew = false, successPath }) {
  const client = useQueryClient()
  const navigate = useNavigate()
  const sourceNames = moduleSources(module)
  const sourceQueries = useQueries({ queries: sourceNames.map((source) => ({ queryKey: ['admin-module-source', source], queryFn: () => getAdminRecords(adminModules[source]?.collection || source), enabled: firebaseConfigured, retry: 1 })) })
  const sourceData = Object.fromEntries(sourceNames.map((source, index) => [source, sourceQueries[index]?.data || EMPTY]))
  const targetId = recordId || (module.singleton ? 'main' : null)
  const recordQuery = useQuery({ queryKey: ['admin-module-record', moduleId, targetId], queryFn: () => getAdminRecord(module.collection, targetId), enabled: Boolean(targetId && firebaseConfigured), retry: 1 })
  const [draft, setDraft] = useState(null)
  const [files, setFiles] = useState({})
  const [filePreviews, setFilePreviews] = useState({})
  const [error, setError] = useState('')
  const fileUrls = useRef(new Set())
  const initialRecord = recordQuery.data || {}
  const values = draft || getDefaults(module, initialRecord)
  const isEditing = !forceNew && Boolean(targetId && recordQuery.data)
  const sourceLoadError = sourceQueries.some((sourceQuery) => sourceQuery.isError)
  const backPath = successPath || `/admin/manage/${moduleId}`

  useEffect(() => () => {
    for (const url of fileUrls.current) URL.revokeObjectURL(url)
  }, [])
  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...values }
      for (const field of module.fields) {
        if (field.type === 'number') payload[field.name] = payload[field.name] === '' ? null : Number(payload[field.name])
        if (field.name === 'tags' || field.name === 'metaKeywords') payload[field.name] = Array.isArray(payload[field.name]) ? payload[field.name] : String(payload[field.name] || '').split(',').map((tag) => tag.trim()).filter(Boolean)
        if (field.type === 'image' && files[field.name]) payload[field.name] = await uploadAdminAsset(files[field.name], `admin-assets/${moduleId}`)
        if (field.type === 'images') {
          const existing = Array.isArray(payload[field.name]) ? payload[field.name] : []
          const uploaded = await Promise.all((files[field.name] || []).map((file) => uploadAdminAsset(file, `admin-assets/${moduleId}`)))
          payload[field.name] = [...existing, ...uploaded]
        }
      }
      if (moduleId === 'products') {
        const firstImage = payload.images?.[0] || payload.imageUrl || ''
        payload.imageUrl = firstImage
        payload.image = firstImage
        payload.discountPrice = payload.discountPrice ?? payload.price
        payload.active = payload.active !== false
      }
      if (moduleId === 'sliders' || moduleId === 'middleSliders') payload.sliderType = moduleId === 'sliders' ? 'hero' : 'middle'
      payload.updatedAt = new Date().toISOString()
      if (!isEditing) payload.createdAt = new Date().toISOString()
      if (isEditing) await updateAdminRecord(module.collection, targetId, payload)
      else await createAdminRecord(module.collection, payload, targetId)
      return payload
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['admin-module'] })
      await client.invalidateQueries({ queryKey: ['admin-module-source'] })
      if (moduleId === 'products') {
        await client.invalidateQueries({ queryKey: ['admin', 'products'] })
        await client.invalidateQueries({ queryKey: ['products'] })
      }
      navigate(successPath || backPath)
    },
    onError: (saveError) => setError(saveError.message || `${module.title} could not be saved.`),
  })

  if (recordQuery.isLoading && !forceNew) return <div className="admin-empty-state">Loading {module.title.toLowerCase()}…</div>
  if (recordQuery.isError) return <div className="admin-alert admin-alert-error">This {module.title.toLowerCase()} could not be loaded.</div>
  if (recordId && !recordQuery.data && !forceNew) return <div className="admin-alert admin-alert-error">This {module.title.toLowerCase()} could not be found.</div>

  function setValue(name, value) {
    setDraft((current) => ({ ...(current || getDefaults(module, initialRecord)), [name]: value }))
  }

  function chooseFile(field, event) {
    const fileList = [...(event.target.files || [])]
    const selected = field.type === 'images' ? fileList : fileList[0] || null
    const previews = fileList.map((file) => {
      const url = URL.createObjectURL(file)
      fileUrls.current.add(url)
      return url
    })
    setFiles((current) => ({ ...current, [field.name]: selected }))
    setFilePreviews((current) => ({ ...current, [field.name]: previews }))
  }

  function fieldOptions(field) {
    if (adminOptionSets[field.source]) return adminOptionSets[field.source].map((value) => ({ label: value, value }))
    const source = sourceData[field.source] || EMPTY
    return source
      .filter((item) => field.source !== 'subcategories' || !values.category || item.category === values.category)
      .map((item) => ({ label: item[field.labelField || 'name'] || item.title || item.name || item.city || '', value: item[field.valueField || 'name'] || item.title || item.name || item.city || '' }))
      .filter((option) => option.value)
  }

  function renderField(field) {
    const value = values[field.name]
    const common = { id: `${moduleId}-${field.name}`, name: field.name, required: field.required, disabled: saveMutation.isPending }
    if (field.type === 'toggle') return <label className="admin-module-toggle" key={field.name}><input {...common} type="checkbox" checked={Boolean(value)} onChange={(event) => setValue(field.name, event.target.checked)} /><span>{field.label}</span></label>
    if (field.type === 'select') return <label className="admin-field" key={field.name}>{field.label}<select {...common} value={value ?? ''} onChange={(event) => setValue(field.name, event.target.value)}><option value="">Select {field.label}</option>{fieldOptions(field).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{field.hint ? <small>{field.hint}</small> : null}</label>
    if (field.type === 'multiSelect') return <fieldset className="admin-module-relations" key={field.name}><legend>{field.label}</legend>{fieldOptions(field).length ? fieldOptions(field).map((option) => { const selected = Array.isArray(value) && value.includes(option.value); return <label key={option.value}><input type="checkbox" checked={selected} disabled={saveMutation.isPending} onChange={(event) => setValue(field.name, event.target.checked ? [...(value || []), option.value] : (value || []).filter((item) => item !== option.value))} />{option.label}</label> }) : <small>No related records are available yet.</small>}</fieldset>
    if (field.type === 'keyValues') return <fieldset className="admin-module-key-values" key={field.name}><legend>{field.label}</legend>{(value || []).map((pair, index) => <div className="admin-key-value-row" key={`${index}-${pair.key}`}><input aria-label="Key" value={pair.key || ''} placeholder="Key" onChange={(event) => setValue(field.name, value.map((item, pairIndex) => pairIndex === index ? { ...item, key: event.target.value } : item))} /><input aria-label="Value" value={pair.value || ''} placeholder="Value" onChange={(event) => setValue(field.name, value.map((item, pairIndex) => pairIndex === index ? { ...item, value: event.target.value } : item))} /><button type="button" aria-label="Remove specification" onClick={() => setValue(field.name, value.filter((_, pairIndex) => pairIndex !== index))}><X size={14} /></button></div>)}<button className="admin-inline-button" type="button" onClick={() => setValue(field.name, [...(value || []), { key: '', value: '' }])}><Plus size={14} /> Add specification</button></fieldset>
    if (field.type === 'image' || field.type === 'images') {
      const currentImages = field.type === 'images' && Array.isArray(value) ? value : field.type === 'image' && value ? [value] : []
      const chosenPreviews = filePreviews[field.name] || []
      return <div className="admin-field admin-module-file-field" key={field.name}><span>{field.label}</span><label className="admin-module-file-drop"><ImagePlus size={21} /><strong>{field.type === 'images' ? 'Choose product images' : 'Choose image'}</strong><small>JPG, PNG or WebP · up to 10 MB per image</small><input {...common} type="file" accept="image/*" multiple={field.type === 'images'} onChange={(event) => chooseFile(field, event)} /></label><div className="admin-module-image-previews">{currentImages.map((url, index) => <div key={`${url}-${index}`}><img src={url} alt={`${field.label} ${index + 1}`} /><button type="button" aria-label="Remove image" onClick={() => setValue(field.name, field.type === 'images' ? currentImages.filter((_, imageIndex) => imageIndex !== index) : '')}><X size={13} /></button></div>)}{chosenPreviews.map((url, index) => <div key={`${url}-${index}`}><img src={url} alt={`${field.label} preview ${index + 1}`} /><button type="button" aria-label="Remove selected image" onClick={() => { const keep = (files[field.name] || []).filter((_, fileIndex) => fileIndex !== index); setFiles((current) => ({ ...current, [field.name]: field.type === 'images' ? keep : null })); setFilePreviews((current) => ({ ...current, [field.name]: chosenPreviews.filter((_, previewIndex) => previewIndex !== index) })) }}><X size={13} /></button></div>)}</div></div>
    }
    if (field.type === 'textarea' || field.type === 'richtext') return <label className="admin-field admin-field-wide" key={field.name}>{field.label}<textarea {...common} value={Array.isArray(value) ? value.join(', ') : value ?? ''} rows={field.type === 'richtext' ? 8 : 4} onChange={(event) => setValue(field.name, event.target.value)} />{field.hint ? <small>{field.hint}</small> : null}</label>
    return <label className="admin-field" key={field.name}>{field.label}<input {...common} type={field.type === 'number' ? 'number' : 'text'} min={field.min} max={field.max} step={field.step} value={Array.isArray(value) ? value.join(', ') : value ?? ''} onChange={(event) => setValue(field.name, event.target.value)} />{field.hint ? <small>{field.hint}</small> : null}</label>
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const images = values.images || []
    const newImages = files.images || []
    if (moduleId === 'products' && images.length + newImages.length < 2) {
      setError('Add at least two product images before saving.')
      return
    }
    if (moduleId === 'products' && (!Number(values.price) || Number(values.price) <= 0)) {
      setError('Enter a product price greater than zero.')
      return
    }
    saveMutation.mutate()
  }

  return (
    <div className="admin-section-page">
      <Link className="admin-back-link" to={backPath}><ArrowLeft size={15} /> Back to {module.listTitle || module.title}</Link>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">{module.singleton ? 'Store configuration' : isEditing ? 'Update your collection' : 'Add to your collection'}</p><h1>{isEditing ? `Edit ${module.title}` : `Add ${module.title}`}</h1><p className="admin-heading-sub">{module.title} details shown in Candle Fort admin and storefront.</p></div></div>
      {!firebaseConfigured ? <div className="admin-alert">Connect Firebase in <code>.env.local</code> to save this form.</div> : null}
      {recordQuery.isError ? <div className="admin-alert admin-alert-error">Could not load existing values. Saving may overwrite data.</div> : null}
      {sourceLoadError ? <div className="admin-alert admin-alert-error">Some linked options could not be loaded. Check the Firebase rules for this admin collection.</div> : null}
      <form className="admin-module-form" onSubmit={handleSubmit}>
        <section className="admin-form-card"><div className="admin-form-card-heading"><h2>{module.title} details</h2><p>Fields follow the live Candle Fort admin form.</p></div><div className="admin-module-fields">{module.fields.map(renderField)}</div></section>
        {error ? <p className="error-message admin-form-error" role="alert">{error}</p> : null}
        <div className="admin-module-submit"><button className="admin-primary-button" disabled={!firebaseConfigured || saveMutation.isPending} type="submit"><Upload size={15} />{saveMutation.isPending ? 'Saving…' : isEditing ? `Update ${module.title}` : `Add ${module.title}`}</button></div>
      </form>
    </div>
  )
}

export default AdminModuleManager

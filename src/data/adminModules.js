const text = (name, label, options = {}) => ({ name, label, type: 'text', ...options })
const number = (name, label, options = {}) => ({ name, label, type: 'number', min: 0, step: 1, ...options })
const textarea = (name, label, options = {}) => ({ name, label, type: 'textarea', ...options })
const richText = (name, label, options = {}) => ({ name, label, type: 'richtext', ...options })
const image = (name, label, options = {}) => ({ name, label, type: 'image', ...options })
const select = (name, label, source, options = {}) => ({ name, label, type: 'select', source, ...options })
const multiSelect = (name, label, source, options = {}) => ({ name, label, type: 'multiSelect', source, ...options })
const toggle = (name, label, options = {}) => ({ name, label, type: 'toggle', ...options })

const seoFields = [
  text('metaTitle', 'Meta Title'),
  textarea('metaDescription', 'Meta Description'),
]

export const adminModules = {
  products: {
    title: 'Product', collection: 'products', listTitle: 'Product List',
    listColumns: [['name', 'Product Name'], ['category', 'Category'], ['price', 'Price'], ['stock', 'Stock'], ['sequence', 'Sequence']],
    fields: [
      text('name', 'Product Name', { required: true }),
      select('category', 'Main Category', 'categories', { required: true, valueField: 'name' }),
      select('subcategory', 'Sub Category', 'subcategories', { valueField: 'name' }),
      textarea('shortDescription', 'Short Description'),
      richText('description', 'Description'),
      select('color', 'Color', 'colors', { valueField: 'name' }),
      number('weight', 'Weight'),
      text('tags', 'Tags', { hint: 'Separate tags with commas.' }),
      number('sequence', 'Sequence'),
      ...seoFields,
      toggle('active', 'Show Product', { defaultValue: true }),
      { name: 'images', label: 'Product Images (minimum 2)', type: 'images', required: true, minFiles: 2 },
      number('price', 'Price', { required: true, min: 1 }),
      number('discountPercentage', 'Discount Percentage', { max: 100 }),
      number('discountPrice', 'Discounted Price'),
      number('stock', 'Stock'),
      text('sku', 'SKU'),
      { name: 'specifications', label: 'Specifications', type: 'keyValues' },
      multiSelect('relatedProductIds', 'Related Products', 'products', { labelField: 'name' }),
      image('sizeChartUrl', 'Size Chart'),
    ],
  },
  categories: {
    title: 'Category', collection: 'categories', listTitle: 'Category List',
    listColumns: [['name', 'Category'], ['displayOrder', 'Display Order'], ['showSizeVariants', 'Size Variants']],
    fields: [number('displayOrder', 'Display Order'), text('name', 'Category', { required: true }), textarea('description', 'Description'), ...seoFields, toggle('showSizeVariants', 'Show Size Variants'), image('imageUrl', 'Category Image')],
  },
  subcategories: {
    title: 'Subcategory', collection: 'subcategories', listTitle: 'Subcategory List',
    listColumns: [['name', 'Subcategory'], ['category', 'Category']],
    fields: [select('category', 'Category', 'categories', { required: true, valueField: 'name' }), text('name', 'Subcategory', { required: true }), textarea('description', 'Description'), ...seoFields, image('imageUrl', 'Subcategory Image')],
  },
  blogs: {
    title: 'Blog', collection: 'blogs', listTitle: 'Blog List',
    listColumns: [['title', 'Blog Title'], ['category', 'Category'], ['active', 'Active']],
    fields: [text('title', 'Blog Title', { required: true }), text('shortDescription', 'Short Description'), richText('description', 'Description'), text('category', 'Blog Category'), ...seoFields, text('metaKeywords', 'Meta Keywords', { hint: 'Separate keywords with commas.' }), image('imageUrl', 'Blog Image'), toggle('active', 'Is Active', { defaultValue: true })],
  },
  blogCategories: {
    title: 'Blog Category', collection: 'blogCategories', listTitle: 'Blog Category List',
    listColumns: [['name', 'Blog Category']], fields: [text('name', 'Blog Category', { required: true })],
  },
  pages: {
    title: 'Page', collection: 'pages', listTitle: 'Page List',
    listColumns: [['displayOrder', 'Display Order'], ['name', 'Page Name'], ['slug', 'Page URL'], ['active', 'Active']],
    fields: [number('displayOrder', 'Display Order', { defaultValue: 1 }), text('name', 'Page Name', { required: true }), text('slug', 'Page URL', { required: true }), ...seoFields, toggle('active', 'Is Active', { defaultValue: true }), toggle('useExistingPage', 'Add Existing Page'), select('existingPage', 'Existing Pages', 'existingPages'), text('pageTitle', 'Page Title'), text('heading', 'Heading'), richText('content', 'Page Content')],
  },
  colors: {
    title: 'Color', collection: 'colors', listTitle: 'Colors',
    listColumns: [['name', 'Color'], ['category', 'Category']],
    fields: [select('category', 'Category', 'categories', { required: true, valueField: 'name' }), text('name', 'Color', { required: true })],
  },
  sizeVariants: {
    title: 'Size Variant', collection: 'sizeVariants', listTitle: 'Size Variants',
    listColumns: [['name', 'Size Name'], ['category', 'Category'], ['subcategory', 'Subcategory'], ['sequence', 'Sequence']],
    fields: [select('category', 'Category', 'categories', { required: true, valueField: 'name' }), select('subcategory', 'Subcategory', 'subcategories', { valueField: 'name' }), text('name', 'Size', { required: true }), number('sequence', 'Sequence')],
  },
  shippingMethods: {
    title: 'Shipping Method', collection: 'shippingMethods', listTitle: 'Shipping Methods',
    listColumns: [['name', 'Name']], fields: [text('name', 'Name', { required: true })],
  },
  shippingRates: {
    title: 'Shipping Rate', collection: 'shippingRates', listTitle: 'Shipping Rates',
    listColumns: [['city', 'City'], ['rate', 'Rate'], ['freeShippingMinimum', 'Min Rate For Free Shipping']],
    fields: [select('city', 'City', 'cities', { required: true }), number('rate', 'Rate', { required: true }), number('freeShippingMinimum', 'Min Rate For Free Shipping', { required: true })],
  },
  sliders: {
    title: 'Slider', collection: 'sliders', listTitle: 'Slider List',
    listColumns: [['firstHeading', 'First Heading'], ['secondHeading', 'Second Heading'], ['sequence', 'Order'], ['active', 'Active']],
    fields: [number('sequence', 'Sequence'), text('firstHeading', 'First Heading'), text('mobileFirstHeading', 'Mobile First Heading'), text('secondHeading', 'Second Heading'), text('mobileSecondHeading', 'Mobile Second Heading'), textarea('text', 'Text'), textarea('mobileText', 'Mobile Text'), select('desktopTextColor', 'Desktop Slider Text Color', 'sliderTextColors'), select('mobileTextColor', 'Mobile Slider Text Color', 'sliderTextColors'), text('buttonText', 'Button Text'), text('buttonLink', 'Button Link'), toggle('active', 'Active', { defaultValue: true }), image('desktopImageUrl', 'Desktop Slider Image'), image('mobileImageUrl', 'Mobile Slider Image')],
  },
  middleSliders: {
    title: 'Middle Slider', collection: 'middleSliders', listTitle: 'Middle Slider List',
    listColumns: [['firstHeading', 'First Heading'], ['secondHeading', 'Second Heading'], ['sequence', 'Order'], ['active', 'Active']],
    fields: [number('sequence', 'Sequence'), text('firstHeading', 'First Heading'), text('mobileFirstHeading', 'Mobile First Heading'), text('secondHeading', 'Second Heading'), text('mobileSecondHeading', 'Mobile Second Heading'), textarea('text', 'Text'), textarea('mobileText', 'Mobile Text'), select('desktopTextColor', 'Desktop Slider Text Color', 'sliderTextColors'), select('mobileTextColor', 'Mobile Slider Text Color', 'sliderTextColors'), text('buttonText', 'Button Text'), text('buttonLink', 'Button Link'), toggle('active', 'Active', { defaultValue: true }), image('desktopImageUrl', 'Desktop Slider Image'), image('mobileImageUrl', 'Mobile Slider Image')],
  },
  featuredCategories: {
    title: 'Featured Categories', collection: 'featuredCategories', listTitle: 'Featured Categories',
    listColumns: [['title', 'Title'], ['description', 'Description']],
    fields: [text('title', 'Title', { required: true }), textarea('description', 'Description'), multiSelect('categoryIds', 'Select Categories', 'categories')],
  },
  featuredProducts: {
    title: 'Featured Products', collection: 'featuredProducts', listTitle: 'Featured Products',
    listColumns: [['title', 'Title'], ['description', 'Description'], ['sequence', 'Sequence']],
    fields: [text('title', 'Title', { required: true }), number('sequence', 'Sequence'), textarea('description', 'Description'), multiSelect('productIds', 'Select Products', 'products', { labelField: 'name' })],
  },
  featuredBlogs: {
    title: 'Featured Blogs', collection: 'featuredBlogs', listTitle: 'Featured Blogs',
    listColumns: [['title', 'Title'], ['description', 'Description'], ['sequence', 'Sequence']],
    fields: [text('title', 'Title', { required: true }), number('sequence', 'Sequence'), textarea('description', 'Description'), multiSelect('blogIds', 'Select Blogs', 'blogs', { labelField: 'title' })],
  },
  marketingSection: {
    title: 'Marketing Section', collection: 'marketingSections', listTitle: 'Marketing Section', singleton: true,
    fields: [text('heading', 'Heading'), textarea('paragraph', 'Paragraph Section'), text('buttonText', 'Button Text'), text('buttonLink', 'Button Link'), image('imageUrl', 'Image')],
  },
  overlays: {
    title: 'Promotional Overlay', collection: 'overlays', listTitle: 'Promotional Overlays',
    listColumns: [['popupType', 'Popup Type'], ['active', 'Active'], ['buttonText', 'Button Text']],
    fields: [text('content', 'Content', { required: true }), text('popupType', 'Popup Type', { required: true }), image('imageUrl', 'Image'), text('buttonText', 'Button Text'), toggle('active', 'Is Active')],
  },
  appSettings: {
    title: 'App Settings', collection: 'appSettings', listTitle: 'App Settings', singleton: true,
    fields: [text('title', 'Title'), text('emailTitle', 'Email Title'), text('domain', 'Domain'), text('phoneNumber', 'Phone Number'), text('searchPlaceholder', 'Search Placeholder'), text('facebookPage', 'Facebook Page'), text('instagramPage', 'Instagram Page'), text('whatsappNumber', 'WhatsApp Number'), text('currency', 'Currency'), text('supportEmail', 'Support Email Address'), textarea('footerContent', 'Footer Content'), text('footerHeading', 'Footer Heading'), select('dateFormat', 'Date Format', 'dateFormats'), text('headerContent', 'Header Content'), select('sliderLayout', 'Slider Layout', 'sliderLayouts'), select('productListingStyle', 'Product Listing Style', 'productListingStyles'), toggle('whatsappIntegration', 'WhatsApp Integration'), image('logoUrl', 'Store Logo')],
  },
  aboutUs: {
    title: 'About Us', collection: 'aboutUs', listTitle: 'About Us Page', singleton: true,
    fields: [text('title', 'Title'), richText('titleSectionText', 'Title Section Text'), text('sectionHeading', 'Heading'), richText('sectionText', 'Text'), text('buttonText', 'Button Text'), text('buttonLink', 'Button Link'), image('imageUrl', 'Image')],
  },
  themeSettings: {
    title: 'Theme Settings', collection: 'themeSettings', listTitle: 'Select Theme', singleton: true,
    fields: [select('theme', 'Select Theme', 'themes')],
  },
}

export const adminOptionSets = {
  cities: ['Karachi', 'Lahore', 'Islamabad', 'Other Cities'],
  sliderTextColors: ['Light (White)', 'Dark (Black)'],
  dateFormats: ['yyyy-MM-dd', 'dd/MM/yyyy', 'MM-dd-yyyy', 'MMMM d, yyyy', 'MMMM, yyyy'],
  sliderLayouts: ['One Slider Layout', 'Three Slider Layout'],
  productListingStyles: ['Square Style', 'Portrait Style'],
  themes: ['Black', 'Green', 'Blue', 'Red', 'Purple'],
  existingPages: ['About Us', 'Contact Us', 'Blogs', 'Return Policy'],
}

import logo from '../assets/logo.webp'
import img2 from '../assets/images/image-2.webp'
import img3 from '../assets/images/image-3.webp'
import img4 from '../assets/images/image-4.webp'
import img5 from '../assets/images/image-5.webp'
import img8 from '../assets/images/image-8.webp'
import img9 from '../assets/images/image-9.webp'
import img10 from '../assets/images/image-10.webp'
import img11 from '../assets/images/image-11.webp'
import img12 from '../assets/images/image-12.webp'
import img13 from '../assets/images/image-13.webp'
import img14 from '../assets/images/image-14.webp'
import img15 from '../assets/images/image-15.webp'
import img17 from '../assets/images/image-17.webp'
import img18 from '../assets/images/image-18.webp'
import img19 from '../assets/images/image-19.webp'
import img20 from '../assets/images/image-20.webp'
import img28 from '../assets/images/image-28.webp'
import img29 from '../assets/images/image-29.webp'
import img30 from '../assets/images/image-30.webp'
import img31 from '../assets/images/image-31.webp'
import img32 from '../assets/images/image-32.webp'
import img33 from '../assets/images/image-33.webp'
import img35 from '../assets/images/image-35.webp'
import img38 from '../assets/images/image-38.webp'
import img39 from '../assets/images/image-39.webp'
import img41 from '../assets/images/image-41.webp'
import img43 from '../assets/images/image-43.webp'

export { logo }

export const hero = {
  eyebrow: 'Premium Handcrafted Candles',
  title: 'Light Up Your Moments',
  text: 'Discover handcrafted candles designed to bring warmth, elegance, and fragrance into every space.',
  cta: 'Shop Now',
  image: img5,
}

export const trustItems = [
  { label: 'Free Delivery', hint: 'Across Pakistan' },
  { label: 'Cash on Delivery', hint: 'Pay with ease' },
  { label: 'Premium Quality', hint: 'Handcrafted with care' },
  { label: 'Secure Payments', hint: 'Safe checkout' },
]

export const categories = [
  { title: 'Cake Candles', image: img13, to: '/shop?category=cake' },
  { title: 'Jar Candles', image: img4, to: '/shop?category=jar' },
  { title: 'Gift Sets', image: img8, to: '/shop?category=gift' },
  { title: 'Scented Candles', image: img15, to: '/shop?category=scented' },
  { title: 'Decorative Candles', image: img32, to: '/shop?category=decorative' },
]

export const scentsBanner = {
  title: 'Signature Scents for Every Mood',
  text: 'From calming lavender to warm sandalwood — find a fragrance that matches your moment.',
  cta: 'Shop Trending Scents',
  image: img3,
  scents: ['Lavender', 'Vanilla', 'Sandalwood', 'Citrus', 'Rose'],
}

export const giftBanner = {
  title: 'Elegant Gift Box Candles',
  text: 'Thoughtfully packaged gift sets ready to delight for every occasion.',
  cta: 'Shop Gift Boxes',
  image: img8,
  to: '/shop?category=gift',
}

export const seasonalBanner = {
  title: 'Seasonal Collection',
  text: 'Limited-edition candles inspired by the season — warm, festive, and unforgettable.',
  cta: 'Explore Seasonal',
  image: img17,
  to: '/shop?category=seasonal',
}

export const placeholderProducts = [
  {
    id: 'placeholder-1',
    name: 'Purple Berry Cake Candle',
    price: 1700,
    imageUrl: img10,
    rating: 5,
    category: 'cake',
  },
  {
    id: 'placeholder-2',
    name: 'Dessert Dream Candle',
    price: 1700,
    imageUrl: img2,
    rating: 5,
    category: 'cake',
  },
  {
    id: 'placeholder-3',
    name: 'Gift Box Cake Candle',
    price: 1700,
    imageUrl: img11,
    rating: 5,
    category: 'gift',
  },
  {
    id: 'placeholder-4',
    name: 'Cute Cake Candle',
    price: 1700,
    imageUrl: img14,
    rating: 5,
    category: 'cake',
  },
  {
    id: 'placeholder-5',
    name: 'Mehndi Candle Set',
    price: 1700,
    imageUrl: img17,
    rating: 5,
    category: 'gift',
  },
]

export const occasions = [
  { title: 'Birthday', image: img35, to: '/shop?occasion=birthday' },
  { title: 'Anniversary', image: img11, to: '/shop?occasion=anniversary' },
  { title: 'Wedding', image: img17, to: '/shop?occasion=wedding' },
  { title: 'Thank You', image: img12, to: '/shop?occasion=thank-you' },
  { title: 'Just Because', image: img19, to: '/shop?occasion=just-because' },
]

export const promos = [
  {
    title: 'Create a Personalized Gift Set',
    text: 'Build a custom gift with your favourite scents and styles.',
    cta: 'Start Building',
    image: img20,
    to: '/shop?category=gift',
  },
  {
    title: 'Candle Fragrance Finder',
    text: 'Not sure where to start? Find the perfect scent for your mood.',
    cta: 'Find My Scent',
    image: img15,
    to: '/shop?category=scented',
  },
]

export const brandStory = {
  title: 'Crafted with Passion, Inspired by You',
  image: img4,
  points: [
    { title: 'Premium Ingredients', text: 'Clean wax and carefully chosen fragrances.' },
    { title: 'Handcrafted with Love', text: 'Made in small batches with attention to detail.' },
    { title: 'Elegant Designs', text: 'Beautiful pieces that elevate every space.' },
    { title: 'Longer Burn Time', text: 'Designed for lasting warmth and glow.' },
  ],
}

export const testimonials = [
  {
    name: 'Ayesha Khan',
    location: 'Lahore',
    quote:
      'The cake candles looked incredible and smelled amazing. Perfect birthday gift!',
    rating: 5,
    avatar: img13,
  },
  {
    name: 'Hassan Ali',
    location: 'Karachi',
    quote:
      'Beautiful packaging and premium quality. Candle Fort is my go-to for gifting.',
    rating: 5,
    avatar: img9,
  },
  {
    name: 'Sara Malik',
    location: 'Islamabad',
    quote:
      'Soft glow, lovely scent, and such elegant design. I ordered again the same week.',
    rating: 5,
    avatar: img14,
  },
]

export const instagramImages = [
  img29,
  img30,
  img31,
  img33,
  img38,
  img39,
  img41,
]

export const recentlyViewedFallback = [
  { id: 'rv-1', name: 'Blue Celebration Candle', price: 2100, imageUrl: img41 },
  { id: 'rv-2', name: 'Pink Drip Cake Candle', price: 1700, imageUrl: img9 },
  { id: 'rv-3', name: 'Berry Glaze Candle', price: 1800, imageUrl: img28 },
  { id: 'rv-4', name: 'Custom Initial Candle', price: 1900, imageUrl: img14 },
]

export const careTips = [
  {
    title: 'Trim the wick',
    text: 'Keep the wick at 5mm before each burn for a clean, even flame.',
  },
  {
    title: 'First burn matters',
    text: 'Allow the wax to melt across the surface on the first light.',
  },
  {
    title: 'Safe placement',
    text: 'Burn on a heat-safe surface away from drafts and flammables.',
  },
]

export const blogPosts = [
  {
    title: 'How to choose the perfect gift candle',
    image: img18,
    to: '#',
  },
  {
    title: 'Scent pairing ideas for every room',
    image: img10,
    to: '#',
  },
  {
    title: 'Candle care for a longer, cleaner burn',
    image: img43,
    to: '#',
  },
]

export const faqs = [
  {
    question: 'When will my delivery arrive?',
    answer:
      'Orders are typically delivered within 2–5 working days across Pakistan, depending on your city.',
  },
  {
    question: 'Do you offer Cash on Delivery?',
    answer: 'Yes. Cash on Delivery is available nationwide for eligible orders.',
  },
  {
    question: 'Can I personalize a candle or gift set?',
    answer:
      'Yes. Many cake candles and gift sets can be customized. Share your request at checkout or contact us.',
  },
  {
    question: 'What if my candle arrives damaged?',
    answer:
      'Contact us with photos within 48 hours and we will arrange a replacement or refund.',
  },
]

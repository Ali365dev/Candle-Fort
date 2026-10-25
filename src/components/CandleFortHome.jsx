import React from "react";

const IMG = {
  hero: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=2200&q=90",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1?auto=format&fit=crop&w=900&q=85",
  signature: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=85",
  gift: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
  scented: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  decorative: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=85",
  giftBanner: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=2000&q=90",
  berry: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&w=900&q=85",
  teddy: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  floral: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=85",
  luxury: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
  story: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1400&q=90",
  blog1: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=85",
  blog2: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
  blog3: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  blog4: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=85",
};

function Icon({ name, size = 19, className = "" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", className };
  const paths = {
    truck: <><path d="M3 6h11v11H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.7"/><circle cx="17.5" cy="19" r="1.7"/></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M2 6h20v3H2zM12 6v15M12 6H7.8a2.3 2.3 0 1 1 2.3-2.3C10.1 5 12 6 12 6Zm0 0h4.2a2.3 2.3 0 1 0-2.3-2.3C13.9 5 12 6 12 6Z"/></>,
    heart: <path d="M20.8 8.7c0 5.1-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/>,
    search: <><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 4.5 4.5"/></>,
    user: <><circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5C17.3 1.4 16.2 1.3 15 1.3c-3.3 0-5 2-5 5.2V9H7v4h3v8z"/>,
    arrow: <><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M6.5 3.5 9 3l2 4-2 1.5c1 2.2 2.8 4 5 5L15.5 12l4 2-.5 2.5c-.3 1.5-1.7 2.5-3.2 2.2C9.7 17.3 6.7 14.3 4.8 8.2 4.4 6.7 5 4.2 6.5 3.5Z"/>,
  };
  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}

const categories = [
  { title: "Cake Candles", sub: "Sweetly Decorative", image: IMG.cake },
  { title: "Signature Candles", sub: "Unique & Elegant", image: IMG.signature },
  { title: "Gift Sets", sub: "Perfect for Gifting", image: IMG.gift },
  { title: "Scented Candles", sub: "Calm & Cozy", image: IMG.scented },
  { title: "Decorative Candles", sub: "Style Your Space", image: IMG.decorative },
];
const products = [
  { name: "Strawberry Cake Candle", price: "Rs. 2,700", reviews: "24", image: IMG.berry },
  { name: "Teddy Bear Cake Candle", price: "Rs. 2,800", reviews: "18", image: IMG.teddy },
  { name: "Floral Scented Candle", price: "Rs. 1,900", reviews: "22", image: IMG.floral },
  { name: "Luxury Gift Set", price: "Rs. 7,200", reviews: "15", image: IMG.luxury },
  { name: "Dreamy Unicorn Candle", price: "Rs. 2,900", reviews: "12", image: IMG.cake },
];
const posts = [
  { title: "The Benefits of Scented Candles for Your Home", date: "Apr 12, 2024", time: "5 min read", image: IMG.blog1 },
  { title: "Perfect Candle Gifts for Every Occasion", date: "Apr 8, 2024", time: "4 min read", image: IMG.blog2 },
  { title: "How to Care for Your Cake Candles", date: "Mar 30, 2024", time: "3 min read", image: IMG.blog3 },
  { title: "Best Fragrances for a Relaxing Home", date: "Mar 28, 2024", time: "4 min read", image: IMG.blog4 },
];

function SectionHeading({ eyebrow, title, link }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div>{eyebrow && <p className="mb-1 text-[9px] font-bold uppercase tracking-[.28em] text-[#795b83]">{eyebrow}</p>}<h2 className="font-serif text-2xl leading-tight tracking-[-.025em] text-[#321b39] sm:text-3xl">{title}</h2></div>{link && <a href="#shop" className="hidden items-center gap-2 whitespace-nowrap text-[11px] font-semibold text-[#57356d] transition hover:text-[#9b6bc0] sm:flex">{link}<Icon name="arrow" size={14}/></a>}</div>;
}

function ProductCard({ product }) {
  return <article className="group overflow-hidden rounded-[3px] border border-[#e6dfe3] bg-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(49,24,56,.10)]"><div className="relative aspect-[1.06/1] overflow-hidden bg-[#eee5e7]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy"/><button aria-label="Add to wishlist" className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#5a3a66] transition hover:bg-[#4c2861] hover:text-white"><Icon name="heart" size={16}/></button></div><div className="p-3"><h3 className="truncate text-[11px] font-semibold text-[#38283b]">{product.name}</h3><div className="mt-1 flex items-center gap-1 text-[10px] text-[#d88a32]" aria-label="5 out of 5 stars">★★★★★ <span className="text-[9px] text-[#8b808b]">({product.reviews})</span></div><p className="mt-1.5 text-[12px] font-bold text-[#291d30]">{product.price}</p><div className="mt-2 flex items-center gap-2"><button className="flex-1 rounded-[3px] bg-[#593373] px-2 py-2 text-[10px] font-semibold text-white transition hover:bg-[#3d204d]">Add to Cart</button><button aria-label="Save product" className="px-1 text-[#67467a] hover:text-[#a37abb]"><Icon name="heart" size={17}/></button></div></div></article>;
}

export default function CandleFortHome() {
  return <div className="min-h-screen bg-[#fbf8f3] font-sans text-[#34283a] antialiased selection:bg-[#d8c3e0]">
    {/* Announcement bar */}
    <div className="bg-[#351d3c] text-[#fffaf7]"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-[9px] tracking-wide sm:px-8 lg:px-12"><div className="flex flex-wrap items-center gap-3 sm:gap-5"><span className="inline-flex items-center gap-1.5"><Icon name="truck" size={12}/>Free Delivery Across Pakistan</span><span className="hidden text-white/40 sm:inline">|</span><span>Cash on Delivery Available</span></div><div className="flex items-center gap-3"><a href="#track" className="hover:text-[#d8b7e7]">Track Your Order</a><span className="text-white/40">|</span><a href="#social" aria-label="Facebook"><Icon name="facebook" size={12}/></a><a href="#social" aria-label="Instagram"><Icon name="instagram" size={12}/></a><span className="hidden sm:inline">♪</span></div></div></div>

    {/* Header */}
    <header className="sticky top-0 z-40 border-b border-[#e9e0e4] bg-[#fffdf9]/95 backdrop-blur-md"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12"><a href="#home" className="flex shrink-0 items-center gap-2.5"><span className="grid h-11 w-11 place-items-center rounded-full border border-[#9d80a8] bg-[#3a2042] text-[#f8eee4] shadow-sm sm:h-[52px] sm:w-[52px]"><svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M24 40V17M24 28C10 28 9 16 9 16s12-1 15 12ZM24 24C38 24 39 12 39 12S27 11 24 24ZM24 18C14 15 17 6 24 4c7 2 10 11 0 14ZM12 39h24M17 34l-5 5M31 34l5 5"/></svg></span><span className="font-serif text-lg tracking-[-.04em] text-[#321d3b] sm:text-xl">Candle Fort</span></a>
      <nav className="hidden items-center gap-5 text-[11px] text-[#46394a] lg:flex xl:gap-7"><a className="border-b border-[#6a3c80] pb-1 font-semibold text-[#56306b]" href="#home">Home</a><a className="hover:text-[#70468a]" href="#shop">Shop</a><a className="hover:text-[#70468a]" href="#categories">Cake Candles</a><a className="hover:text-[#70468a]" href="#categories">Signature Candles</a><a className="hover:text-[#70468a]" href="#collections">Gift Sets</a><a className="hover:text-[#70468a]" href="#story">About Us</a><a className="hover:text-[#70468a]" href="#blog">Blog</a><a className="hover:text-[#70468a]" href="#footer">Contact</a></nav>
      <div className="flex shrink-0 items-center gap-3 text-[#3c2a43] sm:gap-5"><button aria-label="Search" className="hover:text-[#8e62a5]"><Icon name="search" size={19}/></button><button aria-label="Account" className="hidden hover:text-[#8e62a5] sm:block"><Icon name="user" size={18}/></button><button aria-label="Wishlist" className="hover:text-[#8e62a5]"><Icon name="heart" size={19}/></button><button aria-label="Shopping bag" className="relative hover:text-[#8e62a5]"><Icon name="bag" size={19}/><span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#593373] text-[9px] text-white">0</span></button><button aria-label="Open menu" className="text-xl lg:hidden">☰</button></div>
    </div></header>

    <main>
      {/* Hero */}
      <section id="home" className="relative isolate min-h-[330px] overflow-hidden bg-[#29152c] sm:min-h-[380px] lg:min-h-[430px]"><img src={IMG.hero} alt="Warmly lit handcrafted candles surrounded by flowers" className="absolute inset-0 -z-20 h-full w-full object-cover object-center"/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#251126]/95 via-[#321a31]/75 to-[#321a31]/5"/><div className="mx-auto flex min-h-[330px] max-w-[1440px] items-center px-6 py-12 sm:min-h-[380px] sm:px-12 lg:min-h-[430px] lg:px-16"><div className="max-w-[420px] text-[#fffaf6]"><p className="mb-4 text-[9px] font-semibold uppercase tracking-[.3em] text-[#e4cde8] sm:text-[10px]">Handcrafted Candles &amp; Gift Sets</p><h1 className="font-serif text-4xl leading-[.98] tracking-[-.04em] sm:text-5xl lg:text-[58px]">Light Up Your<br/>Moments</h1><p className="mt-4 max-w-[310px] text-[12px] leading-[1.75] text-white/85 sm:text-[13px]">From beautifully crafted candles to luxurious scented gift sets — find the perfect piece to make every moment more special.</p><a href="#shop" className="mt-6 inline-flex items-center gap-3 rounded-[3px] bg-[#8751b0] px-5 py-3 text-[11px] font-semibold text-white shadow-lg transition hover:bg-[#a06ac6]">Shop Now <Icon name="arrow" size={15}/></a></div></div></section>

      {/* Trust strip */}
      <section className="border-b border-[#eee6e2] bg-[#fffdf9]"><div className="mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-[#e3d9df] px-4 py-4 sm:grid-cols-4 sm:px-8 lg:px-12">{[{icon:"truck",title:"Free Delivery",sub:"Across Pakistan"},{icon:"shield",title:"Secure Payments",sub:"Cash on Delivery & Online"},{icon:"gift",title:"Premium Quality",sub:"Handcrafted with Care"},{icon:"heart",title:"Thoughtful Gifting",sub:"For Every Occasion"}].map(item=><div key={item.title} className="flex items-center justify-center gap-3 px-2 py-2 sm:gap-3"><span className="text-[#5b5260]"><Icon name={item.icon} size={24}/></span><div><p className="text-[10px] font-semibold text-[#443649] sm:text-[11px]">{item.title}</p><p className="mt-0.5 text-[9px] text-[#877c88]">{item.sub}</p></div></div>)}</div></section>

      <div className="mx-auto max-w-[1440px] px-4 py-9 sm:px-8 sm:py-12 lg:px-12">
        {/* Categories */}
        <section id="categories" className="mb-7 sm:mb-8"><SectionHeading eyebrow="Shop by category" title="Find Your Perfect Candle" link="View All Categories"/><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">{categories.map((cat,i)=><a key={cat.title} href="#shop" className={`group overflow-hidden rounded-[3px] border border-[#e4d9de] bg-white/60 transition hover:-translate-y-1 hover:shadow-lg ${i===4?"col-span-2 sm:col-span-1":""}`}><div className="aspect-[1.3/1] overflow-hidden bg-[#eee4e2]"><img src={cat.image} alt={cat.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></div><div className="p-3"><h3 className="font-serif text-[13px] text-[#38233e] sm:text-[14px]">{cat.title}</h3><p className="mt-1 flex items-center gap-1 text-[10px] text-[#857785]">{cat.sub}<span className="text-[#795a8b]">→</span></p></div></a>)}</div></section>

        {/* Gift banner */}
        <section id="collections" className="relative mb-8 min-h-[180px] overflow-hidden rounded-[3px] bg-[#321d37] sm:min-h-[205px]"><img src={IMG.giftBanner} alt="Candle gift box collection" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-[#2c172e]/95 via-[#351b38]/75 to-transparent"/><div className="relative flex min-h-[180px] items-center px-6 py-7 text-white sm:min-h-[205px] sm:px-9"><div className="max-w-[390px]"><p className="mb-2 text-[8px] font-bold uppercase tracking-[.3em] text-[#e4c8e9]">Featured Collection</p><h2 className="font-serif text-3xl leading-tight sm:text-4xl">Elegant Gift Box Candles</h2><p className="mt-2 max-w-[315px] text-[11px] leading-relaxed text-white/85">A beautifully curated gift box featuring our signature candles, perfect for birthdays, anniversaries, or just because.</p><a href="#shop" className="mt-4 inline-flex items-center gap-2 rounded-[3px] bg-[#8751b0] px-4 py-2.5 text-[10px] font-semibold transition hover:bg-[#a06ac6]">Shop Gift Box Candles <Icon name="arrow" size={13}/></a></div></div></section>

        {/* Products */}
        <section id="shop" className="mb-8"><SectionHeading eyebrow="Bestsellers" title="Our Most Loved Candles" link="View All Products"/><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">{products.map(product=><ProductCard key={product.name} product={product}/>)}</div></section>

        {/* Story */}
        <section id="story" className="mb-8 grid overflow-hidden rounded-[3px] border border-[#eee3e0] bg-[#f2e9e5] md:grid-cols-2"><div className="min-h-[210px] overflow-hidden sm:min-h-[260px]"><img src={IMG.story} alt="Candle Fort handcrafted candles" loading="lazy" className="h-full w-full object-cover"/></div><div className="flex items-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14"><div className="max-w-[400px]"><p className="mb-2 text-[9px] font-bold uppercase tracking-[.28em] text-[#795b83]">Our Story</p><h2 className="font-serif text-3xl leading-tight text-[#321d39] sm:text-4xl">More Than Just Candles</h2><p className="mt-3 text-[12px] leading-[1.9] text-[#746774]">At Candle Fort, we believe that the little things can make life feel extraordinary. Our candles are handcrafted with care, using premium ingredients and timeless designs to help you create beautiful moments, every day.</p><a href="#footer" className="mt-5 inline-flex items-center gap-2 border-b border-[#80608d] pb-1 text-[11px] font-semibold text-[#4c2e5c] hover:text-[#9464ad]">Learn More <Icon name="arrow" size={13}/></a></div></div></section>

        {/* Blog */}
        <section id="blog" className="mb-2"><SectionHeading eyebrow="From our blog" title="Candle Tips, Gifting Ideas & More" link="View All Posts"/><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">{posts.map(post=><article key={post.title} className="group overflow-hidden rounded-[3px] border border-[#e7dfe1] bg-white/70 transition hover:-translate-y-1 hover:shadow-md"><a href="#blog" className="block aspect-[1.8/1] overflow-hidden bg-[#eee4e2]"><img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></a><div className="p-3.5"><a href="#blog" className="font-serif text-[14px] leading-snug text-[#39243e] hover:text-[#8355a0]">{post.title}</a><div className="mt-2 flex items-center gap-2 text-[9px] text-[#968b96]"><span>{post.date}</span><span>·</span><span>{post.time}</span></div></div></article>)}</div></section>
      </div>
    </main>

    {/* Newsletter */}
    <section className="relative overflow-hidden border-y border-[#6b4c73] bg-[#3a2042] text-white"><div className="absolute inset-0 opacity-20" style={{backgroundImage:`url(${IMG.blog4})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div className="relative mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><div className="flex items-center gap-4"><Icon name="mail" size={29} className="text-[#e5cfe9]"/><div><h2 className="font-serif text-xl">Join Our Newsletter</h2><p className="mt-1 text-[10px] text-white/75">Be the first to know about new arrivals, exclusive offers and more.</p></div></div><form className="flex w-full max-w-[420px]" onSubmit={e=>e.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Enter your email address" className="min-w-0 flex-1 rounded-l-[3px] border border-white/30 bg-white px-4 py-3 text-[11px] text-[#38263e] outline-none placeholder:text-[#a89daa] focus:ring-2 focus:ring-[#b48acb]"/><button className="rounded-r-[3px] bg-[#8751b0] px-5 text-[10px] font-semibold transition hover:bg-[#a06ac6]">Subscribe</button></form></div></section>

    {/* Footer */}
    <footer id="footer" className="bg-[#28152f] text-white/80"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr] lg:gap-10 lg:px-12 lg:py-12"><div className="col-span-2 sm:col-span-3 lg:col-span-1"><a href="#home" className="mb-4 flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-full border border-[#a98ab2] text-[#f5eaf5]"><svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M24 40V17M24 28C10 28 9 16 9 16s12-1 15 12ZM24 24C38 24 39 12 39 12S27 11 24 24ZM24 18C14 15 17 6 24 4c7 2 10 11 0 14ZM12 39h24"/></svg></span><span className="font-serif text-xl text-white">Candle Fort</span></a><p className="max-w-[260px] text-[10px] leading-[1.9] text-white/65">Handcrafted Candles &amp; Gift Sets. Creating beautiful moments, one candle at a time.</p><div id="social" className="mt-4 flex items-center gap-3 text-white/80"><a href="#social" aria-label="Instagram" className="hover:text-white"><Icon name="instagram" size={16}/></a><a href="#social" aria-label="Facebook" className="hover:text-white"><Icon name="facebook" size={15}/></a><a href="#social" aria-label="TikTok" className="text-base hover:text-white">♪</a></div></div><div><h3 className="mb-4 text-[11px] font-semibold text-white">Quick Links</h3><ul className="space-y-2 text-[10px] text-white/65"><li><a href="#home" className="hover:text-white">Home</a></li><li><a href="#shop" className="hover:text-white">Shop</a></li><li><a href="#story" className="hover:text-white">About Us</a></li><li><a href="#blog" className="hover:text-white">Blog</a></li><li><a href="#footer" className="hover:text-white">Contact</a></li></ul></div><div><h3 className="mb-4 text-[11px] font-semibold text-white">Shop Categories</h3><ul className="space-y-2 text-[10px] text-white/65"><li><a href="#categories" className="hover:text-white">Cake Candles</a></li><li><a href="#categories" className="hover:text-white">Signature Candles</a></li><li><a href="#categories" className="hover:text-white">Gift Sets</a></li><li><a href="#categories" className="hover:text-white">Scented Candles</a></li><li><a href="#categories" className="hover:text-white">Decorative Candles</a></li></ul></div><div><h3 className="mb-4 text-[11px] font-semibold text-white">Customer Care</h3><ul className="space-y-2 text-[10px] text-white/65"><li><a href="#track" className="hover:text-white">Track Your Order</a></li><li><a href="#footer" className="hover:text-white">Shipping Policy</a></li><li><a href="#footer" className="hover:text-white">Returns &amp; Refund</a></li><li><a href="#footer" className="hover:text-white">FAQs</a></li><li><a href="#footer" className="hover:text-white">Contact Us</a></li></ul></div><div><h3 className="mb-4 text-[11px] font-semibold text-white">Get in Touch</h3><ul className="space-y-3 text-[10px] text-white/65"><li className="flex items-start gap-2"><span className="mt-0.5"><Icon name="truck" size={13}/></span><span>Lahore, Pakistan</span></li><li className="flex items-start gap-2"><Icon name="phone" size={13}/><span>+92 300 1234567</span></li><li className="flex items-start gap-2"><Icon name="mail" size={13}/><span>hello@candlefort.pk</span></li></ul><div className="mt-4 flex flex-wrap gap-1.5 text-[8px] font-bold"><span className="rounded bg-white px-2 py-1 text-[#183a83]">VISA</span><span className="rounded bg-white px-2 py-1 text-[#b32636]">Mastercard</span><span className="rounded bg-white px-2 py-1 text-[#1b7b51]">COD</span></div></div></div><div className="border-t border-white/10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-5 py-4 text-[9px] text-white/50 sm:flex-row sm:px-8 lg:px-12"><p>© 2024 Candle Fort. All rights reserved.</p><p>Crafted with ♡ in Pakistan</p></div></div></footer>
  </div>;
}

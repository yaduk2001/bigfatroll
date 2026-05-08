'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Menu as MenuIcon, X, ChevronLeft, ChevronRight, Flame, Star, Clock, Phone } from 'lucide-react';
import Image from 'next/image';

const ROLLS = [
  { id:1, name:'Big Fat Crispy Roll', desc:'Our signature crispy bite with indulgent sauces and fresh veggies.', price:'₹249', tag:'🔥 Bestseller', image:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800' },
  { id:2, name:'Peri-Peri Chicken Roll', desc:'Spicy, bold, and packed with flavor. A true crowd favorite.', price:'₹229', tag:'🌶️ Spicy', image:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800' },
  { id:3, name:'Creamy Paneer Tikka Wrap', desc:'Soft paneer marinated in rich spices, wrapped to perfection.', price:'₹199', tag:'🌿 Veg', image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800' },
  { id:4, name:'Classic Falafel Roll', desc:'Mediterranean style wrap with crispy falafels and hummus.', price:'₹179', tag:'🌿 Veg', image:'https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=800' },
  { id:5, name:'Spicy Mushroom Roll', desc:'Sautéed mushrooms in our secret fiery sauce.', price:'₹189', tag:'🌿 Veg', image:'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800' },
];
const BURGERS = [
  { id:6, name:'Double Smash Burger', desc:'Double patty, melted cheese, and our secret indulgent sauce.', price:'₹299', tag:'⭐ Premium', image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800' },
  { id:7, name:'Crispy Chicken Burger', desc:'Golden fried chicken breast with spicy mayo.', price:'₹249', tag:'🔥 Popular', image:'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?q=80&w=800' },
  { id:8, name:'Loaded Fries', desc:'Crispy fries topped with liquid cheese and jalapenos.', price:'₹149', tag:'🧀 Cheesy', image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800' },
  { id:9, name:'Onion Rings', desc:'Golden crispy onion rings with our signature dip.', price:'₹119', tag:'🥇 Classic', image:'https://images.unsplash.com/photo-1639024470080-6bc1508db832?q=80&w=800' },
];
const DRINKS = [
  { id:10, name:'Iced Chocolate', desc:'Rich chocolate blended with cold milk and ice.', price:'₹199', tag:'❄️ Chilled', image:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800' },
  { id:11, name:'Berry Blast Mocktail', desc:'Refreshing mixed berries with a hint of mint.', price:'₹149', tag:'🍓 Fruity', image:'https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=800' },
  { id:12, name:'Virgin Mojito', desc:'Classic mint, lime, and soda cooler.', price:'₹129', tag:'🍃 Fresh', image:'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800' },
  { id:13, name:'Mango Thickshake', desc:'Rich mango puree and premium ice cream.', price:'₹219', tag:'🥭 Tropical', image:'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800' },
];

function Slider({ items, dark=true }: { items: typeof ROLLS; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group/slider w-full">
      <button onClick={() => scroll(-1)} className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={() => scroll(1)} className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}>
        <ChevronRight className="w-6 h-6" />
      </button>
      <div ref={ref} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {[...items, ...items].map((item, i) => (
          <motion.div key={`${item.id}-${i}`} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:false, amount:0.2 }} transition={{ duration:0.5, delay: (i % items.length)*0.1 }}
            className={`min-w-[85vw] sm:min-w-[45vw] md:min-w-[30vw] lg:min-w-[22vw] snap-center shrink-0 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 ${dark ? 'glass-card hover:shadow-[0_20px_60px_rgba(255,74,28,0.15)]' : 'glass-card-light hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'}`}
          >
            <div className="relative h-52 overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-t from-black/60 to-transparent' : 'bg-gradient-to-t from-white/60 to-transparent'}`} />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${dark ? 'bg-black/60 text-white backdrop-blur-sm' : 'bg-white/80 text-black backdrop-blur-sm'}`}>{item.tag}</span>
            </div>
            <div className="p-5">
              <h4 className={`text-lg font-bold mb-1 ${dark ? 'text-white' : 'text-stone-900'}`}>{item.name}</h4>
              <p className={`text-sm mb-4 leading-relaxed ${dark ? 'text-stone-400' : 'text-stone-600'}`}>{item.desc}</p>
              <div className="flex justify-between items-center">
                <span className={`font-black text-xl ${dark ? 'text-[#FF4A1C]' : 'text-[#C13A10]'}`}>{item.price}</span>
                <button className="bg-[#FF4A1C] hover:bg-[#FFB01F] text-white hover:text-black px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95">Add +</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FloatingOrb({ className }: { className?: string }) {
  return <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const burgerRef = useRef(null);
  const drinksRef = useRef(null);
  const locationsRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: burgerProgress } = useScroll({ target: burgerRef, offset: ["start end", "end start"] });
  const burgerParallax = useTransform(burgerProgress, [0, 1], [80, -80]);
  const burgerScale = useTransform(burgerProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  const { scrollYProgress: drinksProgress } = useScroll({ target: drinksRef, offset: ["start end", "end start"] });
  const drinksParallax = useTransform(drinksProgress, [0, 1], [-60, 60]);
  const drinksRotate = useTransform(drinksProgress, [0, 1], [-3, 3]);

  const { scrollYProgress: locProgress } = useScroll({ target: locationsRef, offset: ["start end", "end start"] });
  const locScale = useTransform(locProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.15 } } };
  const fadeUp = { hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:0.6 } } };

  // Bi-directional animation variants with spring physics for smoother, eye-catching motion
  const springTransition = { type: 'spring' as const, stiffness: 60, damping: 15, mass: 1 };
  const slideFromLeft = { initial:{ opacity:0, x:-80, scale:0.95 }, whileInView:{ opacity:1, x:0, scale:1 }, transition: springTransition };
  const slideFromRight = { initial:{ opacity:0, x:80, scale:0.95 }, whileInView:{ opacity:1, x:0, scale:1 }, transition: springTransition };
  const scaleUp = { initial:{ opacity:0, scale:0.85, y:40 }, whileInView:{ opacity:1, scale:1, y:0 }, transition: springTransition };
  const rotateIn = { initial:{ opacity:0, rotate:-8, y:40 }, whileInView:{ opacity:1, rotate:0, y:0 }, transition: springTransition };
  const vp = { once:false, amount:0.1, margin: "0px 0px -50px 0px" };

  return (
    <div className="min-h-screen font-sans bg-[#0A0908] text-white selection:bg-[#FF4A1C] selection:text-white overflow-x-hidden">

      {/* NAV */}
      <motion.nav initial={{ y:-100 }} animate={{ y:0 }} transition={{ duration:0.6 }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <motion.div whileHover={{ scale:1.05 }} className="flex items-center gap-1 cursor-pointer">
            <Flame className="w-7 h-7 text-[#FF4A1C]" />
            <span className="text-2xl font-black tracking-tighter"><span className="text-[#FF4A1C]">BIG FAT</span> ROLL</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-[0.2em] text-stone-300">
            {['rolls','burgers','drinks','locations'].map(s => (
              <motion.a key={s} href={`#${s}`} whileHover={{ y:-2, color:'#FF4A1C' }} className="transition-colors relative group">
                {s}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF4A1C] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
        {mobileOpen && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="md:hidden bg-black/95 backdrop-blur-xl py-8 px-6 flex flex-col gap-6 border-t border-white/5">
            {['rolls','burgers','drinks','locations'].map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)} className="text-2xl font-bold capitalize hover:text-[#FF4A1C] transition-colors">{s}</a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* HERO ROLLS */}
      <section id="rolls" ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <FloatingOrb className="w-[600px] h-[600px] bg-[#FF4A1C] top-[-200px] right-[-200px]" />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#FFB01F] bottom-[-100px] left-[-100px]" />
        <div className="absolute right-0 top-0 w-[55%] h-full bg-gradient-to-l from-[#FF4A1C]/20 to-transparent z-0 hidden md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,74,28,0.08),transparent_60%)]" />
        {/* Decorative spinning rings */}
        <div className="absolute top-[15%] left-[5%] w-[200px] h-[200px] rounded-full border border-dashed border-[#FF4A1C]/10 animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-[10%] right-[8%] w-[150px] h-[150px] rounded-full border border-dashed border-[#FFB01F]/15 animate-spin-slow pointer-events-none" style={{ animationDirection:'reverse' }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center py-16">
          {/* Text slides from LEFT */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-2 bg-[#FF4A1C]/10 border border-[#FF4A1C]/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Flame className="w-4 h-4 text-[#FF4A1C]" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#FF4A1C]">Signature Rolls</span>
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-[6rem] font-black leading-[0.85] tracking-tight mb-8">
              bolder,<br/><span className="text-[#FF4A1C]">better,</span><br/>tastier!
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-stone-400 mb-8 max-w-md leading-relaxed">
              Don't snooze — Order now and get it hot & fresh. Every roll crafted with premium ingredients.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-10">
              <div className="animate-pulse-glow rounded-2xl px-8 py-4 bg-gradient-to-r from-[#FF4A1C] to-[#FFB01F]">
                <span className="text-4xl font-black text-white">₹249</span>
                <span className="text-white/80 text-sm ml-2">Only</span>
              </div>
              <motion.a href="#burgers" whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                className="px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-[#FF4A1C] font-bold transition-all hover:bg-[#FF4A1C]/10">
                Full Menu ↓
              </motion.a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-8 text-stone-500 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 20 min delivery</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#FFB01F]" /> 4.8 rating</span>
            </motion.div>
          </motion.div>

          {/* Image slides from RIGHT (reverse) */}
          <motion.div initial={{ opacity:0, x:100, rotate:10 }} animate={{ opacity:1, x:0, rotate:0 }} transition={{ duration:1, ease:'easeOut', delay:0.3 }}
            className="relative h-[400px] md:h-[550px] w-full">
            <div className="absolute inset-0 bg-[#FF4A1C]/20 rounded-full blur-[80px] animate-pulse" />
            <div className="relative w-full h-full animate-float">
              <Image src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000" alt="Signature Roll" fill
                className="object-cover rounded-[40%] border-4 border-white/10 shadow-2xl" priority />
            </div>
            <motion.div animate={{ rotate:360 }} transition={{ duration:20, repeat:Infinity, ease:'linear' }}
              className="absolute -top-6 -left-6 w-28 h-28 rounded-full border-2 border-dashed border-[#FFB01F]/30 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FFB01F] rounded-full flex items-center justify-center animate-float-delay shadow-xl">
              <span className="text-black font-black text-xs text-center leading-tight">ORDER<br/>NOW</span>
            </div>
          </motion.div>
        </div>

        <div className="w-full px-4 relative z-10 pb-12">
          <Slider items={ROLLS} />
        </div>
      </section>

      {/* BURGERS */}
      <section id="burgers" ref={burgerRef} className="relative min-h-screen flex flex-col justify-center bg-[#0D0D0D] pt-16 overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-[#FFB01F] top-[10%] left-[-150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,176,31,0.05),transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#FF4A1C] to-transparent" />
        {/* Reverse spinning rings */}
        <div className="absolute top-[20%] right-[5%] w-[180px] h-[180px] rounded-full border border-dashed border-[#FFB01F]/10 animate-spin-slow pointer-events-none" style={{ animationDirection:'reverse' }} />
        <div className="absolute bottom-[15%] left-[3%] w-[120px] h-[120px] rounded-full border border-dashed border-[#FF4A1C]/10 animate-spin-slow pointer-events-none" />

        <motion.div style={{ scale: burgerScale }} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full py-16">
          {/* Title slides from RIGHT (reverse) */}
          <motion.div {...slideFromRight} viewport={vp} className="text-center mb-12">
            <p className="text-[#FFB01F] text-sm font-bold uppercase tracking-[0.3em] mb-4">Handcrafted Perfection</p>
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#E8D8B0] to-[#FFB01F] bg-clip-text text-transparent">
              The Ultimate<br/>Gourmet Smash
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-lg">Double patties, melted artisan cheese, and our secret indulgent sauces.</p>
          </motion.div>

          {/* Image scales up from center */}
          <motion.div {...scaleUp} viewport={vp}
            className="relative h-[300px] md:h-[450px] w-full max-w-4xl mx-auto mb-16 rounded-[3rem] overflow-hidden group">
            <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200" alt="Double Smash Burger" fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
            <div className="absolute inset-0 animate-shimmer rounded-[3rem]" />
            {/* Text slides from LEFT (reverse of title) */}
            <motion.div {...slideFromLeft} viewport={vp}
              className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <p className="text-3xl md:text-4xl font-black text-white">Double Smash</p>
                <p className="text-stone-300">The one that started it all</p>
              </div>
              <span className="text-4xl font-black text-[#FFB01F]">₹299</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="w-full px-4 relative z-10 pb-12">
          <Slider items={BURGERS} />
        </div>
      </section>

      {/* DRINKS */}
      <section id="drinks" ref={drinksRef} className="relative min-h-screen flex flex-col justify-center bg-[#F5EDD6] text-[#2A1F14] pt-16 overflow-hidden">
        <motion.h2 initial={{ opacity:0 }} whileInView={{ opacity:0.06 }} viewport={vp}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black uppercase whitespace-nowrap z-0 select-none tracking-tighter text-[#2A1F14]">
          DRINKS
        </motion.h2>
        <FloatingOrb className="w-[400px] h-[400px] bg-[#FF4A1C] bottom-[-100px] right-[-100px] opacity-10" />
        {/* Reverse spinning rings */}
        <div className="absolute top-[12%] left-[8%] w-[160px] h-[160px] rounded-full border border-dashed border-[#C13A10]/10 animate-spin-slow pointer-events-none" style={{ animationDirection:'reverse' }} />
        <div className="absolute bottom-[20%] right-[6%] w-[200px] h-[200px] rounded-full border border-dashed border-[#FFB01F]/10 animate-spin-slow pointer-events-none" />

        <motion.div style={{ y: drinksParallax, rotate: drinksRotate }} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text slides from RIGHT (reverse of rolls hero) */}
            <motion.div {...slideFromRight} viewport={vp}>
              <p className="text-[#C13A10] text-sm font-bold uppercase tracking-[0.3em] mb-4">New Arrivals</p>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6 text-[#2A1F14]">
                Refreshing<br/><span className="text-[#C13A10]">Thickshakes</span>
              </h2>
              <p className="text-lg text-[#7a604f] mb-8 max-w-md">Perfectly blended to complement your signature roll. Made with real fruits and premium ice cream.</p>
              <div className="flex flex-wrap gap-4 text-sm text-[#7a604f]">
                <motion.span whileHover={{ scale:1.05 }} className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full cursor-default"><Star className="w-4 h-4 text-[#FFB01F]" /> 100% Natural</motion.span>
                <motion.span whileHover={{ scale:1.05 }} className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full cursor-default">❄️ Ice Cold</motion.span>
                <motion.span whileHover={{ scale:1.05 }} className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full cursor-default">🥤 Handcrafted</motion.span>
              </div>
            </motion.div>

            {/* Image slides from LEFT (reverse of text) */}
            <motion.div {...rotateIn} viewport={vp}
              className="relative h-[400px] md:h-[500px] w-full">
              <div className="absolute inset-8 bg-[#C13A10]/10 rounded-full blur-[60px]" />
              <motion.div animate={{ rotate:-360 }} transition={{ duration:25, repeat:Infinity, ease:'linear' }}
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-dashed border-[#C13A10]/20 pointer-events-none" />
              <div className="relative w-full h-full animate-float">
                <Image src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000" alt="Iced Chocolate Drink" fill
                  className="object-cover rounded-[3rem] shadow-2xl border-4 border-white/50" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full px-4 relative z-10 pb-12">
          <Slider items={DRINKS} dark={false} />
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <div className="bg-[#FF4A1C] py-3 overflow-hidden relative">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-white font-black text-sm uppercase tracking-[0.3em] mx-8 flex items-center gap-3">
              <Flame className="w-4 h-4" /> BOLDER · BETTER · TASTIER <span className="text-white/50">★</span> NOW IN BANGALORE & MANGALORE
            </span>
          ))}
        </div>
      </div>

      {/* LOCATIONS — LIGHT WARM THEME */}
      <section id="locations" ref={locationsRef} className="py-28 bg-gradient-to-b from-[#FFF8EE] to-[#F5EAD8] relative overflow-hidden text-[#2A1F14]">
        {/* Decorative bg circles */}
        <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full border-2 border-[#FF4A1C]/10 animate-spin-slow" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full border-2 border-[#FFB01F]/10 animate-spin-slow" style={{ animationDirection:'reverse' }} />

        <motion.div style={{ scale: locScale }} className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:false, amount:0.2 }} variants={stagger} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-[#FF4A1C] text-sm font-bold uppercase tracking-[0.3em] mb-4">📍 Visit Us</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black leading-tight">
              Find Us <span className="bg-gradient-to-r from-[#FF4A1C] to-[#FFB01F] bg-clip-text text-transparent">Near You</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Bangalore — slides from LEFT */}
            <motion.div {...slideFromLeft} viewport={vp}
              className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-10 border border-[#FF4A1C]/10 shadow-[0_20px_60px_rgba(255,74,28,0.08)] hover:shadow-[0_30px_80px_rgba(255,74,28,0.15)] transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden text-center">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-4 border-dashed border-[#FF4A1C]/10 animate-spin-slow pointer-events-none" />
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF4A1C] to-[#FFB01F] flex items-center justify-center shadow-lg mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-black mb-3 group-hover:text-[#FF4A1C] transition-colors">Bangalore</h3>
              <p className="text-[#7a604f] text-lg">Multiple outlets across the city</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#B08050]">
                <Clock className="w-4 h-4" /> 10am – 11pm
              </div>
            </motion.div>

            {/* Mangalore — slides from RIGHT (reverse direction) */}
            <motion.div {...slideFromRight} viewport={vp}
              className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-10 border border-[#FFB01F]/10 shadow-[0_20px_60px_rgba(255,176,31,0.08)] hover:shadow-[0_30px_80px_rgba(255,176,31,0.15)] transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden text-center">
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-4 border-dashed border-[#FFB01F]/10 animate-spin-slow pointer-events-none" style={{ animationDirection:'reverse' }} />
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FFB01F] to-[#FF4A1C] flex items-center justify-center shadow-lg mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-black mb-3 group-hover:text-[#FFB01F] transition-colors">Mangalore</h3>
              <p className="text-[#7a604f] text-lg">Multiple outlets across the city</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#B08050]">
                <Clock className="w-4 h-4" /> 10am – 11pm
              </div>
            </motion.div>
          </div>

          {/* CTA buttons */}
          <motion.div {...scaleUp} viewport={vp}
            className="mt-16 flex justify-center gap-5 flex-wrap">
            <motion.a whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} href="tel:+919876543210"
              className="flex items-center gap-3 bg-gradient-to-r from-[#FF4A1C] to-[#FFB01F] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#FF4A1C]/20 hover:shadow-[#FF4A1C]/40 transition-shadow">
              <Phone className="w-5 h-5" /> Call Us Now
            </motion.a>
            <motion.a whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} href="#rolls"
              className="flex items-center gap-3 bg-[#2A1F14] text-white px-8 py-4 rounded-full font-bold hover:bg-[#3d2e1f] transition-colors">
              <Flame className="w-5 h-5 text-[#FF4A1C]" /> Order Now
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 bg-[#0A0908] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,74,28,0.05),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#FF4A1C]" />
              <span className="text-2xl font-black tracking-tighter"><span className="text-[#FF4A1C]">BIG FAT</span> ROLL</span>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-stone-500">
              {['rolls','burgers','drinks','locations'].map(s => (
                <a key={s} href={`#${s}`} className="hover:text-[#FF4A1C] transition-colors capitalize">{s}</a>
              ))}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-stone-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Big Fat Roll. All rights reserved.</p>
            <p className="text-stone-500">Bolder · Better · Tastier 🔥</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

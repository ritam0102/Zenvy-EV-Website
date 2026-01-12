"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Car, 
  Battery, 
  Zap, 
  ShieldCheck, 
  Leaf, 
  Wrench, 
  Star, 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Search,
  Filter,
  X,
  Sun,
  Moon,
  Menu,
  ChevronRight
} from "lucide-react";

const EV_CARS = [
  {
    id: 1,
    name: "Zenith",
    type: "SUV",
    price: 65,
    range: 520,
    battery: 82,
    charging: "35 mins (DC)",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
    brand: "Zenvy"
  },
  {
    id: 2,
    name: "Zivon",
    type: "Sedan",
    price: 40,
    range: 450,
    battery: 60,
    charging: "45 mins (DC)",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800",
    brand: "Zenvy"
  },
  {
    id: 3,
    name: "Zenix GT",
    type: "Sports Car",
    price: 90,
    range: 400,
    battery: 95,
    charging: "25 mins (DC)",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    brand: "Zenvy"
  },
  {
    id: 4,
    name: "Zix",
    type: "Hatchback",
    price: 25,
    range: 320,
    battery: 40,
    charging: "50 mins (DC)",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    brand: "Zenvy"
  },
  {
    id: 5,
    name: "Model S",
    type: "Sedan",
    price: 85,
    range: 650,
    battery: 100,
    charging: "30 mins (DC)",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=800",
    brand: "Tesla"
  },
  {
    id: 6,
    name: "Nexon EV",
    type: "SUV",
    price: 18,
    range: 312,
    battery: 30,
    charging: "60 mins (DC)",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    brand: "Tata"
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRange, setMinRange] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const filteredCars = useMemo(() => {
    return EV_CARS.filter(car => {
      const categoryMatch = selectedCategory === "All" || car.type === selectedCategory;
      const priceMatch = car.price <= maxPrice;
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
      const rangeMatch = car.range >= minRange;
      return categoryMatch && priceMatch && brandMatch && rangeMatch;
    });
  }, [selectedCategory, maxPrice, selectedBrands, minRange]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(100);
    setSelectedBrands([]);
    setMinRange(0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Zenvy EV Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl md:text-2xl font-bold tracking-tight">Zenvy EV</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#cars" className="hover:text-blue-600 transition-colors font-medium">Cars</a>
              <a href="#why-ev" className="hover:text-blue-600 transition-colors font-medium">Why EV</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors font-medium">Contact</a>
              
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-8">
                <button 
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                  Book Test Drive
                </button>
              </div>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900">Home</a>
              <a href="#cars" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900">Cars</a>
              <a href="#why-ev" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900">Why EV</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900">Contact</a>
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20">
                Book Test Drive
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero EV" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white py-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Drive the Future with <br />
            <span className="text-blue-500">Electric Power</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl text-slate-300 leading-relaxed">
            Experience the pinnacle of sustainable luxury and performance. Join the revolution with Zenvy EV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cars" className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all text-center active:scale-95">
              Explore Cars
            </a>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured EVs Section */}
      <section id="cars" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured EVs</h2>
              <p className="text-slate-600 dark:text-slate-400">Discover our range of high-performance electric vehicles.</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold shadow-sm"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>

              {/* Quick Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {['All', 'Sedan', 'SUV', 'Hatchback', 'Sports Car'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full border transition-all whitespace-nowrap font-medium text-sm ${
                      selectedCategory === cat 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterDrawerOpen && (
            <div className="fixed inset-0 z-[60] lg:hidden">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 p-6 shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="text-sm font-bold mb-4 block">Max Price: {maxPrice} Lakhs</label>
                    <input 
                      type="range" 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                      min="15" 
                      max="100" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>15L</span>
                      <span>100L</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold mb-4 block">Min Range: {minRange} km</label>
                    <input 
                      type="range" 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                      min="0" 
                      max="700" 
                      step="50"
                      value={minRange}
                      onChange={(e) => setMinRange(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0km</span>
                      <span>700km</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold mb-4 block">Brand</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Tesla', 'Tata', 'BYD', 'Zenvy'].map(brand => (
                        <button 
                          key={brand} 
                          onClick={() => toggleBrand(brand)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                            selectedBrands.includes(brand) 
                              ? "bg-blue-600 text-white border-blue-600" 
                              : "border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => { resetFilters(); setIsFilterDrawerOpen(false); }}
                    className="w-full py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-bold"
                  >
                    Reset All
                  </button>
                  <button 
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
                  <button 
                    onClick={resetFilters}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Reset
                  </button>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="text-sm font-medium mb-4 block">Max Price: {maxPrice} Lakhs</label>
                    <input 
                      type="range" 
                      className="w-full accent-blue-600" 
                      min="15" 
                      max="100" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>15L</span>
                      <span>100L</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-4 block">Min Range: {minRange} km</label>
                    <input 
                      type="range" 
                      className="w-full accent-blue-600" 
                      min="0" 
                      max="700" 
                      step="50"
                      value={minRange}
                      onChange={(e) => setMinRange(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0km</span>
                      <span>700km</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-4 block">Brand</label>
                    <div className="space-y-3">
                      {['Tesla', 'Tata', 'BYD', 'Zenvy'].map(brand => (
                        <label key={brand} className="flex items-center gap-3 text-sm cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="group-hover:text-blue-600 transition-colors">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Car Grid */}
            <div className="lg:col-span-3">
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
                  {filteredCars.map((car) => (
                    <div key={car.id} className="group bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100 dark:border-slate-800">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
                          {car.price} Lakhs
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">{car.type}</span>
                            <h3 className="text-2xl font-bold">{car.name}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 text-sm">{car.brand}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>{car.range} km Range</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Battery className="w-4 h-4 text-blue-500" />
                            <span>{car.battery} kWh</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Wrench className="w-4 h-4 text-blue-500" />
                            <span>{car.charging}</span>
                          </div>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-colors active:scale-95">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <Search className="w-12 h-12 text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2">No cars found</h3>
                  <p className="text-slate-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <button 
                    onClick={resetFilters}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EV Section */}
      <section id="why-ev" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose EV?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Switching to electric isn't just about the environment; it's about a better driving experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-8 rounded-[2rem] bg-blue-50 dark:bg-blue-900/20">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Zero Emissions</h3>
              <p className="text-slate-600 dark:text-slate-400">Reduce your carbon footprint and contribute to a cleaner, greener planet with every mile.</p>
            </div>
            <div className="text-center p-8 rounded-[2rem] bg-green-50 dark:bg-green-900/20">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Low Maintenance</h3>
              <p className="text-slate-600 dark:text-slate-400">Fewer moving parts means fewer trips to the mechanic and significantly lower service costs.</p>
            </div>
            <div className="text-center p-8 rounded-[2rem] bg-purple-50 dark:bg-purple-900/20">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fast Charging</h3>
              <p className="text-slate-600 dark:text-slate-400">Advanced battery technology allows for rapid charging, getting you back on the road in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">What Our Owners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-300 mb-6 italic">
                  "The Zenith SUV has completely changed how I think about driving. The instant torque and silent cabin make every commute a joy."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                    JD
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-slate-400">Zenith Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h2>
              <p className="text-slate-400 text-lg mb-8">
                Have questions about our EV lineup or want to schedule a personalized test drive? 
                Our team of experts is here to help you transition to the future of mobility.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Email Us</p>
                    <p className="text-lg font-semibold">zenvyev@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Call Us</p>
                    <p className="text-lg font-semibold">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Interested Model</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none">
                    <option className="bg-slate-900">Select a model</option>
                    <option className="bg-slate-900">Zenith (SUV)</option>
                    <option className="bg-slate-900">Zivon (Sedan)</option>
                    <option className="bg-slate-900">Zix (Hatchback)</option>
                    <option className="bg-slate-900">Zenix GT (Sports)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img src="/favicon.ico" alt="Zenvy EV Logo" className="w-8 h-8 object-contain" />
                <span className="text-2xl font-bold tracking-tight">Zenvy EV</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Leading the charge towards a sustainable future with innovative electric mobility solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all active:scale-95"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all active:scale-95"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all active:scale-95"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Charging Stations</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>zenvyev@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>123 Electric Ave, Silicon Valley, CA</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Zenvy EV. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

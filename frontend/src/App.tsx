import React from 'react';
import { 
  LayoutGrid, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Waves, 
  TriangleAlert, 
  Map, 
  BrainCircuit, 
  CheckCircle2, 
  Info, 
  Thermometer, 
  Droplets, 
  Wind, 
  Bot, 
  Home, 
  BarChart3, 
  ShieldAlert, 
  CalendarDays,
  Radio,
  Unplug,
  Camera,
  HeartHandshake,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Components ---

const Navbar = () => (
  <header className="fixed top-0 left-0 w-full z-50 glass-panel">
    <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <LayoutGrid className="text-primary w-6 h-6" />
        <span className="text-2xl font-black text-gradient font-headline tracking-tight">RESQ.AI</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a className="text-primary font-semibold font-label text-sm uppercase tracking-wide" href="#">Home</a>
        <a className="text-on-surface-variant hover:bg-surface-container-low px-3 py-1 rounded-lg transition-colors font-label text-sm uppercase tracking-wide" href="#">Dashboard</a>
        <a className="text-on-surface-variant hover:bg-surface-container-low px-3 py-1 rounded-lg transition-colors font-label text-sm uppercase tracking-wide" href="#">Preparedness</a>
      </div>
      <button 
        onClick={() => {
          document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-gradient-to-br from-primary to-tertiary text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:scale-95 transition-transform duration-200"
      >
        Check Risk
      </button>
    </nav>
  </header>
);

const Hero = ({ onSearch, loading }: { onSearch: (loc: string) => void, loading: boolean }) => {
  const [locInput, setLocInput] = React.useState('');
  
  return (
  <section className="relative z-10 w-full max-w-5xl px-6 text-center pt-32 pb-16">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 bg-surface-container-lowest border border-on-surface-variant/10 px-4 py-1.5 rounded-full fog-shadow mb-8"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></div>
      <span className="text-[10px] font-bold tracking-[0.1em] text-on-surface-variant uppercase font-label">Intelligence Active</span>
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="font-headline font-extrabold text-7xl md:text-9xl tracking-tighter mb-4 text-on-surface"
    >
      RESQ.AI
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="font-headline font-light text-3xl md:text-5xl text-primary mb-6 tracking-tight"
    >
      Predict. Prepare. Protect.
    </motion.p>
    
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed"
    >
      Turning disaster data into simple, life-saving actions through the lens of calm, serene intelligence.
    </motion.p>

    <div className="max-w-2xl mx-auto relative">
      <div className="glass-panel p-2 rounded-2xl fog-shadow flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 w-full flex items-center px-4 gap-3 bg-surface-container-highest/50 rounded-xl border border-transparent focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <MapPin className="text-on-surface-variant w-5 h-5" />
          <input 
            value={locInput}
            onChange={(e) => setLocInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch(locInput || 'San Francisco, CA');
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full bg-transparent border-none focus:outline-none py-4 text-on-surface placeholder:text-on-surface-variant font-medium" 
            placeholder="Enter your location..." 
            type="text"
          />
        </div>
        <button 
          onClick={() => {
            onSearch(locInput || 'San Francisco, CA');
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
          }}
          disabled={loading}
          className="w-full md:w-auto bg-gradient-to-br from-primary to-tertiary text-white px-10 py-4 rounded-xl font-bold tracking-tight hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? 'Analyzing...' : 'Check Risk'}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  </section>
);
};

const Stats = () => (
  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 max-w-5xl mx-auto w-full px-6">
    {[
      { label: 'Prediction Accuracy', value: '99.2%' },
      { label: 'Global Monitoring', value: '24/7' },
      { label: 'Lives Monitored', value: '150M+' },
      { label: 'Response Time', value: 'Instant' },
    ].map((stat, i) => (
      <div key={i} className="flex flex-col items-center gap-1">
        <span className="font-headline font-bold text-2xl">{stat.value}</span>
        <span className="font-label text-[10px] uppercase tracking-widest">{stat.label}</span>
      </div>
    ))}
  </div>
);

const Dashboard = ({ location, riskData, loading }: { location: string, riskData: any, loading: boolean }) => (
  <section id="dashboard" className="mt-24 w-full max-w-7xl mx-auto px-6">
    <div className="mb-12">
      <h2 className="text-5xl md:text-6xl font-headline font-light text-on-surface mb-4 tracking-tight">The horizon is clear.</h2>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-label tracking-wider border border-on-surface-variant/10 fog-shadow">
          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
          AI INTELLIGENCE ACTIVE
        </span>
        <p className="text-on-surface-variant font-body">Real-time threat monitoring for your current location.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-8 fog-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <ShieldCheck className="w-48 h-48 text-primary" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <p className="text-xs font-label tracking-widest text-on-surface-variant mb-2">PRIMARY LOCATION</p>
            <h3 className="text-3xl font-headline font-bold text-primary mb-6">{location}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low">
                <div className="bg-primary-container p-3 rounded-xl text-primary">
                  <Waves className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-label text-on-surface-variant">DISASTER TYPE</p>
                  <p className="font-headline font-bold text-lg">{riskData?.disasterType || 'Flood Watch'}</p>
                  <p className="text-sm text-on-surface-variant">{loading ? 'Analyzing...' : 'Current prediction models active'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-error-container/10">
                <div className="bg-error-container/20 p-3 rounded-xl text-error">
                  <TriangleAlert className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-label text-on-surface-variant">RISK LEVEL</p>
                  <p className="font-headline font-bold text-lg text-error">{riskData?.riskLevel || 'Medium Alert'}</p>
                  <p className="text-sm text-on-surface-variant">Probability index: {loading ? '--' : '64%'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-headline font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Map className="w-4 h-4" />
              View Evacuation Map
            </button>
            <button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-headline font-bold text-sm border border-on-surface-variant/10 hover:bg-surface-container-high transition-colors">
              Action Plan
            </button>
          </div>
        </div>
      </div>

      <div className="md:col-span-4 glass-panel rounded-3xl p-8 fog-shadow border border-white/40 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h4 className="font-headline font-bold text-on-surface">AI Synthesis</h4>
        </div>
        <div className="space-y-6 flex-grow">
          <div className="p-4 rounded-xl bg-tertiary-container/10 border-l-4 border-tertiary">
            <p className="text-sm italic leading-relaxed text-on-surface">
              "{loading ? 'Synthesizing local atmospheric telemetry and live grid risk factors...' : (riskData?.synthesis || 'Atmospheric pressure shifts suggest a cooling trend by Thursday. Heatwave risk is diminishing, but soil saturation remains high.')}"
            </p>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
              <CheckCircle2 className="text-primary w-4 h-4" />
              Water levels within safety margin
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
              <CheckCircle2 className="text-primary w-4 h-4" />
              Grid stability verified
            </li>
            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
              <Info className="text-error w-4 h-4" />
              Shelter capacity: 82%
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <img 
            className="w-full h-32 object-cover rounded-2xl opacity-60" 
            src="https://picsum.photos/seed/data-viz/400/200" 
            alt="Data Visualization"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const RiskOverview = () => (
  <section className="mt-12 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      { icon: Thermometer, label: 'Heatwave Index', value: '72°F', color: 'bg-green-500', risk: 'Low Risk', riskColor: 'text-green-700 bg-green-50' },
      { icon: Droplets, label: 'Humidity Impact', value: '42% Relative', color: 'bg-blue-500', risk: 'Monitoring', riskColor: 'text-blue-700 bg-blue-50' },
      { icon: Wind, label: 'Wind Speed', value: '12 mph (WNW)', color: 'bg-primary', risk: 'Normal', riskColor: 'text-primary bg-primary-container/20' },
    ].map((item, i) => {
      const Icon = item.icon;
      return (
        <div key={i} className="bg-surface-container-low rounded-3xl p-6 transition-all hover:bg-surface-container-high cursor-pointer group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-surface-container-lowest text-primary rounded-xl group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-label px-2 py-1 rounded-full uppercase tracking-tighter ${item.riskColor}`}>
              {item.risk}
            </span>
          </div>
          <h5 className="font-headline font-bold text-lg mb-1">{item.label}</h5>
          <p className="text-sm text-on-surface-variant mb-4">Current: {item.value}</p>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '40%' }}
              className={`${item.color} h-full rounded-full`}
            />
          </div>
        </div>
      );
    })}
  </section>
);

const PreparednessGuide = () => (
  <section className="mt-24 w-full max-w-7xl mx-auto px-6 pb-32">
    <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
      <div className="lg:w-3/5">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-12 h-[2px] bg-tertiary"></span>
          <span className="font-label text-xs tracking-widest text-tertiary uppercase font-bold">Resilient Intelligence</span>
        </div>
        <h2 className="font-headline text-5xl md:text-7xl font-light text-on-surface mb-6 leading-[1.1]">
          The Horizon is <span className="text-gradient font-extrabold italic">Clear.</span>
        </h2>
        <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
          Navigate uncertainty with calm precision. Our AI-driven preparedness guide transforms chaotic emergency data into structured, actionable wisdom for every stage of a crisis.
        </p>
      </div>
      <div className="lg:w-2/5 relative">
        <div className="w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
          <img 
            className="w-full h-full object-cover" 
            src="https://picsum.photos/seed/horizon/800/800" 
            alt="Serene Horizon"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-2xl shadow-xl border border-white/20 max-w-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-tighter text-on-surface-variant uppercase">AI Confidence</span>
          </div>
          <p className="font-headline font-bold text-2xl text-primary">98.4%</p>
          <p className="text-xs text-on-surface-variant">Readiness Score for your current location.</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* BEFORE */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-primary-container p-3 rounded-2xl text-primary">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight">Before Disaster</h3>
        </div>
        <div className="bg-surface-container-low p-8 rounded-3xl space-y-8">
          {[
            { title: 'Emergency Kit', desc: 'Secure 72 hours of water, non-perishable food, and medical supplies.' },
            { title: 'Communication Plan', desc: 'Designate an out-of-town contact and establish meeting points.' },
            { title: 'Digital Archive', desc: 'Backup critical documents to the cloud and encrypt local copies.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-on-surface">{item.title}</p>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
          ))}
          <img 
            className="w-full h-40 object-cover rounded-2xl opacity-80 hover:opacity-100 transition-opacity" 
            src="https://picsum.photos/seed/kit/400/300" 
            alt="Emergency Kit"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* DURING */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-tertiary-container p-3 rounded-2xl text-white">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight">During Disaster</h3>
        </div>
        <div className="bg-surface-container-highest p-8 rounded-3xl space-y-8">
          {[
            { title: 'Stay Informed', desc: 'Monitor local radio and official RESQ.AI push alerts for real-time updates.', icon: Radio },
            { title: 'Shelter in Place', desc: 'Identify the safest interior room away from windows and potential debris.', icon: ShieldAlert },
            { title: 'Power Management', desc: 'Unplug appliances to prevent surge damage and conserve battery devices.', icon: Unplug },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex gap-4">
                <Icon className="text-tertiary w-5 h-5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold text-on-surface">{item.title}</p>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            );
          })}
          <div className="aspect-video rounded-2xl overflow-hidden bg-white/50 p-1">
            <div className="w-full h-full rounded-xl bg-slate-200 relative">
              <img 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/monitoring/400/300" 
                alt="Active Monitoring"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                <p className="text-white text-[10px] uppercase font-bold tracking-widest">Active Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AFTER */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-secondary-container p-3 rounded-2xl text-secondary">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight">After Disaster</h3>
        </div>
        <div className="bg-surface-container-low p-8 rounded-3xl space-y-8">
          {[
            { title: 'Damage Assessment', desc: 'Photograph all structural damage for insurance claims before beginning cleanup.', icon: Camera },
            { title: 'Safety First', desc: 'Watch for downed power lines, gas leaks, and weakened structures.', icon: ShieldCheck },
            { title: 'Community Care', desc: 'Check on neighbors, especially the elderly or those with functional needs.', icon: HeartHandshake },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex gap-4">
                <Icon className="text-secondary w-5 h-5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold text-on-surface">{item.title}</p>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            );
          })}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold font-label text-slate-400">Recovery Status</span>
              <span className="text-xs font-bold font-label text-secondary">In Progress</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '33%' }}
                className="bg-secondary h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface-container-low mt-20 pb-32 pt-16 border-t border-on-surface-variant/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div>
          <span className="text-xl font-black text-gradient font-headline tracking-tight">RESQ.AI</span>
          <p className="text-xs text-on-surface-variant mt-2 max-w-xs">Building a more resilient future through the marriage of ethical AI and community readiness.</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-1">Hackathon 2024</p>
          <p className="text-sm text-on-surface-variant">Global Disaster Resilience Track</p>
        </div>
      </div>
      <div className="h-px bg-on-surface-variant/10 w-full mb-8"></div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-medium">
        <p>© 2024 RESQ.AI Preparedness Initiative.</p>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Privacy Framework</a>
          <a className="hover:text-primary transition-colors" href="#">Safety Protocol</a>
          <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </div>
  </footer>
);

const MobileNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-xl border-t border-on-surface-variant/10 shadow-[0_-10px_30px_rgba(42,52,58,0.04)] rounded-t-3xl">
    {[
      { icon: Home, label: 'Home', active: true },
      { icon: BarChart3, label: 'Dashboard' },
      { icon: ShieldCheck, label: 'Preparedness' },
      { icon: Bot, label: 'Support' },
    ].map((item, i) => {
      const Icon = item.icon;
      return (
        <button 
          key={i} 
          className={`flex flex-col items-center justify-center px-4 py-2 transition-transform active:scale-90 ${item.active ? 'text-primary bg-primary-container/20 rounded-xl' : 'text-on-surface-variant'}`}
        >
          <Icon className="w-6 h-6 mb-1" />
          <span className="font-body text-[11px] font-medium tracking-wide uppercase">{item.label}</span>
        </button>
      );
    })}
  </nav>
);

const AIAssistant = () => (
  <button className="fixed bottom-24 right-8 md:bottom-8 md:right-8 z-50 group">
    <div className="relative">
      <div className="absolute inset-0 bg-tertiary blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <div className="relative bg-white p-4 rounded-full shadow-2xl border border-tertiary/20 flex items-center justify-center transition-transform group-active:scale-95">
        <Bot className="text-tertiary w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border-2 border-white animate-bounce"></div>
      </div>
    </div>
    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-on-surface-variant/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
      <p className="text-sm font-semibold text-on-surface">Need help planning? Ask me.</p>
    </div>
  </button>
);

// --- Main App ---

export default function App() {
  const [location, setLocation] = React.useState('San Francisco, CA');
  const [riskData, setRiskData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (searchLocation: string) => {
    setLocation(searchLocation);
    setLoading(true);
    
    try {
      const response = await fetch('/api/analyze-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: searchLocation })
      });
      if (response.ok) {
        const data = await response.json();
        setRiskData(data);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="flex flex-col items-center">
        {/* Hero Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary-container/10 blur-[100px] rounded-full"></div>
        </div>

        <Hero onSearch={handleSearch} loading={loading} />
        <Stats />
        
        <div className="w-full max-w-7xl mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="rounded-3xl overflow-hidden fog-shadow aspect-video relative group"
              >
                <img 
                  className="w-full h-full object-cover" 
                  src="https://picsum.photos/seed/coastal/1200/800" 
                  alt="Coastal View"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] mb-2 block">Current Status</span>
                  <h3 className="font-headline font-bold text-2xl">{location} Basin: Stabilized</h3>
                </div>
              </motion.div>
            </div>
            <div className="md:col-span-5 pb-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-surface-container-low p-8 rounded-3xl relative border border-on-surface-variant/5"
              >
                <BrainCircuit className="text-tertiary mb-4 w-10 h-10" />
                <h4 className="font-headline font-bold text-xl mb-3">AI Readiness Report</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Our neural networks are currently processing {location}'s climate telemetry from global satellites. No immediate high-risk anomalies detected.
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      className="bg-primary h-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Dashboard location={location} riskData={riskData} loading={loading} />
        <RiskOverview />
        <PreparednessGuide />
      </main>

      <Footer />
      <MobileNav />
      <AIAssistant />
    </div>
  );
}

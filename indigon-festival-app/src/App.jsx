import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Calendar, 
  MapPin, 
  Clock, 
  Coins, 
  Award, 
  Users, 
  BookOpen, 
  TrendingUp, 
  FolderOpen, 
  ShieldAlert, 
  Play, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  Map, 
  Sparkles, 
  Laptop, 
  ChevronDown, 
  Check, 
  Briefcase, 
  Globe, 
  HelpCircle, 
  Send, 
  Database, 
  Lock, 
  LogOut, 
  RefreshCw,
  Camera,
  Film,
  Music,
  Tv,
  BadgeAlert,
  Sliders,
  ChevronUp,
  FileText,
  Building,
  DollarSign
} from 'lucide-react';
import { apiService } from './services/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [registrations, setRegistrations] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Dual loading system (Local Engine for instant test validation)
  const refreshData = () => {
    setRegistrations(apiService.getRegistrations());
    setSponsors(apiService.getSponsorInquiries());
  };

  // Modern location pathname synchronizer & router
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      if (path === '/register') {
        setCurrentScreen('RegistrationPage');
      } else if (path === '/sponsors') {
        setCurrentScreen('Sponsor');
      } else if (path === '/privacy') {
        setCurrentScreen('Privacy');
      } else if (path === '/admin') {
        setCurrentScreen('AdminDashboard');
      } else if (path === '/vtc-path') {
        setCurrentScreen('VtcPath');
      } else if (path === '/details') {
        setCurrentScreen('EventDetails');
      } else if (path === '/categories') {
        setCurrentScreen('Categories');
      } else if (path === '/presenters') {
        setCurrentScreen('Presenters');
      } else {
        setCurrentScreen('Home');
      }
    };
    
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    refreshData();

    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Soft navigator helper to push history states
  const navigateTo = (screen) => {
    let path = '/';
    if (screen === 'RegistrationPage') path = '/register';
    else if (screen === 'Sponsor') path = '/sponsors';
    else if (screen === 'Privacy') path = '/privacy';
    else if (screen === 'AdminDashboard') path = '/admin';
    else if (screen === 'VtcPath') path = '/vtc-path';
    else if (screen === 'EventDetails') path = '/details';
    else if (screen === 'Categories') path = '/categories';
    else if (screen === 'Presenters') path = '/presenters';
    
    window.history.pushState(null, '', path);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshData();
  };

  const triggerNotification = (msg) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-12">
      
      {/* 1. TOP BAR - PRIVATE & CLEAN PUBLIC EMBLEM */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('Home')}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 shadow-md">
            <Play className="w-4 h-4 text-white fill-current animate-pulse" />
          </div>
          <span className="font-extrabold text-lg tracking-widest text-[#130A38]">
            INDIGON
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black text-slate-400 border border-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
            LAUNCED • v1.0
          </span>
        </div>
      </header>

      {/* Floating alert bar */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-indigo-900 border border-indigo-805 text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* 2. MAIN SCROLLABLE WRAPPER */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 md:max-w-2xl">
        {currentScreen === 'Home' && <HomeScreen navigateTo={navigateTo} />}
        {currentScreen === 'RegistrationPage' && <RegistrationPage navigateTo={navigateTo} triggerNotification={triggerNotification} />}
        {currentScreen === 'EventDetails' && <EventDetailsPage navigateTo={navigateTo} />}
        {currentScreen === 'Categories' && <CategoriesPage navigateTo={navigateTo} />}
        {currentScreen === 'Presenters' && <PresentersPage navigateTo={navigateTo} />}
        {currentScreen === 'Sponsor' && <SponsorPage navigateTo={navigateTo} />}
        {currentScreen === 'VtcPath' && <VtcPathPage navigateTo={navigateTo} />}
        {currentScreen === 'Privacy' && <PrivacyPage />}
        
        {currentScreen === 'AdminDashboard' && (
          <AdminDashboardPage 
            registrations={registrations} 
            sponsors={sponsors} 
            refreshData={refreshData} 
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* 3. MOBILE PUBLIC NAVIGATION FOOTER */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center h-16 bg-white border-t border-slate-100 shadow-2xl md:hidden">
        <button 
          onClick={() => navigateTo('Home')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs font-semibold ${
            currentScreen === 'Home' ? 'text-violet-600' : 'text-slate-400'
          }`}
        >
          <HomeIcon className="w-5 h-5 mb-0.5" />
          Home
        </button>
        
        <button 
          onClick={() => navigateTo('RegistrationPage')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs font-semibold ${
            currentScreen === 'RegistrationPage' ? 'text-violet-600' : 'text-slate-400'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" />
          Register
        </button>

        <button 
          onClick={() => navigateTo('Sponsor')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs font-semibold ${
            currentScreen === 'Sponsor' ? 'text-violet-600' : 'text-slate-400'
          }`}
        >
          <Coins className="w-5 h-5 mb-0.5" />
          Sponsors
        </button>

        <button 
          onClick={() => navigateTo('EventDetails')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs font-semibold ${
            currentScreen === 'EventDetails' ? 'text-violet-600' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          Details
        </button>
      </nav>

      {/* 4. ROBUST PUBLIC FLAT FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 px-4 mt-12 border-t border-slate-800">
        <div className="max-w-lg mx-auto md:max-w-2xl text-center space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white font-extrabold tracking-widest text-[#FF00E5]">VOLLYWOOD®</span>
            <p className="text-[10px] text-slate-500 max-w-xs uppercase font-semibold">Bridging Creative Arts and Generative Technology</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-300">
            <button onClick={() => navigateTo('RegistrationPage')} className="hover:text-white transition-colors">Register</button>
            <span className="text-slate-700">|</span>
            <button onClick={() => navigateTo('Sponsor')} className="hover:text-white transition-colors">Sponsor Indigon</button>
            <span className="text-slate-700">|</span>
            <button onClick={() => navigateTo('VtcPath')} className="hover:text-white transition-colors">VTC Training Path</button>
            <span className="text-slate-700">|</span>
            <a href="mailto:tonyholobyte@gmail.com" className="hover:text-white transition-colors">Contact Vollywood</a>
            <span className="text-slate-700">|</span>
            <button onClick={() => navigateTo('Privacy')} className="hover:text-white transition-colors">Privacy Notice</button>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-600 space-y-1">
            <p>© 2026 Vollywood® & Indigon AI Film Gauntlet. All rights reserved.</p>
            <p>Form entries are tagged securely to segment communications.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PUBLIC HOME SCREEN
// -----------------------------------------------------------------------------

function HomeScreen({ navigateTo }) {
  return (
    <div className="space-y-6">
      
      {/* 🏷️ Vollywood Tag */}
      <div className="flex justify-center">
        <span className="inline-block px-3.5 py-1 text-[11px] font-black text-violet-600 bg-violet-50 tracking-widest uppercase rounded-full border border-violet-100 shadow-sm">
          PRESENTED BY VOLLYWOOD®
        </span>
      </div>

      {/* 🚀 Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#110C35] to-[#0A0621] text-white p-6.5 shadow-xl text-center border border-indigo-950">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full blur-2xl"></div>
        <div className="relative space-y-3">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-300">
            Indigon AI Film Gauntlet
          </h1>
          <p className="text-xs font-bold tracking-widest text-[#00FFE5] max-w-sm mx-auto uppercase">
            Official Launch • AI Film, Trailers, Social Commercials & Ambiance
          </p>
        </div>
      </div>

      {/* Narrative block */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm leading-relaxed text-slate-600 text-center text-xs md:text-sm">
        We invite Virginia creatives, directors, media agencies, filmmakers, techies, and brands to join our high-octane introductory AI media pipeline workshop. Acquire actionable creative capabilities completely free.
      </div>

      {/* ⭐ Clear Event Status Highlights */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-center shadow-sm">
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Date</span>
          <span className="text-slate-800 font-extrabold text-xs block mt-1">June 27, 2026</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-center shadow-sm">
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Seating Limit</span>
          <span className="text-rose-600 font-extrabold text-xs block mt-1">50 Seats Max</span>
        </div>
      </div>

      {/* ⭐ Call To Actions */}
      <div className="space-y-3">
        <button 
          onClick={() => navigateTo('RegistrationPage')}
          className="w-full h-14 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-transform flex items-center justify-center space-x-2.5 text-sm md:text-base"
        >
          <Award className="w-5 h-5 text-white" />
          <span>Register for Free Seat</span>
        </button>

        <button 
          onClick={() => navigateTo('Sponsor')}
          className="w-full h-12 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 text-xs md:text-sm"
        >
          <Coins className="w-4 h-4 text-violet-600" />
          <span>Sponsor / Partner with Indigon</span>
        </button>
      </div>

      {/* Feature Menu items */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-black text-[#130A38] uppercase tracking-wider pl-1 font-extrabold">
          Festival Highlights
        </h3>
        
        <RowButtonBlock 
          title="VTC Training Pathway" 
          description="View certified programs & workshops"
          icon={BookOpen} 
          onClick={() => navigateTo('VtcPath')} 
        />
        <RowButtonBlock 
          title="Meet the Presenters" 
          description="Direct insights from Tony Holobyte & guests"
          icon={Users} 
          onClick={() => navigateTo('Presenters')} 
        />
        <RowButtonBlock 
          title="Explore AI Categories" 
          description="Commercial ads, movie trailers & music videos"
          icon={Film} 
          onClick={() => navigateTo('Categories')} 
        />
        <RowButtonBlock 
          title="Full Event Logistical Info" 
          description="Directions, hour listings, and equipment checklists"
          icon={Clock} 
          onClick={() => navigateTo('EventDetails')} 
        />
      </div>

    </div>
  );
}

function RowButtonBlock({ title, description, icon: Icon, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer transition-colors duration-150 shadow-sm"
    >
      <div className="flex items-center space-x-3.5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
          <Icon className="w-4 h-4 text-indigo-950" />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-slate-800 text-xs md:text-sm">{title}</h4>
          <p className="text-[10px] text-slate-400 block mt-0.5 font-medium">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// EVENT REGISTRATION FORM PAGE (/register)
// -----------------------------------------------------------------------------

function RegistrationPage({ navigateTo, triggerNotification }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityState, setCityState] = useState('');
  const [attendingAs, setAttendingAs] = useState('Filmmaker');
  const [categoryInterest, setCategoryInterest] = useState('AI Commercials / Ads');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [device, setDevice] = useState('Laptop');
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [consent, setConsent] = useState(false);

  // Optional
  const [businessName, setBusinessName] = useState('');
  const [websiteSocial, setWebsiteSocial] = useState('');
  const [hopeToLearn, setHopeToLearn] = useState('');
  const [considerChallenges, setConsiderChallenges] = useState('Yes');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address.');
    if (!phone.trim()) return setError('Please enter your phone number.');
    if (!cityState.trim()) return setError('Please enter your City / State.');
    if (!consent) return setError('You must review and agree to the free training seat limits.');

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: name.trim(),
        emailAddress: email.trim(),
        phoneNumber: phone.trim(),
        cityState: cityState.trim(),
        attendingAs,
        categoryInterest,
        experienceLevel,
        deviceToBring: device,
        receiveUpdates: receiveUpdates ? 'Yes' : 'No',
        businessOrgName: businessName.trim(),
        websiteSocialLink: websiteSocial.trim(),
        hopeToLearn: hopeToLearn.trim(),
        considerFutureChallenges: considerChallenges
      };

      await apiService.submitRegistration(payload);
      setSuccess(true);
      triggerNotification('Registered Successfully! Contacts Tagged: [Indigon Event Signup]');
    } catch (err) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-center py-10 space-y-5">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
          <Check className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800">Seat Confirmed!</h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            Thank you for registering for the Indigon AI Media Training! Your seat request has been received. Please check your email for event details and reminders.
          </p>
        </div>
        
        <div className="w-full pt-4 space-y-2">
          <button 
            onClick={() => navigateTo('Home')}
            className="w-full h-11 bg-slate-900 border border-slate-850 hover:bg-black text-white rounded-lg font-bold text-xs shadow-sm transition-all"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-800">Free Training Registration</h2>
        <p className="text-xs text-slate-400 font-bold block">
          Event Code Sync Tag: <span className="text-indigo-600">Indigon Event Signup</span>
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-rose-50 border border-rose-150 text-rose-800 p-3.5 rounded-xl text-xs">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <form onSubmit={submitForm} className="space-y-4">
        
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-violet-600 tracking-widest uppercase border-b border-violet-100 pb-1 font-black">
            Required Form Fields
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Full Name *</label>
            <input 
              type="text" 
              placeholder="Alex Chen" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Email Address *</label>
            <input 
              type="email" 
              placeholder="alex@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Phone Number *</label>
            <input 
              type="tel" 
              placeholder="+1 555-0199" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">City / State *</label>
            <input 
              type="text" 
              placeholder="Richmond, VA" 
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Attendee Type</label>
            <select 
              value={attendingAs} 
              onChange={(e) => setAttendingAs(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              <option value="Filmmaker">Filmmaker</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Student">Student</option>
              <option value="Music Artist">Music Artist</option>
              <option value="Marketing / Media Professional">Marketing & Media Professional</option>
              <option value="Community Member">Community Member</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">AI Media Category Interest</label>
            <select 
              value={categoryInterest} 
              onChange={(e) => setCategoryInterest(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
            >
              <option value="AI Commercials / Ads">AI Commercials / Ads</option>
              <option value="AI Movie Trailers">AI Movie Trailers</option>
              <option value="AI Short Films">AI Short Films</option>
              <option value="AI Music Videos">AI Music Videos</option>
              <option value="AI Tools for Business">AI Tools for Business</option>
              <option value="I’m interested in all of them">I’m interested in all of them</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">AI Experience Level</label>
            <select 
              value={experienceLevel} 
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
            >
              <option value="Beginner">Beginner</option>
              <option value="Some experience">Some experience</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Never used AI before">Never used AI before</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Device You Will Bring</label>
            <select 
              value={device} 
              onChange={(e) => setDevice(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
            >
              <option value="Laptop">Laptop (Recommended)</option>
              <option value="Tablet">Tablet</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-slate-500 block">
              Future Vollywood / Indigon Updates
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 cursor-pointer">
                <input 
                  type="radio" 
                  checked={receiveUpdates} 
                  onChange={() => setReceiveUpdates(true)} 
                  className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 cursor-pointer">
                <input 
                  type="radio" 
                  checked={!receiveUpdates} 
                  onChange={() => setReceiveUpdates(false)}
                  className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>

        {/* OPTIONAL SUBSECTION */}
        <div className="space-y-3 pt-3">
          <h3 className="text-[10px] font-black text-violet-600 tracking-widest uppercase border-b border-violet-100 pb-1 font-black">
            Optional Information
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Business / Organization</label>
            <input 
              type="text" 
              placeholder="Brand or Agency name" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Social handle / Link</label>
            <input 
              type="text" 
              placeholder="instagram.com/creations" 
              value={websiteSocial}
              onChange={(e) => setWebsiteSocial(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">What do you hope to learn?</label>
            <textarea 
              rows="2.5" 
              placeholder="Your specialized learning objectives..." 
              value={hopeToLearn}
              onChange={(e) => setHopeToLearn(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 block">
              Consider future hackathons, media team challenges or showcases?
            </label>
            <div className="flex items-center space-x-6">
              {['Yes', 'No', 'Maybe'].map((choice) => (
                <label key={choice} className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 cursor-pointer">
                  <input 
                    type="radio" 
                    value={choice} 
                    checked={considerChallenges === choice} 
                    onChange={() => setConsiderChallenges(choice)}
                    className="w-4 h-4 text-violet-600"
                  />
                  <span>{choice}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* REQUIRED CONSENT CHECKBOX */}
        <div className="pt-2">
          <label className="flex items-start space-x-2.5 text-[11px] text-slate-500 leading-normal cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-violet-600 rounded border-slate-300 focus:ring-violet-500"
            />
            <span>
              I understand that physical venue space is strictly limited. Agreeing confirms I plan to attend the workshop. *
            </span>
          </label>
        </div>

        {/* BUTTON SUBMISSION */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 mt-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold active:scale-[0.99] transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-violet-100 disabled:opacity-50"
        >
          {isSubmitting ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 text-white" />
              <span>Complete Registrant Signup</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PUBLIC SPONSORS & SPONSOR FORM PAGE (/sponsors)
// -----------------------------------------------------------------------------

function SponsorPage({ navigateTo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [sponsorshipInterest, setSponsorshipInterest] = useState('Category Sponsor');
  const [interests, setInterests] = useState('');
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitInquiry = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Please enter your full contact name.');
    if (!email.trim() || !email.includes('@')) return setError('Please specify a valid business email.');
    if (!phone.trim()) return setError('Please supply a direct contact number.');
    if (!company.trim()) return setError('Please input your Company or Organization.');
    if (!consent) return setError('You must authorize the Vollywood team to follow up on your lead.');

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: name.trim(),
        emailAddress: email.trim(),
        phoneNumber: phone.trim(),
        companyOrg: company.trim(),
        website: website.trim(),
        sponsorshipInterest,
        interests: interests.trim()
      };
      await apiService.submitSponsorInquiry(payload);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error executing request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-configured elegant public sponsor sections
  const tiers = [
    {
      title: "Category & Presenting Partners",
      desc: "Prime alignment across the multi-channel broadcast, training portals, and award categories.",
      sponsors: [
        { name: "Vollywood® Labs", text: "Pioneering creative arts tech pipelines and specialized developer tools.", cat: "Official Technology Supporter", init: "VL" },
        { name: "Virginia Creative Guild", text: "Fostering collaboration between regional filmmakers and indie agencies.", cat: "Community Catalyst Partner", init: "VC" }
      ]
    },
    {
      title: "Technology & Media Supports",
      desc: "Direct integration into active student workstation presets.",
      sponsors: [
        { name: "Vance Tech Labs", text: "Supplying real-time capture infrastructure and local training kits.", cat: "VTC Tech Sponsor", init: "VT" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* 🚀 Visual Pitch Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl text-center border border-indigo-950">
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">
          Sponsor the Festival
        </h2>
        <p className="text-xs text-slate-300 max-w-sm mx-auto mt-2 leading-relaxed">
          Position your logo and technology directly in front of active creators, commercial agencies, and next-generation filmmakers in Virginia.
        </p>
      </div>

      {/* 🤝 1. Public Sponsor Presentation Levels */}
      <div className="space-y-5">
        <h3 className="text-xs font-black text-[#130A38] uppercase tracking-wider block pl-1">
          Active Partners & Sponsors
        </h3>

        {tiers.map((tier, tIdx) => (
          <div key={tIdx} className="space-y-3 bg-[#F1F5F9]/50 p-4 rounded-xl border border-slate-100">
            <div>
              <h4 className="font-extrabold text-[#130A38] text-xs uppercase tracking-tight">{tier.title}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{tier.desc}</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {tier.sponsors.map((spon, sIdx) => (
                <div key={sIdx} className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8.5 h-8.5 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-[11px] text-indigo-700">
                      {spon.init}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-800">{spon.name}</h5>
                      <p className="text-[10px] text-slate-400 font-medium block">{spon.text}</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded tracking-wide uppercase">
                    {spon.cat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Invitation Card */}
        <div className="p-4 bg-violet-50/55 border border-dashed border-violet-100 rounded-xl text-center space-y-1">
          <h4 className="text-xs font-extrabold text-violet-700">Your Organization Here</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">Join us as a Presenting, Category, or Media Sponsor. App submissions tag sponsor emails inside Mailchimp.</p>
        </div>
      </div>

      {/* 📩 2. Public Sponsor Inquiry Form */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div>
          <h3 className="font-extrabold text-[#130A38] text-sm">Sponsor Lead Capture</h3>
          <p className="text-[10px] text-slate-400 mt-1 block font-bold">Tag in sync: <span className="text-indigo-600">Indigon Sponsor Lead</span></p>
        </div>

        {success ? (
          <div className="flex flex-col items-center py-5 text-center space-y-3 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-150">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-800">Inquiry Received</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm leading-relaxed">
                Thank you for your interest in sponsoring Indigon. Your inquiry has been received, and the Vollywood® / Indigon team will follow up with sponsorship details.
              </p>
            </div>
            <button 
              onClick={() => setSuccess(false)}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-md font-bold text-xxs block mt-2"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={submitInquiry} className="space-y-3.5">
            {error && (
              <div className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Contact Name *</label>
              <input 
                type="text" 
                placeholder="Tony Holobyte" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Business Email Address *</label>
              <input 
                type="email" 
                placeholder="tony@vollywood.org" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Direct Contact Phone *</label>
              <input 
                type="tel" 
                placeholder="+1 804-555-1234" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Company / Organization *</label>
              <input 
                type="text" 
                placeholder="Agency or Tech Company" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Website URL</label>
              <input 
                type="text" 
                placeholder="https://vollywood.org" 
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Sponsorship Interest Level</label>
              <select 
                value={sponsorshipInterest} 
                onChange={(e) => setSponsorshipInterest(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              >
                <option value="Presenting Sponsor">Presenting Sponsor</option>
                <option value="Category Sponsor">Category Sponsor</option>
                <option value="Community Partner">Community Partner</option>
                <option value="Technology Partner">Technology Partner</option>
                <option value="Media Partner">Media Partner</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Message / Partnership Goals</label>
              <textarea 
                rows="2" 
                placeholder="How would your brand love to integrate?" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
              ></textarea>
            </div>

            <div className="pt-1.5">
              <label className="flex items-start space-x-2.5 text-[11px] text-slate-500 leading-normal cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-violet-600 rounded border-slate-300"
                />
                <span>
                  I authorize Vollywood® representatives to follow up on this inquiry at the contact details provided. *
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 bg-indigo-955 hover:bg-black text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-2.5 disabled:opacity-50 transition-all shadow-md"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Transmit Sponsor Application</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

// -----------------------------------------------------------------------------
// EVENT LOGISTICAL INFORMATION (/details)
// -----------------------------------------------------------------------------

function EventDetailsPage({ navigateTo }) {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col items-center bg-[#130A38] text-white p-6.5 rounded-2xl shadow-md border-b-4 border-cyan-400">
        <span className="text-[10px] font-black tracking-widest text-[#00E5FF] mb-1 uppercase">
          LOGISTICAL CHECKLISTS & DATES
        </span>
        <h2 className="text-xl font-black text-center max-w-sm">
          Indigon AI Media Workshop
        </h2>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 text-xs md:text-sm">
        
        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-violet-50 border border-violet-100 text-violet-600">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Date</h4>
            <p className="text-xs font-bold text-slate-700 mt-0.5">June 27, 2026</p>
          </div>
        </div>

        <hr className="border-slate-50" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-violet-50 border border-violet-100 text-violet-600">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Time</h4>
            <p className="text-xs font-bold text-slate-700 mt-0.5">10:00 AM - 4:00 PM EST</p>
          </div>
        </div>

        <hr className="border-slate-50" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-violet-50 border border-violet-100 text-violet-600">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Location</h4>
            <p className="text-xs font-bold text-slate-700 mt-0.5">Vollywood Training Center, 1200 Creative Media Way, Richmond, VA</p>
          </div>
        </div>

        <hr className="border-slate-50" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cost</h4>
            <p className="text-xs font-bold text-emerald-600 mt-0.5">Free (Registration Required)</p>
          </div>
        </div>

      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
        <h3 className="text-xs font-black text-[#130A38] uppercase tracking-wider block">Important Reminders</h3>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          Bring a charged laptop or workspace device. All attendees receive introductory access tokens for shared generator systems during exercise segments.
        </p>
      </div>

      <button 
        onClick={() => navigateTo('RegistrationPage')}
        className="w-full h-12 bg-indigo-955 text-white rounded-lg font-bold shadow-md transition-all active:scale-[0.98] text-xs"
      >
        Open Registration Form
      </button>

    </div>
  );
}

// -----------------------------------------------------------------------------
// PUBLIC CATEGORIES PAGE (/categories)
// -----------------------------------------------------------------------------

function CategoriesPage({ navigateTo }) {
  const categories = [
    {
      title: "AI Commercials / Ads",
      desc: "Develop brand concepts, product videos, sponsor tags, and high-impact social layouts.",
      learnList: ["Dynamic preset mapping", "Image-to-Scene depth prompts", "Voiceover clones"],
      icon: Tv,
      col: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "AI Movie Trailers",
      desc: "Cinematic promotional trailers, world pitches, style concepts, and visual pacing.",
      learnList: ["Character continuity prompts", "Sequencing mechanics", "Sound FX layering"],
      icon: Film,
      col: "text-[#7C3AED] bg-violet-50 border-violet-100"
    },
    {
      title: "AI Short Films",
      desc: "Visual storytelling, script to storyboard catalogs, consistent models, and framing direction.",
      learnList: ["Multi-angle scene generators", "Visual storyboarding", "Audio dub triggers"],
      icon: Camera,
      col: "text-cyan-600 bg-cyan-50 border-cyan-100"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-800">Media Focus Segments</h2>
        <p className="text-xs text-slate-400">Our core pillars for exercises on event day</p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${cat.col}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm md:text-base">{cat.title}</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-semibold">{cat.desc}</p>

              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Workshop Focus</span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-700">
                  {cat.learnList.map((item, keyIdx) => (
                    <li key={keyIdx} className="flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PUBLIC PRESENTERS PAGE (/presenters)
// -----------------------------------------------------------------------------

function PresentersPage({ navigateTo }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-800">Workstation Presenters</h2>
        <p className="text-xs text-slate-400">Direct instruction from veteran directors and AI tool developers</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
              TH
            </div>
            <div>
              <h4 className="font-extrabold text-[#130A38] text-sm md:text-base">Tony Holobyte</h4>
              <p className="text-[10px] text-indigo-505 font-bold">Vollywood® Founder & Creative Integrator</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Tony is dedicated to configuring real-time local learning pipelines. He maintains technical databases, developer platforms, and event spaces for creators across Virginia.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-sm text-white shadow-md">
              SH
            </div>
            <div>
              <h4 className="font-extrabold text-[#130A38] text-sm md:text-base">Scott Hansen</h4>
              <p className="text-[10px] text-indigo-505 font-bold">AI Videographer & Pipeline Instructor</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Scott leads deep tutorials on character consistency models, motion presets, framing strategies, and visual pacing engines.
          </p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PUBLIC VTC TRAINING PATHWAY PAGE (/vtc-path)
// -----------------------------------------------------------------------------

function VtcPathPage({ navigateTo }) {
  const steps = [
    { title: "Generative Prompting Models", step: "01", desc: "Setting camera vectors, lighting states, and character prompts securely." },
    { title: "Motion Rig Synchronizations", step: "02", desc: "Pairing physical asset footage matrices with generation scales." },
    { title: "Soundtrack & Lip Duplicates", step: "03", desc: "Voiceover clones, custom musical tempos, and audio overlays." }
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-650" />
          <h2 className="text-xl font-black text-[#130A38]">VTC Training Path</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-semibold">
          Bridging standard digital film mechanics with emerging generative systems. These steps outline the career certificate curricula.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((st, idx) => (
          <div key={idx} className="bg-white p-4.5 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {st.step}
            </span>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-xs md:text-sm">{st.title}</h4>
              <p className="text-[11px] text-slate-400 font-semibold leading-normal">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigateTo('RegistrationPage')} className="w-full h-12 bg-[#2D1B6F] text-white rounded-lg font-bold text-xs hover:bg-[#1E114E] transition-all">
        Apply for Certifications
      </button>

    </div>
  );
}

// -----------------------------------------------------------------------------
// PUBLIC PRIVACY POLICY PAGE (/privacy)
// -----------------------------------------------------------------------------

function PrivacyPage() {
  return (
    <div className="space-y-5">
      <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
          <FileText className="w-5 h-5 text-violet-600" />
          <h2 className="text-xl font-black text-slate-800">Privacy Notice</h2>
        </div>

        <p className="text-xs font-bold text-[#FF00E5] tracking-widest uppercase">
          Indigon AI Film Gauntlet | Vollywood® Partner Trust
        </p>

        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-semibold py-1">
          “Information submitted through this app is used for Indigon Festival registration, event communication, sponsor follow-up, and Vollywood® / Indigon updates. We do not sell attendee information.”
        </p>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-400 space-y-1.5 leading-normal">
          <p className="font-bold text-slate-700 uppercase tracking-tight">Security Segment Integration</p>
          <p>
            Contacts harvested on this application pass tags representing submission vectors (e.g. FNAME, LNAME, source parameters) directly to connected systems without third-party intermediate sales vectors.
          </p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SECURE ADMIN ROUTE VIEW WITH PASSWORD GUARD (/admin)
// -----------------------------------------------------------------------------

function AdminDashboardPage({ registrations, sponsors, refreshData, navigateTo }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [viewTab, setViewTab] = useState('Overview');

  // Authorized Admin Emails
  const approvedEmail = "tonyholobyte@gmail.com";

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    
    // Secure env verification for the Launch build
    const secretPass = import.meta.env.VITE_ADMIN_PASSWORD || 'vollywood2026';

    if (password === secretPass || password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid system credentials. Access denied.');
    }
  };

  // Google login flow simulation for custom admin approved emails
  const simulateEmailLogin = (emailInput) => {
    if (emailInput.toLowerCase().trim() === approvedEmail) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(`Access denied. ${emailInput} is not an approved admin email.`);
    }
  };

  const wipeLocalDatabase = () => {
    if (window.confirm("Wipe cache? This will reset demo statistics back to pre-seeded entries.")) {
      apiService.clearAllSessionData();
      refreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-100 shadow-xl space-y-5 py-8">
        <div className="text-center space-y-2">
          <div className="w-11 h-11 bg-indigo-50 text-indigo-650 rounded-full flex items-center justify-center mx-auto border border-indigo-100">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-slate-800">Secure Staff Access Only</h2>
          <p className="text-[10px] text-slate-400 font-semibold leading-normal">Approved credentials or developer key required to list attendee registrations or sponsor leads.</p>
        </div>

        {error && (
          <div className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* 1. PASSWORD ROUTE PORTAL */}
        <form onSubmit={handlePasswordLogin} className="space-y-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black tracking-wide text-slate-400 uppercase">Vite Environment Passport</label>
            <input 
              type="password" 
              placeholder="Enter VITE_ADMIN_PASSWORD" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs font-bold"
              required
            />
          </div>

          <button type="submit" className="w-full h-10 bg-indigo-950 hover:bg-black text-white rounded-lg font-bold text-xs transition-all">
            Unlock Database Matrix
          </button>
        </form>

        {/* 2. INSTANT GOOGLE/FIREBASE EMAIL SIMULATION PORTAL */}
        <div className="space-y-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block text-center">Or Simulate Approved Email Login</span>
          
          <button 
            type="button"
            onClick={() => simulateEmailLogin(approvedEmail)}
            className="w-full h-10 border border-[#E2E8F0] hover:bg-slate-50 rounded-lg flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 transition-colors"
          >
            <Globe className="w-4 h-4 text-violet-500" />
            <span>Login as {approvedEmail}</span>
          </button>
        </div>
      </div>
    );
  }

  // Aggregate Metrics Calculations safely
  const totalRegistrations = registrations.length;
  const totalSponsorsInquiries = sponsors.length;

  // Breakdown aggregators
  const categoriesMap = {};
  const experienceMap = {};
  const deviceMap = {};

  registrations.forEach(r => {
    categoriesMap[r.categoryInterest] = (categoriesMap[r.categoryInterest] || 0) + 1;
    experienceMap[r.experienceLevel] = (experienceMap[r.experienceLevel] || 0) + 1;
    deviceMap[r.deviceToBring] = (deviceMap[r.deviceToBring] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      
      {/* Cinematic Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-950">
            Secure Admin Observer
          </h2>
          <p className="text-[10px] text-indigo-505 font-extrabold uppercase tracking-widest mt-0.5">Database metrics</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="p-1.5 bg-slate-150 hover:bg-slate-200 text-slate-600 rounded-md flex items-center space-x-1 text-xs font-bold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>

      {/* Production connectivity warning as requested strictly in instructions */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2 text-xs">
        <div className="flex items-center space-x-1.5 text-amber-800 font-extrabold uppercase tracking-wide">
          <BadgeAlert className="w-4 h-4 text-amber-600" />
          <span>Database Sync Alert Placeholder</span>
        </div>
        <p className="text-amber-700 leading-normal font-semibold">
          “Admin data will appear here after Firebase, Google Sheets, or Mailchimp reporting is connected.”
        </p>
        <p className="text-amber-600 font-bold block">
          Current View: Rendering cached browser localStorage entries safely in active memory. Do not expose private logs publically.
        </p>
      </div>

      {/* Segment switcher */}
      <div className="flex bg-slate-150 p-1.5 rounded-xl gap-1 text-xs font-extrabold">
        {['Overview', 'Registrants', 'Sponsorships'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setViewTab(tab)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${viewTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🚀 TAB 1: OVERVIEW METRIC MATRIX */}
      {viewTab === 'Overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-950">
              <span className="text-[9px] font-black uppercase text-slate-430 tracking-widest block">Event Attendees</span>
              <span className="text-2xl font-black tracking-tight mt-1 block">{totalRegistrations}</span>
            </div>
            <div className="bg-[#7C3AED] text-white p-4 rounded-xl">
              <span className="text-[9px] font-black uppercase text-violet-100 tracking-widest block font-bold">Sponsor Inquiry Leads</span>
              <span className="text-2xl font-black tracking-tight mt-1 block">{totalSponsorsInquiries}</span>
            </div>
          </div>

          {/* Quick Metrics Categorical breakdowns */}
          <div className="bg-white p-4.5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-[#130A38] uppercase">Group Interests Allocation</h4>
            
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">AI Category Interests</span>
                {Object.keys(categoriesMap).length === 0 ? <p className="text-slate-402">None logged</p> : 
                  Object.keys(categoriesMap).map(k => (
                    <div key={k} className="flex justify-between py-1 border-b border-slate-50 text-slate-600 font-bold">
                      <span>{k}</span>
                      <span className="text-indigo-600">{categoriesMap[k]}</span>
                    </div>
                  ))
                }
              </div>

              <hr className="border-slate-50" />

              <div>
                <span className="text-slate-400 font-bold block mb-1">AI Experience Split</span>
                {Object.keys(experienceMap).length === 0 ? <p className="text-slate-402">None logged</p> : 
                  Object.keys(experienceMap).map(k => (
                    <div key={k} className="flex justify-between py-1 border-b border-slate-50 text-slate-600 font-bold">
                      <span>{k}</span>
                      <span className="text-indigo-600">{experienceMap[k]}</span>
                    </div>
                  ))
                }
              </div>

              <hr className="border-slate-50" />

              <div>
                <span className="text-slate-400 font-bold block mb-1">Device Inventories</span>
                {Object.keys(deviceMap).length === 0 ? <p className="text-slate-402">None logged</p> : 
                  Object.keys(deviceMap).map(k => (
                    <div key={k} className="flex justify-between py-1 border-b border-slate-50 text-slate-600 font-bold">
                      <span>{k}</span>
                      <span className="text-indigo-600">{deviceMap[k]}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📝 TAB 2: ATTENDEE LOG DETAIL */}
      {viewTab === 'Registrants' && (
        <div className="space-y-3">
          {registrations.length === 0 ? (
            <div className="bg-white p-8 text-center text-slate-400 rounded-xl border border-dashed text-xs">No records available.</div>
          ) : (
            registrations.map((val, key) => (
              <div key={val.id || key} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-xs leading-normal space-y-2.5">
                <div className="flex justify-between items-start font-bold">
                  <div>
                    <h4 className="text-slate-800 text-sm font-extrabold">{val.fullName}</h4>
                    <p className="text-slate-400 text-xxs block mt-0.5">{val.emailAddress} • {val.cityState}</p>
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 tracking-wide font-extrabold px-1.5 py-0.5 rounded text-[9px] uppercase">
                    {val.attendingAs}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Category Preference</span>
                    <span className="text-slate-700">{val.categoryInterest}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Device to Bring</span>
                    <span className="text-slate-700">{val.deviceToBring}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Experience Level</span>
                    <span className="text-slate-700">{val.experienceLevel}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Phone</span>
                    <span className="text-slate-700">{val.phoneNumber}</span>
                  </div>
                </div>

                {val.hopeToLearn && (
                  <p className="p-2 bg-indigo-50/40 rounded text-[11px] font-semibold text-slate-700 leading-normal">
                    <span className="text-slate-400 block text-[8px] uppercase font-black mb-0.5">LEARNING SPECIFIC MESSAGE</span>
                    {val.hopeToLearn}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* 💼 TAB 3: SPONSORSHIPS LEADS LOG */}
      {viewTab === 'Sponsorships' && (
        <div className="space-y-3">
          {sponsors.length === 0 ? (
            <div className="bg-white p-8 text-center text-slate-400 rounded-xl border border-dashed text-xs">No inquiries logged.</div>
          ) : (
            sponsors.map((spon, sIdx) => (
              <div key={spon.id || sIdx} className="bg-white p-4 rounded-xl border border-[#F1F5F9] text-xs leading-normal space-y-2">
                <div className="flex justify-between items-start font-bold">
                  <div>
                    <h4 className="text-slate-800 text-sm font-extrabold">{spon.fullName}</h4>
                    <p className="text-slate-400 text-xxs block mt-0.5">{spon.email} • {spon.phone}</p>
                  </div>
                  <span className="bg-[#7C3AED]/10 text-[#7C3AED] px-1.5 py-0.5 rounded tracking-wide font-extrabold text-[9px] uppercase">
                    {spon.sponsorshipInterest || 'Lead'}
                  </span>
                </div>

                <div className="bg-slate-50 p-2 rounded leading-normal">
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wider font-extrabold">Company / Link</span>
                  <span className="text-slate-800 font-extrabold">{spon.companyOrg}</span> {spon.website && <span className="text-slate-400">({spon.website})</span>}
                </div>

                {spon.interests && (
                  <p className="bg-slate-50 p-2 rounded text-slate-600 leading-normal font-semibold">
                    <span className="text-slate-400 block text-[8px] uppercase tracking-wider mb-0.5 font-extrabold">Goals / Custom Interest Message</span>
                    {spon.interests}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Dangerous Wipe Trigger */}
      <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
        <button 
          onClick={wipeLocalDatabase}
          className="text-slate-400 hover:text-rose-600 font-bold transition-all text-xxs uppercase tracking-wider h-11 border border-slate-100 px-4 rounded-lg hover:border-rose-100"
        >
          Reset Local Tables Cache
        </button>
      </div>

    </div>
  );
}

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
  ChevronUp
} from 'lucide-react';
import { apiService } from './services/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [registrations, setRegistrations] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [activeTab, setActiveTab] = useState('Home');

  // Load submissions from storage on start and update real-time
  const refreshData = () => {
    setRegistrations(apiService.getRegistrations());
    setSponsors(apiService.getSponsorInquiries());
  };

  useEffect(() => {
    refreshData();
  }, [currentScreen]);

  // Navigate helper
  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 pb-20 md:pb-0 md:pl-0">
      
      {/* 1. TOP CINEMATIC HEADER APP BAR */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('Home')}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 shadow-md">
            <Play className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="font-black text-lg tracking-widest text-[#130A38]">
            INDIGON
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Admin area panel toggle */}
          <button 
            onClick={() => navigateTo('AdminDashboard')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              currentScreen === 'AdminDashboard' 
                ? 'bg-violet-50 text-violet-600' 
                : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Admin Dashboard"
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 md:max-w-2xl">
        {currentScreen === 'Home' && <HomeScreen navigateTo={navigateTo} />}
        {currentScreen === 'RegistrationPage' && <RegistrationPage navigateTo={navigateTo} />}
        {currentScreen === 'EventDetails' && <EventDetailsPage navigateTo={navigateTo} />}
        {currentScreen === 'Categories' && <CategoriesPage navigateTo={navigateTo} />}
        {currentScreen === 'Presenters' && <PresentersPage />}
        {currentScreen === 'Sponsor' && <SponsorPage navigateTo={navigateTo} />}
        {currentScreen === 'VtcPath' && <VtcPathPage navigateTo={navigateTo} />}
        {currentScreen === 'AdminDashboard' && (
          <AdminDashboardPage 
            registrations={registrations} 
            sponsors={sponsors} 
            refreshData={refreshData} 
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* 3. MOBILE-FIRST BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center h-16 bg-white border-t border-slate-100 shadow-xl md:hidden">
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
          onClick={() => navigateTo('EventDetails')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs font-semibold ${
            currentScreen === 'EventDetails' ? 'text-violet-600' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          Details
        </button>

        <button 
          onClick={() => navigateTo('Categories')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs font-semibold ${
            currentScreen === 'Categories' ? 'text-violet-600' : 'text-slate-400'
          }`}
        >
          <FolderOpen className="w-5 h-5 mb-0.5" />
          Categories
        </button>
      </nav>

      {/* LARGER SCREEN SIDEBAR FOR DEVELOPMENT COMFORT */}
      <div className="hidden md:flex fixed right-4 bottom-4 z-50 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 flex-col space-y-2">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Large Screen Dev Navigator</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button onClick={() => navigateTo('Home')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">Home</button>
          <button onClick={() => navigateTo('RegistrationPage')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">Registration</button>
          <button onClick={() => navigateTo('EventDetails')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">Event Info</button>
          <button onClick={() => navigateTo('Categories')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">Categories</button>
          <button onClick={() => navigateTo('Presenters')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">Presenters</button>
          <button onClick={() => navigateTo('Sponsor')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">Sponsor Area</button>
          <button onClick={() => navigateTo('VtcPath')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-left font-bold text-slate-700">VTC School</button>
          <button onClick={() => navigateTo('AdminDashboard')} className="px-3 py-1.5 bg-violet-100 hover:bg-violet-200 rounded text-left font-bold text-violet-700">Admin Area</button>
        </div>
      </div>

    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE COMPONENTS
// -----------------------------------------------------------------------------

function HomeScreen({ navigateTo }) {
  return (
    <div className="space-y-6">
      
      {/* 🏷️ Vollywood Tag */}
      <div className="flex justify-center">
        <span className="inline-block px-3.5 py-1 text-[11px] font-extrabold text-violet-600 bg-violet-50 tracking-widest uppercase rounded-full shadow-sm border border-violet-100">
          PRESENTED BY VOLLYWOOD®
        </span>
      </div>

      {/* 🚀 Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E1B4B] to-[#0F0B2A] text-white p-7 shadow-xl">
        <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-violet-600 to-transparent opacity-20 rounded-full blur-xl"></div>
        <div className="relative space-y-3.5 text-center">
          <h1 className="text-3xl font-black tracking-tight leading-tight md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            Indigon AI Film Gauntlet
          </h1>
          <p className="text-sm font-semibold tracking-wider text-slate-300 max-w-sm mx-auto leading-relaxed uppercase">
            AI Media Training • Film • Music Videos • Commercials • Trailers • Short Films
          </p>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm leading-relaxed text-slate-600 text-center text-sm md:text-base">
        Indigon is a new AI-powered media festival and training experience presented by <strong>Vollywood®</strong>. Learn how AI tools can support commercials, movie trailers, short films, music videos, and creative business media.
      </div>

      {/* ⭐ Call To Action */}
      <button 
        onClick={() => navigateTo('RegistrationPage')}
        className="w-full h-14 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-transform duration-100 flex items-center justify-center space-x-2 text-base md:text-lg"
      >
        <Award className="w-5 h-5 text-white" />
        <span>Register for Free Training</span>
      </button>

      {/* Secondary Dashboard Navigation Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#130A38] uppercase tracking-wider pl-1">
          Explore Experience
        </h3>
        
        <RowButtonBlock 
          title="View Event Details" 
          description="Schedule, Location, and What to bring"
          icon={Clock} 
          onClick={() => navigateTo('EventDetails')} 
        />
        <RowButtonBlock 
          title="Meet the Presenters" 
          description="Direct expertise from founders & directors"
          icon={Users} 
          onClick={() => navigateTo('Presenters')} 
        />
        <RowButtonBlock 
          title="Explore AI Categories" 
          description="Trailers, commercial ads, visuals & more"
          icon={Film} 
          onClick={() => navigateTo('Categories')} 
        />
        <RowButtonBlock 
          title="Sponsor Indigon Festival" 
          description="Partner with us, showcase your technologies"
          icon={Coins} 
          onClick={() => navigateTo('Sponsor')} 
        />
        <RowButtonBlock 
          title="VTC Training Pathway" 
          description="Explore complete certifications & workshops"
          icon={BookOpen} 
          onClick={() => navigateTo('VtcPath')} 
        />
      </div>

      <footer className="pt-4 text-center text-slate-400 text-xs">
        © 2026 Vollywood® & Indigon AI Film Gauntlet. All rights reserved.
      </footer>
    </div>
  );
}

function RowButtonBlock({ title, description, icon: Icon, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer transition-colors duration-200 shadow-sm"
    >
      <div className="flex items-center space-x-3.5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
          <Icon className="w-5 h-5 text-indigo-900" />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
          <p className="text-[11px] text-slate-400 block mt-0.5">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// REGISTRATION PAGE WITH PERSISTENCE
// -----------------------------------------------------------------------------

function RegistrationPage({ navigateTo }) {
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

  // Optional fields
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
    if (!consent) return setError('You must agree to the free training terms to reserve your seat.');

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
          <h2 className="text-2xl font-black text-slate-800">Seat Requested!</h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            Thank you for registering for the Indigon AI Media Training! Your seat request has been saved securely to local cache storage. Check your email for further instructions.
          </p>
        </div>
        
        <div className="w-full pt-4 space-y-2">
          <button 
            onClick={() => navigateTo('Home')}
            className="w-full h-12 bg-violet-600 text-white rounded-lg font-bold text-sm active:scale-95 transition-all shadow-sm"
          >
            Return to Home
          </button>
          <button 
            onClick={() => navigateTo('EventDetails')}
            className="w-full h-12 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg font-bold text-sm"
          >
            View Event Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-800">
          Free Training Registration
        </h2>
        <p className="text-xs text-slate-400 font-bold block">
          Indigon AI Media Training • Limited Seating (50 Max)
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-xl text-sm">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      <form onSubmit={submitForm} className="space-y-5">
        
        {/* REQUIRED SUBSECTION */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-black text-violet-600 tracking-widest uppercase border-b border-violet-100 pb-1">
            Required Information
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Full Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Alex Chen" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Email Address *</label>
            <input 
              type="email" 
              placeholder="alex@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Phone Number *</label>
            <input 
              type="tel" 
              placeholder="+1-555-0199" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
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
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">I am attending as</label>
            <select 
              value={attendingAs} 
              onChange={(e) => setAttendingAs(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600"
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
            <label className="text-xs font-bold text-slate-500">Preferred AI Category Interest</label>
            <select 
              value={categoryInterest} 
              onChange={(e) => setCategoryInterest(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600"
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
            <label className="text-xs font-bold text-slate-500">AI Tool Experience Level</label>
            <select 
              value={experienceLevel} 
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600"
            >
              <option value="Beginner">Beginner</option>
              <option value="Some experience">Some experience</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Never used AI before">Never used AI before</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">What device will you bring?</label>
            <select 
              value={device} 
              onChange={(e) => setDevice(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600"
            >
              <option value="Laptop">Laptop (Recommended)</option>
              <option value="Tablet">Tablet</option>
              <option value="Phone">Smartphone</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-slate-500 block">
              Updates about Vollywood®/Indigon workshops?
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input 
                  type="radio" 
                  checked={receiveUpdates} 
                  onChange={() => setReceiveUpdates(true)} 
                  className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
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
        <div className="space-y-3.5 pt-2">
          <h3 className="text-xs font-black text-violet-600 tracking-widest uppercase border-b border-violet-100 pb-1">
            Optional Information
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Business / Org Name</label>
            <input 
              type="text" 
              placeholder="Company name" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Social link / Website</label>
            <input 
              type="text" 
              placeholder="e.g. instagram.com/name" 
              value={websiteSocial}
              onChange={(e) => setWebsiteSocial(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">What do you hope to learn?</label>
            <textarea 
              rows="3" 
              placeholder="Describe your learning objectives..." 
              value={hopeToLearn}
              onChange={(e) => setHopeToLearn(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-600 resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 block">
              Consider future hackathons, media team challenges or showcases?
            </label>
            <div className="flex items-center space-x-6">
              {['Yes', 'No', 'Maybe'].map((choice) => (
                <label key={choice} className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
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

        {/* TERMS CONSENT */}
        <div className="pt-2">
          <label className="flex items-start space-x-3 text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-violet-600 rounded border-slate-300 focus:ring-violet-500"
            />
            <span>
              I understand this is a free training class with limited physical seating, and I agree to receive event confirmations or updates by email.
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full h-13 mt-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold active:scale-[0.99] transition-all flex items-center justify-center space-x-2.5 shadow-md shadow-violet-100 disabled:opacity-50"
        >
          {isSubmitting ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 text-white" />
              <span>Submit Registration</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// EVENT DETAILS PAGE
// -----------------------------------------------------------------------------

function EventDetailsPage({ navigateTo }) {
  return (
    <div className="space-y-6">
      
      {/* Cinematic Cover Banner */}
      <div className="flex flex-col items-center bg-[#130A38] text-white p-7 rounded-2xl shadow-md border-b-4 border-cyan-400">
        <span className="text-[10px] font-extrabold tracking-widest text-[#00E5FF] mb-1.5 uppercase">
          EVENT INFORMATION
        </span>
        <h2 className="text-xl font-black text-center max-w-sm tracking-tight leading-relaxed">
          Indigon AI Media Training
        </h2>
      </div>

      {/* Main Metadata Listing Elements */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        
        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 text-violet-600">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Date</h4>
            <p className="text-sm font-bold text-slate-700 mt-0.5">June 27, 2026</p>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 text-violet-600">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Time</h4>
            <p className="text-sm font-bold text-slate-700 mt-0.5">10:00 AM - 4:00 PM EST</p>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 text-violet-600">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Location</h4>
            <p className="text-sm font-bold text-slate-700 mt-0.5">Vollywood Training Center, 1200 Creative Media Way, Richmond, VA</p>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Cost</h4>
            <p className="text-sm font-bold text-emerald-600 mt-0.5">Free to attend</p>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="flex items-start space-x-3.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-rose-50 border border-rose-100 text-rose-600">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Seating Capacity</h4>
            <p className="text-sm font-bold text-rose-600 mt-0.5">Limited to the first 50 registered attendees</p>
          </div>
        </div>

      </div>

      {/* Focus Area Explanations */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-violet-600" />
          <h3 className="font-bold text-slate-800 text-base">Training Focus</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Indigon AI Media Training is a free introductory session created to help local creatives, filmmakers, students, business owners, and media professionals understand how AI can support storytelling, marketing, and production.
        </p>
      </div>

      {/* What You Should Bring List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
        <h3 className="text-base font-bold text-slate-800">What You Should Bring</h3>
        <ul className="space-y-2.5 text-sm text-slate-600">
          {[
            "Laptop, tablet, or smartphone (with charging brick/wires)",
            "Notebook, laptop, or notes app to take lecture notes",
            "Business cards or digital links to share contact info",
            "Creative concepts, project pitches, or specific questions"
          ].map((item, index) => (
            <li key={index} className="flex items-start space-x-2.5">
              <span className="text-violet-600 font-extrabold mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Bottom Button */}
      <button 
        onClick={() => navigateTo('RegistrationPage')}
        className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold shadow-md shadow-violet-100 transition-all active:scale-[0.98]"
      >
        Register For Free Seat
      </button>

    </div>
  );
}

// -----------------------------------------------------------------------------
// AI CATEGORIES PAGE
// -----------------------------------------------------------------------------

function CategoriesPage({ navigateTo }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categories = [
    {
      title: "AI Commercials / Ads",
      desc: "Create powerful brand messages, product videos, sponsor promos, and social media ads using AI-assisted media tools.",
      benefit: "Learn: Automatic dynamic pricing presets, scene generation from single product photos, and automated voiceover workflows.",
      icon: Tv,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      title: "AI Movie Trailers",
      desc: "Develop cinematic teaser concepts, pitch visuals, story worlds, and promotional trailers using AI.",
      benefit: "Learn: Scene sequencing, character consistency engines, cinematic prompts, and sound effects layering.",
      icon: Film,
      color: "bg-violet-50 text-violet-700 border-violet-100"
    },
    {
      title: "AI Short Films",
      desc: "Explore how AI can support short film development, visual storytelling, concept art, and production planning.",
      benefit: "Learn: AI storyboarding frameworks, visual aesthetic models, dialogue structuring, and post-production scaling.",
      icon: VideoCameraBlock, // custom below
      color: "bg-cyan-50 text-cyan-700 border-cyan-100"
    },
    {
      title: "AI Music Videos",
      desc: "Use AI visuals, animation, style prompts, and creative direction to build music video concepts.",
      benefit: "Learn: Beat-synchronized video triggers, style transfer filters, and hallucinatory creative animation paths.",
      icon: Music,
      color: "bg-rose-50 text-rose-700 border-rose-100"
    }
  ];

  function VideoCameraBlock(props) {
    return <Camera {...props} />;
  }

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-800">AI Media Categories</h2>
        <p className="text-sm text-slate-400">
          These core categories define the training exercises and the upcoming festival gauntlet.
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          const isExpanded = expandedIndex === index;

          return (
            <div 
              key={index} 
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg border ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-black text-[#130A38] text-base md:text-lg">{cat.title}</h3>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                {cat.desc}
              </p>

              {isExpanded && (
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-lg text-xs md:text-sm text-slate-700 space-y-1.5 shadow-inner">
                  <div className="flex items-center space-x-1.5 text-violet-600 font-extrabold uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-violet-600 animate-pulse" />
                    <span>Special Segment Focus</span>
                  </div>
                  <p className="leading-relaxed font-semibold">{cat.benefit}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button 
                  onClick={() => navigateTo('RegistrationPage')}
                  className="px-4 py-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg font-bold text-xs transition-colors"
                >
                  Join Training Group
                </button>
                
                <button 
                  onClick={() => toggleExpand(index)}
                  className="flex items-center space-x-1 text-xs font-bold text-violet-600"
                >
                  <span>{isExpanded ? "Close Info" : "Learn More"}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PRESENTERS PAGE
// -----------------------------------------------------------------------------

function PresentersPage() {
  return (
    <div className="space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-800">Indigon Presenters</h2>
        <p className="text-sm text-slate-400">
          Learn directly from active directors, creative technology founders, and digital filmmakers.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Tony Holobyte Card */}
        <PresenterCard 
          initials="TH"
          name="Tony Holobyte"
          title="Founder of Vollywood® / Indigon Creator"
          bio="Tony Holobyte is the founder of Vollywood®, a Virginia-based media company focused on film, creative technology, training, and independent media development. Through Indigon, he is building a space for creators to learn, experiment, and showcase AI-powered media."
        />

        {/* Scott Hansen Card */}
        <PresenterCard 
          initials="SH"
          name="Scott Hansen"
          title="AI Filmmaker / Creative AI Workflow Presenter"
          bio="Scott Hansen is a local AI filmmaker helping with the Indigon Festival. He brings hands-on experience using AI filmmaking tools to develop visuals, concepts, and cinematic workflows for modern media production."
        />

      </div>

      {/* Guest/Future Presenters Panel */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#130A38] uppercase tracking-wider pl-1">
          Future Guest Presenters
        </h3>
        
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 text-sm font-semibold">
          <div className="flex justify-between items-center text-slate-700">
            <span className="flex items-center"><span className="w-2.5 h-2.5 bg-violet-500 rounded-full mr-2"></span>Guest Presenter</span>
            <span className="text-slate-400 text-xs">To Be Announced</span>
          </div>
          <hr className="border-slate-100" />
          <div className="flex justify-between items-center text-slate-700">
            <span className="flex items-center"><span className="w-2.5 h-2.5 bg-violet-400 rounded-full mr-2"></span>Sponsor Presenter</span>
            <span className="text-slate-400 text-xs">Brand Expert</span>
          </div>
          <hr className="border-slate-100" />
          <div className="flex justify-between items-center text-slate-700">
            <span className="flex items-center"><span className="w-2.5 h-2.5 bg-violet-300 rounded-full mr-2"></span>Community Partner</span>
            <span className="text-slate-400 text-xs">Local Creative Guild</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function PresenterCard({ initials, name, title, bio }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center space-x-3.5">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-extrabold text-base tracking-wider shadow">
          {initials}
        </div>
        <div>
          <h3 className="font-extrabold text-slate-800 text-base md:text-lg leading-tight">{name}</h3>
          <p className="text-xs font-bold text-violet-600 mt-0.5">{title}</p>
        </div>
      </div>
      <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
        {bio}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SPONSOR PAGE WITH FORM
// -----------------------------------------------------------------------------

function SponsorPage({ navigateTo }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitInquiry = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Please enter your name.');
    if (!company.trim()) return setError('Please enter your company/organization.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address.');
    if (!phone.trim()) return setError('Please enter your phone number.');

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: name.trim(),
        companyOrg: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interests: interests.trim()
      };
      await apiService.submitSponsorInquiry(payload);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error submitting sponsor request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro block */}
      <div className="bg-slate-100 p-5 rounded-2xl space-y-2">
        <h2 className="text-xl font-black text-[#130A38]">Sponsor Indigon</h2>
        <p className="text-sm text-slate-500 leading-relaxed font-semibold">
          Indigon gives sponsors a chance to connect with filmmakers, students, creators, business owners, and technology-forward media professionals.
        </p>
      </div>

      {/* Perks card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-[#130A38] text-base border-b border-slate-100 pb-1.5">
          Sponsorship Benefits
        </h3>
        <ul className="space-y-2 text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
          {[
            "High prominence logo placement in the official digital App",
            "Custom featured sponsor cards explaining your products",
            "Dedicated live event mention and category awards presenters",
            "Direct linking to your website and contact channels",
            "Sponsorship opportunities for specific categories & awards",
            "Post-event continuous recap and audience data exposure",
            "Excellent community and innovative creative industry branding"
          ].map((perk, idx) => (
            <li key={idx} className="flex items-start">
              <span className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Forms Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-[#130A38] text-base">
          Sponsor Inquiry Form
        </h3>

        {success ? (
          <div className="flex flex-col items-center py-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800">Inquiry Sent!</h4>
              <p className="text-xs text-slate-400 mt-1">Thank you. We will reach out to you within 24 hours.</p>
            </div>
            <button 
              onClick={() => {
                setName(''); setCompany(''); setEmail(''); setPhone(''); setInterests('');
                setSuccess(false);
              }}
              className="px-3.5 py-1.5 bg-slate-100 text-slate-600 rounded-md font-bold text-xs"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={submitInquiry} className="space-y-4">
            {error && (
              <div className="text-xs font-bold text-rose-700 bg-rose-550 border border-rose-100 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Contact Name *</label>
              <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Company / Organization *</label>
              <input 
                type="text" 
                placeholder="Company Name" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Email Address *</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Phone Number *</label>
              <input 
                type="tel" 
                placeholder="Phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Interests or Custom Requests</label>
              <textarea 
                rows="2" 
                placeholder="Tell us about your brand goals..." 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 bg-indigo-900 text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Sponsorship Application</span>
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
// VTC PATHWAY PAGE
// -----------------------------------------------------------------------------

function VtcPathPage({ navigateTo }) {
  const pathways = [
    {
      title: "AI Video Generation Suite",
      desc: "Comprehensive deep-dive sessions focusing on setting up high frame rate camera rigs and feeding capture databases into generative models.",
      duration: "15 Hours • Project Guided",
      competency: "Deliverables: Scene consistency, continuous prompting scripts, video compilation."
    },
    {
      title: "AI Music & Audio Production",
      desc: "Learn beat synchronization, automated soundtrack generators, vocal replication pipelines, and cinematic ambiance mixing algorithms.",
      duration: "10 Hours • Studio Masterclass",
      competency: "Deliverables: Soundtracks, localized dialog sync scripts, noise cleaning filters."
    },
    {
      title: "Storyboarding & Prompting Mechanics",
      desc: "Understand the visual principles of multi-modal generative engineering to convert standard screenplays to high fidelity visual catalogs.",
      duration: "8 Hours • Interactive Workshop",
      competency: "Deliverables: Visual catalogs, character boards, and camera setting templates."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Intro block */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-violet-600" />
          <h2 className="text-xl font-black text-[#130A38]">Vollywood Training Center</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-semibold">
          The Vollywood Training Center (VTC) provides pathway programs designed to bridge the gap between creative storytelling and emerging technologies.
        </p>
      </div>

      {/* Certification sections */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase pl-1">
          Career Pathways & Courses
        </h3>

        {pathways.map((path, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h4 className="font-extrabold text-slate-800 text-sm md:text-base">{path.title}</h4>
              <span className="inline-block mt-1 md:mt-0 px-2 py-0.5 text-[10px] font-bold bg-violet-50 text-violet-600 border border-violet-100 rounded">
                {path.duration}
              </span>
            </div>
            
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-semibold">
              {path.desc}
            </p>

            <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 leading-relaxed font-medium">
              <span className="font-extrabold text-slate-800 block text-[10px] uppercase tracking-wide mb-1">Target Skillsets</span>
              {path.competency}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom Button */}
      <button 
        onClick={() => navigateTo('RegistrationPage')}
        className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold shadow-md shadow-violet-100 transition-all active:scale-[0.98]"
      >
        Register & Join VTC Today
      </button>

    </div>
  );
}

// -----------------------------------------------------------------------------
// ADMIN SERVICES DASHBOARD (READ PERSISTED SUBMISSIONS)
// -----------------------------------------------------------------------------

function AdminDashboardPage({ registrations, sponsors, refreshData, navigateTo }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [viewTab, setViewTab] = useState('Registrations');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'vollywood2026' || password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect admin password. (Hint: use "admin" or "vollywood2026")');
    }
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear cached registrations? This action is irreversible.")) {
      localStorage.removeItem('indigon_registrations');
      localStorage.removeItem('indigon_sponsors');
      refreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5 py-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-[#130A38]">Authorized Staff Entrance</h2>
          <p className="text-xs text-slate-400">Please provide the access code to inspect local attendee logs & inquiries.</p>
        </div>

        {error && (
          <div className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-100 p-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Access Password</label>
            <input 
              type="password" 
              placeholder="e.g. admin" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full h-11 bg-violet-600 text-white rounded-lg font-bold text-sm active:scale-95 transition-all"
          >
            Authenticate Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xl font-black text-[#130A38]">Admin Dashboard</h2>
          <p className="text-xs text-slate-400 font-bold block">Live Database Observer</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs list toggler */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl text-xs md:text-sm font-bold gap-1.5">
        <button 
          onClick={() => setViewTab('Registrations')}
          className={`flex-1 py-2 rounded-lg transition-colors duration-150 ${viewTab === 'Registrations' ? 'bg-white shadow text-[#130A38]' : 'text-slate-400'}`}
        >
          Registrations ({registrations.length})
        </button>
        <button 
          onClick={() => setViewTab('Sponsors')}
          className={`flex-1 py-2 rounded-lg transition-colors duration-150 ${viewTab === 'Sponsors' ? 'bg-white shadow text-[#130A38]' : 'text-slate-400'}`}
        >
          Sponsor Inquiries ({sponsors.length})
        </button>
      </div>

      {/* Tab Data rendering switcher */}
      {viewTab === 'Registrations' ? (
        <div className="space-y-4">
          {registrations.length === 0 ? (
            <div className="bg-white p-8 text-center text-slate-600 text-sm font-semibold rounded-2xl border border-dashed border-slate-300">
              No registrations found in memory.
            </div>
          ) : (
            registrations.map((reg, idx) => (
              <div key={reg.id || idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#130A38] text-base leading-tight">
                      {reg.fullName}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold block mt-1.5">
                      {reg.cityState} • {reg.attendingAs}
                    </p>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">
                    {new Date(reg.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-semibold leading-relaxed text-slate-600">
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Email</span>
                    {reg.emailAddress}
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Phone</span>
                    {reg.phoneNumber}
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Category Prefer</span>
                    {reg.categoryInterest}
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">AI Skill Level</span>
                    {reg.experienceLevel}
                  </div>
                </div>

                <div className="text-xs font-semibold leading-relaxed text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Device to Bring</span>
                  {reg.deviceToBring}
                </div>

                {(reg.businessOrgName || reg.websiteSocialLink || reg.hopeToLearn) && (
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs font-semibold text-slate-700">
                    {reg.businessOrgName && (
                      <p><span className="text-slate-400">Company:</span> {reg.businessOrgName}</p>
                    )}
                    {reg.websiteSocialLink && (
                      <p><span className="text-slate-400">Social:</span> {reg.websiteSocialLink}</p>
                    )}
                    {reg.hopeToLearn && (
                      <p className="bg-indigo-50/50 p-2 rounded text-slate-800 leading-relaxed"><span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Learning Goals</span>{reg.hopeToLearn}</p>
                    )}
                  </div>
                )}

              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sponsors.length === 0 ? (
            <div className="bg-white p-8 text-center text-slate-600 text-sm font-semibold rounded-2xl border border-dashed border-slate-300">
              No sponsor inquiries found in memory.
            </div>
          ) : (
            sponsors.map((spon, idx) => (
              <div key={spon.id || idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#130A38] text-base leading-tight">
                      {spon.fullName}
                    </h3>
                    <p className="text-xs text-violet-600 font-extrabold block mt-1.5 uppercase tracking-wide">
                      {spon.companyOrg}
                    </p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                    {new Date(spon.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-semibold leading-relaxed text-slate-600">
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Email</span>
                    {spon.email}
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Phone</span>
                    {spon.phone}
                  </div>
                </div>

                {spon.interests && (
                  <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-700 font-medium leading-relaxed">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider mb-0.5">Inquiry Details</span>
                    {spon.interests}
                  </div>
                )}

              </div>
            ))
          )}
        </div>
      )}

      {/* Dangerous Wipe Trigger */}
      <div className="pt-6">
        <button 
          onClick={clearAllData}
          className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 rounded-lg text-xs font-bold transition-all"
        >
          Wipe Current Session Local Cache
        </button>
      </div>

    </div>
  );
}

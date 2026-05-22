/**
 * Data Storage Engine for Indigon AI Film Gauntlet
 * Uses local browser storage (localStorage) for persistent demo entries,
 * with fully designed async API hooks ready to switch to Firebase, 
 * Google Sheets, or a custom REST API.
 */

const REGISTRATION_KEY = 'indigon_registrations';
const SPONSOR_KEY = 'indigon_sponsors';

// Seed initial mock entries if none exist so the Admin View is interesting as requested
const seedInitialDataIfNeeded = () => {
  if (!localStorage.getItem(REGISTRATION_KEY)) {
    const initialRegs = [
      {
        id: 'reg_1',
        fullName: 'Alex Chen',
        emailAddress: 'alex.chen@example.com',
        phoneNumber: '+1-555-0199',
        cityState: 'Richmond, VA',
        attendingAs: 'Filmmaker',
        categoryInterest: 'AI Movie Trailers',
        experienceLevel: 'Intermediate',
        deviceToBring: 'Laptop',
        receiveUpdates: 'Yes',
        businessOrgName: 'Hyperion Films',
        websiteSocialLink: 'hyperionfilms.co',
        hopeToLearn: 'How to generate high fidelity sequences using Runway & Midjourney.',
        considerFutureChallenges: 'Yes',
        timestamp: Date.now() - 3600000 * 24 // 1 day ago
      },
      {
        id: 'reg_2',
        fullName: 'Sarah Jenkins',
        emailAddress: 'sarah.j@example.com',
        phoneNumber: '+1-555-0142',
        cityState: 'Virginia Beach, VA',
        attendingAs: 'Content Creator',
        categoryInterest: 'AI Commercials / Ads',
        experienceLevel: 'Beginner',
        deviceToBring: 'Tablet',
        receiveUpdates: 'Yes',
        businessOrgName: 'Sarah Media Group',
        websiteSocialLink: 'instagram.com/sarahcreate',
        hopeToLearn: 'Practical automation workflows for short-form video ads.',
        considerFutureChallenges: 'Maybe',
        timestamp: Date.now() - 3600000 * 5 // 5 hours ago
      }
    ];
    localStorage.setItem(REGISTRATION_KEY, JSON.stringify(initialRegs));
  }

  if (!localStorage.getItem(SPONSOR_KEY)) {
    const initialSponsors = [
      {
        id: 'spon_1',
        fullName: 'Victoria Vance',
        companyOrg: 'Vance Tech Lab',
        email: 'victoria@vancetech.io',
        phone: '+1-555-8888',
        interests: 'Interested in sponsoring the Technology Partner category and showcasing local tech tools.',
        timestamp: Date.now() - 3600000 * 2
      }
    ];
    localStorage.setItem(SPONSOR_KEY, JSON.stringify(initialSponsors));
  }
};

seedInitialDataIfNeeded();

export const apiService = {
  /**
   * Save a registration to localStorage.
   * Ready for Firebase / Google Sheets. See comments inside on how to implement.
   */
  async submitRegistration(data) {
    // Simulate network delay for high fidelity feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    // =========================================================================
    // FUTURE GOOGLE SHEETS / APP SCRIPT CONNECTIVITY:
    // To connect to Google Sheets, you can use a free web app URL deployed via Google Apps Script:
    //
    // const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
    // await fetch(SCRIPT_URL, {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // =========================================================================

    // =========================================================================
    // FUTURE FIREBASE REALTIME DATABASE / FIRESTORE CONNECTIVITY:
    // To connect to Firebase, initialize firebase app and call:
    //
    // import { getFirestore, collection, addDoc } from "firebase/firestore";
    // const db = getFirestore();
    // await addDoc(collection(db, "registrations"), { ...data, timestamp: Date.now() });
    // =========================================================================

    const registrations = this.getRegistrations();
    const newEntry = {
      id: 'reg_' + Math.random().toString(36).substring(2, 9),
      ...data,
      timestamp: Date.now()
    };
    
    registrations.unshift(newEntry);
    localStorage.setItem(REGISTRATION_KEY, JSON.stringify(registrations));
    return newEntry;
  },

  /**
   * Get all registrations (useful for Admin area)
   */
  getRegistrations() {
    const raw = localStorage.getItem(REGISTRATION_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  /**
   * Save a sponsor inquiry to localStorage. 
   */
  async submitSponsorInquiry(data) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // =========================================================================
    // FUTURE GOOGLE SHEETS / APPS SCRIPT / EMAIL CONNECTIVITY:
    // Send inquiries directly to sponsor sheets or Tony's inbox.
    // =========================================================================

    const inquiries = this.getSponsorInquiries();
    const newEntry = {
      id: 'spon_' + Math.random().toString(36).substring(2, 9),
      ...data,
      timestamp: Date.now()
    };

    inquiries.unshift(newEntry);
    localStorage.setItem(SPONSOR_KEY, JSON.stringify(inquiries));
    return newEntry;
  },

  /**
   * Get all sponsor inquiries (useful for Admin area)
   */
  getSponsorInquiries() {
    const raw = localStorage.getItem(SPONSOR_KEY);
    return raw ? JSON.parse(raw) : [];
  }
};

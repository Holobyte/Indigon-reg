/**
 * Data Storage & Mailchimp Endpoint Service
 * for Indigon AI Film Gauntlet (Vollywood®)
 * 
 * Configured with active local client persistence (localStorage) as a robust
 * backup database engine, plus secure placeholder functions for Google Sheets,
 * Firebase Firestore, and direct Mailchimp audencing.
 */

const REGISTRATION_KEY = 'indigon_registrations_v2';
const SPONSOR_KEY = 'indigon_sponsors_v2';

// Pre-seeded registration database elements
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
        website: 'vancetech.io',
        sponsorshipInterest: 'Category Sponsor',
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
   * 1. Submit Event Registration Form
   * Handles local caching and delegates Mailchimp synchronization safely.
   */
  async submitRegistration(data) {
    // Simulate low-latency high-fidelity API call response
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Save locally
    const registrations = this.getRegistrations();
    const newEntry = {
      id: 'reg_' + Math.random().toString(36).substring(2, 9),
      ...data,
      timestamp: Date.now()
    };
    
    registrations.unshift(newEntry);
    localStorage.setItem(REGISTRATION_KEY, JSON.stringify(registrations));

    // Send to Mailchimp Placeholder backend dispatcher
    try {
      await this.submitEventSignupToMailchimp(newEntry);
    } catch (e) {
      console.warn("Mailchimp auto-sync pipeline placeholder log:", e.message);
    }

    return newEntry;
  },

  /**
   * 2. Submit Sponsor Inquiry Page Form
   */
  async submitSponsorInquiry(data) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Save locally
    const inquiries = this.getSponsorInquiries();
    const newEntry = {
      id: 'spon_' + Math.random().toString(36).substring(2, 9),
      ...data,
      timestamp: Date.now()
    };

    inquiries.unshift(newEntry);
    localStorage.setItem(SPONSOR_KEY, JSON.stringify(inquiries));

    // Send to Mailchimp Sponsor Lead pipeline
    try {
      await this.submitSponsorLeadToMailchimp(newEntry);
    } catch (e) {
      console.warn("Mailchimp Sponsor pipeline placeholder log:", e.message);
    }

    return newEntry;
  },

  /**
   * Reading Registrations list from memory
   */
  getRegistrations() {
    const raw = localStorage.getItem(REGISTRATION_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  /**
   * Reading Sponsor list from memory
   */
  getSponsorInquiries() {
    const raw = localStorage.getItem(SPONSOR_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  /**
   * Clean local caching database
   */
  clearAllSessionData() {
    localStorage.removeItem(REGISTRATION_KEY);
    localStorage.removeItem(SPONSOR_KEY);
    seedInitialDataIfNeeded();
  },

  // =========================================================================
  // SECURE MAILCHIMP INTEGRATION ENGINE (PLACEHOLDERS)
  // =========================================================================

  /**
   * Placeholder to submit Event Signups to Mailchimp.
   * Leveraged in backend/serverless configurations to keep API Keys secure.
   */
  async submitEventSignupToMailchimp(contact) {
    console.log("Mailchimp Sync Triggered: [Indigon Event Signup]", contact);

    // Split Name for Mailchimp FNAME / LNAME parameters if possible
    const nameParts = contact.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const mailchimpPayload = {
      email_address: contact.emailAddress,
      status: "subscribed",
      tags: ["Indigon Event Signup"],
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: contact.phoneNumber,
        CITYSTATE: contact.cityState,
        ATT_TYPE: contact.attendingAs,
        CAT_INT: contact.categoryInterest,
        AI_EXP: contact.experienceLevel,
        DEVICE: contact.deviceToBring,
        SOURCE: "Indigon App Registration"
      }
    };

    /**
     * CONFIGURATION BLUEPRINT:
     * 
     * To invoke this securely, deploy a microservice (e.g. Firebase Function or Vercel serverless) with:
     * 1. MAILCHIMP_API_KEY
     * 2. MAILCHIMP_SERVER_PREFIX (e.g. 'us21')
     * 3. MAILCHIMP_AUDIENCE_ID
     * 
     * Code backend logic to be:
     * 
     * app.post('/api/register', async (req, res) => {
     *   const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`;
     *   const response = await fetch(url, {
     *     method: 'POST',
     *     headers: {
     *       'Authorization': `ApiKey ${process.env.MAILCHIMP_API_KEY}`,
     *       'Content-Type': 'application/json'
     *     },
     *     body: JSON.stringify(mailchimpPayload)
     *   });
     *   if (response.ok) res.status(200).json({ success: true });
     *   else res.status(response.status).json(await response.json());
     * });
     */
    return { status: "simulated_success", payload: mailchimpPayload };
  },

  /**
   * Placeholder to submit Sponsor Inquiry Leads to Mailchimp.
   */
  async submitSponsorLeadToMailchimp(lead) {
    console.log("Mailchimp Sync Triggered: [Indigon Sponsor Lead]", lead);

    const nameParts = lead.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const mailchimpPayload = {
      email_address: lead.emailAddress,
      status: "subscribed",
      tags: ["Indigon Sponsor Lead"],
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: lead.phoneNumber,
        COMPANY: lead.companyOrg,
        WEBSITE: lead.website || "",
        SPLVL: lead.sponsorshipInterest || "Not Sure Yet",
        MESSAGE: lead.interests || "",
        SOURCE: "Indigon App Sponsor Form"
      }
    };

    /**
     * CONFIGURATION BLUEPRINT:
     * Same backend as above, referencing MAILCHIMP_API_KEY & Audience ID credentials.
     */
    return { status: "simulated_success", payload: mailchimpPayload };
  }
};

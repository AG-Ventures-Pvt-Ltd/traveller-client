export const API_ENDPOINTS = {
  TRIPS: {
    BASIC_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/basic`,
    BOOKING_OPTIONS: (slug: string, batchId:string) => `/api/client/v1/trips/${slug}/booking-options?batchId=${batchId}`,
    DETAILED_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/detailed`,
    FEATURED_TRIPS: (limit: string) => `/api/client/v1/trips/featured?limit=${limit}`,
    HOST_TRIPS: (hostUsername: string) => `/api/client/v1/trips/user/${hostUsername}`,
    BATCH_DETAILS: (batchId: string) => `/api/client/v1/trips/host/trip/batch/${batchId}`,
    GET_METADATA : (id : string) => `/api/client/v1/trips/${id}/metadata`,
    GET_SLUGS_FOR_SITEMAP :`/api/client/v1/trips/sitemap`
  },
  BOOKINGS: {
    START: "/api/client/v1/bookings/start",
    GET_BY_ID: (id: string) => `/api/client/v1/bookings/${id}`,
    GET_TRAVELERS : (id:string) => `/api/client/v1/bookings/${id}/travelers` , 
    DETAILS: (id: string) => `/api/client/v1/bookings/details/${id}`,
    UPDATE_IN_BOOKING_FLOW : (id:string) => `/api/client/v1/bookings/update/${id}`,
    UPDATE_TRVELERS_DATA : (id : string) =>  `/api/client/v1/bookings/${id}/update/travelers`,
    GET_BOOKING_DETAILS_FOR_UPDATE : (id:string) => `/api/client/v1/bookings/creationflow/${id}`,
    VALIDATE_EMAIL_REGISTRATION : (email : string) => `/api/client/v1/user/validate/email?email=${encodeURIComponent(email)}`
  },
  PAYMENTS: {
    START: "/api/client/v1/payments/start",
    WALLET_START: "/api/client/v1/payments/wallet/start",
  },
  DISCOUNTS: {
    GET_AVAILABLE: (tripId: string, email?: string) => {
      const baseUrl = `/api/client/v1/discounts/${tripId}`;
      return email ? `${baseUrl}?email=${encodeURIComponent(email)}` : baseUrl;
    },
  },
  SUPPORT: {
    CREATE_TICKET: "/api/client/v1/support/tickets/create",
    GET_TICKETS: "/api/client/v1/support/tickets/me",
  },
  BOOKMARKS: {
    GET_USER_BOOKMARKS: "/api/client/v1/bookmarks/me",
    TOGGLE_BOOKMARK: "/api/client/v1/bookmarks/toggle/me",
  },
  GUEST_USERS: {
    CREATE: "/api/client/v1/guestusers/create",
    GET: "/api/client/v1/guestusers/me",
    UPDATE: (id: string) => `/api/client/v1/guestusers/me/update/${id}`,
    DELETE: (id: string) => `/api/client/v1/guestusers/me/delete/${id}`,
  },
  USER: {
    REGISTER: "/api/client/v1/user/register",
    VERIFY_EMAIL: () => `/api/client/v1/user/verifyOTP`,
    LOGIN_OTP : `/api/client/v1/user/login/otp`,
    SEND_OTP : `/api/client/v1/user/send-otp`,
    SOCIAL_LOGIN: "/api/client/v1/user/social_login",
    HOST_PROFILE: (id: string) => `/api/client/v1/user/host/profile/${id}`,
    HOST_IDS_FOR_SITEMAP : `/api/client/v1/user/host/sitemap`,
    ME: "/api/client/v1/user/me",
    MY_TRIPS: "/api/client/v1/user/me/trips",
    UPDATE: "/api/client/v1/user/me/update",
    GET_EMERGENCY_CONTACT: "/api/client/v1/user/emergencyContact",
    ADD_EMERGENCY_CONTACT: "/api/client/v1/user/addEmergencyContact"
  }, 
  HOST : {
    TRIPS : (id: string) => `/api/client/v1/trips/host/profile/${id}`,
  },
  RATINGS: {
    BY_USERNAME: (username: string, page?: number, limit?: number) => {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      if (limit) params.append('limit', limit.toString());
      const query = params.toString();
      return `/api/client/v1/trips/ratings/${username}${query ? `?${query}` : ''}`;
    },
  },
  LANDING_PAGE: {
    FEATURED_TRIPS: '/api/client/v1/landingpage/featuredTrips',
    CITIES : '/api/client/v1/landingpage/cities',
    SIGNUP_BONUS: '/api/client/v1/landingpage/signup-bonus',
  },
  REFERRAL: {
    GET_MY_REFERRAL_DATA: '/api/client/v1/referrals/me'
  },
  REVIEW : {
    PROFILE : (id: string) => `/api/client/v1/user/reviews/${id}`,
    TRIP : (id: string) => `/api/client/v1/trips/reviews/${id}`,
  },
  WALLET: {
    BALANCE: '/api/client/v1/wallet/balance',
    TRANSACTIONS: (limit?: number, skip?: number) => {
      const params = new URLSearchParams();
      if (limit !== undefined) params.append('limit', limit.toString());
      if (skip !== undefined) params.append('skip', skip.toString());
      const query = params.toString();
      return `/api/client/v1/wallet/transactions${query ? `?${query}` : ''}`;
    },
  },
};
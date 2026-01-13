export const API_ENDPOINTS = {
  TRIPS: {
    BASIC_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/basic`,
    DETAILED_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/detailed`,
    FEATURED_TRIPS : (limit: string) => `/api/client/v1/trips/featured?limit=${limit}`,
    HOST_TRIPS: (hostUsername: string) => `/api/client/v1/trips/user/${hostUsername}`,
  },
  BOOKINGS : {
    START: "/api/client/v1/bookings/start",
    ADD_USERS: (bookingId: string) => `/api/client/v1/bookings/${bookingId}/addusers`,
  },
  DISCOUNTS: {
    GET_AVAILABLE: (tripId: string) => `/api/client/v1/discounts/${tripId}`,
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
    VERIFY_EMAIL: (token: string, email: string) => `/api/client/v1/user/verifyEmail?token=${token}&email=${email}`,
    SOCIAL_LOGIN: "/api/client/v1/user/social_login",
    HOST_PROFILE: (id: string) => `/api/client/v1/user/host/profile/${id}`,
    ME: "/api/client/v1/user/me",
    MY_TRIPS: "/api/client/v1/user/me/trips",
    UPDATE: "/api/client/v1/user/me/update",
    GET_EMERGENCY_CONTACT: "/api/client/v1/user/emergencyContact",
    ADD_EMERGENCY_CONTACT: "/api/client/v1/user/addEmergencyContact"
  },  RATINGS: {
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
  },
};
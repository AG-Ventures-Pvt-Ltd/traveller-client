export const API_ENDPOINTS = {
  TRIPS: {
    BASIC_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/basic`,
    DETAILED_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/detailed`,
    FEATURED_TRIPS : (limit: string) => `/api/client/v1/trips/featured?limit=${limit}`, 
  },
  BOOKINGS : {
    START: "/api/client/v1/bookings/start",
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
};
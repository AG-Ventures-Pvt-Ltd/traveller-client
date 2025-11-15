export const API_ENDPOINTS = {
  TRIPS: {
    BASIC_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/basic`,
    DETAILED_DETAILS: (id: string) => `api/client/v1/trips/details/${id}/detailed`,
  },
};
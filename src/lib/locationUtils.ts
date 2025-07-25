// Location utilities for distance calculations and location operations

export interface AustrianLocation {
  city: string;
  district?: string;
  postalCode: string;
  state: string;
  lat: number;
  lng: number;
  displayName: string;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Find locations within a given radius from a center point
 */
export function findNearbyLocations(
  centerLat: number,
  centerLng: number,
  radiusKm: number,
  locations: AustrianLocation[]
): AustrianLocation[] {
  return locations.filter(location => {
    const distance = calculateDistance(centerLat, centerLng, location.lat, location.lng);
    return distance <= radiusKm;
  });
}

/**
 * Search locations by query string (name, postal code, etc.)
 */
export function searchLocations(query: string, locations: AustrianLocation[]): AustrianLocation[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return locations.filter(location => {
    const cityMatch = location.city.toLowerCase().includes(normalizedQuery);
    const districtMatch = location.district?.toLowerCase().includes(normalizedQuery);
    const displayNameMatch = location.displayName.toLowerCase().includes(normalizedQuery);
    const postalCodeMatch = location.postalCode.includes(normalizedQuery);
    
    return cityMatch || districtMatch || displayNameMatch || postalCodeMatch;
  }).slice(0, 12); // Limit to 12 suggestions for good UX
}

/**
 * Find exact location by name or postal code
 */
export function findExactLocation(query: string, locations: AustrianLocation[]): AustrianLocation | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  return locations.find(location => {
    const exactCityMatch = location.city.toLowerCase() === normalizedQuery;
    const exactDisplayMatch = location.displayName.toLowerCase() === normalizedQuery;
    const exactPostalMatch = location.postalCode === normalizedQuery;
    
    return exactCityMatch || exactDisplayMatch || exactPostalMatch;
  }) || null;
}

/**
 * Get cleaner distance from a location
 */
export function getCleanerDistance(
  cleanerCity: string,
  cleanerPostalCode: string | null,
  searchLocation: AustrianLocation,
  locations: AustrianLocation[]
): number {
  // Find cleaner's location
  const cleanerLocation = locations.find(loc => {
    const cityMatch = loc.city.toLowerCase() === cleanerCity.toLowerCase();
    const postalMatch = cleanerPostalCode ? loc.postalCode === cleanerPostalCode : false;
    return cityMatch || postalMatch;
  });

  if (!cleanerLocation) {
    return 999; // Very far if location not found
  }

  return calculateDistance(
    searchLocation.lat,
    searchLocation.lng,
    cleanerLocation.lat,
    cleanerLocation.lng
  );
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m entfernt`;
  }
  return `${distanceKm.toFixed(1)}km entfernt`;
}
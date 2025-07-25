// Script to fetch Austrian locations from OpenPLZ API and generate static database
// Run with: node scripts/fetchAustrianLocations.js

const fs = require('fs');
const path = require('path');

async function fetchAustrianLocations() {
  console.log('Fetching Austrian locations from OpenPLZ API...');
  
  try {
    // Fetch all Austrian localities directly
    console.log('Fetching all Austrian localities...');
    const response = await fetch('https://openplzapi.org/at/Localities');
    const localities = await response.json();
    
    console.log(`Found ${localities.length} localities`);
    
    const allLocations = [];
    
    // Transform each locality to our format
    for (const locality of localities) {
      // Skip if missing essential data
      if (!locality.name || !locality.postalCode || !locality.federalProvince?.name) {
        continue;
      }
      
      const location = {
        city: locality.name,
        district: locality.district?.name || undefined,
        postalCode: locality.postalCode,
        state: locality.federalProvince.name,
        lat: 0, // We'll need to get coordinates differently
        lng: 0,
        displayName: locality.district?.name && locality.district.name !== locality.name
          ? `${locality.name}, ${locality.district.name}`
          : locality.name
      };
      
      allLocations.push(location);
    }
    
    console.log(`Processed ${allLocations.length} locations`);
    
    // Add some manual coordinates for major cities we know
    const coordinateOverrides = {
      '5020': { lat: 47.8095, lng: 13.0550 }, // Salzburg
      '5023': { lat: 47.7941, lng: 13.0550 }, // Salzburg Süd
      '5026': { lat: 47.8249, lng: 13.0550 }, // Salzburg Nord
      '5033': { lat: 47.8095, lng: 13.0350 }, // Salzburg West
      '5071': { lat: 47.8095, lng: 13.0750 }, // Salzburg Ost
      '5400': { lat: 47.6833, lng: 13.1000 }, // Hallein
      '5081': { lat: 47.7667, lng: 13.0167 }, // Anif
      '5061': { lat: 47.7333, lng: 13.0833 }, // Elsbethen
      '1010': { lat: 48.2082, lng: 16.3738 }, // Wien
      '8010': { lat: 47.0707, lng: 15.4395 }, // Graz
      '4020': { lat: 48.3064, lng: 14.2861 }, // Linz
      '6020': { lat: 47.2692, lng: 11.4041 }, // Innsbruck
      '9020': { lat: 46.6347, lng: 14.3072 }, // Klagenfurt
    };
    
    // Apply coordinate overrides and estimate others
    allLocations.forEach(location => {
      if (coordinateOverrides[location.postalCode]) {
        location.lat = coordinateOverrides[location.postalCode].lat;
        location.lng = coordinateOverrides[location.postalCode].lng;
      } else {
        // Simple estimation based on postal code regions
        const firstDigit = parseInt(location.postalCode[0]);
        switch (firstDigit) {
          case 1: // Wien
            location.lat = 48.2082 + (Math.random() - 0.5) * 0.1;
            location.lng = 16.3738 + (Math.random() - 0.5) * 0.1;
            break;
          case 2: // Niederösterreich
            location.lat = 48.3 + (Math.random() - 0.5) * 0.2;
            location.lng = 15.9 + (Math.random() - 0.5) * 0.3;
            break;
          case 3: // Niederösterreich
            location.lat = 48.2 + (Math.random() - 0.5) * 0.2;
            location.lng = 15.6 + (Math.random() - 0.5) * 0.3;
            break;
          case 4: // Oberösterreich
            location.lat = 48.1 + (Math.random() - 0.5) * 0.3;
            location.lng = 14.3 + (Math.random() - 0.5) * 0.4;
            break;
          case 5: // Salzburg
            location.lat = 47.8 + (Math.random() - 0.5) * 0.2;
            location.lng = 13.0 + (Math.random() - 0.5) * 0.3;
            break;
          case 6: // Tirol
            location.lat = 47.3 + (Math.random() - 0.5) * 0.3;
            location.lng = 11.4 + (Math.random() - 0.5) * 0.4;
            break;
          case 7: // Vorarlberg
            location.lat = 47.2 + (Math.random() - 0.5) * 0.2;
            location.lng = 9.9 + (Math.random() - 0.5) * 0.2;
            break;
          case 8: // Steiermark
            location.lat = 47.1 + (Math.random() - 0.5) * 0.3;
            location.lng = 15.4 + (Math.random() - 0.5) * 0.4;
            break;
          case 9: // Kärnten
            location.lat = 46.6 + (Math.random() - 0.5) * 0.3;
            location.lng = 14.3 + (Math.random() - 0.5) * 0.4;
            break;
          default:
            location.lat = 47.8;
            location.lng = 13.0;
        }
      }
    });
    
    // Sort by state, then city
    allLocations.sort((a, b) => {
      if (a.state !== b.state) return a.state.localeCompare(b.state);
      return a.city.localeCompare(b.city);
    });
    
    // Generate TypeScript file
    const tsContent = `// Austrian locations database generated from OpenPLZ API
// Generated on: ${new Date().toISOString()}
// Total locations: ${allLocations.length}

import { AustrianLocation } from './locationUtils';

export const austrianLocations: AustrianLocation[] = ${JSON.stringify(allLocations, null, 2)};

// Helper functions
export { searchLocations, findExactLocation } from './locationUtils';
`;
    
    // Write to file
    const outputPath = path.join(__dirname, '../src/lib/austrianLocations.ts');
    fs.writeFileSync(outputPath, tsContent);
    
    console.log(`✅ Austrian locations database saved to: ${outputPath}`);
    console.log(`📊 Statistics:`);
    console.log(`   - Total locations: ${allLocations.length}`);
    
    // Show breakdown by state
    const stateBreakdown = allLocations.reduce((acc, loc) => {
      acc[loc.state] = (acc[loc.state] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(stateBreakdown).forEach(([state, count]) => {
      console.log(`   - ${state}: ${count} locations`);
    });
    
    // Show some Salzburg examples
    const salzburgLocations = allLocations.filter(loc => loc.state === 'Salzburg').slice(0, 10);
    console.log('\n📍 Sample Salzburg locations:');
    salzburgLocations.forEach(loc => {
      console.log(`   - ${loc.displayName} (${loc.postalCode})`);
    });
    
  } catch (error) {
    console.error('❌ Error fetching Austrian locations:', error);
    process.exit(1);
  }
}

// Run the script
fetchAustrianLocations();
// Austrian locations database with coordinates for distance calculations
// Curated database focusing on major Austrian cities and all Salzburg locations

import { AustrianLocation } from './locationUtils';

export const austrianLocations: AustrianLocation[] = [
  // Salzburg City and Districts (Primary focus)
  {
    city: "Salzburg",
    district: "Altstadt",
    postalCode: "5020",
    state: "Salzburg",
    lat: 47.8095,
    lng: 13.0550,
    displayName: "Salzburg Altstadt"
  },
  {
    city: "Salzburg",
    district: "Süd",
    postalCode: "5023",
    state: "Salzburg", 
    lat: 47.7941,
    lng: 13.0550,
    displayName: "Salzburg Süd"
  },
  {
    city: "Salzburg",
    district: "Nord",
    postalCode: "5026",
    state: "Salzburg",
    lat: 47.8249,
    lng: 13.0550,
    displayName: "Salzburg Nord"
  },
  {
    city: "Salzburg",
    district: "West",
    postalCode: "5033",
    state: "Salzburg",
    lat: 47.8095,
    lng: 13.0350,
    displayName: "Salzburg West"
  },
  {
    city: "Salzburg",
    district: "Ost",
    postalCode: "5071",
    state: "Salzburg",
    lat: 47.8095,
    lng: 13.0750,
    displayName: "Salzburg Ost"
  },

  // Salzburg State - Major Towns
  {
    city: "Hallein",
    postalCode: "5400",
    state: "Salzburg",
    lat: 47.6833,
    lng: 13.1000,
    displayName: "Hallein"
  },
  {
    city: "Anif",
    postalCode: "5081",
    state: "Salzburg", 
    lat: 47.7667,
    lng: 13.0167,
    displayName: "Anif"
  },
  {
    city: "Elsbethen",
    postalCode: "5061",
    state: "Salzburg",
    lat: 47.7333,
    lng: 13.0833,
    displayName: "Elsbethen"
  },
  {
    city: "Grödig",
    postalCode: "5082",
    state: "Salzburg",
    lat: 47.7333,
    lng: 13.0167,
    displayName: "Grödig"
  },
  {
    city: "Eugendorf",
    postalCode: "5301",
    state: "Salzburg",
    lat: 47.8833,
    lng: 13.1667,
    displayName: "Eugendorf"
  },
  {
    city: "Oberndorf bei Salzburg",
    postalCode: "5110",
    state: "Salzburg",
    lat: 47.9500,
    lng: 12.9333,
    displayName: "Oberndorf bei Salzburg"
  },
  {
    city: "Seekirchen am Wallersee",
    postalCode: "5201",
    state: "Salzburg",
    lat: 47.9167,
    lng: 13.1833,
    displayName: "Seekirchen am Wallersee"
  },
  {
    city: "Neumarkt am Wallersee",
    postalCode: "5202",
    state: "Salzburg",
    lat: 47.9333,
    lng: 13.2000,
    displayName: "Neumarkt am Wallersee"
  },
  {
    city: "Köstendorf",
    postalCode: "5203",
    state: "Salzburg",
    lat: 47.9500,
    lng: 13.2167,
    displayName: "Köstendorf"
  },
  {
    city: "Straßwalchen",
    postalCode: "5204",
    state: "Salzburg",
    lat: 47.9667,
    lng: 13.2500,
    displayName: "Straßwalchen"
  },
  {
    city: "Schleedorf",
    postalCode: "5205",
    state: "Salzburg",
    lat: 47.9167,
    lng: 13.2167,
    displayName: "Schleedorf"
  },
  {
    city: "Oberalm",
    postalCode: "5411",
    state: "Salzburg",
    lat: 47.7167,
    lng: 13.1167,
    displayName: "Oberalm"
  },
  {
    city: "Puch bei Hallein",
    postalCode: "5412",
    state: "Salzburg",
    lat: 47.7000,
    lng: 13.0833,
    displayName: "Puch bei Hallein"
  },
  {
    city: "Kuchl",
    postalCode: "5431",
    state: "Salzburg",
    lat: 47.6333,
    lng: 13.1500,
    displayName: "Kuchl"
  },
  {
    city: "Sankt Koloman",
    postalCode: "5432",
    state: "Salzburg",
    lat: 47.6167,
    lng: 13.1833,
    displayName: "Sankt Koloman"
  },
  {
    city: "Adnet",
    postalCode: "5421",
    state: "Salzburg",
    lat: 47.6833,
    lng: 13.1333,
    displayName: "Adnet"
  },

  // Salzkammergut (Wolfgangsee Area)
  {
    city: "Sankt Wolfgang im Salzkammergut",
    postalCode: "5360",
    state: "Salzburg",
    lat: 47.7333,
    lng: 13.4500,
    displayName: "Sankt Wolfgang im Salzkammergut"
  },
  {
    city: "Sankt Gilgen",
    postalCode: "5340",
    state: "Salzburg",
    lat: 47.7667,
    lng: 13.3667,
    displayName: "Sankt Gilgen"
  },
  {
    city: "Strobl",
    postalCode: "5350",
    state: "Salzburg",
    lat: 47.7167,
    lng: 13.4833,
    displayName: "Strobl"
  },
  {
    city: "Fuschl am See",
    postalCode: "5330",
    state: "Salzburg",
    lat: 47.8000,
    lng: 13.2833,
    displayName: "Fuschl am See"
  },
  {
    city: "Mondsee",
    postalCode: "5310",
    state: "Oberösterreich",
    lat: 47.8500,
    lng: 13.3500,
    displayName: "Mondsee"
  },

  // Pinzgau (Eastern Salzburg)
  {
    city: "Zell am See",
    postalCode: "5700",
    state: "Salzburg",
    lat: 47.3250,
    lng: 12.7944,
    displayName: "Zell am See"
  },
  {
    city: "Kaprun",
    postalCode: "5710",
    state: "Salzburg",
    lat: 47.2667,
    lng: 12.7667,
    displayName: "Kaprun"
  },
  {
    city: "Saalfelden am Steinernen Meer",
    postalCode: "5760",
    state: "Salzburg",
    lat: 47.4167,
    lng: 12.8500,
    displayName: "Saalfelden am Steinernen Meer"
  },
  {
    city: "Mittersill",
    postalCode: "5730",
    state: "Salzburg",
    lat: 47.2833,
    lng: 12.4833,
    displayName: "Mittersill"
  },

  // Pongau (Central Salzburg)
  {
    city: "Sankt Johann im Pongau",
    postalCode: "5600",
    state: "Salzburg",
    lat: 47.3500,
    lng: 13.2000,
    displayName: "Sankt Johann im Pongau"
  },
  {
    city: "Bischofshofen",
    postalCode: "5500",
    state: "Salzburg",
    lat: 47.4167,
    lng: 13.2167,
    displayName: "Bischofshofen"
  },
  {
    city: "Radstadt",
    postalCode: "5550",
    state: "Salzburg",
    lat: 47.3833,
    lng: 13.4667,
    displayName: "Radstadt"
  },
  {
    city: "Altenmarkt im Pongau",
    postalCode: "5541",
    state: "Salzburg",
    lat: 47.3833,
    lng: 13.4167,
    displayName: "Altenmarkt im Pongau"
  },
  {
    city: "Flachau",
    postalCode: "5542",
    state: "Salzburg",
    lat: 47.3500,
    lng: 13.3833,
    displayName: "Flachau"
  },
  {
    city: "Wagrain",
    postalCode: "5602",
    state: "Salzburg",
    lat: 47.3333,
    lng: 13.3000,
    displayName: "Wagrain"
  },
  {
    city: "Sankt Martin am Tennengebirge",
    postalCode: "5522",
    state: "Salzburg",
    lat: 47.4500,
    lng: 13.1833,
    displayName: "Sankt Martin am Tennengebirge"
  },

  // Tennengau (Southern Salzburg)
  {
    city: "Werfen",
    postalCode: "5450",
    state: "Salzburg",
    lat: 47.4667,
    lng: 13.1833,
    displayName: "Werfen"
  },
  {
    city: "Abtenau",
    postalCode: "5441",
    state: "Salzburg",
    lat: 47.5333,
    lng: 13.3500,
    displayName: "Abtenau"
  },
  {
    city: "Golling an der Salzach",
    postalCode: "5440",
    state: "Salzburg",
    lat: 47.5833,
    lng: 13.1667,
    displayName: "Golling an der Salzach"
  },
  {
    city: "Scheffau am Tennengebirge",
    postalCode: "5440",
    state: "Salzburg",
    lat: 47.5500,
    lng: 13.1500,
    displayName: "Scheffau am Tennengebirge"
  },
  {
    city: "Rußbach am Paß Gschütt",
    postalCode: "5442",
    state: "Salzburg",
    lat: 47.5167,
    lng: 13.2500,
    displayName: "Rußbach am Paß Gschütt"
  },

  // Flachgau (Northern Salzburg) - Additional towns
  {
    city: "Mattsee",
    postalCode: "5163",
    state: "Salzburg",
    lat: 47.9667,
    lng: 13.1000,
    displayName: "Mattsee"
  },
  {
    city: "Bürmoos",
    postalCode: "5111",
    state: "Salzburg",
    lat: 47.9833,
    lng: 12.9000,
    displayName: "Bürmoos"
  },
  {
    city: "Lamprechtshausen",
    postalCode: "5112",
    state: "Salzburg",
    lat: 47.9833,
    lng: 12.8667,
    displayName: "Lamprechtshausen"
  },
  {
    city: "Koppl",
    postalCode: "5321",
    state: "Salzburg",
    lat: 47.8333,
    lng: 13.1167,
    displayName: "Koppl"
  },
  {
    city: "Hof bei Salzburg",
    postalCode: "5322",
    state: "Salzburg",
    lat: 47.8500,
    lng: 13.1500,
    displayName: "Hof bei Salzburg"
  },
  {
    city: "Faistenau",
    postalCode: "5324",
    state: "Salzburg",
    lat: 47.7833,
    lng: 13.2500,
    displayName: "Faistenau"
  },
  {
    city: "Ebenau",
    postalCode: "5323",
    state: "Salzburg",
    lat: 47.8167,
    lng: 13.1833,
    displayName: "Ebenau"
  },
  {
    city: "Hintersee",
    postalCode: "5324",
    state: "Salzburg",
    lat: 47.7667,
    lng: 13.2333,
    displayName: "Hintersee"
  },

  // Lungau (Southeastern Salzburg)
  {
    city: "Tamsweg",
    postalCode: "5580",
    state: "Salzburg",
    lat: 47.1333,
    lng: 13.8167,
    displayName: "Tamsweg"
  },
  {
    city: "Mauterndorf",
    postalCode: "5570",
    state: "Salzburg",
    lat: 47.1333,
    lng: 13.6833,
    displayName: "Mauterndorf"
  },
  {
    city: "Sankt Michael im Lungau",
    postalCode: "5582",
    state: "Salzburg",
    lat: 47.1000,
    lng: 13.8500,
    displayName: "Sankt Michael im Lungau"
  },

  // Major Austrian Cities (for expansion)
  {
    city: "Wien",
    postalCode: "1010",
    state: "Wien",
    lat: 48.2082,
    lng: 16.3738,
    displayName: "Wien"
  },
  {
    city: "Wien",
    postalCode: "1020",
    state: "Wien",
    lat: 48.2167,
    lng: 16.4000,
    displayName: "Wien Leopoldstadt"
  },
  {
    city: "Wien",
    postalCode: "1030",
    state: "Wien",
    lat: 48.1981,
    lng: 16.3947,
    displayName: "Wien Landstraße"
  },
  {
    city: "Graz",
    postalCode: "8010",
    state: "Steiermark",
    lat: 47.0707,
    lng: 15.4395,
    displayName: "Graz"
  },
  {
    city: "Linz",
    postalCode: "4020",
    state: "Oberösterreich", 
    lat: 48.3064,
    lng: 14.2861,
    displayName: "Linz"
  },
  {
    city: "Innsbruck",
    postalCode: "6020",
    state: "Tirol",
    lat: 47.2692,
    lng: 11.4041,
    displayName: "Innsbruck"
  },
  {
    city: "Klagenfurt",
    postalCode: "9020",
    state: "Kärnten",
    lat: 46.6347,
    lng: 14.3072,
    displayName: "Klagenfurt"
  },
  {
    city: "Villach",
    postalCode: "9500",
    state: "Kärnten",
    lat: 46.6111,
    lng: 13.8558,
    displayName: "Villach"
  },
  {
    city: "Wels",
    postalCode: "4600",
    state: "Oberösterreich",
    lat: 48.1597,
    lng: 14.0297,
    displayName: "Wels"
  },
  {
    city: "Sankt Pölten",
    postalCode: "3100",
    state: "Niederösterreich",
    lat: 48.2058,
    lng: 15.6232,
    displayName: "Sankt Pölten"
  },
  {
    city: "Dornbirn",
    postalCode: "6850",
    state: "Vorarlberg",
    lat: 47.4125,
    lng: 9.7417,
    displayName: "Dornbirn"
  },
  {
    city: "Wiener Neustadt",
    postalCode: "2700",
    state: "Niederösterreich",
    lat: 47.8167,
    lng: 16.2500,
    displayName: "Wiener Neustadt"
  },
  {
    city: "Steyr",
    postalCode: "4400",
    state: "Oberösterreich",
    lat: 48.0333,
    lng: 14.4167,
    displayName: "Steyr"
  },
  {
    city: "Feldkirch",
    postalCode: "6800",
    state: "Vorarlberg",
    lat: 47.2333,
    lng: 9.6000,
    displayName: "Feldkirch"
  },
  {
    city: "Bregenz",
    postalCode: "6900",
    state: "Vorarlberg",
    lat: 47.5000,
    lng: 9.7500,
    displayName: "Bregenz"
  },
  {
    city: "Leonding",
    postalCode: "4060",
    state: "Oberösterreich",
    lat: 48.2667,
    lng: 14.2500,
    displayName: "Leonding"
  },
  {
    city: "Krems an der Donau",
    postalCode: "3500",
    state: "Niederösterreich",
    lat: 48.4000,
    lng: 15.6000,
    displayName: "Krems an der Donau"
  }
];

// Helper functions
export { searchLocations, findExactLocation } from './locationUtils';
export interface GuatemalaLocation {
  id: string;
  name: string;
  department: string;
  lat: number;
  lon: number;
  elevation: number;
  climateZone: string;
}

export const GUATEMALA_LOCATIONS: GuatemalaLocation[] = [
  // Altiplano Occidental
  { id: 'xela', name: 'Quetzaltenango (Xela)', department: 'Quetzaltenango', lat: 14.8347, lon: -91.5186, elevation: 2330, climateZone: 'Altiplano Frío' },
  { id: 'almolonga', name: 'Almolonga', department: 'Quetzaltenango', lat: 14.8144, lon: -91.4947, elevation: 2250, climateZone: 'Hortalizas de Valle' },
  { id: 'ostuncalco', name: 'San Juan Ostuncalco', department: 'Quetzaltenango', lat: 14.8692, lon: -91.6214, elevation: 2500, climateZone: 'Altiplano Frío' },
  { id: 'san_marcos', name: 'San Marcos (Cabecera)', department: 'San Marcos', lat: 14.9639, lon: -91.7944, elevation: 2398, climateZone: 'Altiplano Frío' },
  { id: 'san_pedro_sm', name: 'San Pedro Sacatepéquez', department: 'San Marcos', lat: 14.9667, lon: -91.7667, elevation: 2330, climateZone: 'Altiplano Frío' },
  { id: 'malacatan', name: 'Malacatán', department: 'San Marcos', lat: 14.9111, lon: -92.0594, elevation: 390, climateZone: 'Costa Cálida' },
  { id: 'totonicapan', name: 'Totonicapán (Cabecera)', department: 'Totonicapán', lat: 14.9117, lon: -91.3608, elevation: 2495, climateZone: 'Altiplano Muy Frío' },
  { id: 'momostenango', name: 'Momostenango', department: 'Totonicapán', lat: 15.0442, lon: -91.4089, elevation: 2200, climateZone: 'Altiplano Templado' },
  { id: 'huehue', name: 'Huehuetenango (Cabecera)', department: 'Huehuetenango', lat: 15.3197, lon: -91.4714, elevation: 1900, climateZone: 'Altiplano Templado' },
  { id: 'chiantla', name: 'Chiantla', department: 'Huehuetenango', lat: 15.3564, lon: -91.4589, elevation: 2040, climateZone: 'Altiplano Frío' },
  { id: 'barillas', name: 'Santa Cruz Barillas', department: 'Huehuetenango', lat: 15.8033, lon: -91.3156, elevation: 1420, climateZone: 'Cafetal Húmedo' },
  { id: 'cuilco', name: 'Cuilco', department: 'Huehuetenango', lat: 15.4056, lon: -91.9667, elevation: 1150, climateZone: 'Valle Templado' },

  // Altiplano Central y Quiché
  { id: 'chimaltenango', name: 'Chimaltenango (Cabecera)', department: 'Chimaltenango', lat: 14.6611, lon: -90.8208, elevation: 1800, climateZone: 'Altiplano Templado' },
  { id: 'patzun', name: 'Patzún', department: 'Chimaltenango', lat: 14.6819, lon: -91.0142, elevation: 2225, climateZone: 'Hortalizas y Granos' },
  { id: 'tecpan', name: 'Tecpán Guatemala', department: 'Chimaltenango', lat: 14.7608, lon: -90.9939, elevation: 2280, climateZone: 'Altiplano Frío' },
  { id: 'solola', name: 'Sololá (Cabecera)', department: 'Sololá', lat: 14.7733, lon: -91.1833, elevation: 2114, climateZone: 'Altiplano Cuenca Atitlán' },
  { id: 'santiago_atitlan', name: 'Santiago Atitlán', department: 'Sololá', lat: 14.6394, lon: -91.2294, elevation: 1590, climateZone: 'Cafetal de Lago' },
  { id: 'nahuala', name: 'Nahualá', department: 'Sololá', lat: 14.8431, lon: -91.3178, elevation: 2465, climateZone: 'Altiplano Frío' },
  { id: 'santa_cruz_quiche', name: 'Santa Cruz del Quiché', department: 'Quiché', lat: 15.0306, lon: -91.1528, elevation: 2020, climateZone: 'Altiplano Templado' },
  { id: 'chichicastenango', name: 'Chichicastenango', department: 'Quiché', lat: 14.9431, lon: -91.1111, elevation: 1965, climateZone: 'Altiplano Templado' },
  { id: 'nebaj', name: 'Nebaj (Área Ixil)', department: 'Quiché', lat: 15.4056, lon: -91.1467, elevation: 1910, climateZone: 'Montaña Húmeda' },
  { id: 'joyabaj', name: 'Joyabaj', department: 'Quiché', lat: 14.9917, lon: -90.8028, elevation: 1430, climateZone: 'Valle Cálido' },

  // Las Verapaces
  { id: 'coban', name: 'Cobán (Cabecera)', department: 'Alta Verapaz', lat: 15.4712, lon: -90.3708, elevation: 1320, climateZone: 'Bosque Húmedo / Café' },
  { id: 'carcha', name: 'San Pedro Carchá', department: 'Alta Verapaz', lat: 15.4811, lon: -90.3014, elevation: 1280, climateZone: 'Café y Cardamomo' },
  { id: 'tactic', name: 'Tactic', department: 'Alta Verapaz', lat: 15.3181, lon: -90.3547, elevation: 1465, climateZone: 'Húmedo Templado' },
  { id: 'salama', name: 'Salamá (Cabecera)', department: 'Baja Verapaz', lat: 15.1031, lon: -90.3181, elevation: 940, climateZone: 'Valle Seco / Granos' },
  { id: 'rabinal', name: 'Rabinal', department: 'Baja Verapaz', lat: 15.0833, lon: -90.4833, elevation: 970, climateZone: 'Corredor Seco' },
  { id: 'purulha', name: 'Purulhá', department: 'Baja Verapaz', lat: 15.2372, lon: -90.2239, elevation: 1570, climateZone: 'Bosque Nuboso' },

  // Oriente y Corredor Seco
  { id: 'chiquimula', name: 'Chiquimula (Cabecera)', department: 'Chiquimula', lat: 14.7981, lon: -89.5445, elevation: 425, climateZone: 'Corredor Seco / Cálido' },
  { id: 'jocotan', name: 'Jocotán (Área Chortí)', department: 'Chiquimula', lat: 14.8194, lon: -89.3889, elevation: 470, climateZone: 'Corredor Seco Extremo' },
  { id: 'camotan', name: 'Camotán', department: 'Chiquimula', lat: 14.8197, lon: -89.3739, elevation: 480, climateZone: 'Corredor Seco Extremo' },
  { id: 'esquipulas', name: 'Esquipulas', department: 'Chiquimula', lat: 14.5667, lon: -89.3500, elevation: 950, climateZone: 'Cafetal de Oriente' },
  { id: 'zacapa', name: 'Zacapa (Cabecera)', department: 'Zacapa', lat: 14.9722, lon: -89.5306, elevation: 230, climateZone: 'Muy Cálido y Seco' },
  { id: 'teculutan', name: 'Teculután', department: 'Zacapa', lat: 14.9833, lon: -89.7167, elevation: 245, climateZone: 'Riego / Frutales' },
  { id: 'gualan', name: 'Gualán', department: 'Zacapa', lat: 15.1333, lon: -89.3667, elevation: 130, climateZone: 'Valle Motagua Cálido' },
  { id: 'jalapa', name: 'Jalapa (Cabecera)', department: 'Jalapa', lat: 14.6339, lon: -89.9889, elevation: 1362, climateZone: 'Templado / Granos' },
  { id: 'san_pedro_pinula', name: 'San Pedro Pinula', department: 'Jalapa', lat: 14.6667, lon: -89.8500, elevation: 1100, climateZone: 'Corredor Seco' },
  { id: 'jutiapa', name: 'Jutiapa (Cabecera)', department: 'Jutiapa', lat: 14.2817, lon: -89.8956, elevation: 900, climateZone: 'Granos Básicos y Ganado' },
  { id: 'asuncion_mita', name: 'Asunción Mita', department: 'Jutiapa', lat: 14.3308, lon: -89.7108, elevation: 470, climateZone: 'Corredor Seco' },
  { id: 'guastatoya', name: 'Guastatoya', department: 'El Progreso', lat: 14.8542, lon: -90.0694, elevation: 515, climateZone: 'Corredor Seco' },
  { id: 'sanarate', name: 'Sanarate', department: 'El Progreso', lat: 14.7892, lon: -90.1989, elevation: 840, climateZone: 'Valle Seco' },

  // Costa Sur y Boca Costa
  { id: 'escuintla', name: 'Escuintla (Cabecera)', department: 'Escuintla', lat: 14.3012, lon: -90.7853, elevation: 347, climateZone: 'Costa Cálida / Caña' },
  { id: 'santa_lucia', name: 'Santa Lucía Cotzumalguapa', department: 'Escuintla', lat: 14.3333, lon: -91.0167, elevation: 365, climateZone: 'Caña y Granos' },
  { id: 'tiquisate', name: 'Tiquisate', department: 'Escuintla', lat: 14.2833, lon: -91.3667, elevation: 70, climateZone: 'Tierras Bajas Costa' },
  { id: 'mazatenango', name: 'Mazatenango', department: 'Suchitepéquez', lat: 14.5342, lon: -91.5033, elevation: 375, climateZone: 'Boca Costa / Caña y Cacao' },
  { id: 'chicacao', name: 'Chicacao', department: 'Suchitepéquez', lat: 14.5500, lon: -91.3167, elevation: 520, climateZone: 'Boca Costa Cafetalera' },
  { id: 'retalhuleu', name: 'Retalhuleu (Cabecera)', department: 'Retalhuleu', lat: 14.5361, lon: -91.6778, elevation: 240, climateZone: 'Costa Cálida' },
  { id: 'cuilapa', name: 'Cuilapa', department: 'Santa Rosa', lat: 14.2764, lon: -90.2989, elevation: 890, climateZone: 'Café y Granos Básicos' },
  { id: 'barberena', name: 'Barberena', department: 'Santa Rosa', lat: 14.3075, lon: -90.3608, elevation: 1200, climateZone: 'Cafetal Templado' },

  // Norte y Petén
  { id: 'flores', name: 'Flores / Santa Elena', department: 'Petén', lat: 16.9242, lon: -89.8967, elevation: 127, climateZone: 'Trópico Húmedo / Maíz' },
  { id: 'sayaxche', name: 'Sayaxché', department: 'Petén', lat: 16.5264, lon: -90.1878, elevation: 110, climateZone: 'Tierras Bajas Forestales' },
  { id: 'poptun', name: 'Poptún', department: 'Petén', lat: 16.3314, lon: -89.4172, elevation: 520, climateZone: 'Sabana y Pinares' },
  { id: 'morales', name: 'Morales', department: 'Izabal', lat: 15.4833, lon: -88.8167, elevation: 45, climateZone: 'Trópico Húmedo' },
  { id: 'puerto_barrios', name: 'Puerto Barrios', department: 'Izabal', lat: 15.7278, lon: -88.5944, elevation: 5, climateZone: 'Costa Atlántica Húmeda' },
];

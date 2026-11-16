import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Search, Navigation, Building2, Crosshair, Check, X } from 'lucide-react';
import { useAgroStore } from '../../store/useAgroStore';
import { GUATEMALA_LOCATIONS, GuatemalaLocation } from '../../data/guatemalaLocations';

// Custom Leaflet marker icon
const customIcon = L.divIcon({
  className: 'custom-agro-marker',
  html: `
    <div style="
      background: linear-gradient(135deg, #15803d, #166534);
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #ffffff;
      box-shadow: 0 4px 14px rgba(21, 101, 52, 0.4);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function LocationSelector() {
  const { setCoords } = useAgroStore();

  useMapEvents({
    click(e) {
      const lat = Number(e.latlng.lat.toFixed(4));
      const lon = Number(e.latlng.lng.toFixed(4));
      setCoords({ lat, lon });
    },
  });

  return null;
}

function MapRecenter({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 10, { duration: 0.8 });
  }, [lat, lon, map]);
  return null;
}

export const AgroMap: React.FC = () => {
  const { coords, setCoords, radiusKm, analysisResult } = useAgroStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<GuatemalaLocation | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Filtrar municipios y departamentos en tiempo real
  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    const term = searchTerm.toLowerCase().trim();
    return GUATEMALA_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(term) ||
        loc.department.toLowerCase().includes(term) ||
        loc.climateZone.toLowerCase().includes(term)
    ).slice(0, 6);
  }, [searchTerm]);

  const handleSelectLocation = (loc: GuatemalaLocation) => {
    setSelectedLocation(loc);
    setCoords({ lat: loc.lat, lon: loc.lon });
    setSearchTerm('');
    setIsSearching(false);
  };

  // Encontrar la ubicación más cercana actual si no hay seleccionada por texto
  const currentNearestLocation = useMemo(() => {
    if (selectedLocation) return selectedLocation;
    let nearest = GUATEMALA_LOCATIONS[0];
    let minDist = 9999;
    for (const loc of GUATEMALA_LOCATIONS) {
      const dist = Math.hypot(coords.lat - loc.lat, coords.lon - loc.lon);
      if (dist < minDist) {
        minDist = dist;
        nearest = loc;
      }
    }
    return nearest;
  }, [coords, selectedLocation]);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Título de la sección */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-emerald-700" />
          <h2 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
            Ubicación de tu Terreno
          </h2>
        </div>
        <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
          <Crosshair className="w-3.5 h-3.5" />
          Guatemala
        </span>
      </div>

      {/* BUSCADOR POR NOMBRE DE MUNICIPIO O DEPARTAMENTO */}
      <div className="space-y-1.5 relative">
        <label className="block text-xs font-bold text-stone-800">
          Escribe el nombre de tu Municipio o Comunidad:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4 text-emerald-700" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearching(true);
            }}
            placeholder="Ej: Patzún, Cobán, Chiantla, Jocotán, Xela, Jutiapa..."
            className="w-full bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-900 text-sm rounded-xl pl-10 pr-9 py-2.5 border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition placeholder-stone-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setIsSearching(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Resultados del autocompletado en lista visible */}
        {isSearching && filteredLocations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-stone-100">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectLocation(loc)}
                className="w-full px-4 py-2.5 text-left text-xs hover:bg-emerald-50/80 flex items-center justify-between transition group"
              >
                <div>
                  <p className="font-bold text-stone-900 group-hover:text-emerald-800">
                    {loc.name}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    {loc.department} · {loc.climateZone} ({loc.elevation} msnm)
                  </p>
                </div>
                <Check className="w-4 h-4 text-emerald-700 opacity-0 group-hover:opacity-100 transition shrink-0 ml-2" />
              </button>
            ))}
          </div>
        )}

        {isSearching && searchTerm.trim().length > 1 && filteredLocations.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-600 z-50 shadow-xl">
            No encontramos esa localidad exacta en la lista rápida. Puedes tocar directamente sobre el mapa para colocar el punto exacto de tu terreno.
          </div>
        )}
      </div>

      {/* Tarjeta de Confirmación de Ubicación Actual */}
      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-2.5">
        <Building2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0 text-xs">
          <p className="font-bold text-stone-900">
            {currentNearestLocation.name}, {currentNearestLocation.department}
          </p>
          <p className="text-stone-600 text-[11px]">
            Zona agroclimática: <span className="text-emerald-800 font-bold">{currentNearestLocation.climateZone}</span>
            {' '}· Altura aprox: <span className="text-stone-800 font-semibold">{analysisResult?.location.elevationMeters || currentNearestLocation.elevation} msnm</span>
          </p>
        </div>
      </div>

      {/* Contenedor del Mapa Leaflet */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-stone-600">
          <span>Vista en mapa de la región:</span>
          <span className="text-[11px] text-emerald-800 font-medium">Toca el mapa para afinar el punto</span>
        </div>

        <div className="relative w-full h-[260px] sm:h-[280px] rounded-xl overflow-hidden border border-stone-200 shadow-inner">
          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={9}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationSelector />
            <MapRecenter lat={coords.lat} lon={coords.lon} />

            <Marker position={[coords.lat, coords.lon]} icon={customIcon}>
              <Popup>
                <div className="p-1 text-stone-900 text-xs space-y-1">
                  <p className="font-bold text-emerald-800">Parcela de Monitoreo</p>
                  <p className="text-stone-700">
                    {currentNearestLocation.name}, {currentNearestLocation.department}
                  </p>
                  <p className="text-stone-500 text-[11px]">
                    Lat: {coords.lat.toFixed(4)} · Lon: {coords.lon.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            <Circle
              center={[coords.lat, coords.lon]}
              radius={radiusKm * 1000}
              pathOptions={{
                color: '#15803d',
                fillColor: '#15803d',
                fillOpacity: 0.15,
                weight: 1.5,
              }}
            />
          </MapContainer>

          <div className="absolute bottom-2 left-2 z-[400] bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] text-stone-700 shadow-sm flex items-center gap-1.5">
            <Navigation className="w-3 h-3 text-emerald-700" />
            <span className="font-medium">Coordenadas: {coords.lat.toFixed(2)}°, {coords.lon.toFixed(2)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

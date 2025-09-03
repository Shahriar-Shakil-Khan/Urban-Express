import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Add custom CSS for animation
const styles = `
  .search-animate {
    animation: pop-in 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  @keyframes pop-in {
    0% { transform: scale(0.8); opacity: 0; }
    80% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }
  .search-bar {
   background: #5c5091;
    border-radius: 1rem;
    box-shadow: 0 4px 24px 0 rgba(80,80,80,0.08);
    padding: 1rem 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    max-width: 400px;
  }
  .search-bar input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    flex: 1;
  }
  .search-bar button {
    background: #5524B7;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .search-bar button:hover {
    background: #380B60;
  }
`;

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const defaultPosition = [23.685, 90.3563]; // Bangladesh center

function FlyTo({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 10, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

const CoverageMap = ({ services }) => {
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultPosition);
  const [animate, setAnimate] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = services.find(d =>
      d.district.toLowerCase().includes(search.trim().toLowerCase())
    );
    if (found) {
      setMapCenter([found.latitude, found.longitude]);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    } else {
      setMapCenter(defaultPosition);
      alert('District not found!');
    }
  };

  return (
    <div>
      <style>{styles}</style>
      <form
        onSubmit={handleSearch}
        className={`search-bar mx-auto ${animate ? 'search-animate' : ''}`}
        style={{ marginTop: 24 }}
      >
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="w-full h-96 md:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-lg">
        <MapContainer center={mapCenter} zoom={7} scrollWheelZoom={false} className="h-full w-full">
          <FlyTo center={mapCenter} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {services.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
              icon={customIcon}
            >
              <Popup>
                <strong>{district.district}</strong><br />
                Region: {district.region}<br />
                Covered Area: {district.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;

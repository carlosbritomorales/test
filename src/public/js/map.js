

//window.alert(services[0].title);
    
var map = L.map('map-template').setView([ -33.044561, -71.612513], 20);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const tileURL3 = 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();

// Marker
var marker = L.marker([40.5, 30.5]); // kiev, ukraine
marker.bindPopup('Hello There!');
map.addLayer(marker);

map.on('click', function(e) { 
  map.removeLayer(marker);
  marker = L.marker([e.latlng.lat, e.latlng.lng]); 
  marker.bindPopup('¿Aquí trabajas?'); 
  map.addLayer(marker); 
  document.getElementById("longitude").value=e.latlng.lat; 
  document.getElementById("latitude").value=e.latlng.lng; 
});

// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('Estás justo aquí!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);


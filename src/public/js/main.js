var services=document.getElementsByName("test");
var services2=document.getElementsByName("test2");
var services3=document.getElementsByName("test3");
var services4=document.getElementsByName("test4");

var map = L.map('map-template').setView([ -33.044561, -71.612513], 20);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const tileURL3 = 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();

// Custom icon
var redIcon = L.icon({
  iconUrl: 'https://i.ibb.co/wwxj8Fd/red.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize:     [38, 38], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Marker
var marker = L.marker([51.5, -0.09], {icon: redIcon}).addTo(map); // kiev, ukraine
marker.bindPopup('Hello There!');
map.addLayer(marker);

for(var i=0; i<services.length; i++){
  marker = L.marker([services3[i].title,services2[i].title]); // kiev, ukraine
  marker.bindPopup(services[i].title+"\nde\n"+services4[i].title);
  map.addLayer(marker)
}

// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords,{icon: redIcon}).addTo(map);
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




//window.alert(services[0].title);
    
var map = L.map('map-signup');

var browserLat;
var browserLong;  

// Custom icon
var redIcon = L.icon({
  iconUrl: 'https://i.ibb.co/7rHDnDj/m1.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize:     [38, 38], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 38], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -20] // point from which the popup should open relative to the iconAnchor
});

// Custom icon
var greenIcon = L.icon({
  iconUrl: 'https://i.ibb.co/MgVZhzZ/m3.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize:     [38, 38], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 38], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -20] // point from which the popup should open relative to the iconAnchor
});

// Custom icon
var blueIcon = L.icon({
  iconUrl: 'https://i.ibb.co/4jLM99p/m2.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize:     [38, 38], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 38], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -20] // point from which the popup should open relative to the iconAnchor
});

navigator.geolocation.getCurrentPosition(function(position) {
    browserLat =  position.coords.latitude;
    browserLong = position.coords.longitude;
 
    marker_actual = L.marker([browserLat,browserLong], {icon: redIcon}).addTo(map);
    marker_actual.bindPopup('<b>Hola </b><br>Tu estas aqui').openPopup();
    map.setView([browserLat,browserLong], 18);  
    
    console.log(browserLat);
    console.log(browserLong);
}, function(err) {
    console.error(err);
});

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
  marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: blueIcon}); 
  marker.bindPopup('¿Aquí trabajas?'); 
  map.addLayer(marker); 
  document.getElementById("longitude").value=e.latlng.lat; 
  document.getElementById("latitude").value=e.latlng.lng; 
});

// Geolocation
//map.locate({enableHighAccuracy: true})
//map.on('locationfound', (e) => {
//  const coords = [e.latlng.lat, e.latlng.lng];
//  const newMarker = L.marker(coords);
  //newMarker.bindPopup('Estás justo aquí!');
  //map.addLayer(newMarker);
//  socket.emit('userCoordinates', e.latlng);
//});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  var newUserMarker = L.marker([coords.lat, coords.lng], {icon: greenIcon});
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);


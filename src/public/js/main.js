var services=document.getElementsByName("test");
var services2=document.getElementsByName("test2");
var services3=document.getElementsByName("test3");
var services4=document.getElementsByName("test4");
var user=document.getElementsByClassName("fas user");

var map = L.map('map-template');

var redIcon = L.icon({
  iconUrl: 'https://i.ibb.co/7rHDnDj/m1.png',
  //shadowUrl: 'leaf-shadow.png',

  iconSize:     [38, 38], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 38], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -20] // point from which the popup should open relative to the iconAnchor
});

var browserLat;
var browserLong;  

navigator.geolocation.getCurrentPosition(function(position) {
    browserLat =  position.coords.latitude;
    browserLong = position.coords.longitude;
 
    var marker_actual = L.marker([browserLat,browserLong], {icon: redIcon}).addTo(map);
    marker_actual.bindPopup('<b>'+user[0].title+'</b>'+', tu estás aquí').openPopup();
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

// Marker
var marker = L.marker([51.5, -0.09], {icon: redIcon}).addTo(map); // kiev, ukraine
marker.bindPopup('Hello There!');
map.addLayer(marker);

for(var i=0; i<services.length; i++){
  marker = L.marker([services3[i].title,services2[i].title], {icon: blueIcon}); // kiev, ukraine
  marker.bindPopup('<b>'+services[i].title+'</b>'+"<br>de "+'<i>'+ '<a href="/publicprofile">'+services4[i].title+'</a></i>');
  map.addLayer(marker)
}

/*Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords,{icon: redIcon}).addTo(map);
  newMarker.bindPopup('Estás justo aquí!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});*/

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const newUserMarker = L.marker([coords.lat, coords.lng], {icon: greenIcon });
  newUserMarker.bindPopup(user[0].title);
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);


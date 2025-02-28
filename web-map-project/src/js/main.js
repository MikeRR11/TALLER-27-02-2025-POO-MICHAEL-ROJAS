// Ensure jsPDF is available globally
window.jsPDF = window.jspdf.jsPDF;

// Initialize the Leaflet map and set the view to La Coruña-Bogotá
const map = L.map('map').setView([4.578330940484695, -74.15273450917056], 16); // Coordinates for La Coruña-Bogotá

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Define the polygon for La Coruña-Bogotá
const laCorunaPolygon = L.polygon([
    [4.580871893459415, -74.15541793745237],
    [4.581182038958752, -74.15354037658588],
    [4.580486882450015, -74.15110490689166],
    [4.578326555635113, -74.15041827106629],
    [4.577759740455165, -74.15070795795405],
    [4.576283877428832, -74.15074015249907],
    [4.575267902252862, -74.15307905416998],
    [4.574423027387993, -74.15395881898131],
    [4.57655126484958, -74.1552462765557],
    [4.57649779172624, -74.15519263246655],
    [4.577096688639043, -74.1540339184718],
]).addTo(map);

// Bind a popup to the polygon
laCorunaPolygon.bindPopup('Barrio La Coruña / Ciudad Bolivar').openPopup();
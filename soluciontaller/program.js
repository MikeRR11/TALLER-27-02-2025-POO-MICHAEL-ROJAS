// Ensure jsPDF is available globally
window.jsPDF = window.jspdf.jsPDF;

// Initialize the Leaflet map and set the view to La Coruña-Bogotá
const map = L.map('map').setView([4.5786, -74.15265], 17); // Coordinates for La Coruña-Bogotá

// Add Esri satellite tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
    maxZoom: 20,
    attribution: 'Tiles © Esri'
}).addTo(map);

let loadPolygon = async function() {
    let myData = await fetch("coruna.geojson");
    // await se usa para esperar a que la sentencia se
    // resuelva antes de continuar con la ejecución
    let myPolygon = await myData.json();

    L.geoJSON(myPolygon, {
        style: { color: 'blue' }
    }).addTo(map);
};

loadPolygon();

// Variables to store the layers
let treesLayer;
let siniestrosLayer;

let btnTrees = document.getElementById("btnTrees");
// Add event listener for the Trees button
btnTrees.addEventListener("click", async function() {
    if (treesLayer) {
        // If the trees layer is already loaded, remove it from the map
        map.removeLayer(treesLayer);
        treesLayer = null;
    } else {
        // If the trees layer is not loaded, fetch and add it to the map
        let myData = await fetch("arboles_coruna.geojson");
        let myPolygon = await myData.json();

        treesLayer = L.geoJSON(myPolygon, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "green",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map);
    }
});

// Add event listener for the Distance button
let btnDistance = document.getElementById("btnDistance");

btnDistance.addEventListener('click', async () => {
    console.log("Button clicked");
    let response = await fetch("arboles_coruna.geojson");
    let datos = await response.json();
    let trees = datos.features.map((myElement, index) => ({
        id: index + 1,
        coordinates: myElement.geometry.coordinates
    }));

    if (window.Worker) {
        const worker = new Worker('distanceWorker.js');
        worker.postMessage(trees);

        worker.onmessage = function(e) {
            const distances = e.data;
            console.log("Distances calculated", distances);
            generatePDF(distances, trees.length);
        };
    } else {
        console.error("Web Workers are not supported in this browser.");
    }
});

// Function to generate PDF report
function generatePDF(distances, totalTrees) {
    console.log("Generating PDF");
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();

    documentPDF.text("REPORTE DE ÁRBOLES EN EL BARRIO GRAN BRITALIA", 10, 10);

    documentPDF.autoTable({
        head: [['Árbol 1', 'Árbol 2', 'Distancia (metros)']],
        body: distances
    });
    documentPDF.save("Arboles_Coruña.pdf");
    console.log("PDF generated");
}

let btnSiniestros = document.getElementById("btnSiniestros");
// Add event listener for the Siniestros button
btnSiniestros.addEventListener("click", async function() {
    if (siniestrosLayer) {
        // If the siniestros layer is already loaded, remove it from the map
        map.removeLayer(siniestrosLayer);
        siniestrosLayer = null;
    } else {
        // If the siniestros layer is not loaded, fetch and add it to the map
        let myData = await fetch("siniestros_bogota_d.c.geojson");
        let myPolygon = await myData.json();

        siniestrosLayer = L.geoJSON(myPolygon, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "red",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map);
    }
});
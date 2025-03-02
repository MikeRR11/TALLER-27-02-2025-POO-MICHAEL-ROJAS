// Asegurar que jsPDF esté disponible globalmente
window.jsPDF = window.jspdf.jsPDF;

// Inicializar el mapa de Leaflet y establecer la vista en La Coruña-Bogotá
const map = L.map('map').setView([4.5786, -74.15265], 17); // Coordenadas para La Coruña-Bogotá

// Añadir capa de mosaico de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let loadPolygon = async function() {
    let myData = await fetch("coruna.geojson");
    // await se usa para esperar a que la sentencia se resuelva antes de continuar con la ejecución
    let myPolygon = await myData.json();

    L.geoJSON(myPolygon, {
        style: { color: 'blue' }
    }).addTo(map);
};

loadPolygon();

// Variables para almacenar las capas
let treesLayer;
let siniestrosLayer;

let btnTrees = document.getElementById("btnTrees");
// Añadir event listener para el botón de Árboles
btnTrees.addEventListener("click", async function() {
    if (treesLayer) {
        // Si la capa de árboles ya está cargada, eliminarla del mapa
        map.removeLayer(treesLayer);
        treesLayer = null;
    } else {
        // Si la capa de árboles no está cargada, obtenerla y añadirla al mapa
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

// Añadir event listener para el botón de Distancias
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

// Función para generar el informe en PDF
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
// Añadir event listener para el botón de Siniestros
btnSiniestros.addEventListener("click", async function() {
    if (siniestrosLayer) {
        // Si la capa de siniestros ya está cargada, eliminarla del mapa
        map.removeLayer(siniestrosLayer);
        siniestrosLayer = null;
    } else {
        // Si la capa de siniestros no está cargada, obtenerla y añadirla al mapa
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
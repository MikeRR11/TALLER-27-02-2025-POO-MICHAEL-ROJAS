// Ensure jsPDF is available globally
window.jsPDF = window.jspdf.jsPDF;

// Initialize the Leaflet map and set the view to La Coruña-Bogotá
const map = L.map('map').setView([4.578330940484695, -74.15273450917056], 16); // Coordinates for La Coruña-Bogotá

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
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

let btnTrees = document.getElementById("btnTrees");
//idealmente funcion asincrona para que cargue bien el shape

btnTrees.addEventListener("click", async function() {
    let myData = await fetch("arboles_coruna.geojson");
    // await se usa para esperar a que la sentencia se
    // resuelva antes de continuar con la ejecución
    let myPolygon = await myData.json();

    L.geoJSON(myPolygon, 
        {
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
        }
    ).addTo(map);
}
);
//Ahora hacer el boton  de distancia de los arboles

////////////////////////////////
let btnDistance= document.getElementById("btnDistance");

btnDistance.addEventListener('click',
    async () => {
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
    }
);

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
//idealmente funcion asincrona para que cargue bien el shape

btnSiniestros.addEventListener("click", async function() {
    let myData = await fetch("siniestros_bogota_d.c.geojson");
    // await se usa para esperar a que la sentencia se
    // resuelva antes de continuar con la ejecución
    let myPolygon = await myData.json();

    L.geoJSON(myPolygon, 
        {
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
        }
    ).addTo(map);
}
);
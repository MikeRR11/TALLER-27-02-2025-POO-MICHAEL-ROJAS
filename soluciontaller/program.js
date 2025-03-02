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

        let distances = [];
        let i = 0, j = 1;

        function calculateDistances() {
            if (i < trees.length) {
                if (j < trees.length) {
                    let distance = turf.distance(
                        turf.point(trees[i].coordinates),
                        turf.point(trees[j].coordinates)
                    );
                    distances.push([
                        `Árbol ${trees[i].id}`,
                        `Árbol ${trees[j].id}`,
                        distance.toFixed(3)
                    ]);
                    console.log(`Distance calculated between Árbol ${trees[i].id} and Árbol ${trees[j].id}: ${distance.toFixed(3)}`);
                    j++;
                } else {
                    i++;
                    j = i + 1;
                }
                requestAnimationFrame(calculateDistances);
            } else {
                console.log("Distances calculated", distances);
                generatePDF(distances, trees.length);
            }
        }

        calculateDistances();
    }
);

function generatePDF(distances, totalTrees) {
    console.log("Generating PDF");
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();

    documentPDF.text("REPORTE DE ÁRBOLES EN EL BARRIO GRAN BRITALIA", 10, 10);

    documentPDF.autoTable({
        head: [['Árbol 1', 'Árbol 2', 'Distancia']],
        body: distances
    });
    documentPDF.save("britalia.pdf");
    console.log("PDF generated");
}
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

let btnDistance = document.getElementById("btnDistance");
//idealmente funcion asincrona para que cargue bien el shape

btnDistance.addEventListener("click", 
    async function() {
        let myData = await fetch("arboles_coruna.geojson");
        // await se usa para esperar a que la sentencia se
        // resuelva antes de continuar con la ejecución
        let myPolygon = await myData.json();
        let trees = myPolygon.features.map((myElement, index) => ({
            id: index + 1,
            coordinates: myElement.geometry.coordinates
        }));
    // Con el primer for each recorrer el arreglo de arboles
    // Con el segundo for each recorrer el arreglo de arboles
    // y calcular la distancia entre ellos
    // Almacenar la distancia en un arreglo
    let distances = [];
    console.log(trees);
    trees.forEach((treeA) => {
        trees.forEach(
            (treeB) => {
            // Calcular las distancias calculadas
                let distance = turf.distance(
                    turf.point(treeA.coordinates),
                    turf.point(treeB.coordinates)
            );
            distances.push(
                [
                    `Arbol ${treeA.id}`,
                    `Arbol ${treeB.id}`,
                    distance.toFixed(3)
                ]
            )
        }
    )
    }
)
generatePDF(distances, trees.length);
}
)

function generatePDF(distances, totalTrees) {
    // desestructurar el objeto jsPDF
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();
    documentPDF.autoTable(
        //hacer tabla con autotable
        {
            head: [['Arbol A', 'Arbol B', 'Distancia']],
            body: distances
        }
    );
    documentPDF.save("distancias_arboles.pdf");   
}
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
    async ()=>{
        let response= await fetch("arboles_coruna.geojson");
        let datos= await response.json();
        let trees= datos.features.map((myElement, index)=>({
            id: index+1,
            coordinates: myElement.geometry.coordinates
        }));        

        let distances=[];
        trees.forEach( (treeA)=>{trees.forEach(

            
                (treeB)=>{
                    if(treeA.id != treeB.id){
                        let distance = turf.distance( 
                            turf.point(treeA.coordinates),
                            turf.point(treeB.coordinates),
                        );
                        distances.push(
                            [
                                `Árbol ${treeA.id}`,
                                `Árbol ${treeB.id}`,
                                distance.toFixed(3)                            
                            ]
                        )
                }
            }
            )
        }
        )
        generatePDF(distances, trees.lenght);
    }
)
function generatePDF(distances, totalTrees){
    let { jsPDF } = window.jspdf;
    let documentPDF= new jsPDF();   
    
    documentPDF.text("REPORTE DE ÁRBOLES EN EL BARRIO GRAN BRITALIA", 10,10);

    documentPDF.autoTable(
        {
            head: [['Árbol 1', 'Árbol 2', 'Distance']],
            body: distances
        }
    );
    documentPDF.save("britalia.pdf")
}
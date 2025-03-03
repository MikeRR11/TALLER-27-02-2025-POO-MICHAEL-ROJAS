// This file contains the event handler for the "Distancia entre Árboles" button, which will be defined later.
//aqui calculamos la distancia entre los arboles de la localidad seleccionada
// Event handler for the "Distancia entre Árboles" button

document.getElementById('distancia-arboles').addEventListener('click', function() {
    fetch('js/arbolado.geojson') // Use the GeoJSON file instead
        .then(response => response.json())
        .then(geojson => {
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
            ]);

            const filteredFeatures = geojson.features.filter(feature => {
                const latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
                return laCorunaPolygon.getBounds().contains(latlng);
            });

            const distances = [];
            for (let i = 0; i < filteredFeatures.length; i++) {
                for (let j = i + 1; j < filteredFeatures.length; j++) {
                    const latlng1 = [filteredFeatures[i].geometry.coordinates[1], filteredFeatures[i].geometry.coordinates[0]];
                    const latlng2 = [filteredFeatures[j].geometry.coordinates[1], filteredFeatures[j].geometry.coordinates[0]];
                    const distance = map.distance(latlng1, latlng2);
                    distances.push({
                        tree1: filteredFeatures[i].properties.Codigo_Arb,
                        tree2: filteredFeatures[j].properties.Codigo_Arb,
                        distance: distance.toFixed(2) + ' meters'
                    });
                }
            }

            const doc = new jsPDF();
            doc.text('Distancia entre Árboles', 10, 10);
            distances.forEach((d, index) => {
                if (index > 0 && index % 40 === 0) {  // Add a new page after 40 entries
                    doc.addPage();
                }
                doc.text(`${index + 1}. ${d.tree1} - ${d.tree2}: ${d.distance}`, 10, 20 + (index % 40) * 10);
            });
            console.log('Generating PDF...'); // Debugging line
            doc.save('distancia_entre_arboles.pdf');
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
});

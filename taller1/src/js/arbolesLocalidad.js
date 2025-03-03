// This file contains the event handler for the "Árboles Localidad" button, which will be defined later.
//El objetivo de este botón es mostrar los árboles de la localidad seleccionada en el mapa.
//la pagina de datos abiertos de bogota no funciona, usar archivo local en su lugar
//Usar shapefile de arboles de bogota
// Event handler for the "Árboles Localidad" button

document.getElementById('arboles-localidad').addEventListener('click', function() {
    console.log('Button clicked'); // Debugging line
    fetch('js/arbolado.geojson') // Use the GeoJSON file instead
        .then(response => {
            console.log('Response received:', response); // Debugging line
            return response.json();
        })
        .then(geojson => {
            console.log('GeoJSON data:', geojson); // Debugging line
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

            console.log('Filtered features:', filteredFeatures); // Debugging line

            const filteredGeoJSON = {
                type: "FeatureCollection",
                features: filteredFeatures
            };

            const markers = L.markerClusterGroup();

            L.geoJSON(filteredGeoJSON, {
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(feature.properties.name);
                    }
                    markers.addLayer(layer);
                }
            });

            map.addLayer(markers);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
});
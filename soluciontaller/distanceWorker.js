self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/Turf.js/6.5.0/turf.min.js');

self.onmessage = function(e) {
    const trees = e.data;
    let distances = [];

    for (let i = 0; i < trees.length; i++) {
        for (let j = i + 1; j < trees.length; j++) {
            let distance = turf.distance(
                turf.point(trees[i].coordinates),
                turf.point(trees[j].coordinates),
                { units: 'meters' } // Especificar unidades en metros
            );
            distances.push([
                `Árbol ${trees[i].id}`,
                `Árbol ${trees[j].id}`,
                distance.toFixed(3) // Redondear a tres decimales
            ]);
        }
    }

    self.postMessage(distances);
};

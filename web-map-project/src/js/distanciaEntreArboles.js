// This file contains the event handler for the "Distancia entre Árboles" button, which will be defined later.
//aqui calculamos la distancia entre los arboles de la localidad seleccionada
// Event handler for the "Distancia entre Árboles" button

document.getElementById('distancia-arboles').addEventListener('click', function() {
    fetch('/path/to/web-map-project/src/js/distancia_entre_arboles.pdf') // Asegúrate de que la ruta sea correcta
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'distancia_entre_arboles.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error generating PDF:', error));
});

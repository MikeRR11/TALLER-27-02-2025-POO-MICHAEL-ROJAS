# Web Map Project

This project is a web application that displays a map of the La Coruña neighborhood in Bogotá using the Leaflet library. It includes interactive buttons to provide additional functionalities related to local trees and crime statistics.

## Project Structure

```
web-map-project
├── src
│   ├── css
│   │   └── styles.css        # CSS styles for the webpage
│   ├── js
│   │   ├── main.js           # Initializes the Leaflet map and neighborhood polygon
│   │   ├── arbolesLocalidad.js # Event handler for "Árboles Localidad" button
│   │   ├── distanciaEntreArboles.js # Event handler for "Distancia entre Árboles" button
│   │   └── homicidios.js     # Event handler for "Homicidios" button
│   └── index.html            # Main HTML file
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd web-map-project
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Open the project**:
   Open `src/index.html` in your web browser to view the map and interact with the buttons.

## Functionality

- **Map Display**: The application initializes a Leaflet map centered on La Coruña, Bogotá, and displays the neighborhood's polygon.
- **Buttons**:
  - **Árboles Localidad**: Displays information related to local trees.
  - **Distancia entre Árboles**: Calculates and shows the distance between trees in the area.
  - **Homicidios**: Provides statistics or information regarding homicide incidents in the neighborhood.

## Technologies Used

- HTML
- CSS
- JavaScript
- Leaflet.js

## License

This project is licensed under the MIT License.
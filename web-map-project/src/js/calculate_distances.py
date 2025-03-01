import geopandas as gpd
from shapely.geometry import Point
from fpdf import FPDF

# Load the GeoJSON file
gdf = gpd.read_file('arbolado.geojson')

# Convert to the desired CRS
gdf = gdf.to_crs(epsg=9377)

# Calculate distances
distances = []
for i, row1 in gdf.iterrows():
    for j, row2 in gdf.iterrows():
        if i < j:
            point1 = row1.geometry
            point2 = row2.geometry
            distance = point1.distance(point2)
            distances.append({
                'tree1': row1['Codigo_Arb'],
                'tree2': row2['Codigo_Arb'],
                'distance': f'{distance:.2f} meters'
            })

# Generate PDF
pdf = FPDF()
pdf.add_page()
pdf.set_font('Arial', 'B', 12)
pdf.cell(0, 10, 'Distancia entre Árboles', 0, 1, 'C')

pdf.set_font('Arial', '', 10)
for index, d in enumerate(distances):
    if index > 0 and index % 40 == 0:  # Add a new page after 40 entries
        pdf.add_page()
    pdf.cell(0, 10, f"{index + 1}. {d['tree1']} - {d['tree2']}: {d['distance']}", 0, 1)

pdf.output('/path/to/web-map-project/src/js/distancia_entre_arboles.pdf')

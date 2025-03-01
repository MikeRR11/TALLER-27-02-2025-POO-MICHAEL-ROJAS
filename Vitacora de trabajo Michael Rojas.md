Vitacora de trabajo Michael Rojas

1. Crear el repositorio y empezar a crear los archivos para el frontend y backend
2. Agilizar la creacion de archivos html. js. y css usando el paradigma de programación conversacional
3. Luego de generado el cascaron, realice ajustes para cuadrar el centro del mapa en el barrio y agregar el poligono manual correctamente
4. Ahora, empezar con el boton arboles, use el shp y configure para que quede como cluster puntos ya que hay muchos arboles dentro del area del barrio
5. Ahora la distancia


#### CLASE 28/02 

#Partiendo de lo anterior, me percaté de que el shapefile es muy pesado y no sube a github, por otro lado
decido recortarlo al area de interes y convertirlo a geojson para que sea mas rapido
#Realizando las correcciones, todo funciona mas rapido para mostrar los arboles, ahora retomar el boton de distancia arboles
#Haciendo el reajuste para que distancia arboles admita el geojson, ya se genera un pdf pero esta vacio...



## SIGUIENDO SOLUCION DEL TALLER
#KISS
#DRY
#Uso el codigo que tenia para cargar el mapa y los botones
#Descargo geojson de los barrios para la coruña
##Usar funcion await async en js para darle tiempo a ejecutar a las funciones y que cargue el mapa
#Crear boton y asignar manejador de eventos
#Ahora usar python para usar los shape de los arboles

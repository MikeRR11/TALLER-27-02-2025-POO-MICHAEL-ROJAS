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

## PROLEMA 6, GEOJSON DE ARBOLES DE BOGOTÁ

Utlizamos servicio rest de geovisor - API
creamos bounding box de mi barrio
Estan en datos abiertos de bogota   https://datosabiertos.bogota.gov.co/dataset/censo-arbolado-urbano/resource/2c0d5b2c-dc4c-448b-9573-25864525845c

## Descargar los datos filtrados desde la API (servicio REST)
nos podemos conectar con cualquier lenguaje que admita conexiones de red


### CLASE 01/03

#Agregamos los arboles y los estilos para los botones
#Agregamos los arboles haciendo un recorte con un bounding box para delimitar el area del barrio usando python
#Usamos jsPDF y autotable para generar el informe
#En mi caso particular tengo muchos arboles (mas de 2000) se demora demasiado

# Trabajo independiente
#Luego de la clase, elimino los arvoles que tienen menos de 1.5, dejando 250 arboles
#Sigue demorando demasiado, así que con la ayuda de la IA, genero un an archivo worker para hacer los calculos en paralelo, de esta manera se genera el reporte al instante
#Ahora el boton de los homicidios del barrio
#Primero buscar un geojson de homicidios, si hay
#No se encuentra en geometria tipo punto, entonces uso uno de siniestros viales
#Aplico la misma logica que se uso para los arboles, recorto a la extension del barrio y luego agrego el boton y su event listener
#Ya esta listo, ahora agrego mas cosas para mejorar el producto final
#Modifico la fuente y los botones para que queden centrados, agrego animaciones para que se vea profesional
#Agrego funcionalidad de que si ya estan cargados los geojson, al presionar el mismo boton se remueve la capa


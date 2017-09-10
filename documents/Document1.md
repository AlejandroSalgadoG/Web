# Documento 1

## Definición del Equipo, proyecto y aplicación

### Miembros del equipo y asignación:

**QA1:**	Disponibilidad		**Estudiante:**	Alejandro Salgado

**QA2:**	Rendimiento		**Estudiante:**	Luis Alfredo Gallego

**QA3:**	Seguridad		**Estudiante:**	Jose Luis Alvarez

###Selección de aplicación:

Se trabajará sobre _“Image manager”_ aplicación desarrollada en el proyecto 1 por Alejandro Salgado.

###Descripción de la aplicación
Aplicación web de gestión de imágenes la cual soporta bases de datos que permiten la creación y manejo de perfiles de usuario al igual que creación y manejo de archivos de imágenes con opciones de privacidad.

###Requisitos Funcionales

1. Subir imagen.
2. Buscar imagen por parte del título
3. Borrar artículo por título de imagen
4. Listar las diferentes imágenes
5. Compartir y publicar imagenes

###Detalles tecnicos de gestion de contenidos:

Para la implementación de la gestión de contenidos se hizo uso del paquete
_“Express-fileupload”_, este paquete permite recibir las imágenes en el servidor
y almacenarlas en una ubicación temporal mientras son asignadas a uno de los
servidores de almacenamiento. Dichos servidores permiten guardar la información
de los usuarios de manera particionada para ofrecer tolerancia en el caso
de que se presente algún fallo. Adicional a esto, cada servidor está encargado de
mantener el respaldo de uno de los otros servidores de almacenamiento para garantizar
la disponibilidad de información con el mayor grado de certeza posible. Es importante
mencionar que debido a la implementación del particionamiento y la disponibilidad
no fue posible implementar consistencia en los datos, sin embargo este aspecto
fue considerado como no vital debido a la naturaleza de la aplicación.

Para la lectura de la información se hace uso de los registros creados en una
base de datos MySql la cual retorna el servidor de almacenamiento en la que se
encuentra la imagen solicitada y retorna dicha información en el template HTML
para permitirle al cliente acceder a dicha imagen.


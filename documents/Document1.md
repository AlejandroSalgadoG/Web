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

Para realizar la gestión de archivos se hace uso de una librería para express llamada _“Express-fileupload”_ una vez el archivo se encuentra en el servidor este es almacenado en una carpeta específica para cada usuario, esta distribución nos permite usar múltiples servidores para el almacenamiento permitiendo la escalabilidad de la aplicación, para la obtención de imágenes por búsqueda se llama un método get el cual después de verificar el nombre de usuario y los permisos requeridos retorna todas las imágenes que concuerden con los terminos de busqueda del usuario siempre en cuando este tenga los permisos requeridos, finalmente estas imágenes se retornan dentro del template.

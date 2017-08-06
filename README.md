# NodeJS image_manager

By: Alejandro Salgado Gomez - asalgad2@eafit.educo

# Descripción de aplicación

Aplicación web que permite gestionar imagenes con un simple CRUD de usuarios y archivos.

# 1. Análisis

## 1.1 Requisitos funcionales:

1. Crear imagen.
2. Buscar imagen por parte del titulo
3. Borrar articulo por titulo de imagen
4. Listar las difentes imagenes
5. Compartir y publicar imagenes

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: no se usa - se utilizará Templates HTML para Vista (V)
* Base de datos: Mysql
* Web App Server: NodeJS
* Web Server: Apache Web Server

# 2. Desarrollo

La aplicacion se desarrollo siguiendo el patron MVC, cada uno de los componentes
de este patron se puede encontrar en su respectiva carpeta.

# 2.1 Estructura de carpetas

* app.js -> (main)
* installation
    - install_dependencies.sh -> (script para la instalacion de dependencias de node)
* controller
    - index.js
* model
    - model.js
    - create_database.sql -> (script para la creacion de la base de datos)
* views
    - account.ejs
    - home.ejs
    - logged.ejs
    - users.ejs
* node_modules -> (carpeta contenedora de las dependencias)
* package.json
* package-lock.json
* README.md

# 2.2 Dependencias

* express
* body-parser
* cookie-parser
* mysql
* ejs

# 3. Diseño:

## 3.1 Modelo de datos:

|user| 1---* |associations| *---1 |image|

* user
    - user: String -> (Primary key)
    - password: String

* associations
    - userid: String -> (Foreign key to user.user)
    - imageid: String -> (Foreign key to image.name)
    - owner: Bool

* image
    - name: String -> (Primary key)
    - type: String
    - size: int
    - dimension: String
    - private: Bool

## 3.2 Servicios Web


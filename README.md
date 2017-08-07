# image_manager

Alejandro Salgado Gomez - asalgad2@eafit.educo

# Descripción de aplicación

Aplicación web que permite gestionar imagenes con un simple CRUD de usuarios y archivos.

# 1. Análisis

## 1.1 Requisitos funcionales:

1. Crear imagen.
2. Buscar imagen por parte del titulo
3. Borrar articulo por titulo de imagen
4. Listar las difentes imagenes
5. Compartir y publicar imagenes

Nota: debido a que esta implementacion solo es una primera version algunos errores,
como el duplicar campos de la base de datos, despues de ser debidamente manejados 
por el servidor, son informados al usuario mostrando el error generado en sintaxis
sql en la seccion de mensajes de la aplicacion.

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
    - create_database.sql -> (script para la creacion de la base de datos)
    - install_dependencies.sh -> (script para la instalacion de dependencias de node)
* controller
    - index.js
* model
    - model.js
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

Servicio Web: Cierra una sesion de usuario
- Método: GET
- URI: /logout

- - - 

Servicio Web: Consulta los usuarios existentes en la base de datos
- Método: GET
- URI: /read_users

- - - 

Servicio Web: Acede a la pagina de manejo de cuenta para modificar informacion de un usuario
- Método: GET
- URI: /manage_account

- - - 

Servicio Web: Busca las images publicas de la aplicacion
- Método: GET
- URI: /search_public_images

- - - 

Servicio Web: Busca las images de un usuario
- Método: GET
- URI: /search_private_images

- - - 

Servicio Web: Busca las images compartidas con un usuario
- Método: GET
- URI: /search_shared_images

- - - 

Servicio Web: Busca las images de un usuario cuyo nombre contenga la substring de busqueda
- Método: GET
- URI: /search_user_images?img_serch=val

- - - 

Servicio Web: Autentica al usuario contra la base de datos
- metodo: POST
- URI: /login

__Datos__:
- user
- password

- - - 

Servicio Web: Registra a un usuario en la base de datos
- metodo: POST
- URI: /register

__Datos__:
- ruser
- rpassword
- rpassword2

- - - 

Servicio Web: Borra a un usuario y todos sus archivos de la base de datos
- metodo: POST
- URI: /delete_user

__Datos__:
- password

- - - 

Servicio Web: Actualiza el campo password de un usuario en la base de datos
- metodo: POST
- URI: /update_password

__Datos__:
- old_password
- new_password
- new_password2

- - - 

Servicio Web: Crea una imagen a nombre de un usuario especifico
- metodo: POST
- URI: /create_image

__Datos__:
- name
- type
- size
- dimension
- scope (especifica si la imagen es publica o privada)

- - - 

Servicio Web: Actualiza los datos de la imagen de un usuario en la base de datos
- metodo: POST
- URI: /update_image

__Datos__:
- name
- type
- size
- dimension
- scope (especifica si la imagen es publica o privada)

- - - 

Servicio Web: Comparte o restringe el acceso a una imagen de un usuario
- metodo: POST
- URI: /share_image

__Datos__:
- user_share
- img_name_share
- share (especifica si la accion es de compartir o restringir)

- - - 

Servicio Web: Borra la imagen de un usuario de la base de datos
- metodo: POST
- URI: /delete_image

__Datos__:
- del_img_name

- - - 

Nota: el usuario es mantenido por una cookie la cual es creada por el metodo *login* cuando la autenticacion
es exitosa y es destruida por el metodo *logout*, es por esta razon que no se necesita la informacion del usuario
de manera explicita.

# 4. Despliegue en un Servidor Centos 7.x y digital ocean

## Instalacion de nodejs en el servidor

    $ sudo yum install epel-release  # repositorio extra donde se encuentra el paquete de node
    $ sudo yum install nodejs

## Instalacion de la base de datos

    $ sudo yum install mariadb-server
    $ sudo systemctl start mariadb  # iniciar el servicio de base de datos
    $ sudo systemctl enable mariadb  # configurar el servicio para ejecutarce al iniciar la maquina
    $ sudo /usr/bin/mysql_secure_installation  # configuracion final de la base de datos

## Instalacion del servidor web

    $ sudo yum install httpd
    $ sudo systemctl start httpd
    $ sudo systemctl enable httpd
    $ sudo vim /etc/httpd/conf.d/inv_proxy.conf  # archivo para la configuracion del proxy inverso

Agregar la configuracion de proxy inverso para el dca:

    <VirtualHost *:80>
        ProxyPreserveHost On

        ProxyPass /image_manager http://127.0.0.1:3000/
        ProxyPassReverse /image_manager http://127.0.0.1:3000/
    </VirtualHost>

Nota: como resultado de esta configuracion a las rutas de los fomularios en la vista
se les debe agregar la ruta /image_manger al principio de las uri para que sean bien
redirigidas por el servidor web.

Agregar la configuracion de proxy inverso para el servidor digital ocean:

    <VirtualHost *:80>
        ProxyPreserveHost On

        ProxyPass / http://127.0.0.1:3000/
        ProxyPassReverse / http://127.0.0.1:3000/
    </VirtualHost>

## Configuracion de puertos

    $ sudo firewall-cmd --zone=public --add-service=http --permanent
    $ sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
    $ sudo firewall-cmd --reload


## Configurar la aplicacion

    $ git clone https://github.com/AlejandroSalgadoG/Web.git  # descargar codigo
    $ cd Web/installation
    $ ./install_dependencies.sh
    $ mysql -u root -p < create_database.sql

## Configuracion de manejador de procesos

    $ sudo npm install pm2 -g
    # generar el servicio que va a ejecutar la aplicacion al encender la maquina
    $ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u asalgad2 --hp /home/asalgad2
    $ pm2 start app.js
    $ pm2 save

# Miembros del equipo

* Luis Alfredo Gallego Montoya - lgalle17@eafit.educo
* Jose Luis Alvarez Herrera - jalvar53@eafit.educo
* Alejandro Salgado Gomez - asalgad2@eafit.educo

# Diseño de la arquitectura de la aplicación

## Tecnologias de desarrollo

* Nodejs
* HAproxy
* MySql
* NFS
* Corosync
* Pacemaker
* Pcs
* Rsync
* Git
* Pm2
* OpenID Google
* LDAP
* Express
* Let's Encrypt
* Active Directory

## Arquitectura

![](https://github.com/AlejandroSalgadoG/Web/blob/master/documents/img/general-architecture-view.png "Vista Arquitectura General")

## Informacion de uso

* Url repositorio: https://github.com/AlejandroSalgadoG/Web
* Url ejecucion: http://10.131.137.145

## Implementacion y pruebas

### Disponibilidad

Para este atributo de calidad las modificaciones al código fuente no fueron muy
trascendentales, debido a que los balanceadores manejan tanto la conexión de clientes
como las peticiones de bases de datos los únicos cambios que fueron necesarios en
esta nueva implementación de la aplicación fue la consulta de las imágenes en las
carpetas de NFS y el desarrollo de las técnicas para detectar su disponibilidad.

Las pruebas que se realizaron fueron:

* Apagar el balanceador de carga principal
* Apagar el servidor web que tiene la conexión del cliente
* Apagar una base de datos
* Apagar un servidor NFS
* Reiniciar las máquinas

En todos los casos la aplicación continuó su funcionamiento sin presentar problemas
mientras que quede al menos un servidor que provea cada funcionalidad, excepto en el
caso de falla en el sistema de archivos donde se presenta un deterioro en el tiempo
de respuesta de imágenes debido al tiempo que toma detectar que el servidor no
está disponible para conmutar a su respaldo.

### Seguridad

Para la seguridad los principales cambios fueron producidos en el backend, donde 
se iba a implementar un SSO (Single Sign-On) externo a través de Google e interno
a través de LDAP con Active Directory. A su vez, se aseguraron los servicios RESTful
con API Key, de forma que a través de tokens se verificaría la identidad del usuario 
que accedía a los recursos del servidor. Por otro lado, se generó un certificado SSL
a través de Let's Encrypt, para encriptar el canal de comunicación a través de HTTPS
al dominio del proyecto 14 (https://proyecto14.dis.eafit.edu.co). Con este certificado
se configuró el servidor con HAproxy que redireccionaría al servidor privado de la aplicación.

Las pruebas que se realizaron fueron:

* Encripción y verificación de contraseñas
* Verificación de tokens a través de GoogleAuth y OAuth2
* Verificación de canal encriptado HTTPS al HAproxy público

En cada caso de pruebas, funcionó correctamente. Se tuvo problemas con el certificado SSL
debido a que se llego al límite de certificados para el dominio eafit.edu.co, por lo que
se uso el mismo certificado de st063.dis.eafit.edu.co. Haciendo que el canal no sea reconocido
como seguro en el HAproxy público.

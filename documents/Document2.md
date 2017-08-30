# QA - Seguridad

La seguridad es el requisito no funcional operacional que describe la capacidad de una aplicación de controlar el acceso a sus datos y servicios. Además de ser capaz de detectar, aislar y restablecer continuidad ante una falla de seguridad. Es uno de los requisitos no funcionales a mas importantes cuando se trata de sistemas que almacena y opera sobre datos sensibles por lo que debe contar con estrategias y mecanismos que protejan la integridad de la información como la autenticación de usuarios y la autorización.

A través de los escenarios podemos identificar porque es importante la seguridad en un sistema. Por ejemplo, un sistema que permita crear una cuenta con un nombre de usuario, una contraseña y un e-mail debe garantizar la privacidad de la información y realizar la correcta validación de los permisos que le son concedidos al usuario sobre la aplicación con esas credenciales, así mismo si la aplicación permite subir fotos con un atributo sobre su visibilidad (Privado o público), el sistema debe ser capaz de redireccionar de ese recurso a los usuarios que intenten acceder a este sin los permisos correspondientes.

Para garantizar este comportamiento que proteja la integridad y la privacidad de la información, la aplicación debe contar con una arquitectura bien definida que tenga lineamientos dirigidos a la seguridad. La buena calidad general del código es importante, así como probar constantemente el código con herramientas de testing de seguridad que permitan encontrar bugs o vulnerabilidades. Además de usar patrones de diseño como proxys y codificadores de información, validar entradas de los usuarios, encriptar los canales de comunicación entre el cliente y el servidor, identificar a los usuarios correctamente y brindarles la autorización correspondiente de estos sobre los recursos de la aplicación.

# Análisis de escenarios de la aplicación:

## Vistas de Arquitectura:

![alt text](https://ibb.co/hA0v6k "Vista Arquitectura Seguridad")

## Acceso a perfil:

**Fuente:** Cliente.
**Estímulo:** Inicio de sesión.
**Artefacto:** Datos de Usuario.
**Ambiente:** Operaciones de autenticación.
**Respuesta:** Validación de entrada de usuario.
**Medición:** Petición correctamente validada.

## Modificación de datos de perfil:

**Fuente:** Cliente.
**Estímulo:** Modificación de datos de usuario.
**Artefacto:** Datos de Usuario.
**Ambiente:** Operaciones de modificación.
**Respuesta:** Validación de credenciales y modificación de datos de perfil si la validación es correcta.
**Medición:** Modificación de datos de perfil o error en la validación de credenciales.

## Modificación de contenido existente:

**Fuente:** Cliente.
**Estímulo:** Modificar contenido existente.
**Artefacto:** Datos de contenido.
**Ambiente:** Operaciones de modificación.
**Respuesta:** Validación de credenciales y modificación de datos de contenido si la validación de correcta.
**Medición:** Modificación de datos de contenido o error en la validación de credenciales.

## Visualización de contenido existente:

**Fuente:** Cliente.
**Estímulo:** Cargar imágenes públicas de la aplicación y privadas del usuario en sesión.
**Artefacto:** Datos de contenido.
**Ambiente:** Operaciones de lectura.
**Respuesta:** Validación de credenciales y listado de las imágenes correspondientes.
**Medición:** Lista de contenido público y la contenido privado del usuario en sesión correctamente presentados..

# Diseño:

## Patrones de arquitectura:

**Test Driven Design:** El diseño orientado a pruebas permite estar constantemente revisando la arquitectura y la implementación de la aplicación, haciendo así menos la probabilidad de aparición comportamiento inesperado y fallos.

**Proxy Pattern:** El patrón de diseño Proxy Pattern provee una forma de validar el comportamiento de las objetos en cuanto a su acceso a otras fuentes de datos. El patrón consiste en una clase que funciona como interfaz entre dos objetos permitiendo la validación de quien quiere acceder al objeto fuente de información.

**Security patterns for Java EE, XML Web Services and Identity Management:** El grupo Sun Java Center de Sun Microsystems creó un conjunto de patrones de seguridad que ayudan a la construcción de sistemas más seguros multi-capas orientados a objetos y servicios Web basados en XML. Algunos de las características más importantes son el manejo de identidad en aplicaciones web, autenticación SSO (Single Sign On), autenticación multi-factor,  generación de informes y seguridad a nivel de datos. Algunos de los patrones más importantes que incluye este conjunto son: 

**Authentication Enforcer pattern:** Se usa para administrar y delegar procesos de autorización y autenticación.

**Intercepting Validator pattern:** Se usa para crear validaciones de seguridad con los datos de entrada por parte del cliente.

**Secure Logger pattern:** Se usa para crear informes de información sensible garantizando un almacenamiento a prueba de manipulaciones.

**Message Inspector pattern:** Se usa para la verificación y validación de XML a través de mecanismos como encripción de XML y firmas de XML en conjunto con el uso de tokens de seguridad.

**Credential Synchroniser pattern:** El patrón describe cómo sincronizar de forma segura las credenciales de un usuario a través de múltiples aplicación usando un proveedor de identificación.

## Best Practices:

**Validación de entradas:** Validar las entradas del usuario permite evitar ataques como SQL Injection y causar brechas de seguridad a nivel de base de datos.

**Autenticación y administración de contraseñas:** La buena administración de contraseñas y de un buen método de autenticación evita el ingreso de al sistema por terceros no deseados y brinda seguridad a los usuarios de la aplicación.

**Control de Acceso:** El control de acceso consiste en llevar una jerarquía de quienes pueden acceder al sistema y con qué permisos.

**Buenas prácticas criptográficas:** Permite encriptar la información sensible, haciendo que sea más difícil acceder a ella por partes externas del sistema.

**Manejo de errores y de informes:** El manejo de errores y de informes permite llevar cuenta de los fallos y tener un registro de los eventos ocurridos alrededor de partes críticas o información sensible del sistema, haciendo así que los errores sean fácilmente identificados y corregidos.

**Protección de datos:** La protección de datos es una práctica fundamental y necesaria. La información sensible del negocio debe tener la mayor cantidad de filtros necesarios para ser accedida, se debe garantizar la privacidad de los usuarios y la integridad de su información.

**Configuración del sistema:**  La configuración del sistema delega permisos, controla los flujos de trabajo, permite la generación de registros de acuerdo a las necesidades y lo hace flexible o rígido en cuanto a autorización de acuerdo al nivel de jerarquía de los usuarios en la aplicación.

**Manejo de archivos:** El manejo de archivos y la jerarquía de sus permisos es importante para evitar que información y vulnerabilidades sean expuestas a terceros.

**Manejo de Memoria:** El buen manejo de la memoria permite evitar vulnerabilidades como Buffer y Stack Overflow y evita Memory Leaks.

## Tácticas:

**Password Hashing:** Encriptar las contraseñas de los usuarios provee un anillo extra de seguridad a nivel de bases de datos y de intercambio de información, haciendo que la información sensible como las contraseñas no sea accedida fácilmente.

**HTTPS:** Usar HTTPS para garantizar una conexión segura que permita un intercambio de información entre el cliente y el servidor de forma que se provea privacidad e integridad de los datos.

**Autenticación SSO:** Es el mecanismo por el cual el cliente solo tiene que iniciar sesión una vez para acceder a un conjunto de sistemas relacionados pero independientes, permitiendo un mejor manejo de sesiones y una mejor experiencia para el usuario.

**Autorización:** La autorización es el mecanismo que nos permite brindarle permisos a un usuario de acceder o no a un recurso proveído por el servidor según su identidad.

**Autenticación de Servicios RESTful:** La autenticación de los servicios RESTful permite identificar quién trata de acceder a los servicios o datos prestados por el servidor a través de peticiones HTTP.

## Herramientas:

Passport.js
LDAP (Lightweigh Directory Access Protocol)
HTTPS
SSL o TLS
Encripción (scrypt, bcrypt, SQL Data Hashing)
SonarQube

## Bibliografía:

Ramesh Nagappan, Christopher Steel. Core Security Patterns: Best Practices and Strategies for J2EE, Web Services and Identity Management, Prentice Hall, 2005.


* https://en.wikipedia.org/wiki/Security_pattern#cite_ref-6
* https://security.berkeley.edu/secure-coding-practice-guidelines
* https://view.officeapps.live.com/op/view.aspx?src=http://dis.unal.edu.co/~icasta/GGP/_Ver_2009_1/GGP_2009_1_gr3/GGP20091GR3_Entregas/GGP20091GR3_E3/SoftdellaFunk_Especificacion_Requerimientos_No_Funcionales.doc
* https://en.wikipedia.org/wiki/Single_sign-on
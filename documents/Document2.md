# QA - Seguridad

La seguridad es el requisito no funcional operacional que describe la capacidad de una aplicación de controlar el acceso a sus datos y servicios. Además de ser capaz de detectar, aislar y restablecer continuidad ante una falla de seguridad. Es uno de los requisitos no funcionales a mas importantes cuando se trata de sistemas que almacena y opera sobre datos sensibles por lo que debe contar con estrategias y mecanismos que protejan la integridad de la información como la autenticación de usuarios y la autorización.

A través de los escenarios podemos identificar porque es importante la seguridad en un sistema. Por ejemplo, un sistema que permita crear una cuenta con un nombre de usuario, una contraseña y un e-mail debe garantizar la privacidad de la información y realizar la correcta validación de los permisos que le son concedidos al usuario sobre la aplicación con esas credenciales, así mismo si la aplicación permite subir fotos con un atributo sobre su visibilidad (Privado o público), el sistema debe ser capaz de redireccionar de ese recurso a los usuarios que intenten acceder a este sin los permisos correspondientes.

Para garantizar este comportamiento que proteja la integridad y la privacidad de la información, la aplicación debe contar con una arquitectura bien definida que tenga lineamientos dirigidos a la seguridad. La buena calidad general del código es importante, así como probar constantemente el código con herramientas de testing de seguridad que permitan encontrar bugs o vulnerabilidades. Además de usar patrones de diseño como proxys y codificadores de información, validar entradas de los usuarios, encriptar los canales de comunicación entre el cliente y el servidor, identificar a los usuarios correctamente y brindarles la autorización correspondiente de estos sobre los recursos de la aplicación.

# Análisis de escenarios de la aplicación:

## Vistas de Arquitectura:

![](https://github.com/AlejandroSalgadoG/Web/blob/master/documents/img/architecture-view-security.PNG "Vista Arquitectura Seguridad")

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

* Passport.js

* LDAP (Lightweigh Directory Access Protocol)

* HTTPS

* SSL o TLS

* Encripción (scrypt, bcrypt, SQL Data Hashing)

* SonarQube

# QA - Rendimiento

Se entiende como rendimiento al requisito no funcional que se encarga de optimizar que los tiempos de respuesta y el desempeño de los componentes de la aplicación en general, para esto, se sirve de una serie de pruebas que puedan mostrar el comportamiento de la aplicación bajo diferentes circunstancias, por esta razón el control del rendimiento de la aplicación está fuertemente ligado con el TDD y los otros patrones que implementan pruebas así como todas las herramientas disponibles para la realización de esta tarea.

Una forma de medir importancia de este requisito sobre la aplicación en la que se está trabajando es mediante escenarios de contexto, si por ejemplo se tiene una aplicación la cual le permite a los usuarios tomar una foto y recibir una descripción del lugar se esperaría que este proceso tomará un tiempo y no se vería muy afectada la calidad de la aplicación por esto mismo, sin embargo si se tiene una la cual soporta un chat entre los usuarios se esperaría que fuera tan en tiempo real como fuera posible, ya que un tiempo de respuesta de lento de parte del servidor afectaría muy negativamente la calidad de la comunicación y por lo tanto la calidad de la aplicación.

Para optimizar el rendimiento de una aplicación hay múltiples acciones que se pueden tomar, estas se pueden dividir según la capa sobre la que se está trabajando, a nivel de hardware se puede mejorar la capacidad y velocidad de procesamiento los servidores, adicionalmente se podrían agregar máquinas adicionales a través de un proxy inverso, lo que nos permitirá implementar soluciones como balanceadores de carga y caché de archivos estáticos,
a nivel de datos se podría realizar compression de los datos o se podría buscar almacenarlos en el lado del usuario para un acceso más rápido, a nivel de conecciones se pueden usar protocolos como SSL y TLS que pueden ser más veloces debido a que no usan procesos de seguridad como los “Handshakes”.

# Análisis de escenarios de la aplicación

Para la aplicación “image manager” se tienen dos funcionalidades principales; la gestión de perfiles y de imágenes o contenido general, para cada una de estas se tienen unos casos bases sobre los cuales se tienen que cumplir con estándares de rendimiento de lo que la gente esperaría de la página, es importante resaltar que estos escenarios son el objetivo y no el estado actual de la aplicación:

---

## Acceso a datos del perfil:
**Fuente:** Usuario

**Estímulo:** Acceso a datos de perfil

**Artefacto:** Servidor de aplicación

**Ambiente:** Operación normal

**Respuesta:** Se muestran los datos requeridos

**Medida de respuesta:** 1s en promedio

---

## Acceso a datos comúnmente usados:
**Fuente:** Usuario

**Estímulo:** Búsqueda de imagen común

**Artefacto:** Sistema de archivos

**Ambiente:** Operación normal, archivo en caché

**Respuesta:** Se saca del cache de imagenes locales

**Medida de respuesta:** El archivo se recupera en la mitad o menos del tiempo usual de respuesta

---

## Acceso a datos bajo carga:
**Fuente:** Usuario

**Estímulo:** Acceso a datos de perfil

**Artefacto:** Servidor de aplicación

**Ambiente:** Sistema bajo carga límite

**Respuesta:** Se pone la petición en una cola y posteriormente muestran
los datos requeridos

**Medida de respuesta:** 2s en promedio (1s adicional)

---

## Subida de nuevo contenido:
**Fuente:** Usuario

**Estímulo:** Subir una nueva imagen

**Artefacto:** Sistema de archivos

**Ambiente:** Operación normal

**Respuesta:** Se cargan los datos de forma normal

**Medida de respuesta:** 10s en promedio

---

## Descarga del contenido existente:
**Fuente:** Usuario

**Estímulo:** Descarga de archivo

**Artefacto:** Sistema de archivos

**Ambiente:** Operación normal

**Respuesta:** Se envía el archivo para ser descargado desde el browser

**Medida de respuesta:** 5s en promedio

---

## Modificación del código de la aplicación
**Fuente:** Administrador

**Estímulo:** Creación de nueva versión de la aplicación

**Artefacto:** Sistema de integración continua

**Ambiente:** Operación normal

**Respuesta:** Se corren las pruebas y se miden nuevamente los tiempos de respuesta en la aplicación

**Medida de respuesta:** Los tiempos de respuesta se mantienen estables o se reducen

---

# Diseño


## Vistas de arquitectura:

![](https://github.com/AlejandroSalgadoG/Web/blob/master/documents/img/Performance.JPG "Vista Arquitectura Rendimiento")

---

## Patrones de arquitectura:

**TDD:** Las pruebas van fuertemente ligadas al desempeño, si la aplicación no posee las herramientas para determinar cuál es la velocidad y la capacidad máxima, no es posible determinar dónde están los cuellos de botella y los componentes o servicios que requieren de alguna optimización para alcanzar los tiempos de respuesta deseado.

**SOA:** La arquitectura orientada a servicios es importante en múltiples niveles para el rendimiento, por un lado, debido al bajo acoplamiento de sus componentes esta es un poco más liviana y resistente a los fallos que aplicaciones creadas bajo otras arquitecturas, adicionalmente, esto permite que los componentes más lentos no necesariamente afecten la funcionalidad general de la aplicación según el caso.

---

## Best Practices:

**Reducción de complejidad:** El punto más importante desde el cual parte el rendimiento de la aplicación, como están construidos los métodos y el código fuente en general, es fundamental como primer paso encontrar cualquier forma de quitarle complejidad a los métodos, sacar condicionales de ciclos, evitar la repetición de código al máximo y reusar tanto como sea posible.

**Reducción de peticiones:** Las peticiones al servidor si bien son muy necesarias también consumen un buen tiempo por lo que deben comunicarse con el servidor y volver, muchas veces, es preferible cargar contenido que no ha pedido el usuario mediante un request que no está relacionado que esperar a que haga una petición para cada pequeña operación que este desea realizar.

**Reducción de redirecciones:** Como hablamos en el punto anterior los procesos que requieren redireccionar al usuario a otras páginas pueden ser muy costosos en tiempo y muchas veces puede ser evitado fácilmente a través de contenido dinámico y precarga de contenidos.

**Load Balancing:** Cuando se tiene el servidor corriendo en múltiples servidores es posible añadir un componente llamado “Load Balancer” el cual puede determinar la carga de los servidores y redirigir los usuarios entrantes de forma en que cada uno de los servidores maneje una equitativa, manteniendo el rendimiento de la aplicación consistente para todos los usuarios.

---

## Tácticas:

**Caching:** Es el proceso mediante el cual se almacenan ciertos datos en lugares desde los cuales sean accedidos mas facil y rapidamente por el usuario, usualmente en capas superiores de la aplicación o inclusive en el mismo dispositivo del usuario, este suele tener menos espacio que la fuente original de almacenamiento de los datos y por esta razón solo se suelen almacenar allí los datos más usados.

**Compresión:** Es un método el cual comprime recursos del servidor como imágenes, datos y código fuente para optimizar su transferencia asegurándose que ocupe el menor espacio posible, adicional a esto se puede aplicar un algoritmo de minificación el cual elimina espacios y otros caracteres que no son fundamentales para el funcionamiento de todos tus archivos de HTML, Scripts y CSS.

**Client hosting:** Similar al caching, es posible guardar ciertos datos de la sesión y la aplicación en el lado del usuario, esto elimina la necesidad de hacer un request cada vez que se requieran esos recursos e incluso permite acceder a ciertas funcionalidades de la aplicación sin necesidad de hacer llamados al servidor.

**Encolamiento:** Cuando el servidor soporta procesos cuyo tiempo de respuesta es inevitablemente alto es importante tomar medidas para evitar que estos acaparen todo el poder procesamiento del servidor o bloqueen la aplicación hasta que estén completos, la forma más común de realizarlo es a través de la implementación de colas de trabajo, las cuales reciben las peticiones de todos los usuarios pero limitan la realización de los trabajos hasta que las anteriores sean completadas.

---

## Herramientas:

- LoadMeter

- Apache Jmeter

- Rational Performance

- Tester

- Silk Performer

- Gatling

---

# QA - Disponibilidad

Este QA es definido como la capacidad de la aplicación de estar continuamente disponible para los usuarios sin ninguna pérdida de servicio. Este atributo de calidad permite que la aplicación garantice su servicio con un nivel de certeza acordado en los SLA con el usuario, permite ganar competitividad debido a la minimización que se hace de los tiempos muertos o downtime de las aplicaciones, ayuda a minimizar las pérdidas de información que se pueden llegar a dar, entre otros.

Hay diversas maneras de implementar este atributo de calidad, en general la estrategia más usada es un mecanismo de Failover, el cual consiste en tener sistema de respaldo esperando a que el sistema principal presente errores en su funcionamiento con el objetivo de tomar su lugar, logrando así un mantenimiento del servicio transparente para el usuario. Adicional a este patrón es usual encontrar estrategias de replicación, las cuales buscan hacer copias periódicas del estado del sistema para facilitar el cambio de servidor en caso de una falla. Otra aproximación que se puede tener es la de redundancia donde se tienen sistemas completos adicionales al principal que pueden prestar el mismo servicio. Finalmente es muy usual que se implementen mecanismos de Failback, los cuales son una serie de acciones que se llevan a cabo para lograr que el sistema primario pueda volver a su funcionamiento normal. Es importante mencionar que estas estrategias pueden ser usadas a lo largo de toda la arquitectura, desde la capa de aplicación, incluyendo de red y capas de almacenamiento, etc.

Adicionalmente se pueden implementar estrategias de funcionamiento degradado, en los cuale el sistema, al verse incapaz de solucionar la falla ocurrida, anula algunas funcionalidades no vitales con el objetivo de seguir prestando el servicio a los usuarios. Otras opciones que permiten mantener la disponibilidad al enfrentar grandes niveles de solicitudes son las comunicaciones asíncronas o no bloqueantes, donde simplemente se notifica a las entidades de la necesidad de atender una solicitud, pero no se obliga a su inmediata atención, esta estrategia es acompañada usualmente con implementaciones de colas de mensajes.

Por otra parte, a estos diseños se pueden agregar la virtualización de componentes, los cuales pueden mejorar la disponibilidad, al permitir manejar de una mejor manera los cambios de carga por medio de redistribuciones de hardware o permitiendo una utilización más eficiente los recursos que ofrece la plataforma física. Cabe resaltar la importancia de tener un mantenimiento continuo del sistema, ya sea a manera de prevención, corrección o actualización.

A la hora de implementar arquitecturas orientadas a este requisito es importante tener en cuenta algunos conceptos como el teorema CAP, que establece la imposibilidad de tener consistencia, particionamiento y disponibilidad en un mismo sistema, por lo cual es necesario analizar cuáles son los factores más necesarios en la aplicación específica. Por ejemplo en casos en los que los datos almacenados no son muy sensibles a la modificación, pero necesitan ser consultados constantemente, se pueden utilizar bases de datos no relacionales para permitir la disponibilidad y particionamiento necesarios para favorecer un buen servicio. Sin embargo si los datos son considerados como muy sensibles a la modificación, como por ejemplo estados de cuenta bancarios, entonces es necesario sacrificar ya sea el particionamiento o la disponibilidad para utilizar modelos relacionales que garanticen un buen tratamiento de la información.

Finalmente se encontró que algunas de las mejores prácticas para este atributo de calidad son la implementación de un servicio de alerta y monitoreo a nivel de hardware para la rapida deteccion de fallas en el sistema, minimizar los tiempos fuera de servicios para mantenimientos con preparaciones anticipadas de respaldo con el objetivo de no degradar el servicio durante estas tareas, mantener una arquitectura lo más simple posible para permitir su extensibilidad y mantenibilidad, en lo posible implementar servicios sin estado para facilitar el cambio de servidores o por lo menos lo más desacoplado posible para independizar lo más posible la aplicación de un servidor particular, implementar estrategias de data-pull para tener una mayor eficiencia en la comunicación con los usuarios, implementar estructuras de caché para utilizar los recursos en una manera más eficiente y por último implementar mecanismos de recuperación lo más automatizados posibles para reducir la intervención humana y reducir así tiempos de respuesta a la hora de encontrarse con alguna falla.

# Análisis de escenarios de la aplicación:

---

## Falla de energía en un servidor de aplicación:
**Fuente:** Factores externos

**Estímulo:** Fallo de energía

**Artefacto:** Balanceador de carga

**Ambiente:** Un servidor apagado, sin energía

**Respuesta:** Balanceador aisla nodo apagado

**Medida de respuesta:** La aplicación se mantiene en funcionamiento sin downtime

---

## Adición de nuevo servidor de aplicación
**Fuente:** Administrador

**Estímulo:** Instalación de nuevo servidor en la infraestructura

**Artefacto:** Balanceador de carga

**Ambiente:** Condiciones normales

**Respuesta:** El nuevo servidor es registrado sobre las redirecciones del balanceador

**Medida de respuesta:** El nuevo tráfico es redirigido reduciendo tiempo de respuesta y mejorando la probabilidad de mantener la disponibilidad

---

## Almacenamiento no disponible
**Fuente:** Usuario

**Estímulo:** Almacenamiento de nuevos archivos

**Artefacto:** Sistema de archivos

**Ambiente:** Nodo de almacenamiento sin espacio disponible

**Respuesta:** Nodo de aplicación guarda información en otro nodo

**Medida de respuesta:** La aplicación mantiene su funcionamiento sin pérdida de datos

---

## Balanceador de carga falla
**Fuente:** Factores externos

**Estímulo:** Balanceador no responde

**Artefacto:** Sistema de archivos

**Ambiente:** Sin conexión a la aplicación

**Respuesta:** Se activa failover del segundo balanceador

**Medida de respuesta:** La aplicación mantiene su funcionamiento con downtime mínimo

---

## Base de datos falla
**Fuente:** Usuario de la aplicación

**Estímulo:** Acceso a datos de perfil

**Artefacto:** Base de datos

**Ambiente:** Sin conexión a la aplicación

**Respuesta:** Segunda base de datos asume la responsabilidad de la capa de datos

**Medida de respuesta:** La aplicación entrega los datos actualizados y mantiene su funcionamiento sin downtime

---

## Creación de nuevo perfil
**Fuente:** Usuario

**Estímulo:** Creación de perfil

**Artefacto:** Base de datos

**Ambiente:** Funcionamiento correcto

**Respuesta:** El perfil es creado de forma normal

**Medida de respuesta:** La segunda base de datos copia los datos lo antes posible, asegurando disponibilidad

---

# Diseño

## Vista de arquitectura:

![](https://github.com/AlejandroSalgadoG/Web/blob/master/documents/img/architecture-view-availability.PNG "Vista Arquitectura Disponibilidad")

## Patrones de arquitectura, best practices, tacticas y herramientas:

Los patrones de arquitectura que serán implementados en el proyecto 2 serán un Failover para los balanceadores, una estructura redundante de bases de MySql en configuración Master-Master que permite tener disponibilidad y un cierto grado de consistencia, por último se utilizará replicación de datos en los nodos de almacenamiento para garantizar disponibilidad y particionamiento ya que se considera que las imágenes no son datos sensibles que deben tener un alto grado de consistencia.

Las best practices implementadas son stateless sessions gracias a una implementación basada en cookies, aislamiento de nodos que no respondan al monitoreo del balanceador de cargas, llamadas asincrónicas en los servicios que se le proporcionan al cliente, implementación de una arquitectura simple que facilite la extensibilidad y mantenibilidad del código de la aplicación y aislamiento de la lógica de la aplicación de un servidor en particular.

Además de las herramientas mencionadas anteriormente se piensa utilizar el protocolo rsync para mantener una copia de seguridad de los archivos en los nodos de almacenamiento y se utilizar el sistema de archivos distribuido NFS para acceder a los archivos almacenados debido a la transparencia y facilidad que permitía a nivel de la aplicación web.

---

## Bibliografía:

* Ramesh Nagappan, Christopher Steel. Core Security Patterns: Best Practices and Strategies for J2EE, Web Services and Identity Management, Prentice Hall, 2005.
* https://en.wikipedia.org/wiki/Security_pattern#cite_ref-6
* https://security.berkeley.edu/secure-coding-practice-guidelines
* https://view.officeapps.live.com/op/view.aspx?src=http://dis.unal.edu.co/~icasta/GGP/_Ver_2009_1/GGP_2009_1_gr3/GGP20091GR3_Entregas/GGP20091GR3_E3/SoftdellaFunk_Especificacion_Requerimientos_No_Funcionales.doc
* https://en.wikipedia.org/wiki/Single_sign-on

* Chapter 3: “Optimizing Performance of Enterprise Web Application”, Book:“Architecting High Performing, Scalable and Available Enterprise Web Applications” by:Shailesh Kumar Shivakumar, 2015

* Chapter 8: Performance Book: Software Architecture in Practice, 3th Ed

* https://www.nginx.com/blog/10-tips-for-10x-application-performance/
* https://developers.google.com/web/fundamentals/performance/
* https://www.keycdn.com/blog/website-performance-optimization/

* Len Bass; Paul Clements; Rick Kazman, Software Architecture in Practice, Third Edition, Addison-Wesley Professional, 2012, capitulo 5
* Shailesh Kumar Shivakumar, Architecting High Performing, Scalable and Available Enterprise Web Applications, Morgan Kaufmann, 2014, capitulo 1

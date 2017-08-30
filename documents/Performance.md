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

## Bibliografía:

* Chapter 3: “Optimizing Performance of Enterprise Web Application”, Book:“Architecting High Performing, Scalable and Available Enterprise Web Applications” by:Shailesh Kumar Shivakumar, 2015

* Chapter 8: Performance Book: Software Architecture in Practice, 3th Ed

* https://www.nginx.com/blog/10-tips-for-10x-application-performance/
* https://developers.google.com/web/fundamentals/performance/
* https://www.keycdn.com/blog/website-performance-optimization/
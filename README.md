# Personajes Históricos API (Curso Angular 2 CodeBox)
En este proyecto encontrarán los archivos necesarios para poder ejecutar de manera local el API de Personajes Históricos. Este proyecto tiene como objetivo principal, demostrar como crear un API utilizando tecnologías como: **NodeJS**, **MySQL**, **Express** y **Sequelize**, este último sirve como *ORM* para realizar la comunicación y operaciones con nuestra base de Datos.


## Configuración Inicial del Proyecto

Para poder ejecutar el proyecto en un ambiente local, debes tener intalado lo siguiente:
  * NodeJS v6+
  * MySQL
  * Git
  * WorkBench o PHP My Admin

Con estas herramientas instaladas en nuestra computadora podemos proceder a configurar nuestro entorno y poder ejecutar la aplicación de manera correcta.

* ### Paso 1: Clonar el Repositorio
  Al tener instalado *Git* en nuestra computadora podremos clonar el repositorio y tener una copia local del mismo, para ello debemos abrir una terminal o ventana de comando, movernos hacia la carpeta o destino en donde querramos que se encuentre nuestro proyecto y escribimos la siguiente linea de codigo:
  ```javascript
  git clone https://github.com/wcorderolara/backend_historical_characters
  ```
  Se iniciara el proceso de descarga del proyecto, al finalizar, se podra acceder a la carpeta llamada *backend_historical_characters*, dentro de esta carpeta se encontrara la siguiente estructura de archivos y carpetas
  * **config (carpeta)**
    * config.json: archivo de configuracion de las bases de datos para los entornos, en este caso estaremos trabajando en el entorno de **development**
    * passport.js: Archivo que contiene la configuracion validar el inicio de sesion de los usuarios dentro de la aplicacion
  * **backend**: en esta carpeta se encuentran todos los archivos que componen la aplicacion, tales como las *rutas*, los *controladores*, y algunos *servicios generales*  que se emplean dentro de los controladores
    * *api (carpeta)*: dentro de este se encuentra el archivo **routes.js** el cual contiene la declaracion de todas y cada una de las rutas que implementara nuestra API.
    * *controller (carpeta)*: dentro de este se encuentran todos los controladores y los metodos que se encargaran de efectuar la logica del API al momento de ser invocados desde su ruta especifica.
    * *services (carpeta)*: Contiene servicios generales que son utilizados por todos los controladores, con el fin de poder optimizar y reutilizar el codigo, se realizo esta refactorizacion. tambien encontraran el archivo **serverCodes.json** el cual contiene el listado de los posibles estados que puede retornar la aplicacion.
  * **migrations (carpeta)**: En esta carpeta se encuentran las migraciones para hacer el seed de la data de la base de Datos, esta se debera ejecutar cuando hayamos levantado el proyecto en nuestro ambiente local.
  * **models (carpeta)**: Aca tendremos todos los modelos con los que cuenta nuestra aplicacion, estos modelos son con los cuales se crea la base de datos al momento de ejecutar la aplicacion por primera vez
  * **test (carpeta)**: Aca se encuentran los test realizados para el API, actualmente se encuentra el test para el API de *Categories*
  * **.env**: para el entorno de Windows este archivo representa las variables de entorno que se pueden crear dentro de los ambientes UNIX y LINUX
  * **app.js**: Servidor principal de nuestra aplicacion, aca se encuentra la configuracion inicial de nuestra aplicacion, incluso se encuentra la instruccion para levantar el servidor al momento de ejecutar la aplicacion
  * **package.json**: Json donde se encuentra las dependencias de nuestro proyecto, y los scripts con los cuales se podran ejecutar los tests y la aplicacion como tal.

* ### Paso 2: Instalacion de Dependencias
Tal como se comento en el paso anterior el archivo *package.json* contiene las dependencias que necesita nuestra aplicacion tanto para ejecutar los tests como para ejecutar la aplicacion, para instalar las dependencias, lo que debemos hacer es, dentro de nuestra carpeta del proyecto, en una ventana de comandos, ejecutamos la siguiente instruccion:
```javascript
npm install
```
Esto instalara todas las dependencias necesarias para que no exista ningun error en nuestra aplicacion.

* ### Paso 3: Configuracion de la Base de Datos
Para que nuestra API funcione correctamente debemos configurar nuestra base de datos, la aplicacion trae una configuracion predeterminada esta configuracion se encuentra en el archivo *config/config.json*, el cual contiene el siguiente codigo:
```javascript
 "development": {
    "username": "wktoa2",
    "password": "HistoricalCh@r@cters",
    "database": "wktoa2db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "charset": "utf8"
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
Nos debemos enfocar (por el momento) en el objeto *development* que es el entorno en el que estamos trabajando, aca debemos ingresar el *username* con el que nos conectaremos a la base de datos, el *password* del mismo usuario, la *database* a la cual se conectara el usuario y el *host* al cual se conectara, en este caso sera el *127.0.0.1 o localhost*.

Despues de configurar estos campos, debemos abrir *workbench o php my admin*, dentro de esta aplicacion deberemos crear nuestra base de datos (aca se toman los datos proporcionados, si desea personalizar por favor cambiar los valores) y nuestro usuario con username y password con los privilegios para poder ser admin de la Base de Datos
```javascript
// Creacion de Base de Datos
CREATE SCHEMA 'wktoa2db';

// Creacion de Usuario 
CREATE USER 'wktoa2'@'localhost'
  IDENTIFIED BY 'HistoricalCh@r@cters';
 
 // Asignacion de privilegios
 GRANT ALL ON wktoa2db.* TO 'wktoa2'@'localhost';
```
 Con esto ya estamos listos para ejecutar nuestra aplicacion, previo a ello debemos instalar un **demonio** que nos permitira tener nuestra aplicacion ejecutandose sin necesidad de detenerla si en dado caso necesitamos hacer un cambio, para ello desde la terminal instalamos el siguiente paquete con nodejs:
 ```javascript
 npm install -g nodemon
 ```
 * ## Paso 4: Ejecucion del Proyecto
 Despues de la configuracion previa que hemos realizado, estamos listos para ejecutar nuestra aplicacion, antes de ejecutar los *tests y migrations* es indispensable verificar que la aplicacion cree nuestra base de datos. Para ello dentro de una terminal de comandos, nos ubicamos en donde tenemos nuestro proyecto, estando dentro de la carpeta ejecutamos el siguiente comando:
 ```javascript
 npm start
 ```
 Esto ejecutara nuestro proyecto si todo funciona correctamente (si hemos hecho bien la configuracion) debera aparecer el siguiente mensaje en consola:
 ```javascript
 %s Historical Characters Api is Up! %s
 ```
 Para verificar que las tablas se crearon correctamente, podemos ver desde *workbench o phpmyadmin* que existan las siguientes tablas:
  * historicalcharacter
  * users
 
 si notamos exise un archivo llamadl **queries.sql** el cual contiene la data que debe tener agregada nuestra base de datos, ejecuta estos queries desde phpmyadmin o Workbench y listo, tendras el API lista para trabajar.
 
## Comentarios y Dudas
Si cuentas con alguna duda o comentario con respecto al API puedes escribirme a *wcordero.lara@gmail.com / me@waltercordero.com* o bien crear un issue dentro del repositorio y con gusto respondere dicho comentario o duda.

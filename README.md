Trabajo final de Master 'Aplicación descentralitzada de monitorización de salud a través de wearables'

1. Que soy?
  
  Este es el repositorio de la PoC del trabajo final del 'Màster Universitari en Enginyeria Informàtica' de la Universitat Oberta de Catalunya'.

  Consiste en un cliente web (React), un servidor API (Nodejs+Express) y un Chaincode/Smart Contract que se ejecutarà sobre  Hyperledger Fabric (Convector Smart Contract+Hurley). Se ha realizado un desarrollado parcialmente para conocer el funcionamiento de Hyperledger Fabric y validar el funcionamiento entre los componentes del sistema.

![Esquema solución PoC](https://raw.githubusercontent.com/ManelMartinezDiaz/wearhealth-poc/master/assets/Esquema_HLD.svg)

2. Instalación:

  2.1 Requisitos previos:
    Instalar Docke ce y nodejs+npm.

  2.2 Cliente + Servidor API + Chaincode (Smart Contract)
  
  Empezamos clonando este repositorio para después instalar las dependèncias y Convector Smart Contract y Hurley.

    Cliente web- React
      Instalamos dependencias:
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc$ cd client
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc/client$ npm install

    Servidor API - Nodejs + Express
      Instalamos dependencias:
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc$ cd api
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc/servidor$ npm install

    Convector Smart Contract y Hurley
      Instalamos glogalmente Convector-Cli y Hurley:
      manelmdiaz@desktop-i7-linux:~$ sudo npm i -g @worldsibu/convector-cli
      manelmdiaz@desktop-i7-linux:~$ npm i -g @worldsibu/hurley

      Instalamos dependencias:
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc$ cd convector
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc/convector$ npm i -g

    Como se ha creado el chaincode
      Se crean dos ficheros en convector/packages/participant-cc/src, uno con el modelo de los activos y otro con las operacions permitadas para modificar estos activos.
      
      Creamos el chaincode a partir de estos dos ficheros
      manelmdiaz@desktop-i7-linux:~/wearhealth-poc/convector$ npm run cc:package -- participant org1
      
  Ya està listo todo para hacer las pruebas.

3. Pruebas

  3.1 Plan de pruebas
    • Instalar y inicializar el chaincode.
    • Registrar un participante.
    • Leer datos de un participante registrado.
    • No se permete registrar un participante con un id existente.
    • No se permete cambiar la identidad de un participante si el solicitante no es Administador.
    • Modificar la identidad de un participante si el solicitante es Administrador.

  El fichero de pruebas se encuenta en /wearhealth-poc/convector/packages/participant-cc/tests/participantController.spec.ts. 

  3.2 Ejecutar Plan de pruebas
  
    Inicializamos Servidor API y cliente web:
    manelmdiaz@desktop-i7-linux:~/wearhealth-poc/server$ node server.js
    manelmdiaz@desktop-i7-linux:~/wearhealth-poc/client$ npm start 

    Inicializamos Hyperledger Fabric con hurl y ejecutamos el plan de pruebas:
    manelmdiaz@desktop-i7-linux:~/wearhealth-poc/convector$ hurl clean; hurl new
    manelmdiaz@desktop-i7-linux:~/wearhealth-poc/convector$ npm run cc:start -- participant
    manelmdiaz@desktop-i7-linux:~/wearhealth-poc/convector$ npm test


Aquesta obra està subjecta a una llicència de Reconeixement-NoComercial 3.0 Espanya de Creative Commons

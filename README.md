# Curso/Taller Graphql

![Graphql](https://www.pngitem.com/pimgs/m/385-3850895_graphql-logo-svg-hd-png-download.png)

## Construye una Api's usando Graphql 


#### Ajustes previos 

###### Instalaciones Necesarias

* Editor de codigo (VSC)
* Navegador
* Docker (Docker desktop)
* NodeJS
* MongoDB
* Apollo Server

Descarga el repositorio apuntando en la rama principal, una vez descargado accede a la carpeta creada y ejecutas ell siguiente comando usando el gentor de pedenpendias de tu preferencia ya sea `npm` o `yarn`.

- NPM 

```
    npm i
```

- YARN

```
    yarn install
```

**Nota**:

Si no tienes `nodemon` puedes descargarlo en el siguiente link:

- Si usas npm: 
    
```
    npm i -g nodemon
```

Para intalarlo de forma global, tambien existe la forma de descargarlo por dependencias:

```
    npm install nodemon --save-dev 
```

- Si usas yarn:

```
    yarn add nodemon
```

Descargar `nodemon` mediante dependecias de desarrollo:

```
    yarn add nodemon --dev
```

## Como levantar el proyecto

Una vez descargado el repositorio ve al archivo `package.json` y escribe lo siguiente:

```
    "dev": "nodemon ./index.js"
```

y ejecutas los siguiente:

-   npm

```
    npm run start
```

-   yarn

```
    yarn start
```

Esto deberia arrancar el proyecto y estar servido en la siguiente ruta:

http://localhost:4000

## Configuración contenedor docker

Para la base de datos usaremos un contenedor basado en una imagen de MongoDB y para ello necesitaremos descargar el programa de **Docker desktop** podras acceder al programa desde el siguinte link:
[Docker desktop](https://www.docker.com/products/docker-desktop/).

Una vez descargado y configurarlo descomentamos el archivo `docker-compose-yml` para generar el contenedor a partir de la imagen de **MongoDB**

Y ejecutas el siguiente comando para generar y levantar el contenedor:

```
    docker-compose up -d 
```

Esto generar el contenedor de **MongoDB**.

Para detener el contenedor, ejecuta el siguiente comando:

```
    docker-compose down 
```


# Ejercicio Técnico Frontend Almundo
### Pasos para ejecutar la aplicación
### 1 - npm install
### 2 - npm start


### `npm start`

Asegurarse de tener libres los puertos 3000 y 3001 para ejecutar la aplicación.

### `npm run build`

Para generar versión productiva de la aplicación con minificacion de archivos.

## Stack utilizado

### `ReactJS`
### `Axios`
### `NodeJS`
### `Express`
### `NPM`
### `Nodemon`
### `MongoDB`
### `Mongoose`

### Aclaraciones
#### Se toma como limite un total de 20 resultados pero el mismo puede ser modificado
#### Se utiliza como ID el proveniente del mock de datos para el CRUD
#### Si se quiere agregar un nuevo hotel (POST) se le debera pasar su respectivo ID
#### Todos los parametros para POST y PUT se deberan pasar en el body de la pegada

## Endpoints
### `GET` localhost:3001/hotels/:idHotel
### `PUT` localhost:3001/hotels/:idHotel
### `DELETE` localhost:3001/hotels/:idHotel
### `POST` localhost:3001/hotels
### `SEARCH` Ejemplo: localhost:3001/hotels/search?name=lima&stars=4&limit=2
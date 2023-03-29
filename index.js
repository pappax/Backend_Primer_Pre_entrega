
import express from 'express';//const express = require('express');
import bodyParser from 'body-parser';//const bodyParser = require('body-parser');
import productsRouter from './src/routes/products.routes.js';//const productsRouter = require('./routes/products.routes.js');
import cartsRouter from './src/routes/carts.routes.js';//const cartsRouter = require('./routes/carts.routes.js');

const app = express();

// Configuración del puerto
const port = process.env.PORT || 8080;

// Middleware para procesar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Rutas para los endpoints de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});



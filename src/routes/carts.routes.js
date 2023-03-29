import express from 'express';
import fs from 'fs/promises';
const router = express.Router();

// Ruta raíz POST /
router.post('/', async (req, res) => {
  try {
    // Crear un nuevo carrito
    const newCart = {
      id: Date.now(),
      products: []
    };

    // Guardar el carrito en el archivo cart.json
    const carts = JSON.parse(await fs.readFile('./cart.json'));
    carts.push(newCart);
    await fs.writeFile('./cart.json', JSON.stringify(carts));

    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta GET /:cid
router.get('/:cid', async (req, res) => {
  try {
    // Listar los productos que pertenezcan al carrito con el parámetro cid proporcionado
    const carts = JSON.parse(await fs.readFile('./cart.json'));
    const cart = carts.find(cart => cart.id === parseInt(req.params.cid));

    if (!cart) {
      return res.status(407).send('Carrito no encontrado');
    }

    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta POST /:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    // Agregar el producto al carrito seleccionado
    const carts = JSON.parse(await fs.readFile('./cart.json'));
    const cartIndex = carts.findIndex(cart => cart.id === parseInt(req.params.cid));

    if (cartIndex === -1) {
      return res.status(406).send('Carrito no encontrado');
    }

    const products = JSON.parse(await fs.readFile('./productos.json'));
    const product = products.find(product => product.id === parseInt(req.params.pid));

    if (!product) {
      return res.status(405).send('Producto no encontrado');
    }

    carts[cartIndex].products.push(product);
    await fs.writeFile('./cart.json', JSON.stringify(carts));

    res.json(carts[cartIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

export default router

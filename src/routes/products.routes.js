import express from 'express';
import fs from 'fs/promises';

const router = express.Router();

const productsFile = './productos.json';

// Ruta raíz GET /
router.get('/', async (req, res) => {
  try {
    //mostar productos
    const productsData = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(productsData);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los productos');
  }
});

// Ruta GET /:pid
router.get('/:pid', async (req, res) => {
  try {
    //mostrar producto
    const productsData = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(productsData);
    const product = products.find((p) => p.id === parseInt(req.params.pid));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el producto');
  }
});

// Ruta raíz POST /
router.post('/', async (req, res) => {
  try {
    //crear producto predefinido
    const productsData = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(productsData);
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    await fs.writeFile(productsFile, JSON.stringify(products));
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el producto');
  }
});

// Ruta PUT /:pid
router.put('/:pid', async (req, res) => {
  try {
    //actualizar producto
    const productsData = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(productsData);
    const updatedProduct = req.body;
    updatedProduct.id = parseInt(req.params.pid);
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      await fs.writeFile(productsFile, JSON.stringify(products));
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el producto');
  }
});

// Ruta DELETE /:pid
router.delete('/:pid', async (req, res) => {
  try {
    //eliminar producto
    const productsData = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(productsData);
    const productId = parseInt(req.params.pid);
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.writeFile(productsFile, JSON.stringify(products));
      res.status(200).send(`Producto con ID ${productId} eliminado`);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch
(err) {
console.error(err);
res.status(500).send('Error al eliminar el producto');
}
});

export default router



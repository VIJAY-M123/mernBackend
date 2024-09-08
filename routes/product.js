const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProdcut, deleteProdcut } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticate, autherizationRole} = require('../middlewares/authenticate')

router.route('/products').get(isAuthenticate, getProducts);
router.route('/products/new').post(isAuthenticate,autherizationRole('admin'),newProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/:id').put(updateProdcut);
router.route('/products/:id').delete(deleteProdcut);
module.exports = router;
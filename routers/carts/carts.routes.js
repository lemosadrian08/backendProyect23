const { Router } = require("express");
const cartsController = require("../../controllers/carts.controller");

const router = Router();

router.post('/', cartsController.saveCart);
router.delete('/:id', cartsController.deleteCart);

router.get('/:id/pop', cartsController.getProductsOfACartAndPopulate);


router.get('/:id/products', cartsController.getProductsOfACart)
router.post('/:idc/products/:idp', cartsController.addProductToCart)
router.delete('/:idc/products/:idp', cartsController.deleteProductInACartById)



router.get('/', cartsController.getCarts);
router.get('/:id', cartsController.getCartById);
router.put('/:id', cartsController.updateCart);

module.exports = router;
const { Router } = require("express");
const path =require('path');
const auth = require('../../middlewares/auth.middleware');
const passport =require('../../middlewares/passport.middleware')
const webController = require("../../controllers/web.controller")
const multer = require('multer');
const storage = require('../../middlewares/multer.middleware')
const upload = multer({ storage: storage });


const router = Router();


router.get('/products', webController.renderProducts);
router.get('/products/:id', webController.renderProductsById);
router.post('/carts/:idc/products/:idp', webController.addProductToCartAndRender)
router.get('/cart', webController.renderCartById)
router.post('/checkout', webController.checkout)
router.get('/', webController.renderHome);
router.get('/logout', auth, webController.logout);
router.get('/profile', webController.renderProfile)

router.post('/logIn',
passport.authenticate('logIn', {
  failureRedirect: '/logIn-error',
    successRedirect: '/'
    })
    );
    
 

router.post('/signUp',
upload.single('image'),
passport.authenticate('signUp', { 
        failureRedirect: '/signUp-error',
        successRedirect: '/logIn'
      })
  );
  
router.get('/unauthorized', (req, res) => {
  res.status(401).sendFile(path.resolve(__dirname,'../../public/unauthorized.html'));
});

router.get('/error', (req, res) => {
  res.status(500).sendFile(path.resolve(__dirname,'../../public/error.html'));
});

router.get('/signUp', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../../public/register.html'));
  });

router.get('/signup-error', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../../public/signUp-error.html'));
  });

router.get('/logIn-error', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../../public/logIn-error.html'));
  });

router.get('/logIn', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../../public/login.html'));
  });


module.exports = router;


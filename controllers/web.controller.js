const ProductsDao = require("../models/daos/products.dao");
const { successResponse } = require("../utils/api.utils");
const { HTTP_STATUS } = require("../constants/api.constants");
const sendEmail = require('../utils/email.utils')
const sendWhatsapp = require ('../utils/whatsapp.utils')
const sendSMS = require('../utils/sms.utils')
const envConfig = require('../utils/config.utils')
const productsDao = new ProductsDao();
const  CartsDao  = require("../models/daos/carts.dao");
const cartsDao = new CartsDao();
const path = require('path')
const logger = require('../utils/logger.utils')


class WebController {
  
  async renderProfile (req, res, next)  {
    const user = req.user;
    try {
      res.status(HTTP_STATUS.OK).render('profile', {sessionImage: user.image, sessionEmail: user.email, sessionFullName: user.fullName, sessionAddress: user.address,sessionPhoneNumber: user.phoneNumber, sessionAge: user.age ,logout: false});
        }
    

    catch(error) {
      next(error);
    }
    }


  async renderHome (req, res, next)  {
    const user = req.user;
    try {
        if (user) {
          res.status(HTTP_STATUS.OK).render('home', {user, sessionUser: user.email, sessionFullName: user.fullName, sessionAddress: user.address,sessionPhoneNumber: user.phoneNumber, sessionAge: user.age ,logout: false});
        }
        else {
          return res.status(HTTP_STATUS.OK).sendFile(path.resolve(__dirname,'../public/login.html'));
        }
    }
    catch(error) {
      next(error);
    }
    }


    async logout (req, res,next)  {
      const user = await req.user;
      try {
        req.session.destroy(error => {
          if (error) {
            res.clearCookie('my-session');
            res.redirect('/')
          }
          else {
            res.clearCookie('my-session');
            return res.sendFile(path.resolve(__dirname,'../public/login.html'));
          }
        })
      }
      catch(error) {
        next(error);
      }
    }


    async renderProducts(req, res, next) {
        try {
            const products = await productsDao.getAll();
            const response = successResponse(products);
            res.status(HTTP_STATUS.OK).render('products/index', { products: response.data });
          }
          catch(error) {
            next(error);
          }
        }  

        async renderProductsById(req, res, next) {
          const { id } = req.params;
          const user = req.user;
          try {
            const product = await productsDao.getById(id);
            const response = successResponse(product);
            res.status(HTTP_STATUS.OK).render('products/show', { cartId:user.cart._id, productId:id, name: response.data.name, description: response.data.description, code: response.data.code, price: response.data.price, img: response.data.img, });
          }
          catch(error) {
            next(error);
          }
        }

        async renderCartById(req, res, next) {
          const cartId = req.user.cart;
          try {
            const populatedCart = await cartsDao.getProductsOfACartAndPopulateF(cartId)
            res.status(HTTP_STATUS.OK).render('carts/cart', { products: populatedCart.productsInCart})  
          }
          catch(error) {
            next(error);
          }
        }

        async addProductToCartAndRender(req, res, next){
          const { idc, idp } = req.params;
          const { quantity } = req.body;
          try {
            const cart = await cartsDao.addProductToCartF(idc, idp, quantity);
            const response = successResponse(cart);
            const populatedCart = await cartsDao.getProductsOfACartAndPopulateF(idc)
            res.status(HTTP_STATUS.OK).render('carts/cart', { products: populatedCart.productsInCart})
          }
          catch(error) {
            next(error);
          }
        }

        async renderCheckout(req, res, next){
          res.status(HTTP_STATUS.OK).render('checkout')
        }

        
        async checkout(req, res, next){
          const user=req.user;
          const cartId = req.user.cart;
          const populatedCart = await cartsDao.getProductsOfACartAndPopulateF(cartId)
          try {

            const emailMappedProducts = populatedCart.productsInCart.map(x=> `<li>${x.productId.name}</li>`).join('')

            const mailPayload = {
              from: 'Node Server',
              to: envConfig.ADMIN_EMAIL,
              subject: `A new order was placed by ${user.fullName}, email: ${user.email}`,
              html: `<h1>Products</h1>
              <ul>${emailMappedProducts}</ul>`
            }
            sendEmail(mailPayload)

            const messageMappedProducts = populatedCart.productsInCart.map(x=> `${x.productId.name}`).join(', ')

            const messageSMS = {
              body: `Purchased products: ${messageMappedProducts}`,
              from: envConfig.TWILIO_NUMBER,
              to: `${user.phoneNumber}`
            }
            

            sendSMS(messageSMS)

            const messageWhatsapp = {
              body: `Purchased products: ${messageMappedProducts}`,
              from: `whatsapp:${envConfig.TWILIO_WHATSAPP}`,
              to: `whatsapp:${user.phoneNumber}`
            }

            sendWhatsapp(messageWhatsapp)

            res.status(HTTP_STATUS.OK).render('checkout')
            
          }
          catch(error) {
            next(error);
          }
      
        }
  }



  module.exports = new WebController();
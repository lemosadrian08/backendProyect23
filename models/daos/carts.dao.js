const { HTTP_STATUS } = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');
const MongoContainer = require('../containers/mongo.container');
const ProductsDao = require('./products.dao')
const cartsSchema = require('../schemas/carts.schema')

const productsDAO = new ProductsDao()
const collection = "carts";

class CartsDao extends MongoContainer {
  constructor() {
    super(collection, cartsSchema);
  }

  async getProductsOfACartAndPopulateF(id) {
    const cart = await this.model.findOne({ _id: id }, { __v: 0 }).populate('productsInCart.productId').lean();
    return cart;
  }

  async addProductToCartF(idc, idp, quantity) {
    const product = await productsDAO.getById(idp)
    const cart = await this.getById(idc)
    const productIndex = cart.productsInCart.findIndex(item => item.productId.toString() === idp)
    if (productIndex==-1) {
        const newProduct = {
          productId: idp,
          quantity
        };
        const updatedCart = await this.model.updateOne({ _id: idc }, { $push: { productsInCart: newProduct } });
        return updatedCart
    }else{
      const updatedProduct = {
        productId: idp,
        quantity: Math.floor(quantity)
      };
      cart.productsInCart[productIndex]=updatedProduct
      const updatedCart = await this.model.updateOne({ _id: idc }, { $set: cart }, { new: true })
      return updatedCart
    }
  } 









  /* else if(Math.floor(quantity)===0){
    cart.productsInCart.splice(productIndex,1)
    const updatedCart = await this.model.updateOne({ _id: idc }, { $set: cart }, { new: true })
    return updatedCart */

  

  async deleteProductInACartByIdF(idc, idp) {
    const product = await productsDAO.getById(idp)
    const updatedCart = await this.model.updateOne({ _id: idc }, { $pull: { products: product } })
    if (!updatedCart) {
      const message = `Cart with id ${idc} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedCart
  }
 


}

module.exports= CartsDao
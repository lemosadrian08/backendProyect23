const { HTTP_STATUS } = require("../constants/api.constants");
const  CartsDao  = require("../models/daos/carts.dao");
const { successResponse } = require("../utils/api.utils");

const cartsDao = new CartsDao();

class CartsController {
  
  getProductsOfACartAndPopulateF


  async getProductsOfACartAndPopulate(req, res, next) {
    const { id } = req.params;
    try {
      const populatedCart = await cartsDao.getProductsOfACartAndPopulateF(id);
      const response = successResponse(populatedCart);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }


  async saveCart(req, res, next) {
    try {
      const newCart = await cartsDao.save(req.body);
      const response = successResponse(newCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }
  
  async deleteCart(req, res, next) {
    const { id } = req.params;
    try {
      const deletedCart = await cartsDao.delete(id);
      const response = successResponse(deletedCart);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getProductsOfACart(req, res, next){
    const { id } = req.params;
    try {
      const cart = await cartsDao.getProductsOfACartF(id);
      const response = successResponse(cart);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async addProductToCart(req, res, next){
    const { idc, idp } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await cartsDao.addProductToCartF(idc, idp, quantity);
      const response = successResponse(cart);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteProductInACartById(req, res, next) {
    const { idc, idp } = req.params;
    try {
      const deletedProduct = await cartsDao.deleteProductInACartByIdF(idc, idp);
      const response = successResponse(deletedProduct);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }


  async getCarts(req, res, next) {
    try {
      const carts = await cartsDao.getAll();
      const response = successResponse(carts);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    const { id } = req.params;
    try {
      const cart = await cartsDao.getById(id);
      const response = successResponse(cart);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }


  async updateCart(req, res, next) {
    const { id } = req.params;
    try {
      const updateCart = await cartsDao.update(id, req.body);
      const response = successResponse(updateCart);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }

}

module.exports = new CartsController();
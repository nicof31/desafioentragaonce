import CartService from "../services/carts.service.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"

class CartsController {
    constructor(){
        this.cartService = new CartService();
        this.httpResponse = new HttpResponse();
    }

    getIdCarts = async (req, res) => {
      try {
          const cart = await this.cartService.getIdCarts(req);
          if (req.query.historycart === "true") {
              return res.render("carts/findcarthistory", { cart });
          } else {
              return res.render("carts/carts", { cart });
          }
      } catch (error) {
          console.log(`${EnumErrors.CONTROLLER_ERROR} - No se pudo obtener cart en la base de datos ${error}`);
          return this.httpResponse.NotFound(
              res,
              `${EnumErrors.INVALID_PARAMS} -  No se pudo obtener cart en la base de datos `, 
            { error: `${error}` }
          );   
        }
    }

    getAllCarts = async (req, res) => {
        try {
            const carts = await this.cartService.getAllCarts(req); 
            return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {carts});        
        } catch (error) {
            console.log(`${EnumErrors.CONTROLLER_ERROR} - No se pudo obtener los carts en la base de datos`);
            return this.httpResponse.NotFound(
              res,
              `${EnumErrors.DATABASE_ERROR} -  No se pudo obtener los carts en la base de datos `, 
            { error: `${error}` }
          );   
          }
    }

    addToCart = async (req, res) => {
        try {
          const addCartQuan = await this.cartService.addToCart(req);
          console.log("🚀 ~ file: carts.controller.js:38 ~ CartsController ~ addToCart= ~ addCartQuan:", addCartQuan)
          return this.httpResponse.Create(res, `${EnumSuccess.SUCCESS}`, {payload: addCartQuan});    
        } catch (error) {
          console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición POST: ${error}`);
          return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición POST `, 
          { error: `${error}` }
        ); 
        }
      };

    updateCarts = async (req, res) => {
        try {
          const updateCart = await this.cartService.updateCarts(req);   
          return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {payload: updateCart});    
        } catch (error){
          console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición PUT: ${error}`);
          return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición PUT `, 
          { error: `${error}` }
        ); 
        }
    } 

    updateCartsComplet = async (req,res) => {
        try {
          const updateCartCompl = await this.cartService.updateCartsComplet(req); 
          return this.httpResponse.Create(res, `${EnumSuccess.SUCCESS}`, {payload: updateCartCompl});    
        } catch (error){
          console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición PUT: ${error}`);
          return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición PUT `, 
          { error: `${error}` }
        ); 
        }
    }

    deleteProductCarts = async (req,res) => {
      try {
        const deleteProductCart = await this.cartService.deleteProductCarts(req); 
        return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {payload: deleteProductCart});    

      } catch (error){
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición DELETE: ${error}`);
        return this.httpResponse.NotFound(
          res,
          `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición DELETE `, 
        { error: `${error}` }
      ); 
      }
    }

    deleteOneProdCarts = async (req,res) => {
      try {
        const deleteOneProdCart = await this.cartService.deleteOneProdCarts(req); 
        return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {payload: deleteOneProdCart });    
      } catch (error){
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición DELETE: ${error}`);
        return this.httpResponse.NotFound(
          res,
          `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición DELETE `, 
        { error: `${error}` }
      );
      }
    }

    purchaseCart = async (req, res) => {
      try {
        const cartId = req.params.cid;
        console.log("🚀 ~ file: carts.controller.js:95 ~ CartsController ~ processCartReq= ~ cartId:", cartId)
        const result = await this.cartService.purchaseCart(req);
        console.log("🚀 ~ file: carts.controller.js:98 ~ CartsController ~ processCartReq= ~ result: Productos sin stock", result)
        return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {payload: result });    
      } catch (error) {
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición POST: ${error}`);
        return this.httpResponse.NotFound(
          res,
          `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición POST `, 
        { error: `${error}` }
      );
      }
    };

}


export default CartsController;

import ProductsService from "../services/products.service.js";
import productsModel from "../dao/models/products.model.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"


class ProductsController {
    constructor(){
        this.productService = new ProductsService();
        this.productModel = productsModel;
        this.httpResponse = new HttpResponse();
    }

    getIdProducts = async (req, res) => {
        try {
            const product = await this.productService.getIdProducts(req);
            return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {product});    
        } catch (error) {
        console.log(`${EnumErrors.CONTROLLER_ERROR} - No se pudo obtener product en la base de datos ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.INVALID_PARAMS} -  No se pudo obtener product en la base de datos `, 
            { error: `${error}` }
            );  
        }
    }

    getCombProducts = async (req, res) => {
        try {
            const productsPagination = await this.productService.getCombProducts(req);
            return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {productsPagination});    
        } catch (error) {
            console.log(`${EnumErrors.CONTROLLER_ERROR} - No se pudo obtener los products en la base de datos ${error}`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.INVALID_PARAMS} -  No se pudo obtener los products en la base de datos `, 
                { error: `${error}` }
                );  
            }
    }

    addToProduct = async (req, res) => {
        try {
        const crearProducto = req.body;
        if (!crearProducto.title || !crearProducto.description || !crearProducto.code || !crearProducto.price || !crearProducto.status || !crearProducto.category || !crearProducto.stock) {
        return this.httpResponse.BadRequest(
            res,
            `${EnumErrors.INCOMPLETE_ERROR}`, 
            { error }
            );
        } else {
        const addProduct = await this.productService.addToProduct(req);
        return this.httpResponse.Create(res, `${EnumSuccess.SUCCESS}`, {payload: addProduct});        
        }
        } catch (error){
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición POST: ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición POST `, 
            { error: `${error}` }
            ); 
        }
    }

    updateProductsComplet = async (req,res) => {
        try {
            const actualizarProducto = req.body;
            if (!actualizarProducto.title || !actualizarProducto.description || !actualizarProducto.code || !actualizarProducto.price || !actualizarProducto.status || !actualizarProducto.category || !actualizarProducto.stock) {
            return this.httpResponse.BadRequest(
                res,
                `${EnumErrors.INCOMPLETE_ERROR}`, 
                { error }
            );
        };
            const updateProductComp = await this.productService.updateProductsComplet(req);
            return this.httpResponse.Create(res, `${EnumSuccess.SUCCESS}`, {payload: updateProductComp});        
        } catch (error){
            console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición PUT: ${error}`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición PUT `, 
                { error: `${error}` }
                ); 
            }
        }

    updateProductsPatch = async (req,res) => {
        try {
        const newObjUpdate = await this.productService.updateProductsPatch(req)
        return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {payload: newObjUpdate});        
        } catch (error){
            console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición PATCH: ${error}`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición PATCH `, 
                { error: `${error}` }
                ); 
        }
    }

    deleteProduct =  async(req, res) => {
        try {
            await this.productService.deleteProduct(req);
            return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, `DELETE realizado exitosamente`);        
        } catch (error) {
            console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición DELETE: ${error}`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición DELETE `, 
                { error: `${error}` }
            ); 
        }
    }

}

export default ProductsController;
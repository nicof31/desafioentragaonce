import MockingService from "../services/mocking.service.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"


class MockingController { 
    constructor(){
        this.mockingService = new MockingService();
        this.httpResponse = new HttpResponse();
    }

    addProductMock = async (req, res) => {
        try {
        const products = await this.mockingService.addProductMock();
        return this.httpResponse.Create(res, `${EnumSuccess.SUCCESS}`, {payload: products});    
        }        
        catch (error) {
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición POST `, 
            { error: `${error}` }
        ); 
        }
    };
    
}


export default MockingController;
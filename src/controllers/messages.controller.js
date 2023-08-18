import MessagesService from "../services/messages.service.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"

class MessagesController {
    constructor(){
       this.messagesService = new MessagesService();
       this.httpResponse = new HttpResponse();
    }

    sendMessages = async (req,res) => {
        try {
            const sendNewMessages  = await this.messagesService.sendMessages(req);
            return this.httpResponse.Create(res, `${EnumSuccess.SUCCESS}`, {sendNewMessages});    
            } catch(error) {
            console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al procesar la petición POST: ${error}`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.DATABASE_ERROR} -  Error al procesar la petición POST `, 
                { error: `${error}` }
                ); 
        };
    }

    getMessages = async (req,res) => {
        try {
            const userEmail = req.user.email; 
            console.log("🚀 ~ file: messages.controller.js:23 ~ MessagesController ~ getMessages= ~ userEmail:", userEmail)
            const getMessages  = await this.messagesService.getMessages(userEmail);
            return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {getMessages});        
            } catch(error) {
            console.log(`${EnumErrors.CONTROLLER_ERROR} - No se pudo obtener los carts en la base de datos`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.DATABASE_ERROR} -  No se pudo obtener los carts en la base de datos `, 
                { error: `${error}` }
                );   
            }
    }

}


export default MessagesController;
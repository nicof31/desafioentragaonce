import EmailService from "../services/email.service.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"

class EmailController {
    constructor(){
        this.emailService = new EmailService();
        this.httpResponse = new HttpResponse();
    }

    sendEmail = async (req, res) => {
        try {
          const sendNewEmail = await this.emailService.sendEmail(req);
          console.log("🚀 ~ file: email.controller.js:11 ~ EmailController ~ sendEmail= ~ sendNewEmail:", sendNewEmail)
          return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, `email send to ${req.body.email}`);        
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


export default EmailController;
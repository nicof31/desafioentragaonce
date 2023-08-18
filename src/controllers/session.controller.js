import UserModel from "../dao/models/users.model.js"
import SessionService from "../services/session.service.js";
import cartsModel from "../dao/models/carts.model.js";
import { appConfig } from "../config/config.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"

const { JWT_COOKIE_NAME } = appConfig;



class SessionController {
    constructor(){
        this.userModel = UserModel;
        this.cartsModel = cartsModel;
        this.sessionService = new SessionService();
        this.httpResponse = new HttpResponse();
    }

    allToRegister = async (req, res) => {
      try {
          const addUser = await this.sessionService.allToRegister(req);
          if (addUser.error && addUser.error === "El correo electrónico ya está registrado") {
              return res.render("user/registererror", {
                  error: `${EnumErrors.INVALID_PARAMS} - El correo electrónico ya está registrado`,
              });
          }
          console.log(`sessionController: Usuario con carrito registrado exitosamente: ${addUser}`);
          return res.redirect("/login");
      } catch (error) {
          console.error(`${EnumErrors.CONTROLLER_ERROR} - Error en el registro de usuario: ${error}`);
          return res.render("user/registererror", { error: `${EnumErrors.DATABASE_ERROR} - Ocurrió un error en el registro de usuario` });
      }
    }

    recoverUser = async (req, res) => {
      try {
          const { email } = req.body;
          const recoverResult = await this.sessionService.recoverUser(req);
          if (recoverResult.error) {
              return res.render("user/recovererror", {
                error: `${EnumErrors.INVALID_PARAMS} - El usaurio con el mail: ${email} no existe`,
              });
          }
          console.log(`sessionController: Password cambiado correctamente ${recoverResult}`);
          return res.redirect("/login");
      } catch (error) {
          console.error(`${EnumErrors.CONTROLLER_ERROR} - Ocurrió un error en cambio de Password: ${error}`);
          return res.render("user/recovererror", { error: `${EnumErrors.DATABASE_ERROR} - Ocurrió un error en cambio de Password` });
      }
    }

    loginUser = async (req, res) => {
      try {       
        const token = await this.sessionService.loginUser(req);
        return res.cookie(JWT_COOKIE_NAME, token).redirect("/products");
      } catch (error) {
        return this.httpResponse.Unauthorized(
            res,
            `${EnumErrors.UNAUTHORIZED_ERROR} - Credenciales inválidas`,
            req.params
        );
    }
    }

    loginGitHub = async (req, res) => {
      try {
        const token = await this.sessionService.loginGitHub(req, res); 
        console.log(`🚀 ~ file: session.controller.js:66 ~ sessionController ~ loginGitHub= ~ token: ${token}`)
        res
        .cookie(JWT_COOKIE_NAME, token, { httpOnly: true })
        .redirect("/products");
      } catch (error) {
        console.error(`${EnumErrors.CONTROLLER_ERROR} - Error en el enrutamiento de GitHub callback: ${error}`);
        res.redirect("/login");
      }
    };

    githubCallback = async (req, res) => {
      try {
        const token = await this.sessionService.githubCallback(req, res);
        res
        .cookie(JWT_COOKIE_NAME, token, { httpOnly: true })
        .redirect("/products");
      } catch (error) {
        console.error(`${EnumErrors.CONTROLLER_ERROR} - Error en el enrutamiento de GitHub callback: ${error}`);
        res.redirect("/login");
      }
    }


    logoutUser = async (req, res) => {
      try {
        console.error(`SessionController: sessión cerrada exitosamente`);
        res.clearCookie(JWT_COOKIE_NAME).redirect("/login");
      } catch (error) {
        console.error(`${EnumErrors.CONTROLLER_ERROR} - Error al cerrar sesión: ${error}`);
        return this.httpResponse.Error(
          res,
          `${EnumErrors.CONTROLLER_ERROR} - Ocurrió un error al cerrar sesión`,
          { error }
      );
      }
    }
      
    getCurrentUserInfo = async (req, res) => {
      try {
        const userInfo = await this.sessionService.getCurrentUserInfo(req.user);
        console.log(`SessionController: Solicitud consulta datos current procesada con exito`);     
        res.render("user/current", { user: userInfo });
      } catch (error){
        console.log(`${EnumErrors.CONTROLLER_ERROR} - No se puede obtener la información del usuario actual ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  No se puede obtener la información del usuario actual  `, 
            { error: `${error}` }
            );  
        }
    };

    getTicketsByUser = async (req, res) =>{
      const userEmail = req.user.user.email;   
      try {
        const tickets = await this.sessionService.getTicketsByUser(userEmail);
        return this.httpResponse.OK(res, `${EnumSuccess.SUCCESS}`, {tickets});    
      } catch (error){
        console.log(`${EnumErrors.CONTROLLER_ERROR} - No se puede obtener la información de los tickets ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  No se puede obtener la información de los tickets  `, 
            { error: `${error}` }
            );  
        }
    }
    
}


export default SessionController


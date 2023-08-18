import { appConfig } from "../config/config.js";
const { JWT_COOKIE_NAME } = appConfig;
import UserModel from "../dao/models/users.model.js";
import productsModel from "../dao/models/products.model.js";
import ViewsService from "../services/views.service.js";
import { EnumErrors, EnumSuccess, HttpResponse } from "../middleware/error-rta/error-layer-rta.js"

class ViewsController {
    constructor(){
        this.userModel = UserModel;
        this.productsModel = productsModel; 
        this.viewService = new ViewsService();
        this.httpResponse = new HttpResponse();
    }

    getChatView = async (req,res) => { 
        try {
        const chat = "prueba chat web socket";
        return res.render('chat', { chat });
        } catch (error) {
            console.log(`${EnumErrors.CONTROLLER_ERROR} - No se puede obtener la vista de chat: ${error}`);
            return this.httpResponse.NotFound(
                res,
                `${EnumErrors.INVALID_PARAMS} -  No se puede obtener la vista de chat: `, 
            { error: `${error}` }
            );   
        }
    }

    getLoginView(req, res) {
        try {
        return res.render("user/login", {
            title: "Login",
            style: "home",
            logued: false,
        });
        } catch (error) {
        console.error(`${EnumErrors.CONTROLLER_ERROR} - Ocurrió un error al renderizar la página de login: ${error}`);
        return res.render("user/loginerror", { error: `${EnumErrors.BADREQUEST_ERROR} - Ocurrió un error al renderizar la página de login` });
        }
    }
 
    getHomePageView(req, res) {
        try {
        return res.render("user/login", {
            title: "Login",
            style: "home",
            logued: false,
        });
        } catch (error) {
        console.error(`${EnumErrors.CONTROLLER_ERROR} - rror al renderizar la página de inicio: ${error}`);
        return res.render("user/loginerror", { error: `${EnumErrors.BADREQUEST_ERROR} -rror al renderizar la página de inicio` });
        }
    }

    logout = async (req, res) => {
        try {
        res.clearCookie(JWT_COOKIE_NAME);
        res.redirect('/login');
        } catch (error) {
        console.error(`${EnumErrors.CONTROLLER_ERROR} - Error al cerrar sesión: ${error}`);
        return this.httpResponse.Error(
            res,
            `${EnumErrors.CONTROLLER_ERROR} - Ocurrió un error al cerrar sesión`,
        {error}
        );
        }
    }

    getProductsView = async (req, res) => {
        try {
        const productsPagination = await this.viewService.getProductsView(req);
        res.render('products', productsPagination);
        } catch (error) {
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al realizar la búsqueda paginada: ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al realizar la búsqueda paginada:  `, 
            { error: `${error}` }
            );  
        }
    }

    getProfileView = (req, res) => {
        try {
        const { first_name, last_name, email, role } = req.user.user;
        const user = {
            first_name,
            last_name,
            email,
            role
        };
        res.render("user/profile", { user });
        } catch(error) {
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al obtener la vista de perfil: ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al obtener la vista de perfil `, 
            { error: `${error}` }
            );  
        }
    }

    getRegisterView = async (req, res) => {
        try {
        res.render("user/register", {
            title: "Registro",
            style: "home",
            logued: false,
        });
        } catch(error) {
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al obtener la vista de registro: ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al obtener la vista de registro: `, 
            { error: `${error}` }
            );  
        }
    }

    getRecoverView = async (req, res) => {
        try {
        res.render("user/recover");
        } catch(error) {
        console.log(`${EnumErrors.CONTROLLER_ERROR} - Error al obtener la vista de recuperación de contraseña: ${error}`);
        return this.httpResponse.NotFound(
            res,
            `${EnumErrors.DATABASE_ERROR} -  Error al obtener la vista de recuperación de contraseña: `, 
            { error: `${error}` }
            );  
    }
    }

}



export default ViewsController;

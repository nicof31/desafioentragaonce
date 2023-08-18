import { StatusCodes } from "http-status-codes";

export const EnumErrors = {
    ROUTING_ERROR: `ROUTING ERROR`,
    INVALID_TYPES_ERROR: `INVALID TYPES ERROR`,
    CONTROLLER_ERROR: `CONTROLLER ERROR`,
    DATABASE_ERROR: `DB ERROR`,
    INVALID_PARAMS: `INVALID PARAMS ERROR`,
    UNAUTHORIZED_ERROR:`UNAUTHORIZED ERROR`,
    BADREQUEST_ERROR:`BADREQUEST ERROR`,
    INCOMPLETE_ERROR: `INCOMPLETE VALUE ERROR`,
    FORBIDDEN_ERROR: `FORBIDDEN ERROR`,
    INTERNAL_SERVER_ERROR: `INTERNAL SERVER ERROR`,
    VALIDATION_ERROR: `VALIDATION ERROR`,
};


export const EnumSuccess= {
    SUCCESS: `SUCCESS`,
};


export class HttpResponse {

//-----------SATAUS SUCCESS-------------------    
    //(200)
    OK(res, message, data) {
        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            statusMessage: message,
            data,
        });
    }
    
    //(201)
    Create(res, message, data) {
        return res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            statusMessage: message,
            data,
        });
    }

    //(202)
    Accepted(res, message, data) {
        return res.status(StatusCodes.ACCEPTED).json({
            status: StatusCodes.ACCEPTED,
            statusMessage: message,
            data,
        });
    }


//--------------------SATAUS ERROR------------------------   

    //(400)
    BadRequest(res, message, data) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            statusMessage: message,
            data,
        });
    }

    //(401)
    Unauthorized(res, message, data) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            statusMessage: message,
            data,
        });
    }

    //(403)
    Forbbiden(res, message, data) {
        return res.status(StatusCodes.FORBIDDEN).json({
            status: StatusCodes.FORBIDDEN,
            statusMessage: message,
            data,
        });
    }

    //(404)
    NotFound(res, message, data) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: StatusCodes.NOT_FOUND,
            statusMessage: message,
            data,
        });
    }

    //(500)
    Error(res, message, data) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: message,
            data,
        });
    }
}
import nodemailer from "nodemailer";
import { appConfig } from "../config/config.js";
const { EMAIL, PSW_EMAIL} = appConfig;

class EmailService { 
    constructor(){
    }

    sendEmail = async (req) => {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                user: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                user: EMAIL,
                pass: PSW_EMAIL,
                },
            });
            let result = await transporter.sendMail({
                from: EMAIL,
                to: req.body.email,
                subject: `Ecommerce Backend: Novedades`,
                html: `
                  <html>
                    <head>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          margin: 0;
                          padding: 0;
                        }
                        .container {
                          max-width: 600px;
                          margin: 0 auto;
                          padding: 20px;
                          background-color: #f8f9fa;
                          border-radius: 5px;
                          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                          color: #007bff;
                        }
                        p {
                          font-size: 16px;
                        }
                        img {
                          max-width: 100%;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h1>SUPER DESCUENTOS</h1>
                        <p>Aprovecha el 15% de descuento en todos nuestros productos</p>
                        <img src="cid:logo" alt="Company Logo" />
                      </div>
                    </body>
                  </html>
                `,
                attachments: [
                    {
                        filename: "pet-loro.png",
                        path: `${process.cwd()}` + `/src/public/img/pet-loro.png`,
                        cid: "loro",
                      },
                      {
                        filename: "ejercicios.pdf",
                        path: `${process.cwd()}` + `/src/public/file/ejercicios.pdf`,
                      },
                      {
                        filename: "pet-loro.png",
                        path: `${process.cwd()}` + `/src/public/img/pet-loro.png`,
                      },
                ],
              });
              console.log(
                "🚀 ~ file: email.routes.js:32 ~ router.post ~ result:",
                result
              );

          return result;
        } catch (error) {
          console.error(`emailService: Error al procesar la petición POST: ${error}`);
          throw error;;
        }
      };

}


export default EmailService;

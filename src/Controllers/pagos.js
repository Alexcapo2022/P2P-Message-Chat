import { URL_NIUBIZ } from "../Utils/niubiz.js";
import { response } from "../Utils/responses.js";

const getAccessToken = async () => {
   try {
      const textToDecode = process.env.NIUBIZ_USERNAME + ":" + process.env.NIUBIZ_PASSWORD;
      const base64 = Buffer.from(textToDecode).toString("base64");

      const data = await fetch(URL_NIUBIZ.acces_token, {
         method: "GET",
         headers: {
            Authorization: "Basic " + base64,
            "Content-Type": "text/plain",
         },
      });
      if (data.status !== 201) {
         return "";
      }
      return await data.text();
   } catch (err) {
      console.log(err);
      return "";
   }
};

export const getSessionToken = async (req, res) => {
   try {
      const { monto, ip } = req.body;
      const token = await getAccessToken();
      if (token === "") {
         return res.status(500).json(response(false, "Error al obtener el token", null));
      }

      const bodyPost = {
         channel: "web",
         amount: monto,
         antifraud: {
            clientIp: ip,
            merchantDefineData: {
               MDD15: "Valor MDD 15",
               MDD20: "Valor MDD 20",
               MDD33: "Valor MDD 33",
            },
         },
      };

      const sessionResponse = await fetch(URL_NIUBIZ.session_token, {
         method: "POST",
         headers: {
            Authorization: token,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(bodyPost),
      });
      if (sessionResponse.status !== 200) {
         return res.status(500).json(response(false, "Error al obtener el token", null));
      }
      const data = await sessionResponse.json();

      return res
         .status(200)
         .json(response(true, "Token de acceso", { sessionToken: data.sessionKey }));
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al obtener el token", err));
   }
};

export const getTransactionAuthorization = async (req, res) => {
   try {
      const { transactionToken } = req.body;
      const { monto, orden } = req.query;
      const token = await getAccessToken();
      if (token === "") {
         return res.status(500).json(response(false, "Error al obtener el token", null));
      }
      
      const bodyPost = {
         channel: "web",
         captureType: "manual",
         countable: true,
         order: {
            tokenId: transactionToken,
            purchaseNumber: orden, //generar uno en back
            amount: monto,
            currency: "PEN",
         },
      };

      const transactionResponse = await fetch(URL_NIUBIZ.transaction_auth, {
         method: "POST",
         headers: {
            Authorization: token,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(bodyPost),
      });

      if (transactionResponse.status !== 200) {
         console.log(transactionResponse.status)
         return res.redirect(String(process.env.URL_FRONTEND) + "confirmation?success=false")
         // return res.status(transactionResponse.status).json(response(false, "Error al confirmar la transacción NIUBIZ", transactionResponse.text()));
      }

      const data = await transactionResponse.json();
      console.log(data)

      return res.redirect(String(process.env.URL_FRONTEND) + "confirmation?success=true")
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al confirmar el pago", null));
   }
};

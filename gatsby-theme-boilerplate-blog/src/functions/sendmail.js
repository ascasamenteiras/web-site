const sgMail = require("@sendgrid/mail");
require("dotenv").config({
  path: `.env`,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function(context, event, callback) {
  sgMail.setApiKey(context.SENDGRID_API_KEY);

  const response = new Twilio.Response();
  response.setHeaders({
    "Access-Control-Allow-Origin": "http://localhost:8000",
    "Content-Type": "application/json",
  });

  //  const text = `from: ${event.fromEmail}, body: ${event.body}`
  const text = `from: pri@ascasamenteiras.com.br, body: texto aqui`;

  const message = {
    to: "miltonbolonha@gmail.com", // replace this with your email address
    from: "pri@ascasamenteiras.com.br", // replace this with your email address
    subject: "event.subject",
    text,
  };

  try {
    await sgMail.send(message);
    response.setBody({});
    response.setStatusCode(200);
  } catch (error) {
    response.setBody({ error: error.message });
    response.setStatusCode(error.code);
  }

  callback(null, response);
};

const sgMail = require("@sendgrid/mail");

const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ms277712@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app ${name}. Let me know how you get along with the app `,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ms277712@gmail.com",
    subject: "sorry to see you go",
    text: `goodbye ${name}.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};

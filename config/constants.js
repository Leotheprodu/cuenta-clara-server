/* ----------------------------------Basic constants----------------------------------- */
const appName = 'Billeo';
/* ----------------------------------Business logic constants----------------------------------- */
/**
 * @description Initial balance for new users
 *  */
const initialBalance = process.env.INITIAL_BALANCE;
/*
 * @description Price for each paid invoice while Billing Process.
 * 2% of the invoice amount
 *  */
const billingPrice = 0.02;
/**
 * @description Billing price for each paid transaction while Client Paid a Invoice.
 * 5% of the invoice amount
 *  */
const BalanceControlPrice = 0.05;

/* ------------------------------------ Email -------------------------------------------- */
const emailPort = 587;
const emailSecure = false;
const emailHost = process.env.EMAIL_HOST;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

/* ------------------------------------ Database --------------------------------------------------*/
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

/* ------------------------------------ Config --------------------------------------------------*/
const PORT = process.env.PORT || 5000;
const ORIGIN_CORS = process.env.URL_CORS;
const secret = process.env.SECRET_EXPRESS_SESSION;
const environment = process.env.NODE_ENV;
const FrontendDomain = process.env.FRONTEND_DOMAIN;

/* ------------------------------------ FrontendLinks --------------------------------------------------*/

const verifyEmailLink = `${FrontendDomain}sesion/verificar-email/`;
module.exports = {
  user,
  password,
  database,
  host,
  port,
  initialBalance,
  billingPrice,
  BalanceControlPrice,
  appName,
  PORT,
  ORIGIN_CORS,
  secret,
  environment,
  emailSecure,
  emailPort,
  emailHost,
  emailUser,
  emailPass,
  FrontendDomain,
  verifyEmailLink,
};

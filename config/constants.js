/* ----------------------------------Basic constants----------------------------------- */
const appName = 'Billeo';
const mainUserId = 9;
/* ----------------------------------Business logic constants----------------------------------- */
/**
 * @description Initial balance for new users
 *  */
const initialBalance = process.env.INITIAL_BALANCE;
/**
 * @description Billing price.
 * 3% of the invoice amount
 *  */
const billingPrice = 0.03;

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

/* ------------------------------------ Dictionaries --------------------------------------------------*/

const invoicesStatus = {
  paid: 'paid',
  pending: 'pending',
  cancelled: 'cancelled',
  inReview: 'inReview',
};
const balancesStatus = {
  complete: 'complete',
  pending: 'pending',
  cancelled: 'cancelled',
};
const paymentStatus = {
  complete: 2,
  pending: 1,
  cancelled: 3,
};
const paymentMethod = {
  cash: 1,
  sinpeMovil: 2,
  bankTransfer: 3,
  paypal: 4,
  creditCard: 5,
};

module.exports = {
  user,
  password,
  database,
  host,
  port,
  initialBalance,
  billingPrice,
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
  mainUserId,
  invoicesStatus,
  balancesStatus,
  paymentStatus,
  paymentMethod,
};

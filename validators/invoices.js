const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateInvoice = [
  check('date')
    .exists()
    .isString()
    .notEmpty()
    .withMessage('La fecha es requerida y debe ser un string.'),
  check('client_id')
    .exists()
    .isInt()
    .withMessage('El ID del cliente es requerido y debe ser un número entero.'),
  check('business_id')
    .exists()
    .isInt()
    .withMessage('El ID del negocio es requerido y debe ser un número entero.'),
  check('total')
    .exists()
    .isDecimal()
    .withMessage('El total debe ser un número decimal.'),
  check('invoice_details')
    .isArray()
    .notEmpty()
    .withMessage('La lista de detalles de factura no puede estar vacía.'),

  // Validación de invoice_details
  check('invoice_details.*.code')
    .isString()
    .notEmpty()
    .withMessage(
      'El código en los detalles de la factura es requerido y debe ser un string.',
    ),
  check('invoice_details.*.quantity')
    .isNumeric()
    .notEmpty()
    .withMessage(
      'La cantidad en los detalles de la factura es requerida y debe ser un número.',
    ),
  check('invoice_details.*.unit_price')
    .isNumeric()
    .notEmpty()
    .withMessage(
      'El precio unitario en los detalles de la factura es requerido y debe ser un número.',
    ),
  check('invoice_details.*.description')
    .isString()
    .notEmpty()
    .withMessage(
      'La descripción en los detalles de la factura es requerida y debe ser un string.',
    ),
  check('invoice_details.*.subtotal')
    .isNumeric()
    .notEmpty()
    .withMessage(
      'El subtotal en los detalles de la factura es requerido y debe ser un número.',
    ),
  (req, res, next) => validateResults(req, res, next),
];

const validateInvoiceClientId = [
  check('id')
    .exists()
    .isInt()
    .withMessage('El ID de la factura es requerido y debe ser un número.'),
  (req, res, next) => validateResults(req, res, next),
];
const validateQueryInvoicesOfUser = [
  check('is_paid')
    .optional()
    .isBoolean()
    .withMessage('El campo is_paid debe ser un booleano.'),
  (req, res, next) => validateResults(req, res, next),
];
module.exports = {
  validatorCreateInvoice,
  validateInvoiceClientId,
  validateQueryInvoicesOfUser,
};

/* const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        console.error(err);
        res.status(403);
        res.send({
            error: err.array(),
            message: 'Revisa que los datos sean correctos',
        });
    }
};
module.exports = validateResults; */
const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array().map((error) => ({
                param: error.param,
                msg: error.msg,
                // Puedes agregar más información personalizada aquí si es necesario
            })),
            message:
                'Error de validación. Verifica que los datos sean correctos y sigue las instrucciones detalladas en los mensajes de error.',
        });
    }

    return next();
};

module.exports = validateResults;

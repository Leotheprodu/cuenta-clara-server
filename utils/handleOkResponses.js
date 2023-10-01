/**
 * Respuesta para enviar toda la informacion de la sesion actual del usuario
 * @param {*} req
 * @param {*} res
 * @param {'mensaje de la respuesta'} message
 */
const resUsersSessionData = (req, res, message) => {
    res.send({
        data: {
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user,
            userMessage: {
                message,
            },
        },
    });
};
/**
 * Respuesta para enviar unicamente datos para mostrar al cliente
 * @param {*} res
 * @param {object} data
 */
const resOkData = (res, data) => {
    res.send({ data });
};

module.exports = { resUsersSessionData, resOkData };

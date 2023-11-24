const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Encriptar contrasena
 * @param {*} passwordPlain
 */

const PasswordEncrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, saltRounds);

  return hash;
};

/**
 * Compara la contrasena encriptada con la contrasena plana
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */

const PasswordCompare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { PasswordCompare, PasswordEncrypt };

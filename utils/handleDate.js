const dateNow = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);

  let fechaActual = `${year}-${month}-${day}`;

  return fechaActual;
};

module.exports = dateNow;

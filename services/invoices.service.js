const {
  invoicesModel,
  invoice_detailsModel,
  transactionsModel,
  users_businessModel,
  clientsModel,
  payment_methodsModel,
  payment_statusModel,
  products_and_servicesModel,
} = require('../models');
class Invoices {
  async findInvoicesofUserByClient(client_id, parent_user_id) {
    return await invoicesModel.findAll({
      where: {
        client_id,
        parent_user_id,
      },
      attributes: {
        exclude: [
          'client_id',
          'parent_user_id',
          'createdAt',
          'updatedAt',
          'business_id',
        ],
      },
      include: [
        {
          model: users_businessModel,
          attributes: ['id', 'name'],
        },
        {
          model: clientsModel,
          attributes: ['id', 'username'],
        },
        {
          model: invoice_detailsModel,
          attributes: {
            exclude: ['default', 'createdAt', 'updatedAt', 'invoiceId'],
          },
          include: [
            {
              model: products_and_servicesModel,
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: transactionsModel,
          through: { attributes: [] },
          attributes: {
            exclude: [
              'parent_user_id',
              'createdAt',
              'updatedAt',
              'client_id',
              'payment_method_id',
              'status_id',
            ],
          },
          include: [
            {
              model: payment_methodsModel,
              attributes: ['id', 'name'],
            },
            {
              model: payment_statusModel,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }
}

module.exports = Invoices;

import { Op } from 'sequelize';
import { invoicesStatus } from '../config/constants';
import models from '../models/index.js';
const {
  invoicesModel,
  invoice_detailsModel,
  transactionsModel,
  users_businessModel,
  clientsModel,
  payment_methodsModel,
  payment_statusModel,
  products_and_servicesModel,
} = models;
class Invoices {
  async findInvoicesofUserByClient(client_id, parent_user_id, page, perPage) {
    // Condiciones de búsqueda
    const whereConditions = {
      client_id,
      parent_user_id,
    };

    // Opciones de paginación (solo se aplican si es necesario)
    const paginationOptions = {};
    if (page && perPage) {
      paginationOptions.offset = (page - 1) * perPage;
      paginationOptions.limit = perPage;
    }
    return await invoicesModel.findAll({
      where: whereConditions,
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
              attributes: ['id', 'name', 'unit', 'type'],
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
      order: [['id', 'DESC']],
      ...paginationOptions,
    });
  }
  async findInvoicebyIDforTransactions(invoice_id) {
    // Condiciones de búsqueda
    const whereConditions = {
      id: invoice_id,
    };

    return await invoicesModel.findOne({
      where: whereConditions,
      attributes: ['id', 'status', 'total_amount'],
      include: [
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
  async findInvoicebyIDforDetails(invoice_id) {
    // Condiciones de búsqueda
    const whereConditions = {
      id: invoice_id,
    };

    return await invoicesModel.findOne({
      where: whereConditions,
      attributes: ['id', 'status', 'total_amount'],
      include: [
        {
          model: invoice_detailsModel,
          attributes: {
            exclude: ['default', 'createdAt', 'updatedAt', 'invoiceId'],
          },
          include: [
            {
              model: products_and_servicesModel,
              attributes: ['id', 'name', 'unit', 'type'],
            },
          ],
        },
      ],
    });
  }
  async findInvoicesofUserByToken(client_id, parent_user_id, page, perPage) {
    // Condiciones de búsqueda
    const whereConditions = {
      client_id,
      parent_user_id,
      status: {
        [Op.ne]: invoicesStatus.cancelled,
      },
    };

    // Opciones de paginación (solo se aplican si es necesario)
    const paginationOptions = {};
    if (page && perPage) {
      paginationOptions.offset = (page - 1) * perPage;
      paginationOptions.limit = perPage;
    }
    return await invoicesModel.findAll({
      where: whereConditions,
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
        /* {
          model: invoice_detailsModel,
          attributes: {
            exclude: ['default', 'createdAt', 'updatedAt', 'invoiceId'],
          },
          include: [
            {
              model: products_and_servicesModel,
              attributes: ['id', 'name', 'unit', 'type'],
            },
          ],
        }, */
        /*  {
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
        }, */
      ],
      order: [['id', 'DESC']],
      ...paginationOptions,
    });
  }
  async findInvoice(invoice_id) {
    return await invoicesModel.findByPk(invoice_id, {
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

export default Invoices;

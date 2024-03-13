/* eslint-disable @typescript-eslint/naming-convention */
import models from '../models/index.js';
import { type Request } from 'express';
import { type userBusinessData } from '../interfaces/users_business.interface.js';

const userBusinessChecker = async (
  req: Request,
  user_id: number,
): Promise<userBusinessData[]> => {
  const business: userBusinessData[] = await models.users_businessModel.findAll(
    {
      where: { user_id },
    },
  );
  req.session.userBusiness = business.map((item) => item.id);
  return business;
};
export default userBusinessChecker;

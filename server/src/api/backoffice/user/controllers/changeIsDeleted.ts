/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// TYPES
import { Request, Response } from 'express';

// CLASS
import { UserServices } from '../../../shared/user/services/userServices';
import { Validator } from '../../../../utils/validator/validator';

const validator = new Validator();
const userServices = new UserServices();

export async function changeIsDeleted(req: Request, res: Response) {
  const { userId } = req.body;

  validator.notNull([{ label: 'ID de usuário', variable: userId }]);

  await userServices.changeIsDeleted({
    userId,
  });

  return res.status(200).json({
    ServerMessage: {
      statusCode: 200,
      message: `Usuário excluído com sucesso.`,
    },
  });
}

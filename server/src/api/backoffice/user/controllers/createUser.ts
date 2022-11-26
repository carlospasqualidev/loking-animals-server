/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// TYPES
import { Request, Response } from 'express';

// CLASS
import { UserServices } from '../../../shared/user/services/userServices';
import { Validator } from '../../../../utils/validator/validator';
import { PermissionServices } from '../../../shared/permission/services/permissionServices';
import { UserPermissionServices } from '../../../shared/userPermission/services/userPermissionServices';

const validator = new Validator();
const userServices = new UserServices();
const permissionServices = new PermissionServices();
const userPermissionServices = new UserPermissionServices();

export async function createUser(req: Request, res: Response) {
  const { name, email, image, password, role } = req.body;

  validator.notNull([
    { label: 'nome', variable: name },
    { label: 'email', variable: email },
    { label: 'imagem', variable: image },
    { label: 'senha', variable: password },
    { label: 'cargo', variable: role },
  ]);

  const checkUser = await userServices.findByEmail({ email });

  validator.cannotExists([{ variable: checkUser, label: email }]);

  const user = await userServices.create({
    name,
    email,
    image,
    passwordHash: password,
  });

  const permission = await permissionServices.findByName({
    name: 'Backoffice',
  });

  await userPermissionServices.createUserPermission({
    userId: user.id!,
    permissionId: permission.id!,
  });

  return res.status(200).json({
    ServerMessage: {
      statusCode: 200,
      message: 'Usuário cadastrado com sucesso.',
    },
  });
}

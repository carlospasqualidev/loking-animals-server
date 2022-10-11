// TYPES
import { Response, Request } from 'express';

// CLASS
import { AuthServices } from '../../../shared/auth/services/authServices';
import { HandlerToken } from '../../../../utils/token/handlerToken';
import { Validator } from '../../../../utils/validator/validator';
import { PermissionServices } from '../../../shared/permission/services/permissionServices';

const permissionServices = new PermissionServices();
const authServices = new AuthServices();
const handlerToken = new HandlerToken();

const validator = new Validator();

export const authAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  validator.notNull([
    { label: 'email', variable: email },
    { label: 'senha', variable: password },
  ]);

  const user = await authServices.findByEmail({ email });

  await authServices.canLogin({ user, password });

  await permissionServices.checkPermission({
    userPermissions: user?.UserPermissions,
    permission: 'Backoffice',
  });

  const token = handlerToken.generateToken({
    tokenData: { userId: user.id!, Permissions: user.UserPermissions },
  });

  return res.status(200).json({
    User: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      Permissions: user.UserPermissions,
    },
    token,
  });
};

// TYPES
import { Response, Request, NextFunction } from 'express';

// CLASS
import { PermissionServices } from '../../api/shared/permission/services/permissionServices';

const permissionServices = new PermissionServices();

export const isBackoffice = async (
  req: Request,
  // eslint-disable-next-line no-unused-vars
  _res: Response,
  next: NextFunction,
) => {
  const permissions = req.Permissions;

  await permissionServices.checkPermission({
    userPermissions: permissions,
    permission: 'Backoffice',
  });

  next();
};

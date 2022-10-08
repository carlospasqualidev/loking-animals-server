/* eslint-disable no-console */
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { prisma } from '../../src/utils/prismaClient';

// CLASS
import { LocationServices } from '../../src/api/shared/location/services/locationServices';
import { PermissionServices } from '../../src/api/shared/permission/services/permissionServices';

const permissionServices = new PermissionServices();
const locationServices = new LocationServices();

export class SeedServices {
  async createPermissions() {
    const permissions: Prisma.PermissionCreateInput[] = [
      {
        name: 'Backoffice',
      },
    ];

    for (const permission of permissions) {
      // eslint-disable-next-line no-await-in-loop
      await prisma.permission.create({
        data: permission,
      });
      console.log('permission ', permission.name, ' inserted');
    }
  }

  async createAdminAndPermissions() {
    // admin
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        image:
          'https://altorendimento.s3.us-west-2.amazonaws.com/Logo-1658407533329.png',
        role: 'Administrador',
        passwordHash: hashSync('123123123', 12),
      },
    });

    const permissionAdmin = await permissionServices.findByName({
      name: 'Admin',
    });

    const permissionLab = await permissionServices.findByName({
      name: 'Lab',
    });

    await prisma.userPermissions.create({
      data: {
        userId: admin.id,
        permissionId: permissionAdmin.id!,
      },
    });
    console.log('permission ', permissionAdmin.name, ' inserted in Admin');

    await prisma.userPermissions.create({
      data: {
        userId: admin.id,
        permissionId: permissionLab.id!,
      },
    });
    console.log('permission ', permissionLab.name, ' inserted in Admin');
  }

  async createLocations() {
    const locations = [
      {
        name: 'Pasto',
      },
      {
        name: 'Comedouro',
      },
      {
        name: 'Vacina',
      },
    ];

    for (const location of locations) {
      await locationServices.create({
        name: location.name,
      });
      console.log('location ', location.name, ' inserted');
    }
  }
}

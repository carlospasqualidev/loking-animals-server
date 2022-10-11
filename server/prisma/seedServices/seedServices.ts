/* eslint-disable no-console */
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { prisma } from '../../src/utils/prismaClient';

// CLASS
import { PermissionServices } from '../../src/api/shared/permission/services/permissionServices';

const permissionServices = new PermissionServices();

export class SeedServices {
  async createPermissions() {
    console.log('initiating the creation of permissions ...');

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
    console.log('initiating the creation of Admin ...');

    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        image:
          'https://altorendimento.s3.us-west-2.amazonaws.com/Logo-1658407533329.png',
        passwordHash: hashSync('123123123', 12),
      },
    });

    const permissionAdmin = await permissionServices.findByName({
      name: 'Backoffice',
    });

    await prisma.userPermissions.create({
      data: {
        userId: admin.id,
        permissionId: permissionAdmin.id!,
      },
    });
    console.log('permission ', permissionAdmin.name, ' inserted in Admin');
  }

  async createLocations() {
    console.log('initiating the creation of locations ...');

    const locations = [
      {
        name: 'Pasto',
      },
      {
        name: 'Comida',
      },
      {
        name: 'Vacina',
      },
    ];

    for (const location of locations) {
      await prisma.local.create({
        data: {
          name: location.name,
        },
      });
      console.log('location ', location.name, ' inserted');
    }
  }

  async createAnimalActions() {
    console.log('initiating the creation of animal actions ...');

    const Actions: { name: string }[] = [
      {
        name: 'Movimento',
      },
      {
        name: 'Comendo',
      },
      {
        name: 'Vacinando',
      },
    ];

    for (const action of Actions) {
      await prisma.animalAction.create({
        data: {
          name: action.name,
        },
      });
      console.log('action ', action.name, ' inserted');
    }
  }

  async createBreeds() {
    console.log('initiating the creation of animal breeds ...');

    const Breeds: { name: string }[] = [
      {
        name: 'Jersey',
      },
      {
        name: 'Holandês',
      },
      {
        name: 'Pardo Suíço',
      },
      {
        name: 'Gir',
      },
      {
        name: 'Girolando',
      },
      {
        name: 'Guzerá ',
      },
      {
        name: 'Sindi ',
      },
    ];

    for (const breed of Breeds) {
      await prisma.breed.create({
        data: {
          name: breed.name,
        },
      });

      console.log('breed ', breed.name, ' inserted');
    }
  }

  async createGenders() {
    console.log('initiating the creation of animal genders ...');

    const Genders: { name: string }[] = [
      {
        name: 'Macho',
      },
      {
        name: 'Femea',
      },
    ];

    for (const gender of Genders) {
      await prisma.gender.create({
        data: {
          name: gender.name,
        },
      });

      console.log('gender ', gender.name, ' inserted');
    }
  }
}

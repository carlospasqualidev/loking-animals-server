/* eslint-disable no-console */
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { prisma } from '../../src/utils/prismaClient';

// CLASS
import { PermissionServices } from '../../src/api/shared/permission/services/permissionServices';
import { AnimalServices } from '../../src/api/backoffice/animal/services/animalServices';

const permissionServices = new PermissionServices();
const animalServices = new AnimalServices();

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

    const Actions = [
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

    const Breeds = [
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

  async createAnimals() {
    const female = await animalServices.findGenderByName({ name: 'Femea' });
    const male = await animalServices.findGenderByName({ name: 'Macho' });
    const animalAction = await prisma.animalAction.findMany();

    const breeds = await animalServices.listBreeds();
    const locals = await prisma.local.findMany();

    function randomNumber(min: number, max: number) {
      return Math.floor(
        Math.random() * (Math.ceil(min) - Math.floor(max)) + min,
      );
    }

    const images = [
      'https://s2.glbimg.com/J4t2oY-w6f0jcnBHoapgvX9UARU=/0x0:695x394/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/b/Q/ibQsuaQRmo9YSNqAmoTw/vaca-oculos-realidade-1.jpg',
      'https://m.sorisomail.com/img/1276447447925.jpg',
      'https://m.sorisomail.com/img/1276447447331.bmp',
      'https://m.sorisomail.com/img/1276447448403.jpg',
      'https://m.sorisomail.com/img/1276447447925.jpg',
    ];

    await prisma.animal.createMany({
      data: [
        {
          breedId: breeds[0].id,
          genderId: male!.id,
        },
        {
          breedId: breeds[1].id,
          genderId: female!.id,
        },
        {
          breedId: breeds[2].id,
          genderId: male!.id,
        },
        {
          breedId: breeds[3].id,
          genderId: female!.id,
        },
        {
          breedId: breeds[4].id,
          genderId: female!.id,
        },
      ],
    });

    const animals = await animalServices.listAnimals();

    for (let i = 0; i < animals.length; i++) {
      await prisma.animalHistory.createMany({
        data: [
          {
            animalId: animals[i].id,
            age: randomNumber(200, 300),
            weight: randomNumber(400, 600),
            image: images[i],
          },
          {
            animalId: animals[i].id,
            age: randomNumber(100, 150),
            weight: randomNumber(300, 450),
            image: images[i],
          },
        ],
      });

      for (let j = 0; j < 3; j++) {
        await prisma.animalActionHistory.create({
          data: {
            animalId: animals[i].id,
            animalActionId: animalAction[j].id,
            localId: locals[j].id,
            startTime: new Date(),
            endTime: new Date(),
          },
        });
      }
    }
  }
}

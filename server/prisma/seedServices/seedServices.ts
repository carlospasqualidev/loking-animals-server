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
    function randomNumber(min: number, max: number) {
      return Math.floor(
        Math.random() * (Math.ceil(min) - Math.floor(max)) + min,
      );
    }

    const images = [
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.techtudo.com.br%2Fnoticias%2F2019%2F12%2Ffazendeiros-russos-testam-realidade-virtual-em-vacas-entenda-o-caso.ghtml&psig=AOvVaw0dQo3ZP655jQAq__hxMqWR&ust=1666479233529000&source=images&cd=vfe&ved=2ahUKEwj5ppiHtfL6AhUDB7kGHS_sBNEQjRx6BAgAEAw',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.sorisomail.com%2Fpartilha%2F51367.html&psig=AOvVaw0bNWgHEoHqnJ-HgKaR34dW&ust=1666479249858000&source=images&cd=vfe&ved=2ahUKEwiw_vyOtfL6AhVAMLkGHYF2DoMQjRx6BAgAEAw',
      'https://sites.google.com/site/brcuriosedades/_/rsrc/1303337904597/home/vamos-rir-um-pouco/como%20tirar%20esta%20vaca.jpg',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.sorisomail.com%2Fpartilha%2F51367.html&psig=AOvVaw0bNWgHEoHqnJ-HgKaR34dW&ust=1666479249858000&source=images&cd=vfe&ved=2ahUKEwiw_vyOtfL6AhVAMLkGHYF2DoMQjRx6BAgAEAw',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.sorisomail.com%2Fpartilha%2F51367.html&psig=AOvVaw0bNWgHEoHqnJ-HgKaR34dW&ust=1666479249858000&source=images&cd=vfe&ved=2ahUKEwiw_vyOtfL6AhVAMLkGHYF2DoMQjRx6BAgAEAw',
    ];

    const male = await animalServices.findGenderByName({ name: 'Macho' });
    const female = await animalServices.findGenderByName({ name: 'Femea' });
    const breeds = await animalServices.listBreeds();

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
      await prisma.animalHistory.create({
        data: {
          animalId: animals[i].id,
          age: randomNumber(100, 150),
          weight: randomNumber(300, 450),
          image: images[i],
        },
      });
    }
  }
}

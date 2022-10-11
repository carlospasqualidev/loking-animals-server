/* eslint-disable no-console */
import { prisma } from '../src/utils/prismaClient';

import { SeedServices } from './seedServices/seedServices';

const seedServices = new SeedServices();

async function main() {
  // seeds
  console.log('seed is running ...');

  await seedServices.createPermissions();

  await seedServices.createAdminAndPermissions();

  await seedServices.createAnimalActions();

  await seedServices.createBreeds();

  await seedServices.createGenders();

  await seedServices.createLocations();
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

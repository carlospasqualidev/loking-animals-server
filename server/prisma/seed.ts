/* eslint-disable no-console */
import { prisma } from '../src/utils/prismaClient';

import { SeedServices } from './seedServices/seedServices';

const seedServices = new SeedServices();

async function main() {
  // seeds
  console.log('seed is running ...');

  await seedServices.createPermissions();

  await seedServices.createAdminAndPermissions();

  await seedServices.createLocations();

  await seedServices.createExpirationDates();

  await seedServices.createMatrixTypes();
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

// LIBS
import { prisma } from '../../../../utils/prismaClient';

// TYPES
import { ICreateLocation } from './types';

export class LocationServices {
  async create({ name }: ICreateLocation) {
    await prisma.location.create({
      data: {
        name,
      },
    });
  }

  async list() {
    return prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}

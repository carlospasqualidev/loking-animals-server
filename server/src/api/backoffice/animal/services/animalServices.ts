import { prisma } from '../../../../utils/prismaClient';
import { ICreateAnimal, ICreateAnimalHistory } from './types';

export class AnimalServices {
  async create({ breedId, genderId }: ICreateAnimal) {
    await prisma.animal.create({
      data: {
        breedId,
        genderId,
      },
    });
  }

  async createHistory({ animalId, age, weight, image }: ICreateAnimalHistory) {
    await prisma.animalHistory.create({
      data: {
        animalId,
        age,
        weight,
        image,
      },
    });
  }
}

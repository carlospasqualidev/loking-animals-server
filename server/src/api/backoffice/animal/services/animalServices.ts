import { prisma } from '../../../../utils/prismaClient';
import { ICreateAnimal, ICreateAnimalHistory } from './types';

export class AnimalServices {
  // ANIMALS
  async create({ breedId, genderId }: ICreateAnimal) {
    return prisma.animal.create({
      data: {
        breedId,
        genderId,
      },
    });
  }

  async createHistory({ animalId, age, weight, image }: ICreateAnimalHistory) {
    return prisma.animalHistory.create({
      data: {
        animalId,
        age,
        weight,
        image,
      },
    });
  }

  async listAnimals() {
    return prisma.animal.findMany();
  }

  // GENDERS
  async findGenderByName({ name }: { name: 'Macho' | 'Femea' }) {
    return prisma.gender.findFirst({
      where: {
        name,
      },
    });
  }

  // BREEDS
  async listBreeds() {
    return prisma.breed.findMany();
  }
}

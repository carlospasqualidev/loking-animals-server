import { prisma } from '../../../../utils/prismaClient';
import {
  ICreateAnimal,
  ICreateAnimalActionHistory,
  ICreateAnimalHistory,
} from './types';

export class AnimalServices {
  // #region ANIMALS
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

  // #endregion

  // #region FINDS
  async findAnimalbyId({ animalId }: { animalId: string }) {
    return prisma.animal.findFirst({
      select: {
        AnimalActionHistory: {
          select: {
            id: true,
            endTime: true,
          },
          where: {
            endTime: null,
          },
        },
      },

      where: {
        id: animalId,
      },
    });
  }
  // #endregion

  // #region ACTIONS
  async createActionHistory({
    animalId,
    localId,
    animalActionId,
    startTime,
  }: ICreateAnimalActionHistory) {
    await prisma.animalActionHistory.create({
      data: {
        animalId,
        localId,
        animalActionId,
        startTime,
      },
    });
  }

  async updateActionHistory({
    animalActionHistoryId,
  }: {
    animalActionHistoryId: string;
  }) {
    await prisma.animalActionHistory.update({
      data: {
        endTime: new Date(),
      },
      where: {
        id: animalActionHistoryId,
      },
    });
  }
  // #endregion

  // #region LIST
  async listAnimals() {
    return prisma.animal.findMany({
      select: {
        id: true,
        Breed: {
          select: {
            name: true,
          },
        },
        Gender: {
          select: {
            name: true,
          },
        },
        AnimalHistory: {
          select: {
            age: true,
            image: true,
            weight: true,
          },
        },
        AnimalActionHistory: {
          select: {
            Local: {
              select: {
                name: true,
              },
            },
            AnimalAction: {
              select: {
                name: true,
              },
            },
            startTime: true,
            endTime: true,
          },
        },
      },
    });
  }

  async listAnimalsActions() {
    return prisma.animalActionHistory.findMany({
      select: {
        startTime: true,
        endTime: true,
        Animal: {
          select: {
            Breed: {
              select: {
                id: true,
                name: true,
              },
            },

            Gender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },

        Local: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  // #endregion

  // #region GENDERS AND BREEDS
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
  // #endregion
}

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
            AnimalHistory: {
              select: {
                weight: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
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

  async countAnimals() {
    return prisma.animal.count();
  }

  async countAnimalsPerBreeds() {
    const [Jersey, Holandes, PardoSuico, Gir, Girolando, Guzera, Sindi] =
      await prisma.$transaction([
        prisma.animal.count({
          where: {
            Breed: {
              id: '6608c028-ed6e-4698-8f5b-166d170e3197',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '6d972a02-c6bf-4106-83a1-6a2fd2251e8c',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '5e029245-bf60-44f8-8edd-c86fbf5b66a9',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '1bde3ba8-1fe9-44b3-a2a0-10955f88eaf9',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: 'dddaa5ed-d8d8-47c2-a5a8-27e90efff74f',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '5e335889-b0f7-4452-8c32-c3757d2c7d71',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: 'b1beb8d6-992e-457b-9a1a-7e7e937c2e7a',
            },
          },
        }),
      ]);

    return { Jersey, Holandes, PardoSuico, Gir, Girolando, Guzera, Sindi };
  }

  async countAnimaisPerLocal() {
    const [Pasture, Food, Vaccine] = await prisma.$transaction([
      prisma.animalActionHistory.count({
        where: {
          localId: '16d83c18-e8bb-4c25-8c5a-301348e5ccb5',
          endTime: null,
        },
      }),
      prisma.animalActionHistory.count({
        where: {
          localId: '40516ec6-2b7d-432d-ad42-af7c8950eb34',
          endTime: null,
        },
      }),

      prisma.animalActionHistory.count({
        where: {
          localId: '035fe222-f4f5-4cdd-9793-e9cbe7bd6ed8',
          endTime: null,
        },
      }),
    ]);

    return { Pasture, Food, Vaccine };
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

import { prisma } from '../../../../utils/prismaClient';
import { Validator } from '../../../../utils/validator/validator';
import {
  ICreateAnimal,
  ICreateAnimalActionHistory,
  ICreateAnimalHistory,
} from './types';

const validator = new Validator();

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
    const animal = await prisma.animal.findFirst({
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
    validator.needExist([
      { label: 'ID do animal nao encontrado', variable: animal },
    ]);
    return animal;
  }

  async findAnimalDetailsbyId({ animalId }: { animalId: string }) {
    const animal = await prisma.animal.findFirst({
      select: {
        id: true,
        Gender: {
          select: {
            name: true,
          },
        },
        Breed: {
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
            id: true,
            endTime: true,
            startTime: true,
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
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },

      where: {
        id: animalId,
      },
    });
    validator.needExist([
      { label: 'ID do animal nao encontrado', variable: animal },
    ]);
    return animal;
  }

  async findLocationbyId({ locationId }: { locationId: string }) {
    const location = await prisma.local.findFirst({
      where: {
        id: locationId,
      },
    });
    validator.needExist([
      { label: 'ID do local nao encontrado', variable: location },
    ]);
    return location;
  }

  async findActionbyId({ actionId }: { actionId: string }) {
    const action = await prisma.animalAction.findFirst({
      where: {
        id: actionId,
      },
    });
    validator.needExist([
      { label: 'ID da acao nao encontrado', variable: action },
    ]);
    return action;
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
              id: 'e5d30f84-6d57-488b-a14a-a3e885f34c3b',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: 'c1054489-5812-4aca-b62e-fe8409a74bb4',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '2a08f847-b270-4877-95c2-cbab1ebc785e',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: 'cb7e74e7-0ae8-4b88-a99c-52446bb03326',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '33ab24fa-6385-453d-be7d-2c8319d6da37',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: 'b2a58b48-a4ae-4f6d-80d7-a0d0ebb60349',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '629171c8-04e1-439d-bed3-b83a0d63d73a',
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
          localId: '5880f069-c836-41eb-b4d9-ca4ea18475b8',
          endTime: null,
        },
      }),
      prisma.animalActionHistory.count({
        where: {
          localId: '2dccc315-1b71-47dc-86d3-fd5744099c29',
          endTime: null,
        },
      }),

      prisma.animalActionHistory.count({
        where: {
          localId: '8c606ae5-f5d4-45f2-96fa-f78227682165',
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

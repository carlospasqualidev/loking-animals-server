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
              id: '2690ed5d-1873-48d9-871c-ad9c69c237da',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '6e4f82c4-19cc-487f-9db9-bbe28981bbe0',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: 'f0d603f5-164e-4dd8-a892-580efbeb941f',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '45f577db-b169-43fb-91f8-a45d5c2e5691',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '4ddd61ec-7d69-4889-9944-037dc73b837d',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '36ebd113-7327-4e1e-88f5-39afadb1dbb5',
            },
          },
        }),
        prisma.animal.count({
          where: {
            Breed: {
              id: '11fc0bad-de85-429a-bd59-5585137f4ca3',
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
          localId: 'b1bc32b0-d2df-4e0a-872d-a6e4f3766b0b',
          endTime: null,
        },
      }),
      prisma.animalActionHistory.count({
        where: {
          localId: 'a2bcb0ca-9d95-42f8-9966-7968f7f6e4b9',
          endTime: null,
        },
      }),

      prisma.animalActionHistory.count({
        where: {
          localId: 'ee28203b-a001-4a79-af95-5b74d85fb7d5',
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

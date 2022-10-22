// TYPES
import { Request, Response } from 'express';

// CLASS
import { Validator } from '../../../../utils/validator/validator';
import { AnimalServices } from '../services/animalServices';

const validator = new Validator();
const animalServices = new AnimalServices();

export async function createAnimal(req: Request, res: Response) {
  const { breedId, genderId, age, weight } = req.body;

  validator.notNull([
    { label: 'ID da Raça', variable: breedId },
    { label: 'ID do genero', variable: genderId },
    { label: 'Idade do animal', variable: age },
    { label: 'Peso do animal', variable: weight },
  ]);

  const animal = await animalServices.create({ breedId, genderId });

  const animalHistory = await animalServices.createHistory({
    animalId: animal.id,
    age,
    weight,
    image:
      'https://www.bing.com/images/search?q=imagem%20de%20Vaca&FORM=IQFRBA&id=E954303B35A109CC59CE441997C32CC61B22A3A1',
  });

  return res.status(200).json({
    Animal: {
      animal,
      animalHistory,
    },
    ServerMessage: {
      statusCode: 200,
      message: 'Animal cadastrado com sucesso.',
    },
  });
}

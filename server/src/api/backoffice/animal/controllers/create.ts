// TYPES
import { Request, Response } from 'express';

// CLASS
import { Validator } from '../../../../utils/validator/validator';

const validator = new Validator();

export async function createUser(req: Request, res: Response) {
  const { animalId, breedId, genderId, age, weight } = req.body;

  validator.notNull([
    { label: 'ID do animal', variable: animalId },
    { label: 'ID da Raça', variable: breedId },
    { label: 'ID do genero', variable: genderId },
    { label: 'Idade do animal', variable: age },
    { label: 'Peso do animal', variable: weight },
  ]);

  return res.status(200).json({
    ServerMessage: {
      statusCode: 200,
      message: 'Usuário cadastrado com sucesso.',
    },
  });
}

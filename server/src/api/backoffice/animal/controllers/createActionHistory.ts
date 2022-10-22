// TYPES
import { Request, Response } from 'express';

// CLASS
import { Validator } from '../../../../utils/validator/validator';
// import { AnimalServices } from '../services/animalServices';

const validator = new Validator();
// const animalServices = new AnimalServices();

export async function createAnimal(req: Request, res: Response) {
  const { animalId, localId, actionId } = req.body;

  validator.notNull([
    { label: 'ID do Animal', variable: animalId },
    { label: 'ID do Animal', variable: localId },
    { label: 'ID do Animal', variable: actionId },
  ]);

  return res.status(200).json({
    ServerMessage: {
      statusCode: 200,
      message: 'Animal cadastrado com sucesso.',
    },
  });
}

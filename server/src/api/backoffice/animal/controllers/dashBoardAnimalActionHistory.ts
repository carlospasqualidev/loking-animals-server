// TYPES
import { Request, Response } from 'express';

// CLASS
import { AnimalServices } from '../services/animalServices';

const animalServices = new AnimalServices();

export async function dashBoardAnimalActionHistory(
  req: Request,
  res: Response,
) {
  const AnimalActionsHistory = await animalServices.listAnimalsActions();

  return res.status(200).json({
    AnimalActionsHistory,
  });
}

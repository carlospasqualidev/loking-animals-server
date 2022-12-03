// TYPES
import { Request, Response } from 'express';

// CLASS
import { AnimalServices } from '../services/animalServices';

const animalServices = new AnimalServices();

export async function animalDetails(req: Request, res: Response) {
  const { animalId } = req.params;
  const Animal = await animalServices.findAnimalDetailsbyId({ animalId });

  return res.status(200).json(Animal);
}

// TYPES
import { Request, Response } from 'express';

// CLASS
import { AnimalServices } from '../services/animalServices';

const animalServices = new AnimalServices();

export async function animalsList(_req: Request, res: Response) {
  const animals = await animalServices.listAnimals();

  return res.status(200).json(animals);
}

// TYPES
import { Request, Response } from 'express';

// CLASS
import { AnimalServices } from '../services/animalServices';

const animalServices = new AnimalServices();

export async function animalsList(_req: Request, res: Response) {
  const animalsData: any = await animalServices.listAnimals();

  const animals = [];

  for (let i = 0; i < animalsData.length; i++) {
    animals.push({
      id: animalsData[i].id,
      Breed: animalsData[i].Breed.name,
      Gender: animalsData[i].Gender.name,
      weight: animalsData[i].AnimalHistory[0].weight,
      image: animalsData[i].AnimalHistory[0].image,
    });
  }

  return res.status(200).json(animals);
}

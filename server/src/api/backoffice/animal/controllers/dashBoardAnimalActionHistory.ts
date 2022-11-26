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

  // #region AVG WEIGTH
  let weight = 0;
  let i = 0;

  for (i = 0; i < AnimalActionsHistory.length; i++) {
    weight += AnimalActionsHistory[i].Animal.AnimalHistory[0].weight;
  }

  const AnimalWeightAVG = weight / i;

  // #endregion

  // #region COUNTS

  const BreedsCount = await animalServices.countAnimalsPerBreeds();
  const AnimalsTotal = await animalServices.countAnimals();

  const AnimalsPerLocal = await animalServices.countAnimaisPerLocal();
  // #endregion

  return res.status(200).json({
    AnimalsPerLocal,
    AnimalWeightAVG,
    AnimalsTotal,
    BreedsCount,
  });
}

// TYPES
import { Request, Response } from 'express';

// CLASS
import { Validator } from '../../../../utils/validator/validator';
import { AnimalServices } from '../services/animalServices';

const validator = new Validator();
const animalServices = new AnimalServices();

export async function createActionHistory(req: Request, res: Response) {
  const { animalId, animalActionId, localId } = req.body;

  validator.notNull([
    { label: 'ID do animal', variable: animalId },
    { label: 'ID do local', variable: localId },
    { label: 'ID da ação', variable: animalActionId },
  ]);

  const animalData = await animalServices.findAnimalbyId({ animalId });
  await animalServices.findActionbyId({ actionId: animalActionId });
  await animalServices.findLocationbyId({ locationId: localId });

  if (
    animalData?.AnimalActionHistory.length &&
    animalData.AnimalActionHistory[0].endTime === null
  ) {
    await animalServices.updateActionHistory({
      animalActionHistoryId: animalData?.AnimalActionHistory[0].id,
    });
  } else {
    await animalServices.createActionHistory({
      animalId,
      animalActionId,
      localId,
      startTime: new Date(),
    });
  }

  return res.status(200).json({
    ServerMessage: {
      statusCode: 200,
      message: 'Ação de animal registrada com sucesso.',
    },
  });
}

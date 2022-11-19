export interface ICreateAnimal {
  breedId: string;
  genderId: string;
}
export interface ICreateAnimalHistory {
  animalId;
  age: number;
  weight: number;
  image: string;
}

export interface ICreateAnimalActionHistory {
  animalId: string;
  localId: string;
  animalActionId: string;
  startTime: Date;
}

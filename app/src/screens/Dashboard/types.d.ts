export interface IDashboard {
  AnimalsPerLocal: {
    Pasture: number;
    Food: number;
    Vaccine: number;
  };
  AnimalWeightAVG: number;
  AnimalsTotal: 5;
  BreedsCount: {
    Jersey: number;
    Holandes: number;
    PardoSuico: number;
    Gir: number;
    Girolando: number;
    Guzera: number;
    Sindi: number;
  };
}

export interface IAnimalsList {
  id: string;
  Breed: string;
  Gender: string;
  weight: number;
  image: string;
}

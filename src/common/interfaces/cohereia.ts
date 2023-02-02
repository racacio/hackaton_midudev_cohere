export interface Economy {
  confidence: number;
}

export interface Health {
  confidence: number;
}

export interface Technology {
  confidence: number;
}

export interface Labels {
  Economy: Economy;
  Health: Health;
  Technology: Technology;
}

export interface iResultClassify {
  id: string;
  input: string;
  prediction: string;
  confidence: number;
  labels: Labels;
}
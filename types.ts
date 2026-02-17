
export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  age: number;
  travelFrequency: 'Baixa' | 'Média' | 'Alta';
  hasInternationalExperience: boolean;
  lastTrip: string;
  destination: string;
  timestamp: string;
  utmSource?: string;
}

export enum QuizStep {
  Name = 0,
  WhatsApp = 1,
  Age = 2,
  Frequency = 3,
  International = 4,
  LastTrip = 5,
  Destination = 6,
  Review = 7
}

export interface AdminStats {
  totalLeads: number;
  topDestination: string;
  averageAge: number;
}

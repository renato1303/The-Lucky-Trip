
export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  age: number;
  destination: string;
  timestamp: string;
  utmSource?: string;
}

export enum QuizStep {
  Name = 0,
  WhatsApp = 1,
  Age = 2,
  Destination = 3,
  Review = 4
}

export interface AdminStats {
  totalLeads: number;
  topDestination: string;
  averageAge: number;
}

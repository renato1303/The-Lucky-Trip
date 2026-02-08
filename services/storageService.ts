
import { Lead } from '../types';
import { STORAGE_KEYS } from '../constants';

export const storageService = {
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },

  saveLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'utmSource'>): Lead => {
    const leads = storageService.getLeads();
    
    // Get UTM source from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || 'Direct/Organic';

    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      utmSource
    };

    const updatedLeads = [...leads, newLead];
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updatedLeads));
    return newLead;
  },

  deleteLead: (id: string): void => {
    const leads = storageService.getLeads();
    const updatedLeads = leads.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updatedLeads));
  },

  exportToCSV: (leads: Lead[]) => {
    const headers = ['Nome', 'WhatsApp', 'Idade', 'Destino', 'Data/Hora', 'Origem'];
    const rows = leads.map(l => [
      l.name,
      l.whatsapp,
      l.age,
      l.destination,
      new Date(l.timestamp).toLocaleString('pt-BR'),
      l.utmSource
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_the_lucky_trip_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

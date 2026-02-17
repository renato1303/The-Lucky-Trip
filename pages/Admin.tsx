
import React, { useState, useMemo, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Lead } from '../types';

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFreq, setFilterFreq] = useState('');

  useEffect(() => {
    setLeads(storageService.getLeads());
  }, []);

  const stats = useMemo(() => {
    if (leads.length === 0) return { total: 0, avgAge: 0, topDest: '-' };
    const avgAge = Math.round(leads.reduce((sum, l) => sum + l.age, 0) / leads.length);
    const destCount: Record<string, number> = {};
    leads.forEach(l => destCount[l.destination] = (destCount[l.destination] || 0) + 1);
    const topDest = Object.entries(destCount).sort((a, b) => b[1] - a[1])[0][0];

    return { total: leads.length, avgAge, topDest };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           l.whatsapp.includes(searchTerm);
      const matchesFreq = !filterFreq || l.travelFrequency === filterFreq;
      return matchesSearch && matchesFreq;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [leads, searchTerm, filterFreq]);

  const handleDelete = (id: string) => {
    if (window.confirm('Deseja excluir este lead?')) {
      storageService.deleteLead(id);
      setLeads(storageService.getLeads());
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-serif text-xl text-premium-darkBlue">The Lucky Trip <span className="text-gray-300 font-sans text-xs ml-2">Painel de Qualificação</span></h1>
        <button onClick={onLogout} className="text-xs text-gray-500 hover:text-red-500">Sair</button>
      </nav>

      <main className="flex-1 p-4 md:p-8 max-w-full mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total de Leads" value={stats.total} />
          <StatCard label="Média de Idade" value={`${stats.avgAge} anos`} color="text-premium-gold" />
          <StatCard label="Mais Desejado" value={stats.topDest} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Nome ou WhatsApp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full md:w-64 outline-none text-sm focus:ring-1 focus:ring-premium-gold"
            />
            <select
              value={filterFreq}
              onChange={(e) => setFilterFreq(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
            >
              <option value="">Frequência (Todas)</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <button
            onClick={() => storageService.exportToCSV(filteredLeads)}
            className="w-full md:w-auto px-6 py-2 bg-premium-darkBlue text-white rounded-xl text-sm font-medium hover:bg-premium-accent"
          >
            Exportar CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">WhatsApp</th>
                  <th className="px-6 py-4">Qualificação</th>
                  <th className="px-6 py-4">Última / Sonho</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-premium-offWhite transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-premium-darkBlue">{lead.name}</p>
                      <p className="text-gray-400 text-[10px]">{lead.age} anos • {new Date(lead.timestamp).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-premium-gold hover:underline font-medium">
                        {lead.whatsapp}
                      </a>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lead.travelFrequency === 'Alta' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          Freq: {lead.travelFrequency}
                        </span>
                        {lead.hasInternationalExperience && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">Exterior</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-500 italic truncate max-w-[150px]">Ant: {lead.lastTrip}</p>
                      <p className="text-premium-darkBlue font-medium truncate max-w-[150px]">Sonho: {lead.destination}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(lead.id)} className="text-gray-300 hover:text-red-500">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, color = "text-premium-darkBlue" }: { label: string, value: string | number, color?: string }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-bold truncate ${color}`}>{value}</p>
  </div>
);

export default Admin;

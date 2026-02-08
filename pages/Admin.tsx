
import React, { useState, useMemo, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Lead } from '../types';

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDestination, setFilterDestination] = useState('');

  useEffect(() => {
    setLeads(storageService.getLeads());
  }, []);

  const stats = useMemo(() => {
    if (leads.length === 0) return { total: 0, avgAge: 0, topDest: '-' };
    const avgAge = Math.round(leads.reduce((sum, l) => sum + l.age, 0) / leads.length);
    const destCount: Record<string, number> = {};
    leads.forEach(l => destCount[l.destination] = (destCount[l.destination] || 0) + 1);
    const topDest = Object.entries(destCount).sort((a, b) => b[1] - a[1])[0][0];

    return {
      total: leads.length,
      avgAge,
      topDest
    };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           l.whatsapp.includes(searchTerm);
      const matchesDest = !filterDestination || l.destination === filterDestination;
      return matchesSearch && matchesDest;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [leads, searchTerm, filterDestination]);

  const uniqueDestinations = useMemo(() => {
    return Array.from(new Set(leads.map(l => l.destination)));
  }, [leads]);

  const handleDelete = (id: string) => {
    if (window.confirm('Deseja excluir este lead permanentemente?')) {
      storageService.deleteLead(id);
      setLeads(storageService.getLeads());
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Admin Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h1 className="font-serif text-xl text-premium-darkBlue">The Lucky Trip <span className="text-gray-300 font-sans text-sm ml-2">Dashboard Admin</span></h1>
        <button 
          onClick={onLogout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Sair do Painel
        </button>
      </nav>

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Total de Leads</p>
            <p className="text-3xl font-bold text-premium-darkBlue">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Média de Idade</p>
            <p className="text-3xl font-bold text-premium-gold">{stats.avgAge} <span className="text-sm font-normal text-gray-300">anos</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Top Destino</p>
            <p className="text-2xl font-bold text-premium-darkBlue truncate">{stats.topDest}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nome ou WhatsApp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-premium-gold outline-none text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterDestination}
              onChange={(e) => setFilterDestination(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-premium-gold outline-none text-sm"
            >
              <option value="">Todos os Destinos</option>
              {uniqueDestinations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <button
            onClick={() => storageService.exportToCSV(filteredLeads)}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-2 bg-premium-gold text-white rounded-xl hover:bg-premium-gold/90 transition-all font-medium text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Baixar Planilha (CSV)</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">WhatsApp</th>
                <th className="px-6 py-4 font-semibold">Idade</th>
                <th className="px-6 py-4 font-semibold">Destino</th>
                <th className="px-6 py-4 font-semibold">Data/Hora</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-premium-offWhite transition-colors">
                  <td className="px-6 py-4 font-medium text-premium-darkBlue">{lead.name}</td>
                  <td className="px-6 py-4">
                    <a 
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-premium-gold hover:underline flex items-center space-x-1"
                    >
                      <span>{lead.whatsapp}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{lead.age}</td>
                  <td className="px-6 py-4">
                    <span className="bg-premium-goldLight/50 text-premium-gold px-2 py-1 rounded text-xs font-medium">
                      {lead.destination}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(lead.timestamp).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Nenhum lead encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;

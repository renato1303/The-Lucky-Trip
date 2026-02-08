
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PASSWORD } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
      navigate('/admin');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl text-premium-darkBlue mb-2">Painel Admin</h2>
          <p className="text-gray-400 text-sm">Insira suas credenciais de acesso</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Senha Master</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-premium-gold outline-none transition-all"
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-premium-darkBlue text-white rounded-xl font-medium hover:bg-premium-accent transition-all"
          >
            Entrar
          </button>
        </form>

        <button 
          onClick={() => navigate('/')}
          className="mt-6 w-full text-center text-sm text-gray-400 hover:text-premium-darkBlue transition-colors"
        >
          Voltar para o Quiz
        </button>
      </div>
    </div>
  );
};

export default Login;

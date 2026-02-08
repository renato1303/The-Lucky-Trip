
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header / Logo */}
      <header className="p-8 flex justify-center border-b border-gray-100 bg-white">
        <h1 className="font-serif text-3xl tracking-tight text-premium-darkBlue">
          The Lucky Trip
        </h1>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-4">
            <span className="text-premium-gold font-medium uppercase tracking-widest text-xs">
              Bem-vindo ao Extraordinário
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-premium-darkBlue">
              Descubra sua próxima viagem dos sonhos
            </h2>
            <p className="text-gray-500 font-light text-lg">
              Responda algumas perguntas rápidas e receba uma curadoria exclusiva para o seu perfil.
            </p>
          </div>

          <div className="pt-8">
            <button
              onClick={() => navigate('/quiz')}
              className="w-full py-4 px-8 bg-premium-darkBlue text-white rounded-full font-medium text-lg shadow-xl shadow-blue-900/10 hover:bg-premium-accent transition-all transform hover:scale-[1.02] active:scale-95"
            >
              Começar Quiz
            </button>
            <p className="mt-4 text-xs text-gray-400">
              Leva menos de 1 minuto
            </p>
          </div>
        </div>
      </main>

      {/* Footer / Social Proof */}
      <footer className="p-8 text-center bg-premium-offWhite">
        <div className="flex justify-center space-x-8 opacity-40 grayscale filter">
          <img src="https://picsum.photos/id/13/100/40" alt="Partner 1" className="h-6 object-contain" />
          <img src="https://picsum.photos/id/15/100/40" alt="Partner 2" className="h-6 object-contain" />
          <img src="https://picsum.photos/id/28/100/40" alt="Partner 3" className="h-6 object-contain" />
        </div>
      </footer>
    </div>
  );
};

export default Home;

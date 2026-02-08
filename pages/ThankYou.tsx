
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-premium-goldLight rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-4xl text-premium-darkBlue">✨ Obrigado por participar!</h2>
          <p className="text-gray-500 font-light text-lg">
            Seus sonhos agora estão em nossas mãos. Em breve, entraremos em contato via WhatsApp com oportunidades exclusivas e roteiros personalizados para o seu destino desejado.
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 px-8 border-2 border-premium-darkBlue text-premium-darkBlue rounded-full font-medium hover:bg-premium-darkBlue hover:text-white transition-all"
          >
            Voltar ao Início
          </button>
          
          <div className="flex items-center justify-center space-x-2 text-premium-gold text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Lead Capturado com Sucesso</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;


import React from 'react';

const ThankYou: React.FC = () => {
  const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/CN5ymvJbPVp7NL1EB17gwi";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
        {/* Ícone de Sucesso Premium */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-premium-goldLight rounded-full animate-ping opacity-20"></div>
          <div className="relative w-full h-full bg-premium-goldLight rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-4xl text-premium-darkBlue">✨ Quase lá!</h2>
          <p className="text-gray-600 font-light text-lg leading-relaxed">
            Suas respostas são de extrema importância para entendermos o seu perfil de viajante. 
            Abaixo tem um botão para você fazer parte do meu <strong>grupo fechado no WhatsApp</strong>, 
            onde eu compartilho dicas, roteiros e muitas novidades. 
            Venha fazer parte da nossa comunidade. Te vejo lá!
          </p>
        </div>

        <div className="pt-8 space-y-4">
          {/* Botão Principal: WhatsApp */}
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 w-full py-5 px-8 bg-[#25D366] text-white rounded-full font-bold text-lg shadow-xl shadow-green-200 hover:bg-[#20ba5a] transition-all transform hover:scale-[1.03] active:scale-95"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82l.303.18c1.397.831 3.013 1.27 4.673 1.271h.001c5.455 0 9.894-4.44 9.895-9.895 0-2.643-1.029-5.128-2.898-6.997-1.868-1.868-4.352-2.897-6.996-2.897-5.455 0-9.894 4.44-9.895 9.895-.001 1.758.459 3.469 1.332 4.965l.197.334-1.122 4.1 4.192-1.1c1.356.739 2.871 1.132 4.418 1.133zM16.518 13.6c-.267-.134-1.583-.781-1.828-.871-.247-.091-.427-.134-.606.134-.18.267-.694.871-.85 1.049-.156.18-.312.202-.579.068-.267-.134-1.128-.416-2.15-1.328-.795-.71-1.332-1.586-1.488-1.854-.156-.267-.017-.412.117-.545.12-.12.267-.312.4-.469.133-.156.177-.267.267-.445.09-.178.045-.334-.022-.469-.067-.134-.606-1.46-.83-2.002-.218-.526-.438-.454-.606-.462l-.513-.006c-.18 0-.469.067-.714.334-.244.267-.934.912-.934 2.227 0 1.315.956 2.583 1.089 2.762.134.178 1.881 2.871 4.556 4.026.637.275 1.132.44 1.52.563.64.203 1.222.174 1.682.106.513-.076 1.583-.647 1.806-1.272.222-.625.222-1.159.156-1.271-.067-.111-.244-.178-.511-.311z"/>
            </svg>
            <span>ENTRAR NO GRUPO VIP</span>
          </a>
          
          <div className="flex items-center justify-center space-x-2 text-premium-gold text-xs font-medium pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="uppercase tracking-widest">Inscrição Confirmada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

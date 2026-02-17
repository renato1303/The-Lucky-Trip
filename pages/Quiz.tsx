
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizStep } from '../types';
import { storageService } from '../services/storageService';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<QuizStep>(QuizStep.Name);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    age: '',
    travelFrequency: '' as 'Baixa' | 'Média' | 'Alta' | '',
    hasInternationalExperience: null as boolean | null,
    lastTrip: '',
    destination: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === QuizStep.Name && !formData.name.trim()) newErrors.name = 'Por favor, insira seu nome.';
    if (step === QuizStep.WhatsApp && formData.whatsapp.length < 14) newErrors.whatsapp = 'Insira um número válido.';
    if (step === QuizStep.Age && (!formData.age || parseInt(formData.age) < 18)) newErrors.age = 'A idade mínima é 18 anos.';
    if (step === QuizStep.Frequency && !formData.travelFrequency) newErrors.travelFrequency = 'Selecione uma opção.';
    if (step === QuizStep.International && formData.hasInternationalExperience === null) newErrors.international = 'Responda se já viajou para o exterior.';
    if (step === QuizStep.LastTrip && !formData.lastTrip.trim()) newErrors.lastTrip = 'Conte-nos sobre sua última aventura.';
    if (step === QuizStep.Destination && !formData.destination.trim()) newErrors.destination = 'Qual seu destino dos sonhos?';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < QuizStep.Review) {
        setStep(step + 1);
      } else {
        submitQuiz();
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigate('/');
  };

  const submitQuiz = () => {
    storageService.saveLead({
      name: formData.name,
      whatsapp: formData.whatsapp,
      age: parseInt(formData.age),
      travelFrequency: formData.travelFrequency as any,
      hasInternationalExperience: !!formData.hasInternationalExperience,
      lastTrip: formData.lastTrip,
      destination: formData.destination
    });
    navigate('/obrigado');
  };

  const progress = ((step + 1) / (QuizStep.Review + 1)) * 100;

  return (
    <div className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-12">
        <div 
          className="h-full bg-premium-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <button onClick={handleBack} className="self-start text-gray-400 hover:text-premium-darkBlue transition-colors mb-8 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span>Voltar</span>
      </button>

      <div className="flex-1 space-y-8">
        {step === QuizStep.Name && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Como podemos te chamar?</h3>
            <input
              autoFocus
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.name && <p className="mt-2 text-red-500 text-sm">{errors.name}</p>}
          </div>
        )}

        {step === QuizStep.WhatsApp && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Qual seu WhatsApp?</h3>
            <input
              autoFocus
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', formatWhatsApp(e.target.value))}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.whatsapp && <p className="mt-2 text-red-500 text-sm">{errors.whatsapp}</p>}
          </div>
        )}

        {step === QuizStep.Age && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Sua idade?</h3>
            <input
              autoFocus
              type="number"
              placeholder="Idade"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.age && <p className="mt-2 text-red-500 text-sm">{errors.age}</p>}
          </div>
        )}

        {step === QuizStep.Frequency && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-8">Com que frequência você viaja?</h3>
            <div className="grid grid-cols-1 gap-4">
              {['Baixa', 'Média', 'Alta'].map((option) => (
                <button
                  key={option}
                  onClick={() => { handleInputChange('travelFrequency', option); setTimeout(handleNext, 300); }}
                  className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${formData.travelFrequency === option ? 'border-premium-gold bg-premium-goldLight/20' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <span className="font-medium text-lg">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === QuizStep.International && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-8">Você viaja ou já viajou para o exterior?</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { handleInputChange('hasInternationalExperience', true); setTimeout(handleNext, 300); }}
                className={`p-6 text-center rounded-2xl border-2 transition-all ${formData.hasInternationalExperience === true ? 'border-premium-gold bg-premium-goldLight/20' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <span className="block text-2xl mb-2">✈️</span>
                <span className="font-medium">Sim</span>
              </button>
              <button
                onClick={() => { handleInputChange('hasInternationalExperience', false); setTimeout(handleNext, 300); }}
                className={`p-6 text-center rounded-2xl border-2 transition-all ${formData.hasInternationalExperience === false ? 'border-premium-gold bg-premium-goldLight/20' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <span className="block text-2xl mb-2">🌎</span>
                <span className="font-medium">Não</span>
              </button>
            </div>
          </div>
        )}

        {step === QuizStep.LastTrip && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Qual foi a sua última viagem?</h3>
            <input
              autoFocus
              type="text"
              placeholder="País / Cidade / Estado"
              value={formData.lastTrip}
              onChange={(e) => handleInputChange('lastTrip', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.lastTrip && <p className="mt-2 text-red-500 text-sm">{errors.lastTrip}</p>}
          </div>
        )}

        {step === QuizStep.Destination && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Qual destino você sonha conhecer?</h3>
            <input
              autoFocus
              type="text"
              placeholder="Ex: Maldivas, Alpes Suíços..."
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.destination && <p className="mt-2 text-red-500 text-sm">{errors.destination}</p>}
          </div>
        )}

        {step === QuizStep.Review && (
          <div className="quiz-transition space-y-6">
            <h3 className="font-serif text-3xl text-premium-darkBlue">Podemos confirmar?</h3>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <ReviewRow label="Nome" value={formData.name} />
              <ReviewRow label="WhatsApp" value={formData.whatsapp} />
              <ReviewRow label="Frequência" value={formData.travelFrequency} />
              <ReviewRow label="Exterior" value={formData.hasInternationalExperience ? 'Sim' : 'Não'} />
              <ReviewRow label="Última Viagem" value={formData.lastTrip} />
              <ReviewRow label="Sonho" value={formData.destination} highlight />
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-premium-darkBlue text-white rounded-full font-medium text-lg hover:bg-premium-accent transition-all active:scale-95 shadow-lg"
        >
          {step === QuizStep.Review ? 'Finalizar Curadoria' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};

const ReviewRow = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
  <div className="flex justify-between border-b border-gray-50 pb-2 last:border-0">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className={`font-medium ${highlight ? 'text-premium-gold' : 'text-premium-darkBlue'}`}>{value}</span>
  </div>
);

export default Quiz;

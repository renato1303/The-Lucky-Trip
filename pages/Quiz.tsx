
import React, { useState, useEffect } from 'react';
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
    destination: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'whatsapp') value = formatWhatsApp(value);
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
    if (step === QuizStep.Destination && !formData.destination.trim()) newErrors.destination = 'Por favor, escreva o destino dos seus sonhos.';

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
      destination: formData.destination
    });
    navigate('/obrigado');
  };

  const progress = ((step + 1) / (QuizStep.Review + 1)) * 100;

  return (
    <div className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
      {/* Progress Bar */}
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
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Qual é o seu nome completo?</h3>
            <input
              autoFocus
              type="text"
              placeholder="Ex: João Silva"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.name && <p className="mt-2 text-red-500 text-sm">{errors.name}</p>}
          </div>
        )}

        {step === QuizStep.WhatsApp && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Qual seu número de WhatsApp?</h3>
            <input
              autoFocus
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            {errors.whatsapp && <p className="mt-2 text-red-500 text-sm">{errors.whatsapp}</p>}
          </div>
        )}

        {step === QuizStep.Age && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Quantos anos você tem?</h3>
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

        {step === QuizStep.Destination && (
          <div className="quiz-transition">
            <h3 className="font-serif text-3xl text-premium-darkBlue mb-6">Qual destino você sonha conhecer?</h3>
            <input
              autoFocus
              type="text"
              placeholder="Ex: Maldivas, Paris, Fernando de Noronha..."
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl focus:border-premium-gold outline-none transition-colors"
            />
            <p className="mt-4 text-gray-400 text-sm">Digite qualquer lugar do mundo que você deseja explorar.</p>
            {errors.destination && <p className="mt-2 text-red-500 text-sm">{errors.destination}</p>}
          </div>
        )}

        {step === QuizStep.Review && (
          <div className="quiz-transition space-y-6">
            <h3 className="font-serif text-3xl text-premium-darkBlue">Podemos confirmar seus dados?</h3>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-400">Nome</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-400">WhatsApp</span>
                <span className="font-medium">{formData.whatsapp}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-400">Idade</span>
                <span className="font-medium">{formData.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Destino</span>
                <span className="font-medium text-premium-gold">{formData.destination}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-premium-darkBlue text-white rounded-full font-medium text-lg hover:bg-premium-accent transition-all active:scale-95 shadow-lg"
        >
          {step === QuizStep.Review ? 'Finalizar e Descobrir' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

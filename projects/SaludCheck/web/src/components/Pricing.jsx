import React, { useState } from 'react';
import { Check, CreditCard, Smartphone, Send, ShieldCheck } from 'lucide-react';

const Pricing = ({ onActivate }) => {
    const [selectedPlan, setSelectedPlan] = useState('1y');

    const plans = [
        { id: '1m', name: 'Mensual', price: '$10 USD', duration: '1 Mes', savings: null },
        { id: '3m', name: 'Trimestral', price: '$25 USD', duration: '3 Meses', savings: 'Ahorra 15%' },
        { id: '1y', name: 'Anual', price: '$80 USD', duration: '1 Año', savings: 'Ahorra 30%', popular: true },
        { id: '2y', name: 'Bianual', price: '$140 USD', duration: '2 Años', savings: 'Ahorra 40%' },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
                        SaludCheck CRM
                    </h1>
                    <p className="text-slate-400 text-lg">
                        El sistema definitivo para vendedores de Obras Sociales.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Producto Registrado de FR IMFELD TECH
                    </div>
                </div>

                {/* Planes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedPlan === plan.id
                                    ? 'bg-slate-800 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 z-10'
                                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    MÁS VENDIDO
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-slate-200 mb-2">{plan.name}</h3>
                            <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                            <p className="text-sm text-slate-400 mb-4">{plan.duration}</p>
                            {plan.savings && (
                                <span className="inline-block px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold mb-4">
                                    {plan.savings}
                                </span>
                            )}
                            <div className={`w-6 h-6 rounded-full border-2 ml-auto flex items-center justify-center ${selectedPlan === plan.id ? 'border-blue-500 bg-blue-500' : 'border-slate-600'
                                }`}>
                                {selectedPlan === plan.id && <Check className="w-4 h-4 text-white" />}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Métodos de Pago */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800 rounded-2xl p-8 border border-slate-700">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-blue-400" />
                            Métodos de Pago
                        </h3>

                        <div className="space-y-4">
                            <button className="w-full bg-[#009EE3] hover:bg-[#008ED0] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                <Smartphone className="w-5 h-5" />
                                Pagar con Mercado Pago / Tarjetas
                            </button>

                            <button className="w-full bg-[#003087] hover:bg-[#002569] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                <span className="italic font-serif">PayPal</span>
                                Pagar con PayPal Internacional
                            </button>
                        </div>

                        <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2">
                                <Send className="w-4 h-4" /> Transferencia Directa
                            </h4>
                            <div className="space-y-2 text-sm text-slate-400">
                                <p><span className="text-slate-500">Alias:</span> <span className="text-white font-mono select-all">fabri.platamp</span></p>
                                <p><span className="text-slate-500">CBU:</span> <span className="text-white font-mono select-all">0170015240000013550220</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Activación</h3>
                            <p className="text-slate-400 mb-6">
                                Una vez realizado el pago, envía el comprobante para recibir tu licencia de activación inmediata.
                            </p>

                            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-6">
                                <p className="text-green-400 font-bold text-sm mb-1">ENVIAR COMPROBANTE A:</p>
                                <p className="text-white text-xl font-bold">+54 9 11 7066-5067</p>
                                <p className="text-slate-500 text-xs mt-1">Soporte 24/7 vía WhatsApp</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-700">
                            <button
                                onClick={onActivate}
                                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                            >
                                (Modo Demo: Simular Activación)
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                ¿Dudas? Escribe a <a href="mailto:imfeldfabrizio7@gmail.com" className="text-blue-400 hover:underline">imfeldfabrizio7@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 text-slate-600 text-sm">
                    © 2025 FR IMFELD TECH. Todos los derechos reservados.
                </div>
            </div>
        </div>
    );
};

export default Pricing;

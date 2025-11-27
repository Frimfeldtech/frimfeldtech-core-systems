import React from 'react';
import { motion } from 'framer-motion';

const TrafficLight = ({ status }) => {
    // status: 'GREEN', 'YELLOW', 'RED', or null

    const lights = [
        { color: 'red', active: status === 'RED', label: 'NO APTO' },
        { color: 'yellow', active: status === 'YELLOW', label: 'ALERTA' },
        { color: 'green', active: status === 'GREEN', label: 'APTO' },
    ];

    return (
        <div className="flex flex-col items-center space-y-4 p-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-xs mx-auto">
            <div className="bg-slate-900 p-4 rounded-full border-4 border-slate-700 shadow-inner flex flex-col gap-4">
                {lights.map((light) => (
                    <motion.div
                        key={light.color}
                        initial={false}
                        animate={{
                            opacity: light.active ? 1 : 0.3,
                            scale: light.active ? 1.1 : 1,
                            boxShadow: light.active
                                ? `0 0 30px ${light.color === 'red' ? '#ef4444' : light.color === 'yellow' ? '#eab308' : '#22c55e'}`
                                : 'none'
                        }}
                        className={`w-16 h-16 rounded-full transition-colors duration-300 ${light.color === 'red' ? 'bg-red-500' :
                                light.color === 'yellow' ? 'bg-yellow-500' :
                                    'bg-green-500'
                            }`}
                    />
                ))}
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold tracking-wider text-slate-200">
                    {status === 'GREEN' ? 'CLIENTE ACTIVO' :
                        status === 'YELLOW' ? 'REVISIÓN REQUERIDA' :
                            status === 'RED' ? 'DESCARTADO' : 'ESPERANDO...'}
                </h3>
                {status && (
                    <p className="text-sm text-slate-400 mt-1">
                        {status === 'GREEN' ? 'Puede realizar el traspaso.' :
                            status === 'YELLOW' ? 'Verificar fechas o aportes.' :
                                'No cumple requisitos mínimos.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TrafficLight;

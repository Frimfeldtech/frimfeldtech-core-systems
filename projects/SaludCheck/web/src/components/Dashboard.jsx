import React, { useState } from 'react';
import axios from 'axios';
import { Search, Upload, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import TrafficLight from './TrafficLight';

const Dashboard = () => {
    const [cuil, setCuil] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('check'); // 'check', 'batch'

    const handleCheck = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            // En producción usar variable de entorno
            const response = await axios.post('http://localhost:3001/api/check', { cuil });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert('Error al consultar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        SaludCheck CRM
                    </h1>
                    <p className="text-slate-400">Panel de Control para Vendedores</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('check')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'check' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        Consulta Individual
                    </button>
                    <button
                        onClick={() => setActiveTab('batch')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'batch' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        Carga Masiva
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Input Form */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'check' ? (
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Search className="w-5 h-5 text-blue-400" />
                                Nueva Consulta
                            </h2>
                            <form onSubmit={handleCheck} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Ingresar CUIL (sin guiones)"
                                    value={cuil}
                                    onChange={(e) => setCuil(e.target.value)}
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                                >
                                    {loading ? 'Analizando...' : 'Verificar'}
                                </button>
                            </form>

                            {result && (
                                <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-700 animate-fade-in">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-slate-500">Nombre</p>
                                            <p className="font-medium text-lg">{result.firstName} {result.lastName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">Obra Social Actual</p>
                                            <p className="font-medium text-lg">{result.osName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">Meses desde cambio</p>
                                            <p className="font-medium text-lg">{result.monthsSinceTransfer}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">Aportes</p>
                                            <p className={`font-medium text-lg ${result.hasContributions ? 'text-green-400' : 'text-red-400'}`}>
                                                {result.hasContributions ? 'Regulares' : 'Irregulares'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-lg border ${result.status.color === 'GREEN' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                            result.status.color === 'YELLOW' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                                                'bg-red-500/10 border-red-500/30 text-red-400'
                                        }`}>
                                        <p className="font-bold flex items-center gap-2">
                                            {result.status.color === 'GREEN' ? <CheckCircle className="w-5 h-5" /> :
                                                result.status.color === 'YELLOW' ? <AlertTriangle className="w-5 h-5" /> :
                                                    <XCircle className="w-5 h-5" />}
                                            {result.status.message}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl text-center py-20">
                            <Upload className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-300">Carga Masiva de Excel</h3>
                            <p className="text-slate-500 mb-6">Arrastra tu archivo .xlsx aquí para procesar múltiples CUILs.</p>
                            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-all">
                                Seleccionar Archivo
                            </button>
                        </div>
                    )}

                    {/* Recent Activity Mock */}
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
                        <h3 className="text-lg font-semibold mb-4 text-slate-300">Actividad Reciente</h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">JP</div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-200">20-34567890-1</p>
                                            <p className="text-xs text-slate-500">Hace {i * 5} min</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400">APTO</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Traffic Light & Stats */}
                <div className="space-y-6">
                    <TrafficLight status={result?.status?.color} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <p className="text-slate-500 text-xs uppercase font-bold">Consultas Hoy</p>
                            <p className="text-2xl font-bold text-white">124</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                            <p className="text-slate-500 text-xs uppercase font-bold">Conversión</p>
                            <p className="text-2xl font-bold text-green-400">18%</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

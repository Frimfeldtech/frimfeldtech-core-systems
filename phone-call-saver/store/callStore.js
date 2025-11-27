import { create } from 'zustand';

/**
 * Zustand Store para gestionar el estado de las llamadas falsas
 */
export const useCallStore = create((set) => ({
    // Configuración de la llamada
    callerName: 'Mamá',
    callerPhoto: null,
    ringtone: null,
    audioFile: null,
    delayMinutes: 1,

    // Estado activo
    isScheduled: false,
    scheduledTime: null,
    timerId: null,

    // Acciones
    setCallerName: (name) => set({ callerName: name }),

    setCallerPhoto: (photoUri) => set({ callerPhoto: photoUri }),

    setRingtone: (ringtone) => set({ ringtone: ringtone }),

    setAudioFile: (audioFile) => set({ audioFile: audioFile }),

    setDelayMinutes: (minutes) => set({ delayMinutes: minutes }),

    scheduleCall: (timerId) => set({
        isScheduled: true,
        scheduledTime: new Date(Date.now() + (set.delayMinutes || 1) * 60000),
        timerId: timerId
    }),

    cancelScheduledCall: () => {
        const state = set.getState?.() || {};
        if (state.timerId) {
            clearTimeout(state.timerId);
        }
        set({
            isScheduled: false,
            scheduledTime: null,
            timerId: null
        });
    },

    resetCallSettings: () => set({
        callerName: 'Mamá',
        callerPhoto: null,
        ringtone: null,
        audioFile: null,
        delayMinutes: 1,
        isScheduled: false,
        scheduledTime: null,
        timerId: null,
    }),
}));

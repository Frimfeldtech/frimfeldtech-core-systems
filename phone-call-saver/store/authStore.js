import { create } from 'zustand';

/**
 * Zustand Store para gestionar autenticación y usuario
 * Versión simplificada para modo demo
 */
export const useAuthStore = create((set, get) => ({
    // Estado del usuario
    user: null,
    userData: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,

    // Inicializar auth (modo demo)
    initializeAuth: async () => {
        set({ isLoading: true });

        // Simular carga
        await new Promise(resolve => setTimeout(resolve, 500));

        set({ isLoading: false });
    },

    // Cargar datos del usuario (simulado)
    loadUserData: async (uid) => {
        return {
            uid: uid,
            displayName: 'Usuario Demo',
            email: 'demo@phonecallsaver.com',
            subscriptionPlan: 'free',
            subscriptionStatus: 'active',
        };
    },

    // Registro de usuario (simulado)
    signUp: async (email, password, displayName) => {
        try {
            set({ isLoading: true, error: null });

            // Simular registro
            await new Promise(resolve => setTimeout(resolve, 1000));

            const demoUser = {
                uid: 'demo-' + Date.now(),
                email: email,
                displayName: displayName,
            };

            const userData = {
                uid: demoUser.uid,
                email: email,
                displayName: displayName,
                photoURL: null,
                phoneNumber: null,
                gender: 'other',
                language: 'es',
                subscriptionPlan: 'free',
                subscriptionStatus: 'active',
                createdAt: new Date(),
            };

            set({
                user: demoUser,
                userData: userData,
                isAuthenticated: true,
                isLoading: false
            });

            return { success: true };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
        }
    },

    // Inicio de sesión (simulado)
    signIn: async (email, password) => {
        try {
            set({ isLoading: true, error: null });

            // Simular login
            await new Promise(resolve => setTimeout(resolve, 1000));

            const demoUser = {
                uid: 'demo-user-123',
                email: email,
            };

            const userData = await get().loadUserData(demoUser.uid);

            set({
                user: demoUser,
                userData: userData,
                isAuthenticated: true,
                isLoading: false
            });

            return { success: true };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
        }
    },

    // Cerrar sesión
    logout: async () => {
        try {
            set({
                user: null,
                userData: null,
                isAuthenticated: false,
                error: null,
            });
            return { success: true };
        } catch (error) {
            set({ error: error.message });
            return { success: false, error: error.message };
        }
    },

    // Actualizar datos del usuario
    updateUserData: async (updates) => {
        try {
            const userData = get().userData;
            if (!userData) return { success: false, error: 'No user logged in' };

            set({
                userData: {
                    ...userData,
                    ...updates,
                    updatedAt: new Date(),
                }
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
}));

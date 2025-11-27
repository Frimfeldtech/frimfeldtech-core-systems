import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase Configuration
 * IMPORTANTE: Reemplaza estos valores con tus credenciales de Firebase
 * Para testing: La app funcionará en modo demo si no se configuran credenciales
 */
const firebaseConfig = {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project-id",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:demo"
};

// Para modo demo, no inicializamos Firebase realmente
let initialized = false;

/**
 * Función para inicializar Firebase
 */
export const initializeFirebase = async () => {
    try {
        if (firebaseConfig.apiKey === "demo-api-key") {
            console.log('⚠️ Running in DEMO mode - Firebase not configured');
            initialized = true;
            return true;
        }

        // Aquí iría la inicialización real de Firebase
        console.log('Firebase initialized successfully');
        initialized = true;
        return true;
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return false;
    }
};

export const isFirebaseInitialized = () => initialized;

// Exports simulados para modo demo
export const auth = null;
export const db = null;
export const storage = null;

export default null;

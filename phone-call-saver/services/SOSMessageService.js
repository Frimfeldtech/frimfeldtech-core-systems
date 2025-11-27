import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * SOSMessageService
 * Servicio para gestionar mensajes de emergencia y contactos de pánico
 */

const STORAGE_KEYS = {
    PRIMARY_CONTACT: '@sos_primary_contact',
    SOS_MESSAGE_TEMPLATE: '@sos_message_template',
    INCLUDE_LOCATION: '@sos_include_location',
};

class SOSMessageService {
    /**
     * Solicita permisos de ubicación al usuario
     */
    static async requestLocationPermission() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    }

    /**
     * Obtiene la ubicación actual del usuario
     */
    static async getCurrentLocation() {
        try {
            const hasPermission = await this.requestLocationPermission();

            if (!hasPermission) {
                return null;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                timeout: 10000,
            });

            const { latitude, longitude } = location.coords;

            return {
                latitude,
                longitude,
                googleMapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
                coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            };
        } catch (error) {
            console.error('Error getting current location:', error);
            return null;
        }
    }

    /**
     * Guarda el contacto principal de emergencia
     */
    static async savePrimaryContact(contact) {
        try {
            const contactData = JSON.stringify(contact);
            await AsyncStorage.setItem(STORAGE_KEYS.PRIMARY_CONTACT, contactData);
            return true;
        } catch (error) {
            console.error('Error saving primary contact:', error);
            return false;
        }
    }

    /**
     * Obtiene el contacto principal de emergencia
     */
    static async getPrimaryContact() {
        try {
            const contactData = await AsyncStorage.getItem(STORAGE_KEYS.PRIMARY_CONTACT);
            return contactData ? JSON.parse(contactData) : null;
        } catch (error) {
            console.error('Error getting primary contact:', error);
            return null;
        }
    }

    /**
     * Guarda la plantilla de mensaje SOS
     */
    static async saveMessageTemplate(template) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.SOS_MESSAGE_TEMPLATE, template);
            return true;
        } catch (error) {
            console.error('Error saving message template:', error);
            return false;
        }
    }

    /**
     * Obtiene la plantilla de mensaje SOS
     */
    static async getMessageTemplate() {
        try {
            const template = await AsyncStorage.getItem(STORAGE_KEYS.SOS_MESSAGE_TEMPLATE);
            return template || '🆘 Necesito ayuda urgente. Por favor llámame.';
        } catch (error) {
            console.error('Error getting message template:', error);
            return '🆘 Necesito ayuda urgente. Por favor llámame.';
        }
    }

    /**
     * Configura si se debe incluir ubicación en mensajes SOS
     */
    static async setIncludeLocation(include) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.INCLUDE_LOCATION, JSON.stringify(include));
            return true;
        } catch (error) {
            console.error('Error setting include location:', error);
            return false;
        }
    }

    /**
     * Verifica si se debe incluir ubicación
     */
    static async shouldIncludeLocation() {
        try {
            const include = await AsyncStorage.getItem(STORAGE_KEYS.INCLUDE_LOCATION);
            return include ? JSON.parse(include) : true;
        } catch (error) {
            console.error('Error checking include location:', error);
            return true;
        }
    }

    /**
     * Construye el mensaje SOS completo
     */
    static async buildSOSMessage() {
        try {
            const template = await this.getMessageTemplate();
            const includeLocation = await this.shouldIncludeLocation();

            let message = template;

            if (includeLocation) {
                const location = await this.getCurrentLocation();

                if (location) {
                    message += `\n\n📍 Mi ubicación: ${location.googleMapsUrl}`;
                } else {
                    message += '\n\n⚠️ No se pudo obtener la ubicación';
                }
            }

            const timestamp = new Date().toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

            message += `\n\n⏰ Hora: ${timestamp}`;

            return message;
        } catch (error) {
            console.error('Error building SOS message:', error);
            return '🆘 Necesito ayuda urgente. Por favor llámame.';
        }
    }

    /**
     * Envía mensaje SOS vía WhatsApp
     */
    static async sendViaWhatsApp(phoneNumber = null) {
        try {
            let targetNumber = phoneNumber;

            // Si no se proporciona número, usar el contacto principal
            if (!targetNumber) {
                const primaryContact = await this.getPrimaryContact();
                if (!primaryContact || !primaryContact.phone) {
                    throw new Error('No se ha configurado un contacto de emergencia');
                }
                targetNumber = primaryContact.phone;
            }

            // Limpiar el número (eliminar espacios, guiones, etc.)
            const cleanNumber = targetNumber.replace(/[^\d+]/g, '');

            const message = await this.buildSOSMessage();
            const encodedMessage = encodeURIComponent(message);

            // URL de WhatsApp
            const whatsappUrl = `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;

            // Verificar si WhatsApp está instalado
            const canOpen = await Linking.canOpenURL(whatsappUrl);

            if (canOpen) {
                await Linking.openURL(whatsappUrl);
                return { success: true, method: 'whatsapp' };
            } else {
                // Si WhatsApp no está disponible, intentar con SMS
                return await this.sendViaSMS(targetNumber);
            }
        } catch (error) {
            console.error('Error sending SOS via WhatsApp:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Envía mensaje SOS vía SMS nativo
     */
    static async sendViaSMS(phoneNumber = null) {
        try {
            let targetNumber = phoneNumber;

            if (!targetNumber) {
                const primaryContact = await this.getPrimaryContact();
                if (!primaryContact || !primaryContact.phone) {
                    throw new Error('No se ha configurado un contacto de emergencia');
                }
                targetNumber = primaryContact.phone;
            }

            const message = await this.buildSOSMessage();
            const encodedMessage = encodeURIComponent(message);

            // URL de SMS (funciona en iOS y Android)
            const smsUrl = `sms:${targetNumber}?body=${encodedMessage}`;

            const canOpen = await Linking.canOpenURL(smsUrl);

            if (canOpen) {
                await Linking.openURL(smsUrl);
                return { success: true, method: 'sms' };
            } else {
                throw new Error('No se puede enviar SMS desde este dispositivo');
            }
        } catch (error) {
            console.error('Error sending SOS via SMS:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Realiza llamada telefónica directa
     */
    static async makeEmergencyCall(phoneNumber = null) {
        try {
            let targetNumber = phoneNumber;

            if (!targetNumber) {
                const primaryContact = await this.getPrimaryContact();
                if (!primaryContact || !primaryContact.phone) {
                    throw new Error('No se ha configurado un contacto de emergencia');
                }
                targetNumber = primaryContact.phone;
            }

            const telUrl = `tel:${targetNumber}`;
            const canOpen = await Linking.canOpenURL(telUrl);

            if (canOpen) {
                await Linking.openURL(telUrl);
                return { success: true, method: 'call' };
            } else {
                throw new Error('No se puede realizar llamadas desde este dispositivo');
            }
        } catch (error) {
            console.error('Error making emergency call:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Envía SOS con método automático (intenta WhatsApp, luego SMS)
     */
    static async sendSOSAuto(phoneNumber = null) {
        try {
            // Intentar primero con WhatsApp
            const whatsappResult = await this.sendViaWhatsApp(phoneNumber);

            if (whatsappResult.success) {
                return whatsappResult;
            }

            // Si falla, intentar con SMS
            const smsResult = await this.sendViaSMS(phoneNumber);
            return smsResult;
        } catch (error) {
            console.error('Error sending auto SOS:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Validación de contacto de emergencia
     */
    static validateContact(contact) {
        if (!contact) {
            return { valid: false, error: 'El contacto es requerido' };
        }

        if (!contact.name || contact.name.trim() === '') {
            return { valid: false, error: 'El nombre es requerido' };
        }

        if (!contact.phone || contact.phone.trim() === '') {
            return { valid: false, error: 'El teléfono es requerido' };
        }

        // Validación básica de formato de teléfono
        const phoneRegex = /^[+]?[\d\s-()]+$/;
        if (!phoneRegex.test(contact.phone)) {
            return { valid: false, error: 'Formato de teléfono inválido' };
        }

        return { valid: true };
    }
}

export default SOSMessageService;

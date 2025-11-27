import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SOSMessageService from '../services/SOSMessageService';

export default function SOSScreen() {
    const router = useRouter();
    const [primaryContact, setPrimaryContact] = useState(null);
    const [messageTemplate, setMessageTemplate] = useState('');
    const [includeLocation, setIncludeLocation] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const contact = await SOSMessageService.getPrimaryContact();
        const template = await SOSMessageService.getMessageTemplate();
        const shouldInclude = await SOSMessageService.shouldIncludeLocation();

        setPrimaryContact(contact);
        setMessageTemplate(template);
        setIncludeLocation(shouldInclude);
    };

    const handleSendSOS = async (method) => {
        if (!primaryContact) {
            Alert.alert(
                'Contacto no configurado',
                'Por favor configura un contacto de emergencia primero',
                [{ text: 'OK' }]
            );
            return;
        }

        setIsSending(true);

        let result;
        switch (method) {
            case 'whatsapp':
                result = await SOSMessageService.sendViaWhatsApp();
                break;
            case 'sms':
                result = await SOSMessageService.sendViaSMS();
                break;
            case 'call':
                result = await SOSMessageService.makeEmergencyCall();
                break;
            default:
                result = await SOSMessageService.sendSOSAuto();
        }

        setIsSending(false);

        if (result.success) {
            router.back();
        } else {
            Alert.alert('Error', result.error || 'No se pudo enviar el mensaje');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#2a0a0a', '#000000']}
                style={StyleSheet.absoluteFillObject}
            />

            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>SOS Emergencia</Text>
                    <View style={{ width: 28 }} />
                </View>

                {/* Warning */}
                <View style={styles.warningCard}>
                    <Ionicons name="alert-circle" size={40} color="#ff3b30" />
                    <Text style={styles.warningTitle}>Modo de Emergencia</Text>
                    <Text style={styles.warningText}>
                        Se enviará un mensaje de ayuda a tu contacto configurado
                    </Text>
                </View>

                {/* Contact Info */}
                {primaryContact ? (
                    <View style={styles.contactCard}>
                        <View style={styles.contactHeader}>
                            <Ionicons name="person-circle" size={50} color="#4cd964" />
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>{primaryContact.name}</Text>
                                <Text style={styles.contactPhone}>{primaryContact.phone}</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.noContactCard}>
                        <Ionicons name="warning" size={40} color="#ff9500" />
                        <Text style={styles.noContactText}>
                            No hay contacto de emergencia configurado
                        </Text>
                        <TouchableOpacity style={styles.configureButton}>
                            <Text style={styles.configureButtonText}>Configurar ahora</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Message Preview */}
                <View style={styles.previewCard}>
                    <Text style={styles.previewLabel}>Vista previa del mensaje:</Text>
                    <Text style={styles.previewText}>{messageTemplate}</Text>
                    {includeLocation && (
                        <View style={styles.locationBadge}>
                            <Ionicons name="location" size={16} color="#4cd964" />
                            <Text style={styles.locationText}>Incluye ubicación GPS</Text>
                        </View>
                    )}
                </View>

                {/* Settings */}
                <View style={styles.settingCard}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Ionicons name="location-outline" size={24} color="#fff" />
                            <Text style={styles.settingLabel}>Incluir ubicación</Text>
                        </View>
                        <Switch
                            value={includeLocation}
                            onValueChange={async (value) => {
                                setIncludeLocation(value);
                                await SOSMessageService.setIncludeLocation(value);
                            }}
                            trackColor={{ false: '#2a2a2a', true: '#4cd964' }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSendSOS('whatsapp')}
                        disabled={isSending || !primaryContact}
                    >
                        <LinearGradient
                            colors={['#25D366', '#1DA851']}
                            style={styles.actionButtonGradient}
                        >
                            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                            <Text style={styles.actionButtonText}>WhatsApp</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSendSOS('sms')}
                        disabled={isSending || !primaryContact}
                    >
                        <LinearGradient
                            colors={['#007AFF', '#0051D5']}
                            style={styles.actionButtonGradient}
                        >
                            <Ionicons name="chatbubble" size={24} color="#fff" />
                            <Text style={styles.actionButtonText}>SMS</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSendSOS('call')}
                        disabled={isSending || !primaryContact}
                    >
                        <LinearGradient
                            colors={['#ff3b30', '#cc2e26']}
                            style={styles.actionButtonGradient}
                        >
                            <Ionicons name="call" size={24} color="#fff" />
                            <Text style={styles.actionButtonText}>Llamar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    warningCard: {
        backgroundColor: '#1a0a0a',
        borderRadius: 16,
        padding: 24,
        margin: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff3b30',
    },
    warningTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginTop: 12,
    },
    warningText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
    },
    contactCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    contactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactInfo: {
        marginLeft: 16,
        flex: 1,
    },
    contactName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    contactPhone: {
        fontSize: 16,
        color: '#999',
        marginTop: 4,
    },
    noContactCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 24,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff9500',
    },
    noContactText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 12,
    },
    configureButton: {
        marginTop: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff9500',
        borderRadius: 8,
    },
    configureButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    previewCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    previewLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    previewText: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#0a3d1f',
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    locationText: {
        color: '#4cd964',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    settingCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 6,
        borderRadius: 12,
        overflow: 'hidden',
    },
    actionButtonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 6,
    },
});

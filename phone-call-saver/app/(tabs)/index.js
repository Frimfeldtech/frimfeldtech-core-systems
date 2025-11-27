import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallStore } from '../../store/callStore';

export default function HomeScreen() {
    const router = useRouter();
    const { callerName, delayMinutes, setDelayMinutes, scheduleCall } = useCallStore();
    const [selectedDelay, setSelectedDelay] = useState(1);

    const delayOptions = [
        { label: '30 seg', value: 0.5 },
        { label: '1 min', value: 1 },
        { label: '3 min', value: 3 },
        { label: '5 min', value: 5 },
        { label: '10 min', value: 10 },
    ];

    const handleScheduleCall = () => {
        setDelayMinutes(selectedDelay);

        const timerId = setTimeout(() => {
            router.push('/fake-call');
        }, selectedDelay * 60 * 1000);

        scheduleCall(timerId);

        Alert.alert(
            '✅ Llamada programada',
            `Recibirás una llamada de "${callerName}" en ${selectedDelay} minuto(s)`,
            [{ text: 'OK' }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={StyleSheet.absoluteFillObject}
            />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Phone Call Saver</Text>
                    <Text style={styles.subtitle}>Tu escape discreto siempre disponible</Text>
                </View>

                {/* Fake Call Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="call" size={24} color="#4cd964" />
                        <Text style={styles.sectionTitle}>Llamada Falsa</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Llamante configurado:</Text>
                        <Text style={styles.cardValue}>{callerName}</Text>

                        <TouchableOpacity
                            style={styles.configButton}
                            onPress={() => Alert.alert('Próximamente', 'Configuración de llamante')}
                        >
                            <Ionicons name="settings-outline" size={18} color="#4cd964" />
                            <Text style={styles.configButtonText}>Personalizar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Delay Selection */}
                    <Text style={styles.delayLabel}>¿Cuándo debe llamarte?</Text>
                    <View style={styles.delayOptions}>
                        {delayOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.delayButton,
                                    selectedDelay === option.value && styles.delayButtonActive,
                                ]}
                                onPress={() => setSelectedDelay(option.value)}
                            >
                                <Text
                                    style={[
                                        styles.delayButtonText,
                                        selectedDelay === option.value && styles.delayButtonTextActive,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Schedule Button */}
                    <TouchableOpacity
                        style={styles.scheduleButton}
                        onPress={handleScheduleCall}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#4cd964', '#2fb34d']}
                            style={styles.scheduleButtonGradient}
                        >
                            <Ionicons name="call" size={24} color="#fff" />
                            <Text style={styles.scheduleButtonText}>Programar Llamada</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* SOS Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="alert-circle" size={24} color="#ff3b30" />
                        <Text style={styles.sectionTitle}>SOS Rápido</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.sosButton}
                        onPress={() => router.push('/sos')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#ff3b30', '#cc2e26']}
                            style={styles.sosButtonGradient}
                        >
                            <Ionicons name="flash" size={28} color="#fff" />
                            <Text style={styles.sosButtonText}>Enviar Mensaje SOS</Text>
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
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#999',
        fontWeight: '400',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    cardLabel: {
        fontSize: 14,
        color: '#999',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 16,
    },
    configButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#0a0a0a',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4cd964',
    },
    configButtonText: {
        color: '#4cd964',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    delayLabel: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        marginBottom: 12,
    },
    delayOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    delayButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#2a2a2a',
    },
    delayButtonActive: {
        backgroundColor: '#0a3d1f',
        borderColor: '#4cd964',
    },
    delayButtonText: {
        color: '#999',
        fontSize: 14,
        fontWeight: '600',
    },
    delayButtonTextActive: {
        color: '#4cd964',
    },
    scheduleButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#4cd964',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    scheduleButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    scheduleButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    sosButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#ff3b30',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    sosButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    sosButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});

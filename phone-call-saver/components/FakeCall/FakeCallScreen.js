import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Vibration,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCallStore } from '../../store/callStore';

/**
 * FakeCallScreen - Simula una pantalla de llamada entrante nativa
 * Versión simplificada para demo
 */
export default function FakeCallScreen() {
    const router = useRouter();
    const { callerName, callerPhoto } = useCallStore();

    const [isRinging, setIsRinging] = useState(true);
    const [isInCall, setIsInCall] = useState(false);
    const [callDuration, setCallDuration] = useState(0);

    // Contador de duración de llamada
    useEffect(() => {
        let interval;
        if (isInCall) {
            interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isInCall]);

    const handleAcceptCall = () => {
        setIsRinging(false);
        setIsInCall(true);
        Vibration.cancel();
    };

    const handleDeclineCall = () => {
        Vibration.cancel();
        router.back();
    };

    const handleEndCall = () => {
        router.back();
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            {/* Header - Estado de la llamada */}
            <View style={styles.header}>
                <Text style={styles.statusText}>
                    {isRinging ? 'Llamada entrante...' : 'Llamada en curso'}
                </Text>
                {isInCall && (
                    <Text style={styles.durationText}>{formatDuration(callDuration)}</Text>
                )}
            </View>

            {/* Información del llamante */}
            <View style={styles.callerInfo}>
                {/* Avatar del llamante */}
                <View style={styles.avatarContainer}>
                    {callerPhoto ? (
                        <Image source={{ uri: callerPhoto }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, styles.defaultAvatar]}>
                            <Ionicons name="person" size={80} color="#666" />
                        </View>
                    )}
                </View>

                {/* Nombre y número */}
                <Text style={styles.callerName}>{callerName || 'Mamá'}</Text>
                <Text style={styles.callerNumber}>Móvil</Text>
            </View>

            {/* Controles de llamada */}
            <View style={styles.controls}>
                {isRinging ? (
                    // Botones de aceptar/rechazar
                    <View style={styles.ringControls}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.declineButton]}
                            onPress={handleDeclineCall}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="close" size={32} color="#fff" />
                            <Text style={styles.actionLabel}>Rechazar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.acceptButton]}
                            onPress={handleAcceptCall}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="call" size={32} color="#fff" />
                            <Text style={styles.actionLabel}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Botón de finalizar llamada
                    <TouchableOpacity
                        style={styles.endCallButton}
                        onPress={handleEndCall}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="call" size={28} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
    statusText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    durationText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginTop: 8,
    },
    callerInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 30,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: '#333',
    },
    defaultAvatar: {
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callerName: {
        fontSize: 36,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    callerNumber: {
        fontSize: 18,
        color: '#999',
        fontWeight: '400',
    },
    controls: {
        paddingBottom: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
    },
    ringControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        borderRadius: 37.5,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    declineButton: {
        backgroundColor: '#ff3b30',
    },
    acceptButton: {
        backgroundColor: '#4cd964',
    },
    actionLabel: {
        color: '#fff',
        fontSize: 12,
        marginTop: 8,
        fontWeight: '500',
    },
    endCallButton: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        backgroundColor: '#ff3b30',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '135deg' }],
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        alignSelf: 'center',
    },
});

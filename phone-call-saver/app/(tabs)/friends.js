import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function FriendsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.header}>
                <Text style={styles.title}>Saver Friends</Text>
                <TouchableOpacity>
                    <Ionicons name="person-add" size={24} color="#4cd964" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Rescue Button */}
                <TouchableOpacity style={styles.rescueButton}>
                    <LinearGradient
                        colors={['#ff3b30', '#cc2e26']}
                        style={styles.rescueButtonGradient}
                    >
                        <Ionicons name="alert-circle" size={32} color="#fff" />
                        <Text style={styles.rescueButtonText}>NECESITO RESCATE</Text>
                        <Text style={styles.rescueButtonSubtext}>
                            Tus amigos recibirán una alerta
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Empty State */}
                <View style={styles.emptyState}>
                    <Ionicons name="people-outline" size={80} color="#333" />
                    <Text style={styles.emptyStateTitle}>No tienes Saver Friends</Text>
                    <Text style={styles.emptyStateText}>
                        Agrega amigos para que puedan ayudarte en situaciones de emergencia
                    </Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Agregar Amigos</Text>
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
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
    },
    content: {
        padding: 20,
    },
    rescueButton: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 30,
    },
    rescueButtonGradient: {
        padding: 24,
        alignItems: 'center',
    },
    rescueButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 12,
    },
    rescueButtonSubtext: {
        color: '#fff',
        fontSize: 14,
        marginTop: 8,
        opacity: 0.8,
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginTop: 20,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 20,
        paddingHorizontal: 40,
    },
    addButton: {
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: '#4cd964',
        borderRadius: 12,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

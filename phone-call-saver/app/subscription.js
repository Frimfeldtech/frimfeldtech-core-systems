import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SubscriptionScreen() {
    const router = useRouter();

    const plans = [
        {
            id: 'annual',
            name: 'Plan Anual',
            price: '$9.99',
            period: '/año',
            features: [
                'Llamadas falsas ilimitadas',
                'Audios premium personalizados',
                'Saver Friends ilimitados',
                'Mensajes SOS sin límite',
                'Soporte prioritario',
            ],
            popular: true,
        },
        {
            id: 'lifetime',
            name: 'Plan Lifetime',
            price: '$29.99',
            period: 'pago único',
            features: [
                'Todo del Plan Anual',
                'Acceso de por vida',
                'Futuras funciones incluidas',
                'Sin renovaciones',
                'Máximo ahorro',
            ],
            popular: false,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Planes Premium</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>Desbloquea todo el potencial</Text>

                {plans.map((plan) => (
                    <View key={plan.id} style={styles.planCard}>
                        {plan.popular && (
                            <View style={styles.popularBadge}>
                                <Text style={styles.popularText}>MÁS POPULAR</Text>
                            </View>
                        )}
                        <Text style={styles.planName}>{plan.name}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{plan.price}</Text>
                            <Text style={styles.period}>{plan.period}</Text>
                        </View>
                        <View style={styles.features}>
                            {plan.features.map((feature, index) => (
                                <View key={index} style={styles.feature}>
                                    <Ionicons name="checkmark-circle" size={20} color="#4cd964" />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.subscribeButton}>
                            <LinearGradient
                                colors={plan.popular ? ['#4cd964', '#2fb34d'] : ['#666', '#444']}
                                style={styles.subscribeButtonGradient}
                            >
                                <Text style={styles.subscribeButtonText}>Suscribirme</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.disclaimer}>
                    Los pagos se procesarán de forma segura. Puedes cancelar en cualquier momento.
                </Text>
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
    content: {
        padding: 20,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    planCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#2a2a2a',
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: 20,
        backgroundColor: '#4cd964',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    popularText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    planName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    price: {
        fontSize: 36,
        fontWeight: '700',
        color: '#4cd964',
    },
    period: {
        fontSize: 16,
        color: '#999',
        marginLeft: 8,
    },
    features: {
        marginBottom: 20,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 12,
    },
    subscribeButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    subscribeButtonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    subscribeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    disclaimer: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 18,
    },
});

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, userData, logout } = useAuthStore();

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro que deseas salir?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Salir',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    const settingsSections = [
        {
            title: 'Cuenta',
            items: [
                { icon: 'person-outline', label: 'Editar Perfil', route: null },
                { icon: 'settings-outline', label: 'Preferencias', route: null },
                { icon: 'notifications-outline', label: 'Notificaciones', route: null },
            ],
        },
        {
            title: 'Suscripción',
            items: [
                { icon: 'diamond-outline', label: 'Planes Premium', route: '/subscription' },
                { icon: 'receipt-outline', label: 'Historial de Pagos', route: null },
            ],
        },
        {
            title: 'Seguridad',
            items: [
                { icon: 'shield-checkmark-outline', label: 'Privacidad', route: null },
                { icon: 'lock-closed-outline', label: 'Cambiar Contraseña', route: null },
            ],
        },
        {
            title: 'Soporte',
            items: [
                { icon: 'help-circle-outline', label: 'Ayuda', route: null },
                { icon: 'document-text-outline', label: 'Términos y Condiciones', route: null },
                { icon: 'information-circle-outline', label: 'Acerca de', route: null },
            ],
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1a1a1a', '#000000']}
                style={StyleSheet.absoluteFillObject}
            />

            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Perfil</Text>
                </View>

                {/* User Info */}
                <View style={styles.userCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={40} color="#666" />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userData?.displayName || user?.email}</Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>
                    <View style={styles.subscriptionBadge}>
                        <Text style={styles.subscriptionText}>
                            {userData?.subscriptionPlan?.toUpperCase() || 'FREE'}
                        </Text>
                    </View>
                </View>

                {/* Settings Sections */}
                {settingsSections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionCard}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={itemIndex}
                                    style={[
                                        styles.settingItem,
                                        itemIndex !== section.items.length - 1 && styles.settingItemBorder,
                                    ]}
                                    onPress={() => {
                                        if (item.route) {
                                            router.push(item.route);
                                        } else {
                                            Alert.alert('Próximamente', 'Esta función estará disponible pronto');
                                        }
                                    }}
                                >
                                    <View style={styles.settingLeft}>
                                        <Ionicons name={item.icon} size={22} color="#fff" />
                                        <Text style={styles.settingLabel}>{item.label}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#666" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Versión 1.0.0</Text>
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
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfo: {
        flex: 1,
        marginLeft: 16,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    userEmail: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
    subscriptionBadge: {
        backgroundColor: '#4cd964',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    subscriptionText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginLeft: 20,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sectionCard: {
        backgroundColor: '#1a1a1a',
        marginHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    settingItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 12,
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a0a0a',
        marginHorizontal: 20,
        marginTop: 10,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ff3b30',
    },
    logoutText: {
        color: '#ff3b30',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    version: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 24,
        marginBottom: 40,
    },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ListRenderItem } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

interface HistoryItem {
    id: string;
    cuil: string;
    timestamp: string;
    firstName: string;
    lastName: string;
    status: {
        color: 'GREEN' | 'YELLOW' | 'RED';
        message: string;
    };
}

export default function HistoryScreen() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const loadHistory = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@query_history');
            if (jsonValue != null) {
                setHistory(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error("Error loading history", e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadHistory();
        }, [])
    );

    const clearHistory = async () => {
        try {
            await AsyncStorage.removeItem('@query_history');
            setHistory([]);
        } catch (e) {
            console.error("Error clearing history", e);
        }
    };

    const renderItem: ListRenderItem<HistoryItem> = ({ item }) => (
        <View style={styles.historyItem}>
            <View style={styles.iconContainer}>
                {item.status.color === 'GREEN' ? (
                    <Ionicons name="checkmark-circle" size={32} color="#22c55e" />
                ) : item.status.color === 'YELLOW' ? (
                    <Ionicons name="alert-circle" size={32} color="#eab308" />
                ) : (
                    <Ionicons name="close-circle" size={32} color="#ef4444" />
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.cuilText}>{item.cuil}</Text>
                <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleString()}</Text>
                <Text style={styles.nameText}>{item.firstName} {item.lastName}</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={[styles.statusText,
                item.status.color === 'GREEN' ? styles.textGreen :
                    item.status.color === 'YELLOW' ? styles.textYellow : styles.textRed
                ]}>
                    {item.status.color === 'GREEN' ? 'APTO' :
                        item.status.color === 'YELLOW' ? 'ALERTA' : 'NO'}
                </Text>
            </View>
        </View>
    );

    return (
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Historial</Text>
                <TouchableOpacity onPress={clearHistory}>
                    <Ionicons name="trash-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
            </View>

            {history.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="time-outline" size={64} color="#334155" />
                    <Text style={styles.emptyText}>No hay consultas recientes</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id || Math.random().toString()}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    historyItem: {
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconContainer: {
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    cuilText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateText: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 2,
    },
    nameText: {
        color: '#cbd5e1',
        fontSize: 14,
        marginTop: 4,
    },
    statusContainer: {
        alignItems: 'flex-end',
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    textGreen: { color: '#22c55e' },
    textYellow: { color: '#eab308' },
    textRed: { color: '#ef4444' },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#64748b',
        marginTop: 16,
        fontSize: 16,
    },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

interface TrafficLightProps {
  status: 'GREEN' | 'YELLOW' | 'RED';
}

interface ResultData {
  firstName: string;
  lastName: string;
  osName: string;
  monthsSinceTransfer: number;
  hasContributions: boolean;
  status: {
    color: 'GREEN' | 'YELLOW' | 'RED';
    message: string;
  };
}

const TrafficLight: React.FC<TrafficLightProps> = ({ status }) => {
  return (
    <View style={styles.trafficContainer}>
      <View style={[styles.lightBase, status === 'RED' && styles.redActive]}>
        {status === 'RED' && <Ionicons name="close" size={24} color="#fff" />}
      </View>
      <View style={[styles.lightBase, status === 'YELLOW' && styles.yellowActive]}>
        {status === 'YELLOW' && <Ionicons name="alert" size={24} color="#fff" />}
      </View>
      <View style={[styles.lightBase, status === 'GREEN' && styles.greenActive]}>
        {status === 'GREEN' && <Ionicons name="checkmark" size={24} color="#fff" />}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [cuil, setCuil] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const saveToHistory = async (data: ResultData & { cuil: string }) => {
    try {
      const historyJson = await AsyncStorage.getItem('@query_history');
      let history = historyJson ? JSON.parse(historyJson) : [];

      const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...data
      };

      // Keep only last 50
      history = [newEntry, ...history].slice(0, 50);

      await AsyncStorage.setItem('@query_history', JSON.stringify(history));
    } catch (e) {
      console.error("Error saving history", e);
    }
  };

  const handleCheck = async () => {
    if (!cuil || cuil.length < 11) {
      Alert.alert('Error', 'Ingrese un CUIL válido (11 dígitos)');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      // Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator
      const apiUrl = 'http://10.0.2.2:3001/api/check';
      const response = await axios.post(apiUrl, { cuil });
      setResult(response.data);
      saveToHistory({ cuil, ...response.data });
    } catch (error) {
      console.error(error);
      Alert.alert('Error de Conexión', 'Verifique que el servidor backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    if (!permission) {
      // Camera permissions are still loading
      return;
    }
    if (!permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara para escanear DNI.");
        return;
      }
    }
    setIsCameraVisible(true);
  };

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setIsCameraVisible(false);
    // Simple logic to extract CUIL if it's a PDF417 or QR (Mocked for now as just setting the raw data or finding a number)
    // In a real app, we would parse the PDF417 string from the DNI
    // For this demo, if it scans anything, we'll just put a dummy CUIL or the scanned text if it looks like a number
    if (data.length >= 11) {
      // Try to find an 11 digit number
      const match = data.match(/\d{11}/);
      if (match) {
        setCuil(match[0]);
        Alert.alert("Escaneo Exitoso", `CUIL detectado: ${match[0]}`);
      } else {
        // Fallback for demo
        setCuil("20123456788");
        Alert.alert("Escaneo Simulado", "Se detectó un código. Usando CUIL de prueba.");
      }
    }
  };

  const clearResult = () => {
    setResult(null);
    setCuil('');
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="medical" size={32} color="#3b82f6" />
          </View>
          <Text style={styles.title}>SaludCheck</Text>
          <Text style={styles.subtitle}>Agente de Ventas</Text>
        </View>

        {!result ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nueva Consulta</Text>

            <TouchableOpacity style={styles.scanButton} onPress={openCamera}>
              <Ionicons name="camera" size={24} color="#fff" />
              <Text style={styles.scanButtonText}>ESCANEAR DNI</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>- O ingresa manual -</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="20123456789"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                value={cuil}
                onChangeText={setCuil}
                maxLength={11}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleCheck}
              disabled={loading}
            >
              <LinearGradient
                colors={['#3b82f6', '#2563eb']}
                style={styles.gradientButton}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>ANALIZAR AHORA</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <View style={[styles.resultHeader,
            result.status.color === 'GREEN' ? styles.bgGreen :
              result.status.color === 'YELLOW' ? styles.bgYellow : styles.bgRed
            ]}>
              <TrafficLight status={result.status.color} />
              <Text style={styles.statusTitle}>
                {result.status.color === 'GREEN' ? 'APTO TRASPASO' :
                  result.status.color === 'YELLOW' ? 'ALERTA' : 'NO APTO'}
              </Text>
              <Text style={styles.statusMessage}>{result.status.message}</Text>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nombre</Text>
                <Text style={styles.detailValue}>{result.firstName} {result.lastName}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Obra Social</Text>
                <Text style={styles.detailValue}>{result.osName}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Antigüedad</Text>
                <Text style={styles.detailValue}>{result.monthsSinceTransfer} Meses</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Aportes</Text>
                <Text style={[styles.detailValue, result.hasContributions ? styles.textGreen : styles.textRed]}>
                  {result.hasContributions ? 'Al Día' : 'Irregulares'}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.secondaryButton} onPress={clearResult}>
              <Text style={styles.secondaryButtonText}>Nueva Consulta</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal visible={isCameraVisible} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.scanText}>Encuadre el código de barras del DNI</Text>
              <TouchableOpacity style={styles.closeCameraButton} onPress={() => setIsCameraVisible(false)}>
                <Ionicons name="close-circle" size={48} color="#fff" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 60, alignItems: 'center', minHeight: '100%' },
  header: { alignItems: 'center', marginBottom: 30 },
  iconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(59, 130, 246, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.3)' },
  title: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 4 },
  card: { width: '100%', backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  scanButton: { backgroundColor: '#334155', padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 16, borderWidth: 1, borderColor: '#475569' },
  scanButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  orText: { color: '#64748b', textAlign: 'center', marginBottom: 16, fontSize: 12 },
  label: { color: '#cbd5e1', marginBottom: 8, fontSize: 14, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f172a', borderRadius: 12, borderWidth: 1, borderColor: '#334155', marginBottom: 24 },
  inputIcon: { paddingLeft: 16 },
  input: { flex: 1, color: '#fff', padding: 16, fontSize: 18 },
  button: { borderRadius: 12, overflow: 'hidden', shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  gradientButton: { padding: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  // Results
  resultContainer: { width: '100%', alignItems: 'center' },
  resultHeader: { width: '100%', padding: 24, borderRadius: 24, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  bgGreen: { backgroundColor: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.3)' },
  bgYellow: { backgroundColor: 'rgba(234, 179, 8, 0.15)', borderColor: 'rgba(234, 179, 8, 0.3)' },
  bgRed: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)' },
  statusTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 16, marginBottom: 4 },
  statusMessage: { color: '#cbd5e1', textAlign: 'center', fontSize: 14 },
  trafficContainer: { flexDirection: 'row', gap: 12 },
  lightBase: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  redActive: { backgroundColor: '#ef4444', shadowColor: '#ef4444', shadowOpacity: 0.6, shadowRadius: 12, elevation: 8 },
  yellowActive: { backgroundColor: '#eab308', shadowColor: '#eab308', shadowOpacity: 0.6, shadowRadius: 12, elevation: 8 },
  greenActive: { backgroundColor: '#22c55e', shadowColor: '#22c55e', shadowOpacity: 0.6, shadowRadius: 12, elevation: 8 },
  detailsCard: { width: '100%', backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 24 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  separator: { height: 1, backgroundColor: '#334155' },
  detailLabel: { color: '#94a3b8', fontSize: 14 },
  detailValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  textGreen: { color: '#4ade80' },
  textRed: { color: '#f87171' },
  secondaryButton: { padding: 16 },
  secondaryButtonText: { color: '#64748b', fontSize: 16, fontWeight: '600' },

  // Camera
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  cameraOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  scanFrame: { width: 280, height: 180, borderWidth: 2, borderColor: '#3b82f6', backgroundColor: 'transparent', borderRadius: 16 },
  scanText: { color: '#fff', marginTop: 20, fontSize: 16, fontWeight: '600' },
  closeCameraButton: { position: 'absolute', bottom: 50 },
});

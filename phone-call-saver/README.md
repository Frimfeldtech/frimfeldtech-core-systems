# Phone Call Saver - React Native App

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.73-61dafb.svg)
![Expo](https://img.shields.io/badge/Expo-~50.0-000020.svg)
![Firebase](https://img.shields.io/badge/Firebase-19.0-orange.svg)

**Phone Call Saver** es una aplicación móvil de seguridad personal que permite a los usuarios salir discretamente de situaciones incómodas o peligrosas mediante llamadas falsas realistas y mensajes SOS.

---

## 🎯 Características Principales

### 📞 Fake Call (Llamada Falsa)
- Simulación ultra-realista de llamada entrante (iOS/Android)
- Temporizador configurable (30 seg - 10 min)
- Audio de conversación pregrabado
- Personalización de nombre y foto del llamante
- Vibración y ringtones nativos

### 🆘 SOS Message
- Botón de pánico discreto
- Envío automático vía WhatsApp o SMS
- Inclusión de ubicación GPS en tiempo real
- Mensajes predefinidos personalizables
- Gestión de contacto de emergencia

### 👥 Saver Friends (Red Social)
- Sistema de amigos con privacidad estricta
- Notificaciones push de rescate
- Alertas de emergencia entre amigos
- Solicitudes de amistad

### ⚙️ Configuración
- Selector de género (afecta UI y audios)
- Gestión de suscripciones (Free, Anual, Lifetime)
- Integración con RevenueCat
- Tema oscuro para discreción

---

## 🛠️ Stack Tecnológico

- **Frontend:** React Native con Expo Router
- **Backend:** Firebase (Authentication & Firestore)
- **State Management:** Zustand
- **Payments:** RevenueCat
- **Push Notifications:** Expo Notifications + Firebase Cloud Messaging
- **Location:** Expo Location
- **Audio:** Expo AV

---

## 📁 Estructura del Proyecto

```
phone-call-saver/
├── app/                     # Expo Router pages
│   ├── (auth)/             # Login/Register
│   ├── (tabs)/             # Main navigation
│   ├── fake-call.js        # Fake call screen
│   └── sos.js              # SOS screen
├── components/             # UI components
│   ├── FakeCall/
│   ├── SOS/
│   └── Friends/
├── services/               # Business logic
│   ├── firebase/
│   ├── SOSMessageService.js
│   ├── FakeCallService.js
│   └── NotificationService.js
├── store/                  # Zustand stores
│   ├── authStore.js
│   ├── callStore.js
│   └── friendsStore.js
└── assets/                 # Static files
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Cuenta de Firebase
- Cuenta de RevenueCat (para suscripciones)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/phone-call-saver.git
cd phone-call-saver
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**

- Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
- Habilita Authentication (Email/Password)
- Crea una base de datos Firestore
- Descarga `google-services.json` (Android) y `GoogleService-Info.plist` (iOS)
- Actualiza `services/firebase/config.js` con tus credenciales

4. **Configurar Firestore**

Importa las reglas de seguridad desde `FIREBASE_SCHEMA.md`:

```bash
firebase deploy --only firestore:rules
```

Crea los índices compuestos necesarios:
- `friends`: (`userId1`, `status`)
- `friends`: (`userId2`, `status`)
- `rescue_alerts`: (`sentToFriends`, `status`, `createdAt`)

5. **Configurar RevenueCat**

- Crea un proyecto en [RevenueCat](https://www.revenuecat.com/)
- Configura productos (Annual Plan, Lifetime)
- Actualiza el API Key en tu código

6. **Variables de entorno**

Crea un archivo `.env`:
```env
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
REVENUECAT_API_KEY=tu_revenuecat_key
```

---

## 🏃‍♂️ Ejecutar la App

### Modo desarrollo

```bash
# Iniciar Expo
npm start

# Android
npm run android

# iOS
npm run ios
```

### Build de producción

```bash
# Android (APK)
expo build:android

# iOS (IPA)
expo build:ios
```

---

## 📱 Configuración de Permisos

### Android (`app.json`)
```json
"permissions": [
  "ACCESS_FINE_LOCATION",
  "ACCESS_COARSE_LOCATION",
  "RECORD_AUDIO",
  "POST_NOTIFICATIONS"
]
```

### iOS (`app.json`)
```json
"infoPlist": {
  "NSLocationWhenInUseUsageDescription": "Necesitamos tu ubicación para mensajes SOS",
  "NSMicrophoneUsageDescription": "Para grabar audios de llamadas falsas",
  "NSPhotoLibraryUsageDescription": "Para personalizar fotos de llamantes"
}
```

---

## 🔐 Seguridad y Privacidad

- ✅ Reglas de seguridad Firestore estrictas
- ✅ Autenticación Firebase obligatoria
- ✅ Cifrado de datos sensibles
- ✅ Privacidad por defecto (opt-in para compartir ubicación)
- ✅ Solo amigos aceptados ven alertas
- ✅ Tokens de dispositivo renovables

---

## 📊 Base de Datos (Firestore)

Ver esquema completo en [`FIREBASE_SCHEMA.md`](./FIREBASE_SCHEMA.md)

**Colecciones principales:**
- `users` - Perfiles de usuario
- `friends` - Relaciones de amistad
- `rescue_alerts` - Alertas de emergencia
- `audio_library` - Biblioteca de audios

---

## 🎨 UI/UX

- **Tema Oscuro:** Para uso discreto en público
- **Minimalista:** Interfaz limpia y rápida
- **Realista:** Llamadas falsas indistinguibles de reales
- **Accesible:** Botones grandes para uso en emergencias

---

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests E2E
npm run test:e2e
```

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---

## 👨‍💻 Autor

Desarrollado como proyecto de seguridad personal.

---

## 🆘 Soporte

Para soporte, contacta a: support@phonecallsaver.com

---

## ⚠️ Disclaimer

Esta aplicación está diseñada como herramienta de seguridad personal. No reemplaza servicios de emergencia oficiales. En caso de peligro real, contacta a las autoridades (911, 112, etc.).

---

## 🗺️ Roadmap

- [ ] Integración con Apple Watch
- [ ] Modo "Auto-Rescue" (detección de situaciones)
- [ ] Biblioteca de audios ampliada
- [ ] Compartir ubicación en tiempo real
- [ ] Modo incógnito avanzado
- [ ] Integración con wearables

---

**¡Tu seguridad es nuestra prioridad!** 🛡️

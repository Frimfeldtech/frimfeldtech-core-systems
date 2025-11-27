# Firebase Firestore Schema - Phone Call Saver

## Colecciones y Estructura de Datos

### 1. Colección: `users`
Almacena la información de perfil de cada usuario.

```javascript
users/{userId}
{
  // Información básica
  uid: string,                    // Firebase Auth UID
  email: string,                  // Email del usuario
  displayName: string,            // Nombre visible
  photoURL: string,               // URL de foto de perfil
  phoneNumber: string,            // Número de teléfono (opcional)
  
  // Configuración de perfil
  gender: string,                 // "male" | "female" | "other"
  language: string,               // "es" | "en" | etc.
  
  // Suscripción
  subscriptionPlan: string,       // "free" | "annual" | "lifetime"
  subscriptionStatus: string,     // "active" | "expired" | "trial"
  subscriptionExpiry: timestamp,  // Fecha de expiración
  revenueCatUserId: string,       // ID de RevenueCat
  
  // Configuración de privacidad
  privacy: {
    shareLocation: boolean,       // Compartir ubicación en SOS
    allowFriendRequests: boolean, // Permitir solicitudes de amistad
    showOnlineStatus: boolean,    // Mostrar estado online
  },
  
  // Configuración de llamadas falsas
  fakeCallSettings: {
    defaultCallerName: string,
    defaultCallerPhoto: string,
    defaultRingtone: string,
    defaultDelayMinutes: number,
    audioPresets: array,          // IDs de audios pregrabados
  },
  
  // Configuración SOS
  sosSettings: {
    primaryContact: {
      name: string,
      phone: string,
      relation: string,           // "friend" | "family" | "partner"
    },
    messageTemplate: string,
    includeLocation: boolean,
    autoSendMethod: string,       // "whatsapp" | "sms" | "auto"
  },
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  lastLoginAt: timestamp,
  deviceTokens: array,            // Tokens de notificaciones push
}
```

**Índices requeridos:**
- `email` (para búsqueda rápida)
- `subscriptionStatus` + `subscriptionExpiry` (para verificar suscripciones activas)

---

### 2. Colección: `friends`
Gestiona las relaciones de amistad entre usuarios (Saver Friends).

```javascript
friends/{friendshipId}
{
  // Usuarios involucrados
  userId1: string,                // UID del primer usuario (orden alfabético)
  userId2: string,                // UID del segundo usuario (orden alfabético)
  
  // Estado de la relación
  status: string,                 // "pending" | "accepted" | "blocked"
  initiatedBy: string,            // UID de quien envió la solicitud
  
  // Información adicional
  nickname1: string,              // Apodo que userId1 asignó a userId2
  nickname2: string,              // Apodo que userId2 asignó a userId1
  
  // Control de notificaciones
  notifications: {
    user1Enabled: boolean,        // userId1 recibe notificaciones de rescue
    user2Enabled: boolean,        // userId2 recibe notificaciones de rescue
  },
  
  // Metadata
  createdAt: timestamp,
  acceptedAt: timestamp,
  lastInteractionAt: timestamp,
}
```

**friendshipId:** Se genera combinando los UIDs en orden alfabético: `${uid1}_${uid2}`

**Índices requeridos:**
- `userId1` + `status`
- `userId2` + `status`
- Composite: `userId1` + `userId2` (para búsqueda rápida de relación)

---

### 3. Colección: `friend_requests`
Gestiona las solicitudes de amistad pendientes.

```javascript
friend_requests/{requestId}
{
  // Usuarios
  fromUserId: string,             // UID de quien envía la solicitud
  toUserId: string,               // UID del destinatario
  
  // Estado
  status: string,                 // "pending" | "accepted" | "rejected" | "cancelled"
  
  // Información contextual
  message: string,                // Mensaje opcional al enviar solicitud
  fromUserName: string,           // Nombre del remitente (desnormalizado)
  fromUserPhoto: string,          // Foto del remitente (desnormalizado)
  
  // Metadata
  createdAt: timestamp,
  respondedAt: timestamp,
}
```

**Índices requeridos:**
- `toUserId` + `status` (para obtener solicitudes pendientes)
- `fromUserId` + `status`

---

### 4. Colección: `rescue_alerts`
Registra las alertas de rescate enviadas entre amigos.

```javascript
rescue_alerts/{alertId}
{
  // Usuario que necesita ayuda
  userId: string,                 // UID del usuario en emergencia
  userName: string,               // Nombre (desnormalizado)
  userPhoto: string,              // Foto (desnormalizado)
  
  // Ubicación (si está disponible)
  location: {
    latitude: number,
    longitude: number,
    address: string,              // Dirección formateada (opcional)
    accuracy: number,             // Precisión en metros
    timestamp: timestamp,         // Cuando se obtuvo la ubicación
  },
  
  // Mensaje
  message: string,                // Mensaje predefinido o personalizado
  priority: string,               // "low" | "medium" | "high" | "critical"
  
  // Destinatarios
  sentToFriends: array,           // Array de UIDs que recibieron la alerta
  acknowledgedBy: array,          // UIDs de amigos que vieron/respondieron
  
  // Estado
  status: string,                 // "active" | "resolved" | "expired"
  resolvedAt: timestamp,
  resolvedBy: string,             // UID de quien marcó como resuelta
  
  // Metadata
  createdAt: timestamp,
  expiresAt: timestamp,           // Auto-expiración después de X horas
}
```

**Índices requeridos:**
- `userId` + `createdAt` (ordenado descendente)
- `sentToFriends` (array-contains) + `status` + `createdAt`
- `status` + `expiresAt` (para limpiar alertas expiradas)

---

### 5. Colección: `fake_call_history`
Opcional: Registra el historial de llamadas falsas (para análisis).

```javascript
fake_call_history/{callId}
{
  userId: string,
  callerName: string,
  duration: number,               // Segundos de duración
  wasAccepted: boolean,
  audioUsed: string,              // ID del audio usado
  createdAt: timestamp,
}
```

---

### 6. Colección: `audio_library`
Biblioteca de audios pregrabados para llamadas falsas.

```javascript
audio_library/{audioId}
{
  // Metadata del audio
  title: string,                  // "Jefe Molesto", "Mamá Preocupada"
  description: string,
  duration: number,               // Segundos
  
  // Archivo
  fileUrl: string,                // URL en Firebase Storage
  fileSize: number,               // Bytes
  
  // Categorización
  category: string,               // "work" | "family" | "emergency" | "casual"
  gender: string,                 // "male" | "female" | "neutral"
  language: string,               // "es" | "en"
  
  // Disponibilidad
  isPremium: boolean,             // Requiere suscripción
  isActive: boolean,
  
  // Metadata
  createdAt: timestamp,
  downloadCount: number,
}
```

---

## Reglas de Seguridad Firestore (Ejemplos)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users - Solo el usuario puede leer/escribir su propio documento
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Friends - Ambos usuarios pueden leer
    match /friends/{friendshipId} {
      allow read: if request.auth != null && 
        (resource.data.userId1 == request.auth.uid || 
         resource.data.userId2 == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.userId1 == request.auth.uid || 
         resource.data.userId2 == request.auth.uid);
    }
    
    // Friend Requests
    match /friend_requests/{requestId} {
      allow read: if request.auth != null && 
        (resource.data.fromUserId == request.auth.uid || 
         resource.data.toUserId == request.auth.uid);
      allow create: if request.auth != null && 
        request.resource.data.fromUserId == request.auth.uid;
      allow update: if request.auth != null && 
        resource.data.toUserId == request.auth.uid;
    }
    
    // Rescue Alerts - Solo amigos aceptados pueden leer
    match /rescue_alerts/{alertId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.auth.uid in resource.data.sentToFriends);
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
        request.auth.uid in resource.data.sentToFriends;
    }
    
    // Audio Library - Todos pueden leer
    match /audio_library/{audioId} {
      allow read: if request.auth != null;
      allow write: if false; // Solo admins vía Cloud Functions
    }
  }
}
```

---

## Consultas Firestore Comunes

### Obtener amigos aceptados de un usuario
```javascript
// Opción 1: Buscar donde el usuario es userId1
const friends1 = await db.collection('friends')
  .where('userId1', '==', currentUserId)
  .where('status', '==', 'accepted')
  .get();

// Opción 2: Buscar donde el usuario es userId2
const friends2 = await db.collection('friends')
  .where('userId2', '==', currentUserId)
  .where('status', '==', 'accepted')
  .get();
```

### Obtener alertas de rescate activas para un usuario
```javascript
const alerts = await db.collection('rescue_alerts')
  .where('sentToFriends', 'array-contains', currentUserId)
  .where('status', '==', 'active')
  .orderBy('createdAt', 'desc')
  .limit(20)
  .get();
```

### Verificar si existe amistad entre dos usuarios
```javascript
const friendshipId = [userId1, userId2].sort().join('_');
const friendship = await db.collection('friends').doc(friendshipId).get();
```

---

## Consideraciones de Seguridad

1. **Privacidad estricta**: Los usuarios solo ven datos de amigos aceptados
2. **Desnormalización**: Nombres y fotos se copian para rendimiento
3. **Expiración automática**: Las alertas tienen TTL (Time To Live)
4. **Índices compuestos**: Requeridos para queries eficientes
5. **Tokens de dispositivo**: Array para múltiples dispositivos por usuario
6. **Validación server-side**: Cloud Functions validan datos críticos

---

## Cloud Functions Recomendadas

1. **onFriendRequestAccepted**: Crea documento en `friends` cuando se acepta
2. **onRescueAlertCreated**: Envía push notifications a amigos
3. **cleanExpiredAlerts**: Cron job para limpiar alertas antiguas
4. **updateSubscriptionStatus**: Webhook de RevenueCat
5. **validatePhoneNumber**: Verifica números antes de guardar

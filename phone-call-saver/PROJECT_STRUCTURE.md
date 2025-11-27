# Phone Call Saver - Project Structure

```
phone-call-saver/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication group
│   │   ├── login.js
│   │   └── register.js
│   ├── (tabs)/                   # Main tabs navigation
│   │   ├── _layout.js
│   │   ├── index.js              # Home / Fake Call
│   │   ├── friends.js            # Saver Friends
│   │   └── profile.js            # Settings & Profile
│   ├── fake-call.js              # Full screen fake call
│   ├── sos.js                    # SOS Message screen
│   ├── subscription.js           # RevenueCat subscription
│   └── _layout.js                # Root layout
│
├── components/                   # Reusable components
│   ├── FakeCall/
│   │   ├── FakeCallScreen.js
│   │   ├── CallControls.js
│   │   └── CallerAvatar.js
│   ├── SOS/
│   │   ├── SOSButton.js
│   │   └── ContactSelector.js
│   ├── Friends/
│   │   ├── FriendsList.js
│   │   ├── FriendRequest.js
│   │   └── RescueAlert.js
│   └── UI/
│       ├── Button.js
│       ├── Input.js
│       └── Avatar.js
│
├── services/                     # Business logic
│   ├── firebase/
│   │   ├── config.js
│   │   ├── auth.js
│   │   └── firestore.js
│   ├── SOSMessageService.js
│   ├── FakeCallService.js
│   ├── NotificationService.js
│   ├── AudioService.js
│   └── LocationService.js
│
├── store/                        # Zustand state management
│   ├── authStore.js
│   ├── callStore.js
│   ├── friendsStore.js
│   └── settingsStore.js
│
├── constants/                    # App constants
│   ├── Colors.js
│   ├── Themes.js
│   └── Config.js
│
├── assets/                       # Static assets
│   ├── audio/
│   │   ├── ringtones/
│   │   └── prerecorded/
│   ├── images/
│   │   └── avatars/
│   └── fonts/
│
├── utils/                        # Utility functions
│   ├── permissions.js
│   ├── validators.js
│   └── helpers.js
│
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── babel.config.js               # Babel configuration
├── .env                          # Environment variables
└── README.md                     # Documentation
```

## Key Directories Explained

### `/app` - Expo Router
Uses file-based routing. Each file becomes a route automatically.

### `/components` - UI Components
Organized by feature (FakeCall, SOS, Friends, UI primitives).

### `/services` - Business Logic
Handles Firebase, notifications, audio, location, and core features.

### `/store` - State Management
Zustand stores for global state (auth, call settings, friends, etc.).

### `/constants` - Configuration
Theme colors, app config, and constants.

### `/assets` - Static Files
Audio files for ringtones and fake conversations, images, fonts.

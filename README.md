# AuthKeyz Vue Example : Please star 🌟

AuthKeyz Vue 3 TypeScript example application with full 2FA support for https://authkeyz.bond license key API auth.

**Built with Vue 3, Vue Router, TypeScript, Vite, and Tailwind CSS**

**Uses [npm](https://www.npmjs.com/) or [bun](https://bun.sh) for package management.**

## **Features**

- 🔐 **Complete Authentication System** - Login with username/password or license key
- 🛡️ **Two-Factor Authentication (2FA)** - Full 2FA support with QR code setup
- 🎨 **Modern UI** - Clean, responsive design matching AuthKeyz branding
- ⚡ **Vue 3 Composition API** - Modern Vue with script setup and composables
- 🔒 **Secure Session Management** - Cookie-based authentication with composables
- 📱 **Mobile Responsive** - Works seamlessly on all device sizes
- 🚀 **TypeScript** - Full type safety throughout the application

## **Installation & Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/AuthKeyz/AuthKeyz-Vue-Example.git
   cd AuthKeyz-Vue-Example
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure your AuthKeyz application**
   
   Edit `src/credentials.ts` with your AuthKeyz application details:
   ```typescript
    export const name: string = ""; // Application name
    export const ownerid: string = ""; // Owner ID
    export const url: string = "https://authkeyz.bond/api/1.3/"; // API URL (change if self-hosted)
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

## **Bugs**

If you are using our example with no significant changes and having problems, please report bugs here: https://authkeyz.fdback.io

However, we do **NOT** provide support for adding AuthKeyz to your project. If you can't figure this out, use Google or YouTube to learn more about Vue development.

## **Application Structure**

```
src/
├── views/
│   ├── Home.vue              # Main login page
│   └── Dashboard.vue         # User dashboard
├── components/
│   ├── Login.vue             # Login component with 2FA support
│   ├── TwoFALogin.vue        # 2FA verification component
│   └── TwoFASetup.vue        # 2FA setup/disable modal
├── composables/
│   └── useAuth.ts            # Authentication composable
├── router/
│   └── index.ts              # Vue Router configuration
├── lib/
│   ├── authkeyz.ts            # AuthKeyz API client
│   └── cookies.ts            # Cookie management utilities
├── assets/
│   ├── main.css              # Main styles
│   └── base.css              # Base/Tailwind styles
├── App.vue                   # Root component
├── main.js                   # Application entry point
└── credentials.ts            # Application credentials
```

## **Authentication Features**

### **Standard Login**
Users can authenticate using username/password:

```typescript
// In your component
const { login, loading } = useAuth();

const handleLogin = async () => {
  const result = await login(username.value, password.value);
  if (result.success) {
    router.push('/dashboard');
  }
};
```

### **License Key Authentication**
Direct authentication with license keys:

```typescript
const { licenseAuth } = useAuth();

const handleLicenseLogin = async () => {
  const result = await licenseAuth(licenseKey.value);
  if (result.success) {
    router.push('/dashboard');
  }
};
```

### **Two-Factor Authentication (2FA)**

#### **Enable 2FA**
```typescript
const { enable2FA } = useAuth();

// This returns a QR code URL for the user to scan
const result = await enable2FA();
if (result.success) {
  // Show QR code: result.qrCode
  // Secret code: result.secret
}
```

#### **Login with 2FA**
When 2FA is enabled, the login flow automatically detects and redirects to 2FA verification:

```typescript
const { loginWith2FA } = useAuth();

const handleVerify2FA = async (code: string) => {
  const result = await loginWith2FA(username.value, password.value, code);
  if (result.success) {
    router.push('/dashboard');
  }
};
```

#### **Disable 2FA**
```typescript
const { disable2FA } = useAuth();

const handleDisable2FA = async (code: string) => {
  const result = await disable2FA(code);
  if (result.success) {
    // 2FA disabled successfully
  }
};
```

## **User Registration**

```typescript
const { register } = useAuth();

const handleRegister = async () => {
  const result = await register(username.value, password.value, licenseKey.value);
  if (result.success) {
    router.push('/dashboard');
  }
};
```

## **Account Upgrade**

Users can upgrade their accounts with additional license keys:

```typescript
const { upgrade } = useAuth();

const handleUpgrade = async () => {
  const result = await upgrade(username.value, licenseKey.value);
  if (result.success) {
    // Show success message
  } else {
    // Show error: result.message
  }
};
```

## **User Data Access**

Access current user information through the composable:

```typescript
const { user, isAuthenticated } = useAuth();

// User object contains:
console.log({
  username: user.value?.username,
  ip: user.value?.ip,
  hwid: user.value?.hwid,
  expires: user.value?.expires,
  subscriptions: user.value?.subscriptions,
  createdate: user.value?.createdate,
  lastlogin: user.value?.lastlogin,
  subscription: user.value?.subscription
});
```

## **Application Information**

Display app statistics:

```typescript
const { authkeyz } = useAuth();

// Access app data
const appData = authkeyz.value?.app_data;

console.log({
  numUsers: appData?.numUsers,
  onlineUsers: appData?.onlineUsers,
  numKeys: appData?.numKeys,
  version: appData?.app_ver,
  customerPanel: appData?.customer_panel
});
```

## **Session Management**

```typescript
const { logout, authkeyz } = useAuth();

// Check if session is valid
const isValid = await authkeyz.value?.check();

// Logout user
logout();
router.push('/');
```

## **Security Features**

### **Blacklist Check**
```typescript
const { authkeyz } = useAuth();

const isBlacklisted = await authkeyz.value?.checkblacklist();
if (isBlacklisted) {
  // Handle blacklisted user
}
```

### **Ban User**
```typescript
const { authkeyz } = useAuth();

// Ban current user (must be logged in)
await authkeyz.value?.ban();
```

## **Logging**

Send logs to AuthKeyz dashboard:

```typescript
const { authkeyz } = useAuth();

await authkeyz.value?.log("User performed action X");
```

## **Variables**

### **Application Variables**
```typescript
const { authkeyz } = useAuth();

const value = await authkeyz.value?.var("variableName");
```

### **User Variables**
```typescript
const { authkeyz } = useAuth();

// Get user variable
const userValue = await authkeyz.value?.getvar("varName");

// Set user variable
await authkeyz.value?.setvar("varName", "varValue");
```

## **File Downloads**

```typescript
const { authkeyz } = useAuth();

const fileBytes = await authkeyz.value?.file("fileId");
// Handle file bytes as needed
```

## **Chat System**

### **Get Chat Messages**
```typescript
const { authkeyz } = useAuth();

const messages = await authkeyz.value?.chatGet("channelName");
messages.forEach(msg => {
  console.log(`${msg.author}: ${msg.message}`);
});
```

### **Send Chat Message**
```typescript
const { authkeyz } = useAuth();

await authkeyz.value?.chatSend("Hello everyone!", "channelName");
```

## **Webhooks**

Send secure server-side requests:

```typescript
const { authkeyz } = useAuth();

// GET request
const response1 = await authkeyz.value?.webhook("webhookId", "&param=value");

// POST with form data
const response2 = await authkeyz.value?.webhook(
  "webhookId", 
  "", 
  "key=value&key2=value2", 
  "application/x-www-form-urlencoded"
);

// POST with JSON
const response3 = await authkeyz.value?.webhook(
  "webhookId",
  "",
  JSON.stringify({ message: "Hello" }),
  "application/json"
);
```

## **Environment Configuration**

### **Development**
```bash
npm run dev
# or
bun dev
```

### **Production Build**
```bash
npm run build
npm run preview
# or
bun run build
bun run preview
```

## **Customization**

### **Styling**
The application uses Tailwind CSS with custom AuthKeyz design tokens. Main colors:

```css
/* Custom background colors */
.bg-custom-back { /* Dark background */ }
.bg-custom-back-1 { /* Darker background */ }
.bg-custom-back-lbl { /* Label background */ }

/* Custom border */
.border-custom { /* Dark border */ }
```

### **Authentication Composable**
The `useAuth` composable provides all authentication state and methods. It's automatically initialized when imported:

```typescript
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated, user, authkeyz, loading } = useAuth();

// Access user data
const username = computed(() => user.value?.username);

// Call auth methods
const handleLogin = async () => {
  const result = await login(username.value, password.value);
  // Handle result
};
</script>
```

## **Customer Connection Issues**

This is common amongst all authentication systems. Program obfuscation causes false positives in virus scanners, and with the scale of AuthKeyz this is perceived as a malicious domain. So, `authkeyz.com` and `authkeyz.bond` have been blocked by many internet providers. For dashboard, reseller panel, customer panel, use `authkeyz.bond`.

For API, `authkeyz.bond` will not work because it's purposefully blocked there so `authkeyz.bond` doesn't get blocked also. You should create your own domain and follow this tutorial video: https://www.youtube.com/watch?v=a2SROFJ0eYc

## **What is AuthKeyz?**

AuthKeyz is a powerful cloud-based authentication system designed to protect your software from piracy and unauthorized access. With AuthKeyz, you can implement secure licensing, user management, and subscription systems in minutes. Client SDKs available for [C#](https://github.com/AuthKeyz/AuthKeyz-CSHARP-Example), [C++ (API 1.3)](https://github.com/AuthKeyz/AuthKeyz-CPP-Example-API_1.3), [C++ (API 1.2)](https://github.com/AuthKeyz/AuthKeyz-CPP-Example-API_1.2), [Python](https://github.com/AuthKeyz/AuthKeyz-Python-Example), [Java](https://github.com/AuthKeyz/AuthKeyz-JAVA-api), [JavaScript](https://github.com/AuthKeyz/AuthKeyz-JavaScript-Example), [VB.NET](https://github.com/AuthKeyz/AuthKeyz-VB-Example), [PHP](https://github.com/AuthKeyz/AuthKeyz-PHP-Example), [Rust](https://github.com/AuthKeyz/AuthKeyz-Rust-Example), [Go](https://github.com/AuthKeyz/AuthKeyz-Go-Example), [Lua](https://github.com/AuthKeyz/AuthKeyz-Lua-Examples), [Ruby](https://github.com/AuthKeyz/AuthKeyz-Ruby-Example), and [Perl](https://github.com/AuthKeyz/AuthKeyz-Perl-Example). 

AuthKeyz has several unique features such as memory streaming, webhook function where you can send requests to API without leaking the API, discord webhook notifications, ban the user securely through the application at your discretion. Feel free to join https://discord.gg/KNRpCwWANJ if you have questions or suggestions.

## **Copyright License**

AuthKeyz is licensed under **Elastic License 2.0**

* You may not provide the software to third parties as a hosted or managed service, where the service provides users with access to any substantial set of the features or functionality of the software.

* You may not move, change, disable, or circumvent the license key functionality in the software, and you may not remove or obscure any functionality in the software that is protected by the license key.

* You may not alter, remove, or obscure any licensing, copyright, or other notices of the licensor in the software. Any use of the licensor's trademarks is subject to applicable law.

Thank you for your compliance, we work hard on the development of AuthKeyz and do not appreciate our copyright being infringed.

## **Support**

- 📖 [AuthKeyz Documentation](https://docs.authkeyz.bond)
- 💬 [Telegram Community](https://discord.gg/KNRpCwWANJ)
- 🐛 [Bug Reports](https://authkeyz.bond/app/?page=forms)
- 🌐 [AuthKeyz Dashboard](https://authkeyz.bond/app/)

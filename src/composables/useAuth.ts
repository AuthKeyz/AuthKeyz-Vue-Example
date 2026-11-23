import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthKeyz from '@/lib/authkeyz';
import { sessionStorage } from '@/lib/cookies';
import * as AuthKeyzConfig from '@/credentials';

interface AuthKeyzUserData {
  username: string;
  ip: string;
  hwid: string;
  expires: number;
  createdate: number;
  lastlogin: number;
  subscription: string;
  subscriptions: string;
}

const isAuthenticated = ref(false);
const user = ref<AuthKeyzUserData | null>(null);
const authkeyz = ref<AuthKeyz | null>(null);
const loading = ref(true);

export function useAuth() {
  const router = useRouter();
  
  const initializeAuthKeyz = async () => {
    try {
      console.log("[AUTH] Initializing AuthKeyz");

      const ka = new AuthKeyz({
        name: AuthKeyzConfig.name,
        ownerid: AuthKeyzConfig.ownerid,
        url: AuthKeyzConfig.url,
      });

      const result = await ka.init();
      console.log("[AUTH] AuthKeyz initialized:", result);

      if (result.success) {
        authkeyz.value = ka;

        try {
          await ka.fetchStats();
          console.log("[AUTH] Application stats fetched:", ka.app_data);
        } catch (error) {
          console.error("[AUTH] Failed to fetch stats:", error);
        }

        const savedUser = sessionStorage.getUser();
        if (savedUser) {
          const isExpired = savedUser.expires && Number(savedUser.expires) * 1000 <= Date.now();
          if (isExpired) {
            sessionStorage.removeUser();
          } else {
            console.log("[AUTH] Found valid saved user:", savedUser);
            user.value = savedUser;
            isAuthenticated.value = true;
          }
        }
      } else {
        console.log("[AUTH] AuthKeyz init failed:", result.message);
      }
    } catch (error) {
      console.error("[AUTH] AuthKeyz initialization error:", error);
    } finally {
      loading.value = false;
    }
  };

  const login = async (username: string, password: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting login for user:', username);
    const result = await authkeyz.value.login(username, password);
    console.log('[Auth Debug] Login result:', result);
    
    if (result.success && result.user_data) {
      user.value = result.user_data;
      isAuthenticated.value = true;
      sessionStorage.setUser(result.user_data);
      return { success: true, message: result.message };
    } else if (result.message && result.message.toLowerCase().includes('2fa')) {
      return { success: false, message: result.message, needsTwoFA: true };
    }
    
    return { success: false, message: result.message };
  };

  const loginWith2FA = async (username: string, password: string, code: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting 2FA login for user:', username);
    const result = await authkeyz.value.login(username, password, code);
    console.log('[Auth Debug] 2FA Login result:', result);
    
    if (result.success && result.user_data) {
      user.value = result.user_data;
      isAuthenticated.value = true;
      sessionStorage.setUser(result.user_data);
      return { success: true, message: result.message };
    }
    
    return { success: false, message: result.message };
  };

  const register = async (username: string, password: string, license: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting registration for user:', username);
    const result = await authkeyz.value.register(username, password, license);
    console.log('[Auth Debug] Register result:', result);
    
    if (result.success && result.user_data) {
      user.value = result.user_data;
      isAuthenticated.value = true;
      sessionStorage.setUser(result.user_data);
      return { success: true, message: result.message };
    }
    
    return { success: false, message: result.message };
  };

  const licenseAuth = async (license: string, code?: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting license authentication');
    const result = await authkeyz.value.license(license, code);
    console.log('[Auth Debug] License result:', result);
    
    if (result.success && result.user_data) {
      user.value = result.user_data;
      isAuthenticated.value = true;
      sessionStorage.setUser(result.user_data);
      return { success: true, message: result.message };
    } else if (result.message && result.message.toLowerCase().includes('2fa')) {
      return { success: false, message: result.message, needsTwoFA: true };
    }
    
    return { success: false, message: result.message };
  };

  const licenseAuthWith2FA = async (license: string, code: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting 2FA license authentication');
    const result = await authkeyz.value.license(license, code);
    console.log('[Auth Debug] 2FA License result:', result);
    
    if (result.success && result.user_data) {
      user.value = result.user_data;
      isAuthenticated.value = true;
      sessionStorage.setUser(result.user_data);
      return { success: true, message: result.message };
    }
    
    return { success: false, message: result.message };
  };

  const enable2FA = async (code?: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting to enable 2FA with code:', !!code);
    const result = await authkeyz.value.enable2FA(code);
    console.log('[Auth Debug] Enable 2FA result:', result);
    
    if (result.success) {
      return { 
        success: true, 
        message: result.message,
        qrCode: result['2fa']?.QRCode,
        secret: result['2fa']?.secret_code
      };
    }
    
    return { success: false, message: result.message };
  };

  const disable2FA = async (code: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting to disable 2FA');
    const result = await authkeyz.value.disable2FA(code);
    console.log('[Auth Debug] Disable 2FA result:', result);
    
    return { success: result.success, message: result.message };
  };

  const upgrade = async (username: string, license: string) => {
    if (!authkeyz.value) {
      return { success: false, message: 'AuthKeyz not initialized' };
    }

    console.log('[Auth Debug] Attempting upgrade for user:', username);
    const result = await authkeyz.value.upgrade(username, license);
    console.log('[Auth Debug] Upgrade result:', result);
    
    return { success: result.success, message: result.message };
  };

  const logout = async () => {
    console.log('[Auth Debug] Logging out user');
    if (authkeyz.value) {
      try {
        await authkeyz.value.logout();
        await authkeyz.value.init();
        console.log('[Auth Debug] AuthKeyz reinitialized after logout');
      } catch (error) {
        console.error('[Auth Debug] Error during logout:', error);
      }
    }
    user.value = null;
    isAuthenticated.value = false;
    sessionStorage.clearAll();
    router.push('/');
  };

  if (!authkeyz.value && loading.value) {
    initializeAuthKeyz();
  }

  return {
    isAuthenticated,
    user,
    authkeyz,
    loading,
    login,
    loginWith2FA,
    register,
    licenseAuth,
    licenseAuthWith2FA,
    upgrade,
    enable2FA,
    disable2FA,
    logout,
    initializeAuthKeyz
  };
}

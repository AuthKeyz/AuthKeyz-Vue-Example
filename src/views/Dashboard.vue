<template>
  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    Loading...
  </div>
  <section v-else class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-custom-back rounded-xl p-4 md:p-10 w-full max-w-4xl flex flex-col justify-center mx-2">
      <div class="flex justify-center mb-3">
        <a href="../">
          <img
            src="https://authkeyz.bond/assets/img/authkeyz-logo.png"
            alt="AuthKeyz Logo"
            class="h-12 md:h-20 w-auto"
          />
        </a>
      </div>

      <div class="flex justify-center mb-6">
        <div class="bg-blue-500/10 rounded-full p-6">
          <svg
            class="w-16 h-16 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 00-2-2m0 0a2 2 0 012 2v2a2 2 0 00-2 2"
            />
          </svg>
        </div>
      </div>

      <h1 class="mb-3 text-2xl md:text-3xl text-center font-bold text-white">
        Welcome, {{ user?.username }}
      </h1>
      <p class="mb-4 text-sm md:text-base text-center font-normal text-gray-300">
        Manage your account settings and security preferences
      </p>
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span class="w-2 h-2 mr-2 rounded-full bg-emerald-400 animate-pulse"></span>
          API 1.3 Ed25519 Verified
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
          Replay Protection Active
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
          Subscription: {{ countdownText }}
        </span>
      </div>

      <div v-if="user" class="space-y-6">
        <div class="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
          <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Account Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="space-y-3">
              <div>
                <span class="text-gray-400">Username:</span>
                <p class="text-white font-medium">{{ user.username }}</p>
              </div>
              <div>
                <span class="text-gray-400">IP Address:</span>
                <p class="text-white font-medium">{{ user.ip }}</p>
              </div>
              <div>
                <span class="text-gray-400">Subscription(s):</span>
                <p class="text-white font-medium">
                  {{ Array.isArray(user.subscriptions)
                    ? user.subscriptions.map((sub: any) => sub.subscription).join(", ")
                    : user.subscription
                  }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">Hardware-Id:</span>
                <p class="text-white font-medium">{{ user.hwid }}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <span class="text-gray-400">Account Created:</span>
                <p class="text-white font-medium">
                  {{ new Date(user.createdate * 1000).toLocaleDateString() }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">Last Login:</span>
                <p class="text-white font-medium">
                  {{ new Date(user.lastlogin * 1000).toLocaleDateString() }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">Expires:</span>
                <p class="text-white font-medium">
                  {{ new Date(user.expires * 1000).toLocaleDateString() }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">User Variable:</span>
                <p class="text-white font-medium">{{ userVariable || "No Variable" }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
          <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Application Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="space-y-3">
              <div>
                <span class="text-gray-400">Application Version:</span>
                <p class="text-white font-medium">
                  {{ AuthKeyzAppData?.app_ver }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">Customer Panel:</span>
                <p class="text-white font-medium">
                  {{ AuthKeyzAppData?.customer_panel }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">Number of Online Users:</span>
                <p class="text-white font-medium">
                  {{ AuthKeyzAppData?.onlineUsers }}
                </p>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <span class="text-gray-400">Number of Keys:</span>
                <p class="text-white font-medium">
                  {{ AuthKeyzAppData?.numKeys }}
                </p>
              </div>
              <div>
                <span class="text-gray-400">Number of Users:</span>
                <p class="text-white font-medium">
                  {{ AuthKeyzAppData?.numUsers }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
          <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Changeable Settings
          </h2>
          <div class="space-y-3">
            <button
              @click="handleTwoFASetup('enable')"
              class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full"
            >
              <span class="inline-flex">
                Enable 2FA
                <svg
                  class="w-3.5 h-3.5 ml-2 mt-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </span>
            </button>
            <button
              @click="handleTwoFASetup('disable')"
              class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full"
            >
              <span class="inline-flex">
                Disable 2FA
                <svg
                  class="w-3.5 h-3.5 ml-2 mt-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </span>
            </button>
            <div class="mt-4 pt-4 border-t border-gray-600">
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Set User Variable 'example'
                  </label>
                  <input
                    type="text"
                    v-model="varValue"
                    placeholder="Enter value for 'example' variable"
                    class="w-full px-3 py-2 bg-custom-back-1 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  @click="handleAddUserVariable"
                  :disabled="varLoading"
                  class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="inline-flex">
                    {{ varLoading ? 'Setting...' : 'Set User Variable' }}
                    <svg
                      v-if="!varLoading"
                      class="w-3.5 h-3.5 ml-2 mt-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </span>
                </button>
                <div 
                  v-if="varMessage"
                  :class="[
                    'text-sm p-3 rounded-lg',
                    varMessage.startsWith('Successfully')
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  ]"
                >
                  {{ varMessage }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-4">
          <button
            @click="handleLogout"
            class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full"
          >
            <span class="inline-flex">
              Logout
              <svg
                class="w-3.5 h-3.5 ml-2 mt-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <TwoFASetup 
      v-if="showTwoFASetup"
      :mode="twoFAMode"
      @close="handleCloseTwoFASetup"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import TwoFASetup from '@/components/TwoFASetup.vue';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { isAuthenticated, user, logout, loading, authkeyz, initializeAuthKeyz } = useAuth();

const AuthKeyzApp = computed(() => authkeyz.value);
const AuthKeyzAppData = computed(() => AuthKeyzApp.value?.app_data);

const showTwoFASetup = ref(false);
const twoFAMode = ref<'enable' | 'disable'>('enable');
const userVariable = ref<string | null>(null);
const varValue = ref('');
const varMessage = ref('');
const varLoading = ref(false);
const nowSec = ref(Math.floor(Date.now() / 1000));

const countdownText = computed(() => {
  const exp = user.value?.expires;
  if (!exp) return 'N/A';
  const diff = Number(exp) - nowSec.value;
  if (diff <= 0) return 'Expired';
  const d = Math.floor(diff / 86400);
  const h = Math.floor((diff % 86400) / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;
  return `${d}d ${h}h ${m}m ${s}s left`;
});

onMounted(async () => {
  setInterval(() => {
    nowSec.value = Math.floor(Date.now() / 1000);
  }, 1000);
  // Wait for initialization if still loading
  if (loading.value) {
    await new Promise(resolve => {
      const checkLoading = setInterval(() => {
        if (!loading.value) {
          clearInterval(checkLoading);
          resolve(true);
        }
      }, 100);
    });
  }
  
  if (!isAuthenticated.value) {
    router.push('/');
    return;
  }

  // Ensure app_data is fetched
  if (AuthKeyzApp.value && !AuthKeyzApp.value.app_data) {
    try {
      await AuthKeyzApp.value.fetchStats();
      console.log('[Dashboard] Application stats fetched:', AuthKeyzApp.value.app_data);
    } catch (error) {
      console.error('[Dashboard] Failed to fetch stats:', error);
    }
  }

  if (AuthKeyzApp.value) {
    try {
      const value = await AuthKeyzApp.value.getvar('example');
      userVariable.value = value;
    } catch (error) {
      console.error('Failed to fetch user variable:', error);
    }
  }

  setInterval(async () => {
    if (AuthKeyzApp.value && typeof (AuthKeyzApp.value as any).check === 'function') {
      try {
        const ok = await (AuthKeyzApp.value as any).check();
        if (ok === false) {
          await logout();
          router.push('/');
        }
      } catch {
        // Ignore transient network errors
      }
    }
  }, 60000);
});

const handleTwoFASetup = (mode: 'enable' | 'disable') => {
  twoFAMode.value = mode;
  showTwoFASetup.value = true;
};

const handleCloseTwoFASetup = () => {
  showTwoFASetup.value = false;
};

const handleAddUserVariable = async () => {
  if (!varValue.value.trim()) {
    varMessage.value = 'Please enter a value';
    return;
  }

  varLoading.value = true;
  varMessage.value = '';

  try {
    await AuthKeyzApp.value?.setvar('example', varValue.value.trim());
    varMessage.value = `Successfully set variable 'example' to: ${varValue.value}`;
    varValue.value = '';
    
    // Refresh the user variable
    const value = await AuthKeyzApp.value?.getvar('example');
    userVariable.value = value;
  } catch (error) {
    varMessage.value = `Error: ${error instanceof Error ? error.message : 'Failed to add variable'}`;
  } finally {
    varLoading.value = false;
  }
};

const handleLogout = async () => {
  await logout();
};
</script>

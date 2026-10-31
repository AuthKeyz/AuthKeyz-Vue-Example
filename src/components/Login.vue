<template>
  <section class="flex items-center justify-center min-h-screen">
    <div class="bg-custom-back rounded-xl p-4 md:p-10 w-full max-w-lg flex flex-col justify-center mx-2">
      <div class="flex justify-center mb-3">
        <a href="../">
          <img
            src="https://authkeyz.bond/assets/img/logo.png"
            alt="AuthKeyz Logo"
            class="h-12 md:h-20 w-auto"
          />
        </a>
      </div>

      <!-- Tabs -->
      <div class="mb-6">
        <div class="flex bg-custom-back-1 rounded-lg p-1">
          <button
            type="button"
            @click="handleTabChange('login')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
              activeTab === 'login'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            ]"
          >
            User/Pass
          </button>
          <button
            type="button"
            @click="handleTabChange('upgrade')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
              activeTab === 'upgrade'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            ]"
          >
            Upgrade
          </button>
          <button
            type="button"
            @click="handleTabChange('license')"
            :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
              activeTab === 'license'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            ]"
          >
            License
          </button>
        </div>
      </div>

      <form
        class="space-y-4 md:space-y-6 flex-1"
        @submit.prevent
      >
        <!-- Login/Register Tab -->
        <div v-if="activeTab === 'login'">
          <div class="relative">
            <input
              id="username"
              type="text"
              name="username"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autocomplete="on"
              required
              v-model="username"
            />
            <label
              for="username"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Username
            </label>
          </div>

          <div class="relative mt-4">
            <input
              id="password"
              type="password"
              name="password"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="password"
            />
            <label
              for="password"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          <div class="relative mt-4">
            <input
              id="license-key"
              type="text"
              name="license-key"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="license"
            />
            <label
              for="license-key"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              License Key (for register)
            </label>
          </div>

          <div class="flex flex-col space-y-3 mt-6">
            <button
              @click="handleLogin"
              class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full"
            >
              <span class="inline-flex">
                Login
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
              @click="handleRegister"
              class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full"
            >
              <span class="inline-flex">
                Register
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

        <!-- Upgrade Tab -->
        <div v-if="activeTab === 'upgrade'">
          <div class="relative">
            <input
              id="upgrade-username"
              type="text"
              name="upgrade-username"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autocomplete="on"
              required
              v-model="upgradeUsername"
            />
            <label
              for="upgrade-username"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Username
            </label>
          </div>

          <div class="relative mt-4">
            <input
              id="upgrade-license"
              type="text"
              name="upgrade-license"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="upgradeLicense"
            />
            <label
              for="upgrade-license"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              License Key
            </label>
          </div>

          <button
            @click="handleUpgrade"
            class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full mt-6"
          >
            <span class="inline-flex">
              Upgrade Account
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

        <!-- License Tab -->
        <div v-if="activeTab === 'license'">
          <div class="relative">
            <input
              id="license-only"
              type="text"
              name="license-only"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="license"
            />
            <label
              for="license-only"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              License Key
            </label>
          </div>

          <button
            @click="handleLicenseAuth"
            class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full mt-6"
          >
            <span class="inline-flex">
              Login with License
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

        <div v-if="error" class="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-sm">
          {{ success }}
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const emit = defineEmits<{
  showTwoFA: [data: { username: string; password: string; license?: string; loginType: 'login' | 'license' }]
}>();

const { login, register, licenseAuth, upgrade } = useAuth();

const username = ref('');
const password = ref('');
const license = ref('');
const upgradeUsername = ref('');
const upgradeLicense = ref('');
const error = ref('');
const success = ref('');
const activeTab = ref<'login' | 'upgrade' | 'license'>('login');

const handleTabChange = (tab: 'login' | 'upgrade' | 'license') => {
  activeTab.value = tab;
  error.value = '';
  success.value = '';
};

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Username and password are required for login.';
    return;
  }

  error.value = '';
  success.value = '';
  const result = await login(username.value, password.value);

  if (result.success) {
    window.location.href = '/dashboard';
  } else if (result.needsTwoFA) {
    emit('showTwoFA', { 
      username: username.value, 
      password: password.value, 
      loginType: 'login' 
    });
  } else {
    error.value = result.message || 'Login failed.';
  }
};

const handleRegister = async () => {
  if (!username.value || !password.value || !license.value) {
    error.value = 'Username, password, and license are required for register.';
    return;
  }

  error.value = '';
  success.value = '';
  const result = await register(username.value, password.value, license.value);

  if (result.success) {
    window.location.href = '/dashboard';
  } else {
    error.value = result.message || 'Registration failed.';
  }
};

const handleLicenseAuth = async () => {
  if (!license.value) {
    error.value = 'License is required for license auth.';
    return;
  }

  error.value = '';
  success.value = '';
  const result = await licenseAuth(license.value);

  if (result.success) {
    window.location.href = '/dashboard';
  } else if (result.needsTwoFA) {
    emit('showTwoFA', { 
      username: '', 
      password: '', 
      license: license.value, 
      loginType: 'license' 
    });
  } else {
    error.value = result.message || 'License authentication failed.';
  }
};

const handleUpgrade = async () => {
  if (!upgradeUsername.value || !upgradeLicense.value) {
    error.value = 'Username and license are required for upgrade.';
    return;
  }

  error.value = '';
  success.value = '';
  const result = await upgrade(upgradeUsername.value, upgradeLicense.value);

  if (result.success) {
    success.value = result.message || 'Account upgraded successfully!';
    upgradeUsername.value = '';
    upgradeLicense.value = '';
  } else {
    error.value = result.message || 'Upgrade failed.';
  }
};
</script>

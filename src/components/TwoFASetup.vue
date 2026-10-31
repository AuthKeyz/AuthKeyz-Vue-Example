<template>
  <div class="fixed inset-0 bg-custom-back-1 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-custom-back rounded-xl p-4 md:p-10 w-full max-w-lg flex flex-col justify-center mx-2">
      <div v-if="mode === 'enable' && step === 1" class="flex justify-center mb-3">
        <a href="../">
          <img 
            src="https://authkeyz.bond/assets/img/logo.png" 
            alt="AuthKeyz Logo" 
            class="h-12 md:h-20 w-auto"
          />
        </a>
      </div>
      <div v-else-if="mode === 'enable' && step === 2 && qrCodeImage" class="flex justify-center mb-3">
        <div class="bg-white p-4 rounded-lg">
          <img :src="qrCodeImage" alt="QR Code" class="w-32 h-32 md:w-40 md:h-40" />
        </div>
      </div>
      <div v-else class="flex justify-center mb-3">
        <a href="../">
          <img 
            src="https://authkeyz.bond/assets/img/logo.png" 
            alt="AuthKeyz Logo" 
            class="h-12 md:h-20 w-auto"
          />
        </a>
      </div>

      <div class="absolute top-4 right-4">
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-if="!(mode === 'enable' && step === 2 && qrCodeImage)" class="flex justify-center mb-6">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>

      <div v-if="mode === 'enable' && step === 1">
        <h2 class="mb-3 text-2xl md:text-3xl text-center font-bold text-white">
          Enable Two-Factor Authentication
        </h2>
        <p class="mb-8 text-sm md:text-base text-center font-normal text-gray-300">
          Secure your account with an additional layer of protection
        </p>
        <div class="text-center">
          <button
            @click="handleEnable2FA"
            :disabled="isLoading"
            class="cursor-pointer text-white hover:bg-blue-700 hover:text-white-500 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mb-3 w-full bg-custom-back-1 disabled:opacity-50"
          >
            <span class="inline-flex">
              {{ isLoading ? 'Generating...' : 'Generate QR Code' }}
              <svg 
                v-if="!isLoading"
                class="w-3.5 h-3.5 ml-2 mt-1" 
                aria-hidden="true" 
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
      <div v-else-if="mode === 'enable' && step === 2">
        <h2 class="mb-3 text-2xl md:text-3xl text-center font-bold text-white">
          Scan QR Code
        </h2>
        <p class="mb-4 text-sm md:text-base text-center font-normal text-gray-300">
          Scan the QR code above with your authenticator app
        </p>
        
        <div v-if="secret" class="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p class="text-xs text-gray-400 mb-2 text-center">Or enter this secret manually:</p>
          <code class="block bg-gray-900 text-green-400 px-3 py-2 rounded text-sm break-all text-center font-mono">
            {{ secret }}
          </code>
        </div>

        <p class="mb-8 text-sm text-center font-normal text-gray-300">
          Then enter the 6-digit code from your authenticator app
        </p>
      </div>
      <div v-else>
        <h2 class="mb-3 text-2xl md:text-3xl text-center font-bold text-white">
          Disable Two-Factor Authentication
        </h2>
        <p class="mb-8 text-sm md:text-base text-center font-normal text-gray-300">
          Enter your current 2FA code to disable two-factor authentication
        </p>
      </div>

      <form 
        v-if="step === 2 || mode === 'disable'"
        class="space-y-6 flex-1" 
        @submit.prevent
      >
        <div class="relative">
          <input 
            type="text" 
            id="twoFactorCode" 
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white-900 bg-transparent rounded-lg border-1 border-custom appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center text-2xl tracking-widest" 
            placeholder=" " 
            autocomplete="off" 
            maxlength="6" 
            pattern="[0-9]{6}" 
            inputmode="numeric" 
            required 
            autofocus
            v-model="code"
            @input="handleInput"
            @keypress="handleKeyPress"
            :disabled="isLoading"
          />
          <label 
            for="twoFactorCode" 
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-back-lbl px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Authentication Code
          </label>
        </div>

        <div class="space-y-4">
          <button
            type="button"
            @click="handleSubmit"
            :disabled="isLoading || code.length !== 6"
            class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full disabled:opacity-50"
          >
            <span class="inline-flex">
              {{ isLoading 
                ? (mode === 'enable' ? 'Enabling...' : 'Disabling...') 
                : (mode === 'enable' ? 'Enable 2FA' : 'Disable 2FA')
              }}
              <svg
                v-if="!isLoading"
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
            type="button"
            @click="$emit('close')"
            :disabled="isLoading"
            class="bg-custom-back-1 cursor-pointer text-white hover:!bg-blue-600 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-full disabled:opacity-50"
          >
            <span class="inline-flex">
              Cancel
              <svg
                class="w-3.5 h-3.5 ml-2 mt-1 rotate-180"
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
      </form>

      <div v-if="error" class="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
        <p class="text-sm text-red-400 text-center">{{ error }}</p>
      </div>

      <div v-if="(step === 2 || mode === 'disable')" class="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p class="text-xs text-gray-300 text-center">
          <strong>Tip:</strong> Make sure your device time is synced correctly. If you're having trouble, contact support.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuth } from '@/composables/useAuth';

interface Props {
  mode: 'enable' | 'disable';
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: []
}>();

const { enable2FA, disable2FA } = useAuth();

const code = ref('');
const error = ref('');
const isLoading = ref(false);
const qrCodeData = ref<string | null>(null);
const qrCodeImage = ref<string | null>(null);
const secret = ref<string | null>(null);
const step = ref(props.mode === 'enable' ? 1 : 2);

watch(qrCodeData, (newVal) => {
  if (newVal) {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(newVal)}`;
    qrCodeImage.value = qrApiUrl;
  }
});

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  code.value = target.value.replace(/\D/g, '').slice(0, 6);
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !isLoading.value) {
    e.preventDefault();
    handleSubmit();
  }
};

const handleEnable2FA = async () => {
  if (step.value === 1) {
    isLoading.value = true;
    error.value = '';

    try {
      const result = await enable2FA();
      if (result.success) {
        qrCodeData.value = result.qrCode || null;
        secret.value = result.secret || null;
        step.value = 2;
      } else {
        error.value = result.message || 'Failed to enable 2FA.';
      }
    } catch (err) {
      error.value = 'An unexpected error occurred.';
    } finally {
      isLoading.value = false;
    }
  }
};

const handleDisable2FA = async () => {
  if (!code.value || code.value.length !== 6) {
    error.value = 'Please enter a valid 6-digit code to disable 2FA.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const result = await disable2FA(code.value);
    if (result.success) {
      emit('close');
    } else {
      error.value = result.message || 'Failed to disable 2FA.';
    }
  } catch (err) {
    error.value = 'An unexpected error occurred.';
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  if (props.mode === 'enable') {
    if (!code.value || code.value.length !== 6) {
      error.value = 'Please enter a valid 6-digit code.';
      return;
    }

    isLoading.value = true;
    error.value = '';

    try {
      const result = await enable2FA(code.value);
      if (result.success) {
        emit('close');
      } else {
        error.value = result.message || 'Failed to verify 2FA code.';
      }
    } catch (err) {
      error.value = 'An unexpected error occurred.';
    } finally {
      isLoading.value = false;
    }
  } else {
    await handleDisable2FA();
  }
};
</script>

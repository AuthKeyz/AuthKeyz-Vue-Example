<template>
  <section class="flex items-center justify-center min-h-screen">
    <div class="bg-custom-back rounded-xl p-4 md:p-10 w-full max-w-lg flex flex-col justify-center mx-2">
      <!-- Logo Banner -->
      <div class="flex justify-center mb-3">
        <a href="../">
          <img 
            src="https://authkeyz.bond/assets/img/logo.png" 
            alt="AuthKeyz Logo" 
            class="h-12 md:h-20 w-auto"
          />
        </a>
      </div>

      <!-- 2FA Icon -->
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>

      <h2 class="mb-3 text-2xl md:text-3xl text-center font-bold text-white">
        Two-Factor Authentication
      </h2>
      <p class="mb-8 text-sm md:text-base text-center font-normal text-gray-300">
        Enter the 6-digit code from your authenticator app
      </p>

      <!-- 2FA Form -->
      <form 
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

        <button 
          type="button"
          @click="handleSubmit"
          :disabled="isLoading || code.length !== 6"
          class="cursor-pointer text-white hover:bg-blue-700 hover:text-white-500 focus:ring-0 focus:outline-none transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mb-3 w-full bg-custom-back-1 disabled:opacity-50"
        >
          <span class="inline-flex">
            {{ isLoading ? 'Verifying...' : 'Verify & Continue' }}
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

        <div class="text-center">
          <button
            type="button"
            @click="$emit('back')"
            :disabled="isLoading"
            class="text-sm text-gray-400 hover:text-blue-500 transition-colors disabled:opacity-50"
          >
            ← Back to login
          </button>
        </div>
      </form>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
        <p class="text-sm text-red-400 text-center">{{ error }}</p>
      </div>

      <!-- Help Text -->
      <div class="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p class="text-xs text-gray-300 text-center">
          <strong>Tip:</strong> Make sure your device time is synced correctly. If you're having trouble, contact support.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

interface Props {
  username: string;
  password: string;
  license?: string;
  loginType: 'login' | 'license';
}

const props = defineProps<Props>();
const emit = defineEmits<{
  back: []
}>();

const { loginWith2FA, licenseAuthWith2FA } = useAuth();

const code = ref('');
const error = ref('');
const isLoading = ref(false);

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

const handleSubmit = async () => {
  if (!code.value || code.value.length !== 6) {
    error.value = 'Please enter a valid 6-digit 2FA code.';
    return;
  }

  error.value = '';
  isLoading.value = true;

  try {
    let result;
    if (props.loginType === 'login') {
      result = await loginWith2FA(props.username, props.password, code.value);
    } else {
      result = await licenseAuthWith2FA(props.license || "", code.value);
    }

    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      error.value = result.message || '2FA authentication failed.';
    }
  } catch (err) {
    error.value = 'An unexpected error occurred.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    Loading...
  </div>
  <Login v-else-if="!showTwoFA" @show-two-f-a="handleShowTwoFA" />
  <TwoFALogin 
    v-else
    :username="twoFAData.username"
    :password="twoFAData.password"
    :license="twoFAData.license"
    :loginType="twoFAData.loginType"
    @back="handleBackFromTwoFA"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Login from '@/components/Login.vue';
import TwoFALogin from '@/components/TwoFALogin.vue';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { isAuthenticated, loading } = useAuth();

const showTwoFA = ref(false);
const twoFAData = ref({
  username: '',
  password: '',
  license: '',
  loginType: 'login' as 'login' | 'license'
});

onMounted(async () => {
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
  
  if (isAuthenticated.value) {
    router.push('/dashboard');
  }
});

const handleShowTwoFA = (data: { username: string; password: string; license?: string; loginType: 'login' | 'license' }) => {
  twoFAData.value = {
    username: data.username,
    password: data.password,
    license: data.license || '',
    loginType: data.loginType
  };
  showTwoFA.value = true;
};

const handleBackFromTwoFA = () => {
  showTwoFA.value = false;
  twoFAData.value = {
    username: '',
    password: '',
    license: '',
    loginType: 'login'
  };
};
</script>

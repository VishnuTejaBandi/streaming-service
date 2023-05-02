<template>
  <form class="login-form" @submit.prevent="login" v-if="!loading">
    <div class="p-input-icon-left login-form__input-text">
      <i class="pi pi-user" />
      <InputText v-model="username" placeholder="username"></InputText>
    </div>

    <div class="p-input-icon-left login-form__input-text">
      <i class="pi pi-key" />
      <InputText
        v-model="password"
        :class="{ 'p-invalid': password.length > 0 && password.length < 8 }"
        placeholder="password"
        type="password"
      ></InputText>
    </div>

    <Button type="submit" :disabled="password.length < 8" class="login-form__submit-button"> Login </Button>
  </form>

  <FullScreenLoader v-if="loading"></FullScreenLoader>
</template>

<script setup>
const username = ref('');
const password = ref('');
const loading = ref(false);

async function login() {
  loading.value = true;
  const isLoggedIn = await $fetch('/api/login', {
    body: {
      username: username.value,
      password: password.value,
    },
    method: 'POST',
  });
  if (isLoggedIn) navigateTo({ path: '/' });
}
</script>

<style lang="scss" scoped>
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &__input-text {
    display: block;
    margin-bottom: 16px;
    & > input {
      width: max(20vw, 300px);
    }
  }

  &__submit-button {
    width: max(20vw, 300px);
  }
}
</style>

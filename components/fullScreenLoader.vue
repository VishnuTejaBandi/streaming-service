<template>
  <div class="full-screen-loader">
    <ProgressSpinner></ProgressSpinner>
  </div>
</template>

<style lang="scss" scoped>
.full-screen-loader {
  height: 100dvh;
  width: 100dvw;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  z-index: 9999;
  background: var(--grey-900);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

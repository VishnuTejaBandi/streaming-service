<template>
  <div class="full-screen-element">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.full-screen-element {
  height: 100dvh;
  width: 100dvw;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
}
</style>

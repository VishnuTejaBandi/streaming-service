<template>
  <div @click="handleItemClick({ name, type })" class="list-item" :id="name" :data-v-name="name">
    <div class="list-item__name">
      <i :class="type === 'directory' ? PrimeIcons.FOLDER + ' light-red' : getClassWithColor(name)"></i>
      {{ name }}
    </div>

    <div class="list-item__controls" v-if="type === 'file'">
      <i :class="PrimeIcons.PLAY" @click="$emit('stream')" v-if="mime.getType(props.name)?.includes('video')"></i>
      <i :class="PrimeIcons.DOWNLOAD" @click="$emit('download')"></i>
    </div>
  </div>
</template>

<script setup>
import { PrimeIcons } from 'primevue/api';
import { getClassWithColor } from 'file-icons-js';
import mime from 'mime';

const route = useRoute();

const props = defineProps({
  name: String,
  type: String,
});

function handleItemClick({ name, type }) {
  if (type === 'file') return;
  const separator = route.path === '/' ? '' : '/';
  navigateTo({
    path: `${route.path}${separator}${name}`,
  });
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 16px;
  cursor: pointer;
  i {
    font-style: normal;
    margin-right: 10px;
  }
  &__name {
    flex-basis: 80dvw;
    word-break: break-all;
  }
  &__controls {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    i {
      font-size: 20px;
      display: inline-block;
      margin-right: 0px;
    }
  }
}
</style>

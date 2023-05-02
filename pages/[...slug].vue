<template>
  <DirectoryView v-if="items?.length" :items="items" @stream="streamFile" @download="downloadFile"></DirectoryView>
  <div v-else class="empty-folder">
    <i class="pi pi-folder-open"></i>
    Folder is empty
  </div>

  <video :src="videoPath" ref="player" muted playsInline loop controls v-show="videoPath"></video>

  <FullScreenLoader v-if="loading"></FullScreenLoader>
</template>

<script setup>
import Plyr from 'plyr';
const route = useRoute();
const player = ref(null);
const videoPath = ref(null);

const { pending: loading, data: items } = useLazyFetch('/api/read-directory', {
  method: 'POST',
  body: {
    path: typeof route.params.slug === 'object' ? '/' + route.params.slug.join('/') : '/',
  },
});

onMounted(() => {
  globalThis.playerObj = new Plyr(player.value);
});

function streamFile(name) {
  const seperator = route.path === '/' ? '' : '/';
  const path = `/streaming${route.path}${seperator}${name}`;
  videoPath.value = path;
  nextTick(() => {
    globalThis.playerObj.once('loadeddata', () => {
      globalThis.playerObj.play();
      globalThis.playerObj.fullscreen.enter();
    });
  });
}

function downloadFile(name) {
  const seperator = route.path === '/' ? '' : '/';
  const path = `/api/download${route.path}${seperator}${name}`;

  var a = document.createElement('a');
  a.href = path;
  a.download = name;
  a.click();
}
</script>

<style lang="scss" scoped>
.empty-folder {
  font-size: max(3dvw, 22px);
  text-align: center;
  margin-top: 40dvh;
  i {
    font-size: max(3dvw, 22px);
  }
}
</style>

<style lang="scss">
#overlay-menu.dir-overlay-menu {
  min-width: 100px !important;

  transform: translate(40px, -10px);
}
</style>

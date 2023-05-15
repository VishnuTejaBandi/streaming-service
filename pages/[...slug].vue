<template>
  <template v-if="!loading">
    <DirectoryView v-if="items?.length" :items="items" @stream="streamFile" @download="downloadFile"></DirectoryView>
    <div v-else class="empty-folder">
      <i class="pi pi-folder-open"></i>
      Folder is empty
    </div>
  </template>
  <FullScreenLoader v-else></FullScreenLoader>

  <video ref="player" muted playsInline loop controls :src="videoPath" v-show="videoPath">
    <template v-if="subtitles.length">
      <track
        v-for="({ id, name }, index) in subtitles"
        :src="`/api/subtitles/download?fileId=${id}`"
        :label="name"
        :key="id"
        kind="captions"
        :srclang="`en${index}`"
        :default="index === 2"
      />
    </template>
  </video>
</template>

<script setup>
import Plyr from 'plyr';
const route = useRoute();
const player = ref(null);
const videoPath = ref(null);
const subtitles = ref([]);

const { pending: loading, data: items } = useFetch('/api/read-directory', {
  method: 'POST',
  body: {
    path: typeof route.params.slug === 'object' ? '/' + route.params.slug.join('/') : '/',
  },
});

function streamFile(name) {
  const seperator = route.path === '/' ? '' : '/';
  const path = `/streaming${route.path}${seperator}${name}`;
  videoPath.value = path;
  nextTick(async () => {
    globalThis.playerObj.once('loadeddata', () => {
      globalThis.playerObj.play();
      globalThis.playerObj.fullscreen.enter();
      globalThis.playerObj.currentTrack = -1;
    });

    subtitles.value = await $fetch('/api/subtitles', {
      method: 'POST',
      body: {
        fileName: name,
      },
    });

    setTimeout(() => {
      globalThis.playerObj.currentTrack = 0;
      if (player.value.textTracks[0]) {
        player.value.textTracks[0].mode = 'showing';
      }
    }, 200);
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

onMounted(() => {
  globalThis.playerObj = new Plyr(player.value, { captions: { update: true, language: 'en0' } });
});
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

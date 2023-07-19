<template>
  <template v-if="!loading">
    <Toast />

    <DirectoryView v-if="items?.length" :items="items" @stream="copyStreamLink" @download="downloadFile"></DirectoryView>

    <div v-else class="empty-folder">
      <i class="pi pi-folder-open"></i>
      Folder is empty
    </div>
  </template>

  <FullScreenLoader v-else></FullScreenLoader>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import copy from 'copy-to-clipboard';
const toast = useToast();
const route = useRoute();

const { pending: loading, data: items } = useFetch('/api/read-directory', {
  method: 'POST',
  body: {
    path: typeof route.params.slug === 'object' ? '/' + route.params.slug.join('/') : '/',
  },
});

function downloadFile(name) {
  const separator = route.path === '/' ? '' : '/';
  const path = `/api/download${route.path}${separator}${name}`;

  var a = document.createElement('a');
  a.href = path;
  a.download = name;
  a.click();
}

function copyStreamLink(name) {
  const separator = route.path === '/' ? '' : '/';
  const path = `${window.location.origin}/streaming${route.path}${separator}${name}`;

  copy(encodeURI(path), {
    debug: true,
    message: 'Press #{key} to copy',
  });
  toast.add({ severity: 'info', summary: 'Info', detail: 'Url Has Been Copied To Clipboard', life: 3000 });
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

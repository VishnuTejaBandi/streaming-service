<template>
  <DataView :value="items" class="items-list prevent-select" sortField="name" :sortOrder="sortOrder.value">
    <template #header>
      <Dropdown :options="sortOptions" optionLabel="label" placeholder="Sort" v-model="sortOrder" />
    </template>

    <template #list="{ data: { name, type } }">
      <DirectoryItem :name="name" :type="type" @stream="$emit('stream', name)" @download="$emit('download', name)"></DirectoryItem>
    </template>
  </DataView>
</template>

<script setup>
defineProps({
  items: Array,
});

const sortOptions = [
  { label: 'Name Asc', value: 1 },
  { label: 'Name Desc', value: -1 },
];
const sortOrder = ref({});
</script>

<style lang="scss" scoped>
.items-list {
  &:deep(.p-dataview-content) {
    background: none;
  }
}
</style>

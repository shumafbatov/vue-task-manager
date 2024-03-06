<template>
  <div class="item">
    <span class="item__li"
      ><span>{{ task }}</span></span
    >
    <span class="item__actions">
      <base-button iconName="edit" @action="$emit('action', { name: 'edit' })" />

      <base-button iconName="remove" @action="$emit('action', { name: 'remove' })" />
    </span>
  </div>
</template>
<script lang="ts" setup>
import BaseButton from '@/components/base/buttons/BaseButton.vue'

interface Props {
  task: string
}

withDefaults(defineProps<Props>(), {
  task: ''
})
</script>
<style lang="less" scoped>
.item {
  &__li {
    display: inline-block;
    width: 80%;
  }
  &__text {
    width: 80%;
  }
  &__actions {
    margin-left: 10px;
  }
}
</style>

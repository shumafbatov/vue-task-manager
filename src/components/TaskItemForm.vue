<template>
  <div class="task-item">
    <div class="task-item__input">
      <input type="text" v-model="value" v-on:keyup.enter="onAction" />
    </div>
    <div v-if="value" class="task-item__actions">
      <base-button iconName="play" @action="onAction" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseButton from '@/components/base/buttons/BaseButton.vue'
import { ref } from 'vue'
import { OperationList } from '@/types';

const value = ref('')
interface OnAction {
  name: OperationList
  value: string
}
interface Emit {
  (e: 'action', data: OnAction): void
}

const emit = defineEmits<Emit>()

const onAction = () => {
  if (value.value) {
    emit('action', { name: OperationList.save, value: value.value })
    value.value = ''
  }
}
</script>

<style lang="less" scoped>
.task-item {
  display: flex;
  &__input,
  &__input input {
    width: 99%;
  }
}
</style>

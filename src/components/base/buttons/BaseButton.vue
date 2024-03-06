<template>
  <span>
    <button :class="['button', { 'only-icon': computedIconButton }]" @click="$emit('action')">
      <span v-if="text">{{ text }}</span>
      <img
        v-if="iconName"
        :src="getImg(iconName)"
        :width="iconWidth"
        :height="iconHeight"
        :alt="iconName || 'icon'"
        :title="iconName || 'icon'"
      />
    </button>
  </span>
</template>

<script lang="ts" setup>
import IconEdit from '@/assets/svg/edit.svg'
import IconRemove from '@/assets/svg/remove.svg'
import IconPlay from '@/assets/svg/play.svg'
import { computed } from 'vue'

interface Props {
  text?: string
  iconName?: keyof IconList
  iconWidth?: string
  iconHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  iconWidth: '16',
  iconHeight: '16'
})

interface IconList {
  edit: Function
  play: Function
  remove: Function
}
const getImg = (iconName: keyof IconList) => {
  const iconList: IconList = {
    edit: () => IconEdit,
    play: () => IconPlay,
    remove: () => IconRemove
  }

  if (iconName) {
    return iconList[iconName]()
  }
}

const computedIconButton = computed(() => props.iconName && !props.text)
</script>
<style lang="less" scoped>
.button {
  cursor: pointer;
  margin-left: 5px;
  padding-top: 3px;
  min-height: 20px;
}

.button.only-icon {
  border: none;
  width: auto;
  height: 16px;
  overflow: visible;
  background: transparent;
  && img {
    opacity: 0.3;
    transition: opacity 0.3s ease-in-out;
    margin: auto 0;
  }
  && img:hover {
    opacity: 1;
  }
}
.button-content {
  margin: auto 0;
}
</style>

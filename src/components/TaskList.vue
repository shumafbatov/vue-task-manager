<template>
  <div>
    <h1>Task list</h1>
    <ul v-if="tasksStore.getTasks.length">
      <li v-for="(task, i) in tasksStore.getTasks" :key="i">
        <TaskItem
          v-show="idEditing !== i"
          :task="task"
          @action="onAction({ ...$event, index: i })"
        />
        <TaskItemForm
            v-if="idEditing === i"
            @action="onAction({ ...$event, index: i })"
        />
      </li>
    </ul>

    <TaskItemForm @action="onAction($event)" />
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '@/stores/task'
import TaskItemForm from '@/components/TaskItemForm.vue'
import { OperationList } from "@/types";

const tasksStore = useTasksStore()

const idEditing = ref(-1)

interface OnActionParam {
  name: OperationList
  value: string
  index?: number
}

const onAction = ({ name, value, index }: OnActionParam) => {
  const operationFunctions = {
    save: () => {
      if (idEditing.value >= 0) {
        tasksStore.adding(value, index)
        idEditing.value = -1
      } else {
        tasksStore.adding(value)
      }
    },
    edit: () => {
      if (index !== undefined) {
        idEditing.value = index
      }
    },
    remove: () => {
      if (index !== undefined) {
        tasksStore.removeTaskById(index)
        idEditing.value = -1
      }
    }
  }

  const fn = operationFunctions[name]

  if (typeof fn === 'function') {
    fn()
    tasksStore.saveTasks()
  }
}

onMounted(() => {
  tasksStore.init()
})
</script>
<style scoped>
ul {
  padding: 0;
  min-width: 400px;
  max-width: 800px;
}
li {
  list-style-type: none;
}
</style>

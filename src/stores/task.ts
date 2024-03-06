import { defineStore } from 'pinia'
import { tasks } from '@/stores/constants'

interface TaskStoreState {
  tasks: string[]
}
export const useTasksStore = defineStore('task', {
  state: (): TaskStoreState => ({
    tasks: []
  }),
  getters: {
    getTasks: (state) => state.tasks
  },
  actions: {
    init() {
      this.fetchTasks()

      if (
        !Array.isArray(this.getTasks) ||
        (Array.isArray(this.getTasks) && this.getTasks.length === 0)
      ) {
        this.tasks = tasks
      }
    },
    adding(name: string, index: number = -1) {
      if (index >= 0) {
        this.tasks[index] = name
      } else {
        this.tasks.push(name)
      }
    },
    saveTasks() {
      localStorage.setItem('task-list', JSON.stringify(this.getTasks))
    },
    fetchTasks() {
      const tasks = localStorage.getItem('task-list')
      if (tasks) {
        this.tasks = JSON.parse(tasks)
      }
    },
    removeTaskById(id: number) {
      this.tasks.splice(id, 1)
    }
  }
})

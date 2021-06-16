<template>
  <v-container>
    <v-app-bar>
      <v-container>TodoList
        <v-btn @click="$router.push('/create-task')" text class="mx-2">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
      <v-spacer></v-spacer>
      <v-text-field append-outer-icon="mdi-magnify" v-model="search" class="mt-3"></v-text-field>
    </v-app-bar>
    <v-expansion-panels class="my-2" accordion>
      <v-expansion-panel v-for="(task, i) in sortedList" :key="i">
        <v-expansion-panel-header @click="getFact(task)">
          <div class="d-flex justify-start align-center">
            {{ task.title }}
            <v-btn @click.stop="" @click="editTask(task.id)" class="d-flex mx-1" text>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click.stop="" @click="removeTask(task.id)" class="d-flex mx-1" text>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <div class="d-flex justify-end">
            Дата создания: {{ task.created }} Дедлайн: {{ task.deadline }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Описание: {{ task.description }}
          <v-spacer></v-spacer>
          Рандомный факт: {{ task.fact }}
          <v-spacer></v-spacer>
          <v-btn v-if="task.file.length!==0" @click="downloadFiles(task)" class="my-3">Скачать файл</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  mounted() {
    this.fetchTasks()
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters(['allTasks']),
    sortedList() {
      return this.allTasks.filter(item => {
            return item.title.toLowerCase().includes(this.search.toLowerCase()) ||
                item.description.toLowerCase().includes(this.search.toLowerCase())
          }
      );
    }
  },
  methods: {
    ...mapActions(['deleteTask', 'fetchTasks', 'getFact']),
    editTask(i) {
      this.$router.push({name: 'EditTask', params: {id: this.allTasks[i].id}})
      console.log(this.allTasks[i])
    },
    removeTask(i) {
      this.deleteTask(i)
    },
    downloadFiles(task) {
      // window.open(JSON.stringify((task.file)))
      // window.location.href = task.file
      const win = window.open()
      win.document.write('<iframe src="' + task.file + '" frameborder="0" ' +
          'style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" ' +
          'allowfullscreen></iframe>')
    }
  }
}
</script>
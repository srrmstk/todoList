<template>
  <v-container>
    <v-form @submit="onSubmit">
      <v-card>
        <v-card-title>Редактирование задачи</v-card-title>
        <v-card-text>
          <v-col class="text-center">
            <v-text-field
                outlined
                label="Введите название задачи"
                v-model.trim="form.title"
                :error-messages="titleError"
            >
            </v-text-field>
            <v-text-field
                outlined
                label="Введите описание задачи"
                v-model.trim="form.description"
                :error-messages="descriptionError"
            >
            </v-text-field>
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="form.deadline"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="form.deadline"
                    label="Выберите желаемый дедлайн"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="form.deadline"
                  no-title
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(form.deadline)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-file-input show-size counter chips label="Прикрепите файл"
                          v-model="uploadFile"></v-file-input>
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="$router.push('/')">Отмена</v-btn>
          <v-btn type="submit">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  beforeMount() {
    this.form.id = this.taskById(this.$route.params.id).id
    this.form.created = this.taskById(this.$route.params.id).created
    this.form.title = this.taskById(this.$route.params.id).title
    this.form.description = this.taskById(this.$route.params.id).description
    this.form.deadline = this.taskById(this.$route.params.id).deadline
    // this.form.file = this.taskById(this.$route.params.id).file
  },
  data() {
    return {
      form: {
        id: "",
        created: "",
        title: "",
        description: "",
        deadline: "",
        file: ""
      },
      uploadFile: [],
      menu: false
    }
  },
  validations: {
    form: {
      title: {required},
      description: {required}
    }
  },
  methods: {
    ...mapActions(['updateTask']),
    onSubmit(e) {
      e.preventDefault()
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        if (this.uploadFile.length !== 0) {
          this.encodeBase64()
        } else
          this.updateTask(this.form)
        this.$router.push('/')
      } else console.log("Validation error!")
    },
    encodeBase64() {
      const reader = new FileReader()
      reader.readAsDataURL(this.uploadFile)
      reader.onload = () => {
        console.log('file to base64 result:' + reader.result)
        this.form.file = reader.result.toString()
        this.updateTask(this.form)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  },
  computed: {
    ...mapGetters(['allTasks', 'taskById']),
    titleError() {
      if (this.$v.form.title.$dirty && !this.$v.form.title.required) {
        return 'Обязательное поле'
      } else return ''
    },
    descriptionError() {
      if (this.$v.form.description.$dirty && !this.$v.form.description.required) {
        return 'Обязательное поле'
      } else return ''
    }
  }
}
</script>
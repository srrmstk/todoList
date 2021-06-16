import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: []
    },
    getters: {
        allTasks: state => state.tasks,
        taskById: state => id => state.tasks.find(task => task.id === id)
    },
    actions: {
        async getFact({commit}, payload) {
            const datediff = Date.parse(payload.deadline) - Date.parse(new Date().toISOString())
            const response = await axios.get(`http://numbersapi.com/${datediff}`)
            payload.fact = response.data
            commit('updTask', payload)
        },
        fetchTasks({commit}) {
            const data = localStorage.getItem('tasks')
            commit('setTasks', JSON.parse(data))
        },
        deleteTask({commit}, payload) {
            commit('removeTask', payload)
        },
        addTask({commit}, payload) {
            console.log(payload)
            commit('newTask', payload)
        },
        updateTask({commit}, payload) {
            commit('updTask', payload)
        }
    },
    mutations: {
        setTasks: (state, tasks) => state.tasks = tasks,
        removeTask: (state, id) => {
            state.tasks = state.tasks.filter((task) => task.id !== id)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        newTask: (state, task) => {
            state.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        updTask: (state, updatedTask) => {
            const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask)
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    }
})
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PacientView from '../views/PatientView.vue'
import PacientAdd from '../views/PatientAddView.vue'
import PatientProfileView from '../views/PatientProfileView.vue'
import PacientEdit from '../views/PatientEditView.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PatientView',
    component: PacientView, // PacientView is a component
  },
  {
    path: '/patientadd',
    name: 'PatientAdd',
    component: PacientAdd, // PacientAdd is a component
  },
  {
    path: '/patientedit',
    name: 'PatienteEdit',
    component: PacientEdit, // PacientEdit is a component
  },
  {
    path: '/patientprofile',
    name: 'PatientProfileView',
    component: PatientProfileView, // PatientProfileView is a component
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

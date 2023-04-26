import { reactive, readonly } from 'vue'

const state = reactive({
  userId: null
})

interface UserData {
    id: number | null;
    name: string | null;
    motherName: string | null;
    birthdate: Date | null;
    cpf: string | null;
    cns: string | null;
    cep: string | null;
    street: string | null;
    number: string | null;
    neighborhood: string | null;
    city: string | null;
    state: string | null;
    gender: string | null;
  }
  
const userData = reactive<UserData>({
  id: null,
  name: null,
  motherName: null,
  birthdate: null,
  cpf: null,
  cns: null,
  cep: null,
  street: null,
  number: null,
  neighborhood: null,
  city: null,
  state: null,
  gender: null,
})

export default {
  setUserId(userId: null) {
    state.userId = userId
  },

  getUserId() {
    return readonly(state).userId
  },

  setUserData(userState: UserData){
    userData.id = userState.id 
    userData.name = userState.name
    userData.motherName = userState.motherName
    userData.birthdate = userState.birthdate
    userData.cpf = userState.cpf
    userData.cns = userState.cns
    userData.cep = userState.cep
    userData.street = userState.street
    userData.number = userState.number
    userData.neighborhood = userState.neighborhood
    userData.city = userState.city
    userData.state = userState.state  
    userData.gender= userState.gender  
 },
 
  getUserData() {
    return readonly(userData) 
 }

}
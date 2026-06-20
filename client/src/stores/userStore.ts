import axios from "axios";
import { defineStore } from "pinia";

interface userData {
  token: string,
  username: string,
  name: string
}

interface userLogin {
  username: string,
  password: string
}

const API_URL = 'http://192.168.1.146:3001/api/login'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    test: null as userData | null
  }),
  actions: {
    async loginUser(data: userLogin){
      try{
        const res = await axios.post(API_URL, data)
        this.test = res.data
      } catch(error){
        console.log('error')
      }
    }
  }
})
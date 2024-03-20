import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, signOut } from '@/api/login';


export const useUserStore = defineStore('user', () => {
  const lang = ref('zh_TW')
  const token = ref(getToken())
  const loginFun = (accountInfo) => {
    return new Promise((resolve, reject) => {
      login(accountInfo)
        .then((res) => {
          const { data } = res
          token.value = data.response.token
          setToken(data.response.token)
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }
  const signOutFun = () => {
    return new Promise((resolve, reject) => {
      signOut()
        .then((res) => {
          token.value = undefined
          removeToken()
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }
  return {
    token,
    loginFun,
    signOutFun,
    lang
  }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const login = (accountInfo) => {
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
  const signOut = () => {
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
    login,
    signOut
  }
})

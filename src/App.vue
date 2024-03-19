<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

const router = useRouter()
const user = useUserStore()
const { signOutFun } = user
const signOut = async () => {
  const { data } = await signOutFun()
  if (data.status === 'success') {
    router.push('/login')
  }
}
</script>

<template>
  <header class="px-8 py-5 relative bg-white flex justify-between items-center border border-light-gray">
    <img alt="Vue logo" class="logo" src="@/assets/images/logo.png" width="200" />
    <div v-if="$route.path !== '/login'" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span
        class="border border-success-medium text-success-medium rounded-full pr-1.5 pl-4 text-xs relative before:absolute before:rounded-full before:w-1.5 before:h-1.5 before:bg-success-medium before:left-1.5 before:top-1/2 before:-translate-y-1/2">online</span>
    </div>
    <div class="flex items-center space-x-4 text-sm font-medium">
      <ul class="flex items-center  space-x-4 font-semibold">
        <li>最新活動</li>
        <li>個人專區</li>
      </ul>
      <div v-if="user.token" class="hover:border-black/20 rounded px-4 py-3 cursor-pointer" :class="{
      'bg-main text-white': $route.path === '/login',
      'border border-main': $route.path !== '/login'
    }" @click="signOut">
        登出
      </div>
    </div>
  </header>
  <main class="flex-1"
    :class="{ flex: $route.path === '/login', 'bg-[url(@/assets/images/bg.png)] bg-cover bg-no-repeat bg-center': $route.path !== '/login' }">
    <RouterView />
  </main>
  <footer class="bg-main py-4 text-center text-white">
    台灣金融研究院 版權所有 © 2024 Taiwan Academy of Banking and Finance
  </footer>
</template>

<style scoped></style>

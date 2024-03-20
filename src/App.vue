<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';
import { setLocale } from '@vee-validate/i18n';
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from "pinia";
const { locale } = useI18n();
const router = useRouter()
const user = useUserStore()
const { signOutFun } = user
const { lang } = storeToRefs(user)
const signOut = async () => {
  const { data } = await signOutFun()
  if (data.status === 'success') {
    router.push('/login')
  }
}

const languages = ref([
  { value: '繁體中文', key: 'zh_TW' },
  { value: 'English', key: 'en' },
])
const langData = ref('zh_TW')
const currentLang = computed(() => {
  const array = languages.value.reduce((prev, lang) => {
    const obj = { [`${lang.key}`]: lang.value };
    return { ...prev, ...obj };
  }, {});
  return array[langData.value]
})
const show = ref(false)
const toggleLangSelect = () => {
  show.value = !show.value
}
const langSelectHide = () => {
  show.value = false
}

locale.value = 'en'

const setLang = (langVal) => {
  langData.value = langVal.key
  locale.value = langVal.key
  localStorage.setItem('locale', langVal.key);
  lang.value = langVal.key
  if (langVal.key === 'zh_TW') {
    setLocale('zh_TW')
  } else {
    setLocale('en')
  }
}

onMounted(() => {
  langData.value = localStorage.getItem('locale') ?? 'zh_TW';
  locale.value = langData.value
  lang.value = langData.value
  if (langData.value === 'zh_TW') {
    setLocale('zh_TW')
  } else {
    setLocale('en')
  }
})
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
        {{ $t('logout') }}
      </div>
      <div class="relative inline-block text-left">
        <div>
          <button id="menu-button" v-click-outside="langSelectHide" type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            aria-expanded="true" aria-haspopup="true" @click="toggleLangSelect">
            {{ currentLang }}
            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div v-show="show"
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <li v-for="language of languages" :key="language.key"
              class="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" tabindex="-1"
              @click="setLang(language)">
              {{ language.value }}
            </li>
          </div>
        </div>
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

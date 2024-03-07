<template>
    <div class="flex-1 bg-[url(@/assets/images/login-bg.png)] bg-center bg-cover bg-no-repeat"></div>
    <div class="flex-1 flex justify-center items-center">
        <div>
            <h1 class="text-[28px] mb-10 text-center">
                多功能數位靶場<span class="block text-[34px] font-semibold">攻擊演練與數位鑑識競賽</span>
            </h1>
            <div class="">
                <form>
                    <label class="block mb-3.5">
                        <!-- <span class="text-sm mb-1 block font-medium">帳號</span> -->
                        <input v-model="email" type="email"
                            class="w-full border border-[#DEE2EB] focus:border-[#DEE2EB] focus:shadow-none focus:ring-0 rounded px-4 py-3 placeholder:text-[#ccc] placeholder:font-medium"
                            placeholder="請輸入帳號" />
                        <!-- <span class="text-sm text-red-medium">請輸入帳號</span> -->
                    </label>
                    <label class="block mb-8">
                        <!-- <span class="text-sm mb-1 block font-medium">密碼</span> -->
                        <input v-model="password" type="password"
                            class="w-full border border-[#DEE2EB] focus:border-[#DEE2EB] focus:shadow-none focus:ring-0 rounded px-4 py-3 placeholder:text-[#ccc] placeholder:font-medium"
                            placeholder="請輸入密碼" />
                        <!-- <span class="text-sm text-red-medium">請輸入密碼</span> -->
                    </label>
                    <button type="submit" class="bg-main py-3 w-full rounded text-white hover:bg-primary-dark">
                        登入
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const email = ref(null)
const password = ref(null)
</script>

<style lang="scss" scoped></style>
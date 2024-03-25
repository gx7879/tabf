<template>
  <div class="p-10 max-w-[1440px] mx-auto">
    <div class="flex gap-10">
      <div class="flex-1">
        <div class="text-2xl font-semibold mb-3">{{ $t('activity') }}</div>
        <div class="grid grid-cols-4">
          <div class="rounded bg-white overflow-hidden shadow-[0_4px_24px_0_rgba(38,50,56,0.12)] space-y-4 p-4">
            <div class="w-full rounded overflow-hidden">
              <img class="w-full object-cover" src="@/assets/images/activity-list.png" alt="">
            </div>
            <p class="text-lg font-semibold">
              <span class="text-sm font-normal block">2023/03/31</span>
              2023 第一季 攻擊演練與數位鑑識競賽
            </p>
            <button type="button" class="rounded w-full text-sm font-normal block bg-main text-white py-4">more</button>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex space-x-3">
            <div class="w-11 h-11 flex justify-center items-center rounded cursor-pointer hover:bg-main hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div class="space-x-2 flex *:w-11 *:h-11 *:flex *:justify-center *:items-center *:rounded">
              <div class="cursor-pointer bg-main text-white hover:bg-main hover:text-white">1</div>
              <div class="cursor-pointer hover:bg-main hover:text-white">2</div>
              <div class="cursor-pointer hover:bg-main hover:text-white">3</div>
            </div>
            <div class="w-11 h-11 flex justify-center items-center rounded cursor-pointer hover:bg-main hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { memberData } from '@/api/member';

const member = ref({})
const activity = ref([])
const name = ref('')
onBeforeMount(async () => {
  try {
    const { data } = await memberData();
    if (data.status === 'success') {
      member.value = data.response.member;
      activity.value = data.response.activity;
      name.value = data.response.member.name;
    }
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <div class="p-10 max-w-[1440px] mx-auto">
    <div class="flex gap-10">
      <div class="flex-1">
        <div class="text-2xl font-semibold mb-3">{{ $t('latestnews') }}</div>
        <div class="grid grid-cols-4 mb-10">
          <div v-for="activity of activityData" :key="activity.activity_id"
            class="rounded bg-white overflow-hidden shadow-[0_4px_24px_0_rgba(38,50,56,0.12)] space-y-4 p-4">
            <div class="w-full rounded overflow-hidden">
              <img class="w-full object-cover" src="@/assets/images/activity-list.png" alt="">
            </div>
            <p class="text-lg font-semibold">
              <span class="text-sm font-normal block">{{ activity.competition_start_datetime }}</span>
              {{ activity.name }}
            </p>
            <router-link custom v-slot="{ navigate }"
              :to="{ name: 'activity', params: { activityId: activity.activity_id } }">
              <button type="button" @click="navigate"
                class="rounded w-full text-sm font-normal block bg-main text-white py-4">more</button>
            </router-link>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex space-x-3">
            <div class="w-11 h-11 flex justify-center items-center rounded"
              :class="{ 'hover:bg-main hover:text-white cursor-pointer': currentPage > 1 }" @click="pageTo('prev')">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div class="space-x-2 flex *:w-11 *:h-11 *:flex *:justify-center *:items-center *:rounded text-sm">
              <div v-for="page of totalPage" :key="page" class="cursor-pointer hover:bg-main hover:text-white"
                :class="{ 'bg-main text-white': page === currentPage }" @click="pageTo(page)">{{ page }}</div>
              <!-- <div class="cursor-pointer hover:bg-main hover:text-white">2</div>
              <div class="cursor-pointer hover:bg-main hover:text-white">3</div> -->
            </div>
            <div class="w-11 h-11 flex justify-center items-center rounded"
              :class="{ 'cursor-pointer hover:bg-main hover:text-white': currentPage < totalPage }" @click="pageTo('next')">
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
import { activityList } from '@/api/activity'

const activityData = ref([])
const currentPage = ref(1)
const totalPage = ref(1)
const getActivityList = async () => {
  try {
    const { data } = await activityList({ page: currentPage.value, limit: 8 });
    console.log(data)
    if (data.status === 'success') {
      activityData.value = data.response.activity_list
      totalPage.value = data.response.total_page
    }
  } catch (error) {
    console.log(error);
  }
}
const pageTo = (page) => {
  if (typeof page === 'string') {
    if (page === 'prev' && currentPage.value > 1) {
      currentPage.value -= 1
    } else if (page === 'next' && currentPage.value < totalPage.value) {
      currentPage.value += 1
    } else {
      return false
    }
  } else {
    currentPage.value = page
  }
  getActivityList()
}
onBeforeMount(() => {
  getActivityList()
})
</script>

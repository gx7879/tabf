<template>
  <div class="p-10 max-w-[1440px] mx-auto">
    <div class="flex gap-10">
      <div class="w-[355px]">
        <div class="text-lg font-semibold mb-3">{{ $t('welcomeback') }}</div>
        <div
          class="space-y-1 border border-light-gray rounded-lg overflow-hidden shadow-[0_4px_24px_0_rgba(30,50,50,0.12)]">
          <div class="bg-white px-4 py-1 flex items-center h-14 border-b border-light-gray">
            <div class="text-sm w-[100px] flex-shrink-0">{{ $t('name') }}</div>
            <div v-if="editStatus" class="flex-1 flex justify-end">
              <input v-model.trim="name" type="text" class="w-[143px] h-8 px-2 border border-netural-lighter rounded"
                placeholder="請輸入姓名" maxlength="24" />
              <!-- <img class="w-5" src="@/assets/images/check.svg" alt="" /> -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 ml-1 cursor-pointer text-black/20 stroke-current"
                fill="none" viewBox="0 0 32 32" @click="editToggle">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M27 9 13 23l-7-7" />
              </svg>
            </div>
            <div v-else class="flex-1 flex justify-end items-center">
              <span class="text-sm">{{ name }}</span>
              <!-- <img class="w-5" src="@/assets/images/pencil.svg" alt="" /> -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 ml-1 cursor-pointer text-black/20 stroke-current"
                fill="none" viewBox="0 0 32 32" @click="editToggle">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 27H6a1 1 0 0 1-1-1v-5.587a.987.987 0 0 1 .288-.7l15-15a1 1 0 0 1 1.424 0l5.576 5.574a1 1 0 0 1 0 1.425L12 27ZM27 27H12M17 8l7 7" />
              </svg>
            </div>
          </div>
          <div class="bg-white rounded-xl px-4 py-2 flex items-center h-14 justify-between">
            <div class="text-sm w-[100px] flex-shrink-0">{{ $t('PA') }}</div>
            <div class="text-sm break-all">{{ member.email }}</div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="text-2xl font-semibold mb-3">{{ $t('activity') }}</div>
        <div
          class="space-y-1 border border-light-gray rounded-lg overflow-hidden shadow-[0_4px_24px_0_rgba(30,50,50,0.12)]">
          <div v-for="item of activity" :key="item.activity_id"
            class="flex justify-between items-center bg-white px-6 py-4 border-b border-light-gray last:border-0">
            <div class="text-sm flex items-center font-medium">
              <div class="w-1 h-6 bg-main mr-4"></div>
              {{ new Date(item.activity_start_datetime).toLocaleDateString() }}&nbsp;&nbsp;{{
              item.activity_start_datetime.split(' ')[1]
            }}~{{ item.activity_end_datetime.split(' ')[1] }}
              <span class="text-sm ml-8 text-main font-semibold">{{ item.name }}</span>
            </div>
            <router-link v-slot="{ navigate }" :to="{ name: 'activity', params: { activityId: item.activity_id } }"
              custom>
              <button type="button" class="rounded bg-main px-4 py-3 text-white cursor-pointer hover:bg-primary-dark"
                @click="navigate">
                {{ $t('joinnow') }}
              </button>
            </router-link>
            <!-- <div class="rounded-full bg-primary-medium px-4 py-3 text-white cursor-pointer">進入活動</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { memberData, memberNameEdit } from '@/api/member';

const editStatus = ref(false)
const member = ref({})
const activity = ref([])
const name = ref('')
const oldVal = ref('')
const editToggle = async () => {
  if (editStatus.value) {
    if (name.value !== '') {
      try {
        const formData = new FormData();
        formData.append('name', name.value);
        const { data } = await memberNameEdit(formData);
        if (data.status !== 'success') {
          name.value = oldVal.value;
          oldVal.value = '';
        }
      } catch (error) {
        name.value = oldVal.value;
        oldVal.value = '';
      }
    }
  } else {
    oldVal.value = name.value;
  }

  editStatus.value = !editStatus.value
}
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


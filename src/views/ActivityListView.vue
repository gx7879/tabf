<template>
  <div class="p-10 max-w-[1440px] mx-auto">
    <div class="flex gap-10">
      <div class="flex-1">
        <div class="text-2xl font-semibold mb-3">{{ $t('activity') }}</div>
        <div class="grid grid-cols-4">
          <div class="border border-light-gray rounded-lg overflow-hidden shadow-[0_4px_24px_0_rgba(30,50,50,0.12)]">

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

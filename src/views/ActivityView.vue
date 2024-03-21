<template>
  <div class="flex gap-10 p-10 max-w-[1440px] mx-auto">
    <div class="w-[330px]">
      <h2 class="text-2xl font-semibold text-font-black">{{ activityData.name }}</h2>
      <span class="text-sm mb-3 block font-semibold text-font-black">{{
        activityData.description
      }}</span>
      <div v-if="activityData.competition_end_datetime && start" class="bg-white py-4 mb-10 flex">
        <template v-if="Object.keys(activityData).length > 0">
          <vue3-flip-countdown :deadline="activityData.competition_end_datetime" :flipAnimation="false"
            :showDays="false" :labels="{ hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS' }" mainColor="#fff"
            labelColor="#fff" countdownSize="40px" labelSize="16px" class="countdown-style"
            @timeElapsed="$router.go(-1)" />
        </template>
      </div>
      <h2 class="text-2xl font-semibold mb-3">{{ $t('ranking') }}</h2>
      <div class="bg-white rounded-lg border border-light-gray shadow-[0_4px_24px_0_rgba(30,50,50,0.12)] mb-10">
        <template v-if="!start">
          <div class="flex justify-center items-center flex-col py-7">
            <img class="mb-3" src="@/assets/images/rank-empty.png" alt="" />
            <div class="text-sm font-semibold">{{ $t('realtime') }}</div>
          </div>
        </template>
        <template v-else>
          <div class="space-y-1">
            <div v-for="(list, index) of teamList" :key="list.team_id"
              class="flex items-center border-b border-light-gray last:border-0 px-3">
              <div class="rounded-xl bg-white w-[42px] flex justify-center items-center">
                <template v-if="index + 1 > 3">
                  {{ index + 1 }}
                </template>
                <template v-else>
                  <img :src="awardsImg(index + 1)" alt="" />
                </template>
              </div>
              <div class="flex-1 ml-2">
                <div class="flex items-center" @click="toggleCollapse(index + 1)">
                  <div
                    class="rounded-xl bg-white px-4 pl-0 py-2 flex flex-1 items-center gap-2 justify-between font-semibold">
                    <div class="text-primary-medium text-sm">{{ list.name }}</div>
                    <div class="text-lg flex-shrink-0 basis-auto text-main">
                      {{ list.total_score ?? 0 }} 分
                    </div>
                  </div>
                  <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-[#ccc]"
                    :class="{ 'rotate-180': isRankCollapse === (index + 1) }">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg> -->
                </div>
                <!-- <Collapse :when="isRankCollapse === (index + 1)">
                  <div class="grid grid-cols-5 text-center border-t border-light-gray py-2 *:h-[38px] *:leading-[38px]">
                    <div
                      class="rounded-full col-span-5 grid grid-flow-col auto-cols-fr bg-gradient-to-r from-[#FFAC34] to-[#FFDC06] border-[3px] border-light-gray !h-auto">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                    </div>
                    <div class="bg-[url(@/assets/images/bg-rank.png)] bg-no-repeat bg-[length:26px_26px] bg-center">
                      6
                    </div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                  </div>
                </Collapse> -->
              </div>
            </div>
          </div>
        </template>
      </div>
      <h2 class="text-2xl font-semibold mb-3">{{ $t('connection') }}</h2>
      <div
        class="bg-main text-white px-4 py-2 h-14 text-sm font-semibold cursor-pointer flex justify-between items-center"
        :class="{ 'rounded-t-lg': isInfoCollapse, 'rounded-lg': !isInfoCollapse }"
        @click="isInfoCollapse = !isInfoCollapse">
        {{ playerData.team_name }}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6" :class="{ 'rotate-180': isInfoCollapse }">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      <Collapse :when="isInfoCollapse">
        <div class="rounded-b-lg text-sm font-medium bg-white space-y-1">
          <div class="flex justify-between last:border-0 border-b border-light-gray px-3 py-4">
            <div>{{ $t('vmaccount') }}</div>
            <span>{{ playerData.vm_account }}</span>
          </div>
          <div class="flex justify-between last:border-0 border-b border-light-gray px-3 py-4">
            <div>{{ $t('vmpassword') }}</div>
            <span>{{ playerData.vm_password }}</span>
          </div>
          <div class="flex justify-between last:border-0 border-b border-light-gray px-3 py-4">
            <div>{{ $t('vmaddress') }}</div>
            <span>{{ playerData.vm_ip }}</span>
          </div>
          <div class="flex justify-between last:border-0 border-b border-light-gray px-3 py-4">
            <div>{{ $t('vpnaccount') }}</div>
            <span>{{ playerData.vpn_account }}</span>
          </div>
          <div class="flex justify-between last:border-0 border-b border-light-gray px-3 py-4">
            <div>{{ $t('vpnpassword') }}</div>
            <span>{{ playerData.vpn_password }}</span>
          </div>
          <div class="flex justify-between last:border-0 border-b border-light-gray px-3 py-4">
            <div>{{ $t('vpnaddress') }}</div>
            <span>{{ playerData.vpn_ip }}</span>
          </div>
        </div>
      </Collapse>
    </div>
    <div class="flex-1">
      <div v-if="notifyData"
        class="px-3 py-4 bg-notice-blue rounded-md mb-3 border border-notice-border-blue flex items-start gap-x-2">
        <img src="@/assets/images/notice-icon.png" alt="" />
        {{ notifyData }}
      </div>
      <div class="text-2xl font-semibold mb-[5px] text-font-black">{{ $t('taskanswering') }}</div>
      <span class="text-sm text-font-black block mb-3">
        {{ $t('notify') }}
      </span>
      <div class="border border-light-gray shadow-[0_4px_24px_0_rgba(30,50,50,0.12)] rounded-lg overflow-hidden">
        <div class="flex px-6 py-4 gap-[15px] border-b border-light-gray"
          :class="{ 'bg-main': start, 'bg-white': !start }">
          <input v-model="answer" type="text" :placeholder="$t('answer')"
            class="rounded pl-3 flex-1 focus:border-primary-dark focus:ring-primary-dark" :class="{
        'bg-white border border-[#DEE2EB]': start,
        'bg-light-gray': !start
      }" />
          <button type="button" class="rounded px-3 text-center py-3" :class="{
        'bg-white text-font-black': start,
        'bg-black/20 cursor-default text-white': !start
      }" @click="submitAnswerFun">
            {{ $t('submit') }}
          </button>
        </div>
        <div v-if="!start" class="bg-white min-h-[645px] flex justify-center items-center">
          <div>
            <img src="@/assets/images/activity-empty.png" class="mb-10 mx-auto" alt="" />
            <p class="text-2xl font-semibold">競賽開始才會公布任務題目</p>
          </div>
        </div>
        <div v-else class="space-y-1">
          <div v-for="task of teamTaskSort" :key="task.task_id" class="rounded-xl bg-white">
            <div class="flex items-center px-6 py-4 space-x-4">
              <div class="w-6 h-6 rounded bg-main text-white text-center leading-6">
                {{ task.position }}
              </div>
              <div class="flex-1">
                {{ task.question }}
              </div>
              <svg v-if="task.hint === ''" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 cursor-pointer" fill="none"
                viewBox="0 0 28 28" @click="getHintFun(task)">
                <rect width="28" height="28" fill="#FE6418" rx="3" />
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.563 22.938h6.874M14 20.188v-4.813M11.25 12.625l2.75 2.75 2.75-2.75" />
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.763 17.352a6.832 6.832 0 0 1-2.638-5.372c-.017-3.73 2.982-6.832 6.712-6.918a6.875 6.875 0 0 1 4.408 12.28 2.08 2.08 0 0 0-.807 1.642v.516a.688.688 0 0 1-.688.688h-5.5a.688.688 0 0 1-.687-.688v-.516a2.097 2.097 0 0 0-.8-1.633v0Z" />
              </svg>
              <div v-else class="rounded-[3px] w-7 h-7 bg-[#FFD1D1] text-center text-red-medium leading-7">
                -{{ task.hint_score }}
              </div>
              <div v-if="task.answer === ''" class="w-7 h-7 rounded-[3px] border border-netural-lighter"></div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 mr-4" fill="none" viewBox="0 0 28 28">
                <rect width="28" height="28" fill="#2EB774" rx="3" />
                <path fill="#fff"
                  d="M8.445 14.668a.9.9 0 1 0-1.303 1.242l3.573 3.745a.9.9 0 0 0 1.335-.036L20.64 9.582a.9.9 0 0 0-1.367-1.17l-7.656 8.944a.4.4 0 0 1-.594.016l-2.58-2.704Z" />
              </svg>
            </div>
            <div v-if="task.hint || task.answer" class="bg-[#f7f7f7]">
              <div v-if="task.hint" class="ml-16 pt-4 pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 mr-4" fill="none" viewBox="0 0 28 28">
                  <rect width="28" height="28" fill="#FE6418" rx="3" />
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.563 22.938h6.874M14 20.188v-4.813M11.25 12.625l2.75 2.75 2.75-2.75" />
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.763 17.352a6.832 6.832 0 0 1-2.638-5.372c-.017-3.73 2.982-6.832 6.712-6.918a6.875 6.875 0 0 1 4.408 12.28 2.08 2.08 0 0 0-.807 1.642v.516a.688.688 0 0 1-.688.688h-5.5a.688.688 0 0 1-.687-.688v-.516a2.097 2.097 0 0 0-.8-1.633v0Z" />
                </svg>
                <div class="flex-1">
                  {{ task.hint }}
                </div>
              </div>
              <div v-if="task.answer" class="ml-16 pt-2 pb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 mr-4" fill="none" viewBox="0 0 28 28">
                  <rect width="28" height="28" fill="#2EB774" rx="3" />
                  <path fill="#fff"
                    d="M8.445 14.668a.9.9 0 1 0-1.303 1.242l3.573 3.745a.9.9 0 0 0 1.335-.036L20.64 9.582a.9.9 0 0 0-1.367-1.17l-7.656 8.944a.4.4 0 0 1-.594.016l-2.58-2.704Z" />
                </svg>
                <div class="flex-1">
                  {{ task.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Notice v-model:show="show" @confirm="confirmHint"></Notice>
  </div>
</template>

<script setup>
import Notice from '@/components/Partials/Notice.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Collapse } from 'vue-collapsed'
import { activity, submitAnswer, getHint } from '@/api/activity'
import { useI18n } from "vue-i18n";
const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const now = ref(new Date())
const activityData = ref({})
const playerData = ref({})
const teamTask = ref([])
const notifyData = ref('')
const start = computed(() => {
  return new Date(activityData.value.competition_start_datetime) < new Date(now.value);
})
const activityIntervalId = ref(null)
const timeComing = ref(null)
const timeStart = () => {
  if (start.value) {
    window.clearInterval(timeComing.value);
    activityIntervalId.value = window.setInterval(async () => {
      await getActivity();
    }, 10000);
  } else {
    console.log(t('competitionnotstartedyet'));
  }
}

const show = ref(false)
const answer = ref('')
const isRankCollapse = ref(1)
const toggleCollapse = (i) => {
  if (!isRankCollapse.value || (isRankCollapse.value && isRankCollapse.value !== i)) {
    isRankCollapse.value = i
  } else {
    isRankCollapse.value = null
  }
}

const isInfoCollapse = ref(true)

const awardsImg = (index) => {
  switch (index) {
    case 1:
      return new URL(`@/assets/images/award-1.png`, import.meta.url).href
    case 2:
      return new URL(`@/assets/images/award-2.png`, import.meta.url).href
    case 3:
      return new URL(`@/assets/images/award-3.png`, import.meta.url).href
    default:
      break
  }
}



const teamTaskSort = computed(() => {
  const teamTaskDataCopy = teamTask.value
  return teamTaskDataCopy.sort((a, b) => a.position - b.position) ?? []
})
const teamList = computed(() => {
  const activityDataCopy = activityData.value
  return activityDataCopy?.team_list?.sort((a, b) => Number(b.total_score) - Number(a.total_score))
})

const getActivity = async () => {
  const { activityId } = route.params
  try {
    const { data } = await activity(activityId)
    if (data.status === 'success') {
      const { activity, player, team_task, notify } = data.response
      activityData.value = activity
      playerData.value = player
      teamTask.value = team_task
      notifyData.value = notify
    }
  } catch (error) {
    console.log(error)
  }
}

const taskData = ref({})
const getHintFun = (task) => {
  if (task.answer) return
  taskData.value = task
  show.value = true
}
const confirmHint = async () => {
  try {
    show.value = false
    const { data } = await getHint(taskData.value.task_id)
    if (data.status === 'success' && data.response) {
      getActivity()
    } else if (data.code === 4010) {
      router.go(-1)
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.log(error)
  } finally {
    taskData.value = {}
  }
}
const submitAnswerFun = async () => {
  try {
    if (teamTask.value.length === 0) return
    const { activityId } = route.params
    if ((answer.value ?? '') !== '') {
      const formData = new FormData()
      formData.append('answer', answer.value)
      const { data } = await submitAnswer(activityId, formData)
      if (data.status && data.response) {
        answer.value = ''
        getActivity()
      } else if (data.code === 4010) {
        router.go(-1)
      } else {
        throw new Error(data.message)
      }
    } else {
      // eslint-disable-next-line no-alert
      alert(t('enteranswerfirst'))
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getActivity()
  timeComing.value = window.setInterval(timeStart, 1000);
})

// const stopWatch = watch(() => activityData.value.activity_start_datetime, (newValue, oldValue) => {
//   const now = new Date();
//   console.log(newValue, oldValue, new Date(newValue) < now)
//   if (new Date(newValue) < now) {
//     console.log(t('competitionnotstartedyet'));
//   } else {
//     activityIntervalId.value = window.setInterval(async () => {
//       await getActivity();
//     }, 10000);
//   }
// })

onUnmounted(() => {
  window.clearInterval(timeComing.value);
  window.clearInterval(activityIntervalId.value);
})
</script>

<style lang="scss" scoped>
.countdown-style {
  :deep(.flip-clock__piece) {
    @apply bg-main text-white min-w-24 rounded-3xl px-2 py-3;
  }

  :deep(.flip-card__top),
  :deep(.flip-card__bottom),
  :deep(.flip-card__back-bottom),
  :deep(.flip-card__back::before),
  :deep(.flip-card__back::after) {
    @apply bg-main text-white;
  }

  .flip-card__bottom,
  .flip-card__back-bottom,
  .flip-card__bottom-4digits,
  .flip-card__back-bottom-4digits {
    border-color: #fff;
    @apply bg-main text-white;
  }
}
</style>

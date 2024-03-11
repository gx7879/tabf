<template>
  <div class="flex gap-10 p-10 max-w-[1440px] mx-auto">
    <div class="w-[330px]">
      <h2 class="text-lg font-semibold">2024 第一季數位鑑識競賽</h2>
      <span class="text-sm text-[#ccc] mb-3 block">2023/3/31 (五) 14:00 ~ 18:00，競賽倒數</span>
      <div class="bg-white py-4 mb-10">
        <vue3-flip-countdown :showDays="false" :labels="{ hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS' }"
          countdownSize="40px" labelSize="16px" class="countdown-style" @timeElapsed="$router.go(-1)" />
        <!-- <flip-countdown :deadline="activity.competition_end_datetime"
            :labels="{ days: 'DAYS', hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS' }" countdown-size="32px"
            label-size="16px" class="countdown-style" @timeElapsed="$router.go(-1)"></flip-countdown> -->
      </div>
      <h2 class="text-lg font-semibold mb-3">我的連線資訊</h2>
      <div v-if="player.team_name && start" class="rounded-xl bg-white px-4 py-2 text-sm font-semibold mb-2">
        123
      </div>
      <div v-if="start" class="rounded-xl p-4 text-sm font-medium bg-white space-y-1 mb-10">
        <div class="flex justify-between">
          <div>VPN IP位址</div>
          <span>123</span>
        </div>
        <div class="flex justify-between">
          <div>VPN 登入帳號</div>
          <span>123</span>
        </div>
        <div class="flex justify-between">
          <div>VPN 登入密碼</div>
          <span>123</span>
        </div>
        <div class="border-t border-netural-lighter"></div>
        <div class="flex justify-between">
          <div>虛擬機 IP位址</div>
          <span>
            123
          </span>
        </div>
        <div class="flex justify-between">
          <div>Kali Linux 用戶帳號</div>
          <span>kail</span>
        </div>
        <div class="flex justify-between">
          <div>Kali Linux 用戶密碼</div>
          <span>kail</span>
        </div>
      </div>
      <h2 class="text-lg font-semibold mb-3">競賽排行榜</h2>
      <div class="rounded-xl bg-white px-4 py-2 text-sm font-semibold mb-2">競賽過程中將會即時更新排名</div>
      <div v-if="start" class="space-y-1">
        <div v-for="(list, index) of teamList" :key="list.team_id" class="flex gap-1">
          <div class="rounded-xl bg-white w-[42px] flex justify-center items-center">
            <template v-if="index + 1 > 3">
              {{ index + 1 }}
            </template>
            <template v-else>
              <img :src="awardsImg(index + 1)" alt="" />
            </template>
          </div>
          <div class="rounded-xl bg-white px-4 py-2 flex flex-1 items-center gap-2 justify-between font-semibold">
            <div :class="{ 'text-primary-medium': list.team_id === player.team_id }">{{ list.name }}</div>
            <div :class="{ 'text-success-medium': list.team_id === player.team_id }"
              class="text-lg flex-shrink-0 basis-auto">
              {{ list.total_score ?? 0 }} 分
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <div v-if="notify" class="px-6 py-4 bg-white rounded-md mb-3 border-l-[6px] border-red-medium">
        {{ notify }}
      </div>
      <div class="text-2xl font-semibold mb-[5px]">任務作答區</div>
      <span class="text-sm text-[#ccc] block mb-3">
        若答題有困難，可以考慮使用「提示」功能，但每一次使用「提示」皆會扣分，並根據題目難易度不同，扣分比重也會有所不同。
      </span>
      <div class="flex rounded-xl px-6 py-4 gap-[15px] bg-white mb-3">
        <input v-model="answer" type="text" placeholder="請輸入答案 ..."
          class="rounded-full flex-1 border-[#DEE2EB] focus:border-primary-dark focus:ring-primary-dark" />
        <button type="button" class="rounded-full w-[180px] text-center text-white py-3" :class="{
          'bg-primary-medium': start,
          'bg-black/20 cursor-default': !start,
        }
          " @click="submitAnswer">
          提交答案
        </button>
      </div>
      <div v-if="!start" class="rounded-xl bg-white min-h-[645px] flex justify-center items-center">
        <div>
          <img src="@/assets/images/activity-empty.png" class="mb-10 mx-auto" alt="" />
          <p class="text-2xl font-semibold">競賽開始才會公布任務題目</p>
        </div>
      </div>
      <div v-else class="space-y-1">
        <div v-for="   task    of    teamTaskSort   " :key="task.task_id" class="rounded-xl bg-white">
          <div class="flex items-center px-6 py-4 space-x-4">
            <div class="w-6 h-6 rounded-full bg-black text-white text-center leading-6">{{ task.position }}</div>
            <div class="flex-1">
              {{ task.question }}
            </div>
            <svg v-if="task.hint === ''" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 cursor-pointer" fill="none"
              viewBox="0 0 28 28" @click="getHint(task)">
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
          <div v-if="task.hint || task.answer" class="border-t">
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
    <Notice :show.sync="show" @confirm="confirmHint"></Notice>
  </div>
</template>

<script>
import Notice from '@/components/Partials/Notice.vue';
// import { activity, submitAnswer, getHint } from '@/api/activity';

export default {
  components: {
    Notice,
  },
  data() {
    return {
      activity: {},
      player: {},
      teamTask: [],
      taskData: {},
      answer: '',
      timeComing: null,
      activityIntervalId: null,
      notify: '',
      show: false,
      now: new Date(),
    };
  },
  computed: {
    teamTaskSort({ teamTask }) {
      return teamTask.sort((a, b) => a.position - b.position) ?? [];
    },
    start({ activity, now }) {
      return new Date(activity.competition_start_datetime) < new Date(now);
    },
    teamList({ activity }) {
      return activity.team_list.sort((a, b) => Number(b.total_score) - Number(a.total_score)) ?? [];
    },
  },
  // watch: {
  //   'activity.activity_start_datetime': {
  //     async handler(val) {
  //       const now = new Date();
  //       if (new Date(val) < now) {
  //         console.log('比賽時間未到');
  //       } else {
  //         this.activityIntervalId = window.setInterval(async () => {
  //           await this.getActivity();
  //         }, 10000);
  //       }
  //       // console.log(val, this);
  //       // if (val === 'complete') {
  //       //   this.$router.go(-1);
  //       // }
  //     },
  //   },
  // },
  async mounted() {
    await this.getActivity();
    this.timeComing = window.setInterval(this.timeStart, 1000);
  },
  beforeUnmount() {
    window.clearInterval(this.timeComing);
    window.clearInterval(this.activityIntervalId);
  },
  methods: {
    timeStart() {
      if (this.start) {
        window.clearInterval(this.timeComing);
        this.activityIntervalId = window.setInterval(async () => {
          await this.getActivity();
        }, 10000);
      } else {
        console.log('比賽時間未到');
      }
    },
    awardsImg(index) {
      switch (index) {
        case 1:
          return new URL(`@/assets/images/award-1.png`, import.meta.url).href;
        case 2:
          return new URL(`@/assets/images/award-2.png`, import.meta.url).href;
        case 3:
          return new URL(`@/assets/images/award-3.png`, import.meta.url).href;
        default:
          break;
      }
    },
    async getActivity() {
      // const { activityId } = this.$route.params;
      // try {
      //   const { data } = await activity(activityId);
      //   console.log(data);
      //   if (data.status === 'success') {
      //     const { activity, player, team_task, notify } = data.response;
      //     this.activity = activity;
      //     this.player = player;
      //     this.teamTask = team_task;
      //     this.notify = notify;
      //   } else if (data.code === 4010) {
      //     this.$router.go(-1);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async getHint(task) {
      if (task.answer) return;
      this.taskData = task;
      this.show = true;
    },
    async confirmHint() {
      // try {
      //   this.show = false;
      //   const { data } = await getHint(this.taskData.task_id);
      //   if (data.status === 'success' && data.response) {
      //     this.getActivity();
      //   } else if (data.code === 4010) {
      //     this.$router.go(-1);
      //   } else {
      //     throw new Error(data.message);
      //   }
      // } catch (error) {
      //   console.log(error);
      // } finally {
      //   this.taskData = {};
      // }
    },
    async submitAnswer() {
      try {
        if (this.teamTask.length === 0) return;
        const { activityId } = this.$route.params;
        if ((this.answer ?? '') !== '') {
          const formData = new FormData();
          formData.append('answer', this.answer);
          const { data } = await submitAnswer(activityId, formData);
          if (data.status && data.response) {
            this.answer = '';
            this.getActivity();
          } else if (data.code === 4010) {
            this.$router.go(-1);
          } else {
            throw new Error(data.message);
          }
        } else {
          // eslint-disable-next-line no-alert
          alert('請先輸入答案');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.countdown-style ::v-deep {

  .flip-card__top,
  .flip-card__bottom,
  .flip-card__back-bottom,
  .flip-card__back::before,
  .flip-card__back::after {
    @apply bg-main text-white font-normal;
  }

  .flip-card__bottom,
  .flip-card__back-bottom,
  .flip-card__bottom-4digits,
  .flip-card__back-bottom-4digits {
    border-color: #fff;
    @apply bg-main text-white font-normal;
  }
}
</style>

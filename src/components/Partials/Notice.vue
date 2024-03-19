<template>
  <div v-if="show" class="bg-black/[.68] fixed top-0 bottom-0 left-0 right-0">
    <div
      class="min-w-[540px] absolute left-1/2 top-[115px] -translate-x-1/2 bg-white rounded-2xl px-8 py-10 text-center">
      <p class="text-lg mb-6">索取提示將會扣除部份分數,確定要索取提示？</p>
      <div class="flex justify-center gap-4 text-sm">
        <button class="border border-main bg-white px-8 py-3 rounded" @click="hide">
          {{ $t('cancel') }}
        </button>
        <button class="bg-main text-white px-8 py-3 rounded" @click="$emit('confirm')">
          {{ $t('confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['confirm', 'update:show']);
const hide = () => {
  emit('update:show', false);
};
</script>

<script>
// export default {
//   props: {
//     show: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   methods: {
//     hide() {
//       this.$emit('update:show', false);
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>

<template>
  <div v-if="show" class="bg-black/[.68] fixed top-0 bottom-0 left-0 right-0">
    <div class="absolute left-1/2 top-[115px] -translate-x-1/2 bg-white rounded-3xl px-8 py-10">
      <p class="text-lg mb-6">{{ $t('notice') }}</p>
      <div class="flex justify-end gap-4">
        <button class="border border-[#DEE2EB] bg-white px-9 py-3 rounded-full" @click="hide">
          {{ $t('cancel') }}
        </button>
        <button class="bg-primary-medium text-white px-9 py-3 rounded-full" @click="$emit('confirm')">
          {{ $t('confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hide() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style lang="scss" scoped></style>

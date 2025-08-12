<script setup lang="ts">
import normalizeException from "~~/shared/helpers/normalize-exception";

interface Props {
  error: null | unknown;
}

const { error } = defineProps<Props>();

const emit = defineEmits<{
  refresh: [];
}>();

const formattedError = computed(() => normalizeException(error));
</script>

<template>
  <div class="w-full h-full">
    <div v-if="error" class="w-full h-full">
      <div class="w-full h-full flex-center">
        <FetchErrorAlert
          class="max-w-[28rem]"
          show-retry
          :title="formattedError.name"
          :message="formattedError.message"
          @retry="() => emit('refresh')"
        />
      </div>
    </div>

    <div v-else>
      <slot />
    </div>
  </div>
</template>

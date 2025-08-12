<script setup lang="ts">
const emit = defineEmits<{
  retry: [];
}>();

interface Props {
  title?: string;
  message?: string;
  showRetry?: boolean;
}

const {
  title = "Error",
  message = "",
  showRetry = false,
} = defineProps<Props>();
</script>

<template>
  <NuxtAlert
    color="error"
    variant="subtle"
    icon="lucide-circle-x"
    :title="title"
    :description="message"
    :orientation="showRetry ? 'horizontal' : 'vertical'"
    :actions="
      !showRetry
        ? []
        : [
            {
              label: 'Retry',
              icon: 'lucide-refresh-cw',
              onClick: () => emit('retry'),
              color: 'error',
              class: 'py-2',
            },
          ]
    "
  />
</template>

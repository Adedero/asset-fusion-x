<script setup lang="ts">
const { open, config, close } = useConfirm();
</script>

<template>
  <NuxtModal
    v-model:open="open"
    :title="config?.title"
    :description="config?.description"
    :icon="config?.icon"
    :dismissible="false"
    :close="config?.showCloseIcon"
    @update:open="
      async (val) => {
        if (!val) await config?.reject?.();
      }
    "
  >
    <template #footer>
      <div class="w-full flex items-center justify-end gap-2">
        <NuxtButton
          v-bind="config?.rejectProps"
          @click="
            async () => {
              await config?.reject?.();
              close();
            }
          "
        >
          {{ config?.rejectProps?.label }}
        </NuxtButton>

        <NuxtButton
          v-bind="config?.acceptProps"
          @click="
            async () => {
              await config?.accept?.();
              close();
            }
          "
        >
          {{ config?.acceptProps?.label }}
        </NuxtButton>
      </div>
    </template>
  </NuxtModal>
</template>

<script setup lang="ts">
import { useDateFormat, useIntersectionObserver } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Notification } from "~~/shared/zod";
import type { Serialize } from "~~/types";

interface Props {
  notification: Serialize<Notification & { checked?: boolean }>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  deleted: [string];
  visible: [string];
  updated: [string, boolean];
}>();

const toast = useToast();
const open = ref<boolean>(false);

// When a notification is checked
const checked = ref<boolean>(false);

watch(
  () => props.notification,
  () => (checked.value = props.notification.checked ?? false),
);
const handleUpdate = (value: boolean | "indeterminate") => {
  if (typeof value === "boolean") {
    emit("updated", props.notification.id, value);
  }
};

// When a notification is visible
const target = useTemplateRef("target");
const { stop } = useIntersectionObserver(
  target,
  ([entry], observerElement) => {
    if (entry?.isIntersecting) {
      emit("visible", props.notification.id);
      observerElement.disconnect();
    }
  },
  {
    threshold: 0.5,
  },
);

// deleting a notification
const deleting = ref<boolean>(false);
async function deleteNotification() {
  deleting.value = true;
  try {
    await $fetch(`/api/user/notifications/${props.notification.id}`, {
      method: "delete",
    });
    emit("deleted", props.notification.id);
    toast.add({
      color: "success",
      title: "Done",
      description: "Notification deleted successfully",
    });
  } catch (error) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message,
    });
  } finally {
    deleting.value = false;
    open.value = false;
  }
}

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div ref="target">
    <NuxtCard :class="checked ? 'bg-muted' : ''">
      <div class="flex gap-2 md:gap-4">
        <div class="flex-shrink-0">
          <NuxtCheckbox v-model="checked" @update:model-value="handleUpdate" />
        </div>

        <div class="flex-grow">
          <div class="text-sm">
            <div
              v-if="!notification.isRead"
              class="flex items-center gap-4 justify-between mb-1"
            >
              <NuxtBadge size="sm" color="success" variant="soft" label="New" />
            </div>

            <p class="font-semibold">
              {{ notification.title }}
            </p>
            <p v-if="notification.bodyType === 'string'">
              {{ notification.body }}
            </p>

            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-else v-html="notification.body" />

            <footer class="mt-2 flex items-center gap-4 justify-between">
              <div class="flex items-center gap-1">
                <NuxtIcon name="lucide:clock" class="text-muted" />
                <p class="text-xs text-muted">
                  {{ useDateFormat(notification.createdAt, "MMM DD, YYYY") }}
                  at
                  {{ useDateFormat(notification.createdAt, "hh:mm aa") }}
                </p>
              </div>

              <NuxtButton
                v-if="!checked"
                icon="lucide-x"
                size="sm"
                color="error"
                variant="soft"
                :loading="deleting"
                @click="open = true"
              />
            </footer>
          </div>
        </div>

        <NuxtModal v-model:open="open" title="Delete notification">
          <template #body>
            <div class="space-y-4">
              <p>Are you sure you want to delete this notification?</p>

              <div class="flex items-center gap-2 justify-end">
                <NuxtButton
                  label="Cancel"
                  color="neutral"
                  variant="soft"
                  @click="open = false"
                />
                <NuxtButton
                  label="Delete"
                  color="error"
                  @click="deleteNotification"
                />
              </div>
            </div>
          </template>
        </NuxtModal>
      </div>
    </NuxtCard>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem, DropdownMenuItem } from "@nuxt/ui";
import { useInfiniteScroll } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Notification } from "~~/shared/zod";
import type { Serialize } from "~~/types";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Notifications",
    },
  ] as BreadcrumbItem[],
});

const toast = useToast();

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: "All",
      onSelect: () => selectItems("All"),
    },
    {
      label: "Read",
      onSelect: () => selectItems("Read"),
    },
    {
      label: "Unread",
      onSelect: () => selectItems("Unread"),
    },
  ],
]);

const notifications = ref<Serialize<Notification & { checked?: boolean }>[]>(
  [],
);
const checkedNotificationIds = computed(() => {
  return notifications.value.filter((n) => n.checked === true).map((n) => n.id);
});

const readNotificationIds = ref<string[]>([]);
// on route leave send an api update these notifications to read;

const hasFinished = ref(false);
const limit = 20;
const skip = computed(() => notifications.value.length);

const loading = ref<boolean>(false);
const error = ref<Error | null>(null);

async function getNotifications() {
  if (loading.value || hasFinished.value) return;

  error.value = null;
  loading.value = true;

  try {
    const data = await $fetch<Serialize<Notification>[]>(
      "/api/user/notifications",
      {
        params: { skip: skip.value, limit },
      },
    );

    notifications.value = [...notifications.value, ...data];
    if (data.length < limit) {
      hasFinished.value = true;
    }
  } catch (err) {
    error.value = normalizeException(err);
  } finally {
    loading.value = false;
  }
}

const el = useTemplateRef("srcollDiv");

const { reset: resetScroll } = useInfiniteScroll(
  el,
  async () => {
    await getNotifications();
  },
  {
    distance: 20,
    canLoadMore: () => hasFinished.value,
  },
);

async function refresh() {
  notifications.value = [];
  hasFinished.value = false;
  resetScroll();
  await getNotifications();
}

const hasSelected = ref<boolean>(false);

watch(
  checkedNotificationIds,
  () => (hasSelected.value = checkedNotificationIds.value.length > 0),
);

function selectItems(value: "All" | "Read" | "Unread") {
  if (value === "All") {
    notifications.value = notifications.value.map((n) => ({
      ...n,
      checked: true,
    }));
  }

  if (value === "Read") {
    notifications.value = notifications.value.map((n) => ({
      ...n,
      checked: n.isRead,
    }));
  }

  if (value === "Unread") {
    notifications.value = notifications.value.map((n) => ({
      ...n,
      checked: !n.isRead,
    }));
  }
}

const handleUpdated = (id: string, value: boolean) => {
  notifications.value = notifications.value.map((n) => {
    return {
      ...n,
      checked: n.id === id ? value : n.checked,
    };
  });
};

function deselectItems() {
  hasSelected.value = false;
  notifications.value = notifications.value.map((n) => ({
    ...n,
    checked: false,
  }));
}

function handleClick(event: Event) {
  const target = event.target as HTMLButtonElement;
  const state = target.getAttribute("data-state") as "checked" | "unchecked";

  if (state === "unchecked") {
    // Checkbox is about to be checked
    hasSelected.value = true;
    selectItems("All");
  } else {
    hasSelected.value = false;
    deselectItems();
  }
}

function handleDeleted(id: string) {
  notifications.value = notifications.value.filter((n) => n.id !== id);
}

function handleVisible(id: string) {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification && !notification.isRead) {
    readNotificationIds.value = [...readNotificationIds.value, notification.id];
  }
}

async function markAllAsRead() {
  if (!readNotificationIds.value.length) {
    return;
  }

  try {
    await $fetch("/api/user/notifications", {
      method: "put",
      body: { notifications: readNotificationIds.value },
    });
  } catch (error) {
    console.error(error);
  }
}

// Deleting in bulk
const open = ref<boolean>(false);
const deleting = ref<boolean>(false);
async function deleteCheckedNotifications() {
  if (!checkedNotificationIds.value.length) {
    open.value = false;
    return;
  }

  deleting.value = true;

  try {
    await $fetch("/api/user/notifications", {
      method: "patch",
      body: { notifications: checkedNotificationIds.value },
    });
    notifications.value = notifications.value.filter(
      (n) => !checkedNotificationIds.value.includes(n.id),
    );

    refresh();
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

onMounted(async () => {
  await getNotifications();
});

onUnmounted(() => {
  markAllAsRead();
});
</script>

<template>
  <div>
    <div class="space-y-4">
      <header class="flex items-center gap-4 justify-between">
        <div class="text-xl font-semibold">Notifications</div>

        <div v-if="notifications.length" class="flex items-center">
          <NuxtButton
            color="neutral"
            :variant="hasSelected ? 'soft' : 'link'"
            class=""
          >
            <NuxtCheckbox v-model="hasSelected" @click="handleClick" />

            <NuxtDropdownMenu :items>
              <NuxtButton
                size="sm"
                color="neutral"
                variant="link"
                icon="lucide:chevron-down"
              />
            </NuxtDropdownMenu>
          </NuxtButton>

          <div v-if="hasSelected">
            <NuxtTooltip text="Delete selected">
              <NuxtButton
                icon="lucide:trash"
                color="neutral"
                variant="link"
                :loading="deleting"
                @click="open = true"
              />
            </NuxtTooltip>

            <NuxtModal v-model:open="open" title="Delete notifications">
              <template #body>
                <div class="space-y-4">
                  <p>
                    Are you sure you want to delete these
                    {{ checkedNotificationIds.length }} notification(s)?
                  </p>

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
                      loading-auto
                      @click="deleteCheckedNotifications"
                    />
                  </div>
                </div>
              </template>
            </NuxtModal>
          </div>

          <div v-else>
            <NuxtTooltip text="Refresh">
              <NuxtButton
                icon="lucide:rotate-cw"
                color="neutral"
                variant="link"
                :loading
                @click="refresh"
              />
            </NuxtTooltip>
          </div>
        </div>
      </header>

      <div
        ref="srcollDiv"
        class="max-h-[calc(100dvh-10rem)] overlow-y-auto space-y-4"
      >
        <div v-if="notifications.length > 0" class="space-y-4">
          <NotificationItem
            v-for="notification in notifications"
            :key="notification.id"
            :notification
            @updated="handleUpdated"
            @deleted="handleDeleted"
            @visible="handleVisible"
          />
        </div>

        <div v-if="!loading && !error && notifications.length === 0">
          <EmptyIcon label="No notifications" />
        </div>

        <div v-if="loading" class="flex-center">
          <NuxtIcon
            name="lucide:loader"
            size="2rem"
            class="animate animate-spin"
          />
        </div>

        <div v-else-if="error">
          <FetchErrorAlert
            :message="error.message"
            show-retry
            @retry="getNotifications"
          />
        </div>
      </div>
    </div>
  </div>
</template>

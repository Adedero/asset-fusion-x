<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { useDateFormat } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";

const accountId = useRouteData().getParams("accountId");
const toast = useToast();

const open = ref<boolean>(false);

const { pending, data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}/join-requests`,
  {
    key: "account-join-requests",
  },
);

const items = computed(() => {
  return (
    data.value?.map((item) => {
      return {
        name: item.recipientName,
        email: item.recipientEmail,
        role: item.role,
        ownership: item.ownership,
        requestedBy: item.creator?.name,
        requestDate: item.createdAt,
      };
    }) ?? []
  );
});

type RequestedUser = (typeof items.value)[number];

const columns: TableColumn<RequestedUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "ownership",
    header: "Ownership",
    cell: ({ row }) => `${row.getValue("ownership")}%`,
  },
  {
    accessorKey: "requestedBy",
    header: "Requested By",
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) =>
      useDateFormat(row.getValue("requestDate"), "MMM DD, YYYY hh:mm aa").value,
  },
];

type SelectedUser = NonNullable<typeof data.value>[number];

const selectedUser = ref<SelectedUser | null>(null);

const handleSelect = (row: TableRow<RequestedUser>) => {
  selectedUser.value =
    data.value?.find((item) => item.recipientEmail === row.getValue("email")) ??
    null;
  if (!selectedUser.value) {
    return;
  }
  open.value = true;
};

const cancelError = ref<Error | null>(null);
async function cancelRequest(userRequest: SelectedUser, close: () => void) {
  try {
    await $fetch(`/api/user/join-requests/${userRequest.id}`, {
      method: "delete",
    });
    await refresh();
    close();
  } catch (err) {
    cancelError.value = normalizeException(err);
  }
}

const reminderError = ref<Error | null>(null);
async function sendReminder(userRequest: SelectedUser, close: () => void) {
  try {
    await $fetch(`/api/user/join-requests/${userRequest.id}/send-reminder`, {
      method: "post",
    });
    toast.add({
      color: "success",
      title: "Success",
      description: "Reminder sent successfully",
    });
    await refresh();
    close();
  } catch (err) {
    reminderError.value = normalizeException(err);
  }
}

const handleOpen = (value: boolean) => {
  //do something
  if (value === false) {
    cancelError.value = null;
    reminderError.value = null;
  }
};
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <NuxtTable
      :data="items"
      :columns
      :loading="pending"
      style="min-width: 0"
      @select="handleSelect"
    />

    <NuxtModal
      v-model:open="open"
      title="Joint Account Request"
      @update:open="handleOpen"
    >
      <template #body="{ close }">
        <div v-if="selectedUser" class="space-y-8">
          <FetchErrorAlert
            v-if="cancelError || reminderError"
            :message="cancelError?.message || reminderError?.message"
          />

          <div>
            <h3 class="text-2xl font-medium">User Info</h3>
            <div class="grid gap-4 md:grid-cols-2">
              <NuxtFormField label="Name" class="md:col-span-2">
                <NuxtInput
                  :value="selectedUser.recipientName"
                  readonly
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField label="Email" class="md:col-span-2">
                <NuxtInput
                  :value="selectedUser.recipientEmail"
                  readonly
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField label="Role">
                <NuxtInput
                  :value="toCase(selectedUser.role, 'sentence')"
                  readonly
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField label="Ownership">
                <NuxtInput
                  :value="selectedUser.ownership + '%'"
                  readonly
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField label="Requested By">
                <NuxtInput
                  :value="selectedUser.creator.name"
                  readonly
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField label="Request Date">
                <NuxtInput
                  :value="
                    useDateFormat(
                      selectedUser.createdAt,
                      'MMM DD, YYYY hh:mm aa',
                    ).value
                  "
                  readonly
                  class="w-full"
                />
              </NuxtFormField>
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="text-2xl font-medium">Reminder</h3>

            <div class="grid gap-4 md:grid-cols-2">
              <NuxtFormField label="Reminders Sent">
                <NuxtInput
                  :value="selectedUser.reminderCount"
                  readonly
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField label="Last reminder sent at">
                <NuxtInput
                  :value="
                    selectedUser.lastReminderAt
                      ? useDateFormat(
                          selectedUser.lastReminderAt,
                          'MMM DD, YYYY hh:mm aa',
                        ).value
                      : 'No reminders sent yet'
                  "
                  readonly
                  class="w-full"
                />
              </NuxtFormField>
            </div>

            <div class="flex justify-end mt-8 gap-2">
              <NuxtButton
                label="Cancel request"
                color="error"
                variant="soft"
                icon="lucide-circle-x"
                loading-auto
                @click="cancelRequest(selectedUser, close)"
              />
              <NuxtButton
                label="Send reminder"
                icon="lucide-clock"
                loading-auto
                @click="sendReminder(selectedUser, close)"
              />
            </div>
          </div>
        </div>
      </template>
    </NuxtModal>
  </MyPage>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

const accountId = useRouteData().getParams("accountId");

const { pending, data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}/account-users`,
  {
    key: "account-current-users",
  },
);

const items = computed(() => {
  return (
    data.value?.map((item) => {
      return {
        image: item.user?.image,
        name: item.user?.name,
        email: item.user?.email,
        role: item.role,
        ownership: item.ownership,
      };
    }) ?? []
  );
});

type AccountUser = (typeof items.value)[number];

const Avatar = resolveComponent("NuxtAvatar");

const columns: TableColumn<AccountUser>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const name = row.getValue("name");
      const image = row.getValue("image");
      return h(Avatar, { size: "lg", alt: name, src: image });
    },
  },
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
    cell: ({ row }) => toCase(row.getValue("role"), "sentence"),
  },
  {
    accessorKey: "ownership",
    header: "Ownership",
    cell: ({ row }) => `${row.getValue("ownership")}%`,
  },
];
type SelectedUser = NonNullable<typeof data.value>[number];

const selectedUser = ref<SelectedUser | null>(null);
const open = ref<boolean>(false);

const handleSelect = async (row: TableRow<AccountUser>) => {
  selectedUser.value =
    data.value?.find((item) => item.user.email === row.getValue("email")) ??
    null;

  if (selectedUser.value) open.value = true;
};

const removeError = ref<Error | null>(null);
const removeUser = async (accountUserId: string, close: () => void) => {
  removeError.value = null;
  try {
    await $fetch(
      `/api/user/financial-accounts/${accountId}/account-user/${accountUserId}`,
      { method: "delete" },
    );
    await refresh();
    close();
  } catch (e) {
    removeError.value = normalizeException(e);
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
      title="Remove User"
      @update:open="
        (value) =>
          value === false ? (removeError = null) : (removeError = removeError)
      "
    >
      <template #body="{ close }">
        <div v-if="selectedUser" class="space-y-4">
          <p>Do you want to remove this user from this account?</p>

          <FetchErrorAlert v-if="removeError" :message="removeError.message" />

          <div class="flex items-center justify-end gap-2">
            <NuxtButton
              label="Cancel"
              color="neutral"
              variant="soft"
              @click="close()"
            />
            <NuxtButton
              label="Proceed"
              color="error"
              loading-auto
              @click="removeUser(selectedUser.id, close)"
            />
          </div>
        </div>
      </template>
    </NuxtModal>
  </MyPage>
</template>

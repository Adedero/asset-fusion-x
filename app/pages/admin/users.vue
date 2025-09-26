<script setup lang="ts">
import { useAsyncState, useDateFormat } from "@vueuse/core";
import { authClient } from "~/lib/auth";
import { useAuthStore } from "~/stores/auth.store";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "Users"
    }
  ]
});

type QueryParam = Parameters<typeof authClient.admin.listUsers>[0]["query"];

const authStore = useAuthStore();
const toast = useToast();
const { confirmAsync } = useConfirm();

const open = ref<boolean>(false);
const search = ref<string>("");
const limit = ref<number>(20);
const page = ref<number>(0);
const offset = computed<number>(() => page.value * limit.value);
const query = computed<QueryParam>(() => ({
  searchValue: search.value,
  searchField: "name",
  searchOperator: "contains",
  limit: limit.value,
  offset: offset.value,
  sortBy: "name",
  sortDirection: "asc"
}));

const { state, error, isLoading, executeImmediate } = useAsyncState(
  listUsers,
  null
);

export type User = Awaited<ReturnType<typeof listUsers>>["users"][number];

async function listUsers(queryParam: QueryParam) {
  const res = await authClient.admin.listUsers({ query: queryParam });
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
}

await executeImmediate(query.value);
watch(query, (newValue) => executeImmediate(newValue));

const allLoaded = computed(
  () => (state.value?.users.length ?? 0) < limit.value
);
const headers = ["#", "Name", "Role", "Email", "Banned", "Created", "Actions"];

const selectedUser = ref<User | null>(null);
const selectUser = (user: string | User | null) => {
  if (typeof user === "string") {
    selectedUser.value = state.value?.users.find((u) => u.id === user) ?? null;
  } else {
    selectedUser.value = user;
  }
};

const changeUserRole = async (id: string, role: string, close: () => void) => {
  const confirm = await confirmAsync({
    title: "Change Role",
    description: "Are you sure you want to change this user's role?"
  });
  if (!confirm) {
    close();
    return;
  }
  await authClient.admin.setRole(
    {
      userId: id,
      role: role as unknown as "admin" | "user"
    },
    {
      onError(ctx) {
        toast.add({
          color: "error",
          title: "Error",
          description: ctx.error.message
        });
      },
      onSuccess() {
        toast.add({
          color: "success",
          title: "Success",
          description: "Role changed successfully"
        });
        executeImmediate(query.value);
      }
    }
  );
};

// Delete user
const deleteUser = async (id: string) => {
  const confirm = await confirmAsync({
    title: "Delete User",
    description:
      "Are you sure you want to proceed? This action cannot be undone.",
    acceptProps: { color: "error", label: "Delete" }
  });
  if (!confirm) {
    return;
  }
  await authClient.admin.removeUser(
    { userId: id },
    {
      onError(ctx) {
        toast.add({
          color: "error",
          title: "Error",
          description: ctx.error.message
        });
      },
      onSuccess() {
        toast.add({
          color: "success",
          title: "Success",
          description: "User deleted successfully"
        });
        executeImmediate(query.value);
      }
    }
  );
};
</script>

<template>
  <MyPage :error @refresh="() => executeImmediate(query)">
    <div>
      <header class="flex items-center gap-2 justify-between flex-wrap">
        <h1 class="text-3xl font-semibold">Users</h1>

        <div class="flex items-center gap-2">
          <NuxtFieldGroup>
            <NuxtButton
              icon="lucide:search"
              color="neutral"
              variant="outline"
            />
            <NuxtInput v-model="search" placeholder="Search..." />
          </NuxtFieldGroup>

          <NuxtButton
            label="New"
            icon="lucide:plus"
            @click="
              {
                selectUser(null);
                open = true;
              }
            "
          />
        </div>
      </header>

      <section v-if="state?.users" class="mt-5">
        <AdminUserManager
          v-model:open="open"
          :user="selectedUser"
          @done="() => executeImmediate(query)"
        />

        <VTable :loading="isLoading">
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="user in state.users" :key="user.id">
              <VTableCell>{{ user.id }}</VTableCell>
              <VTableCell>
                <div class="flex items-center gap-1">
                  <p>{{ user.name }}</p>
                  <NuxtBadge
                    v-if="user.id === authStore.user.value?.id"
                    label="you"
                    color="error"
                    variant="subtle"
                    size="sm"
                  />
                </div>
              </VTableCell>
              <VTableCell>
                <NuxtBadge
                  v-if="authStore.user.value?.id === user.id"
                  :label="user.role"
                  :color="user.role === 'admin' ? 'success' : 'primary'"
                  variant="subtle"
                />

                <NuxtInPlace v-else trigger="dblclick">
                  <NuxtBadge
                    :label="user.role"
                    :color="user.role === 'admin' ? 'success' : 'primary'"
                    variant="subtle"
                  />

                  <template #in-place="{ close }">
                    <NuxtFieldGroup>
                      <NuxtSelect
                        :default-value="user.role"
                        :items="['user', 'admin']"
                        size="sm"
                        class="w-20"
                        @update:model-value="
                          changeUserRole(user.id, $event, close)
                        "
                      />
                      <NuxtButton
                        icon="lucide:x"
                        color="neutral"
                        variant="subtle"
                        size="sm"
                        @click="close"
                      />
                    </NuxtFieldGroup>
                  </template>
                </NuxtInPlace>
              </VTableCell>
              <VTableCell>{{ user.email }}</VTableCell>
              <VTableCell>
                <NuxtBadge
                  :label="user.banned ? 'Yes' : 'No'"
                  :color="user.banned ? 'error' : 'success'"
                  variant="subtle"
                />
              </VTableCell>
              <VTableCell>
                {{ useDateFormat(user.createdAt, "YYYY-MMM-DD") }}
              </VTableCell>
              <VTableCell>
                <div
                  v-if="user.id !== authStore.user.value?.id"
                  class="flex items-center gap-2"
                >
                  <!--  <NuxtButton
                    label="Edit"
                    variant="soft"
                    size="sm"
                    @click="
                      {
                        selectUser(user);
                        open = true;
                      }
                    "
                  /> -->
                  <NuxtButton
                    label="Delete"
                    color="error"
                    variant="soft"
                    size="sm"
                    loading-auto
                    @click="deleteUser(user.id)"
                  />
                </div>
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>

        <div class="mt-2 border-t border-t-default">
          <NuxtSimplePaginator
            v-model:page="page"
            :rows="limit"
            :all-loaded="allLoaded"
          />
        </div>
      </section>
    </div>
  </MyPage>
</template>

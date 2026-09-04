<script setup lang="ts">
import { useAsyncState, useDateFormat } from "@vueuse/core";
import { authClient } from "~/lib/auth";
import { useAuthStore } from "~/stores/auth.store";
import normalizeException from "~~/shared/helpers/normalize-exception";

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

// authClient now has an absolute baseURL so it works during SSR (see
// app/lib/auth.ts), but that means an SSR call is a real loopback HTTP
// request that won't automatically carry the browser's session cookie.
// useRequestHeaders must be called here, directly in setup, to stay within
// a valid Nuxt context — better-auth's own onRequest hook fires too late for it.
const ssrRequestHeaders = import.meta.server
  ? useRequestHeaders(["cookie"])
  : undefined;

const open = ref<boolean>(false);
const banOpen = ref<boolean>(false);
const filtersOpen = ref<boolean>(false);
const search = ref<string>("");
const limit = ref<number>(20);
const page = ref<number>(0);
const offset = computed<number>(() => page.value * limit.value);

// BetterAuth's listUsers only supports one filter clause per request, so
// combining a role filter with a banned filter can't be done server-side.
// Instead we fetch every user matching the search term and filter/paginate
// client-side below.
const roleFilterOptions = [
  { label: "All", value: "all" },
  { label: "Users", value: "user" },
  { label: "Admins", value: "admin" }
] as const;
const statusFilterOptions = [
  { label: "All", value: "all" },
  { label: "Banned", value: "banned" },
  { label: "Not Banned", value: "not-banned" }
] as const;
const roleFilter = ref<(typeof roleFilterOptions)[number]["value"]>("all");
const statusFilter = ref<(typeof statusFilterOptions)[number]["value"]>("all");

watch([roleFilter, statusFilter], () => {
  page.value = 0;
});

const FETCH_LIMIT = 1000;

const query = computed<QueryParam>(() => ({
  searchValue: search.value,
  searchField: "name",
  searchOperator: "contains",
  limit: FETCH_LIMIT,
  sortBy: "name",
  sortDirection: "asc"
}));

const { state, error, isLoading, executeImmediate } = useAsyncState(
  listUsers,
  null
);

export type User = Awaited<ReturnType<typeof listUsers>>["users"][number];

async function listUsers(queryParam: QueryParam) {
  const res = await authClient.admin.listUsers(
    { query: queryParam },
    { headers: ssrRequestHeaders }
  );
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
}

await executeImmediate(query.value);
watch(query, (newValue) => executeImmediate(newValue));

const filteredUsers = computed(() => {
  const users = state.value?.users ?? [];
  return users.filter((user) => {
    if (roleFilter.value !== "all" && user.role !== roleFilter.value) {
      return false;
    }
    if (statusFilter.value === "banned" && !user.banned) return false;
    if (statusFilter.value === "not-banned" && user.banned) return false;
    return true;
  });
});

const paginatedUsers = computed(() =>
  filteredUsers.value.slice(offset.value, offset.value + limit.value)
);

const allLoaded = computed(
  () => offset.value + limit.value >= filteredUsers.value.length
);
const headers = [
  "#",
  "ID",
  "Name",
  "Role",
  "Email",
  "Email Verified",
  "Banned",
  "Created",
  "Actions"
];

const truncateId = (id: string) =>
  id.length > 5 ? `${id.slice(0, 5)}…` : id;

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
        close();
      }
    }
  );
};

const changeEmailVerified = async (
  id: string,
  verified: boolean,
  close: () => void
) => {
  const confirm = await confirmAsync({
    title: "Change Email Verification Status",
    description:
      "Are you sure you want to change this user's email verification status?"
  });
  if (!confirm) {
    close();
    return;
  }
  await authClient.admin.updateUser(
    {
      userId: id,
      data: { emailVerified: verified }
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
          description: "Email verification status changed successfully"
        });
        close();
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

// Unban user
const unbanUser = async (id: string) => {
  const confirm = await confirmAsync({
    title: "Unban User",
    description:
      "Are you sure you want to unban this user? Any IP address banned alongside them will also be unbanned."
  });
  if (!confirm) {
    return;
  }
  try {
    await $fetch(`/api/admin/users/${id}/unban`, { method: "POST" });
    toast.add({
      color: "success",
      title: "Success",
      description: "User unbanned successfully"
    });
    executeImmediate(query.value);
  } catch (error) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message
    });
  }
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
            label="Filters"
            icon="lucide:list-filter"
            color="neutral"
            variant="outline"
            @click="() => { filtersOpen = true }"
          />

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

      <NuxtModal v-model:open="filtersOpen" title="Filter Users">
        <template #body="{ close }">
          <div class="space-y-4">
            <NuxtFormField label="Role">
              <NuxtSelect
                v-model="roleFilter"
                :items="roleFilterOptions"
                class="w-full"
              />
            </NuxtFormField>

            <NuxtFormField label="Status">
              <NuxtSelect
                v-model="statusFilter"
                :items="statusFilterOptions"
                class="w-full"
              />
            </NuxtFormField>

            <div class="flex justify-end">
              <NuxtButton label="Done" @click="close" />
            </div>
          </div>
        </template>
      </NuxtModal>

      <section v-if="state?.users" class="mt-5">
        <AdminUserManager
          v-model:open="open"
          :user="selectedUser"
          @done="() => executeImmediate(query)"
        />

        <AdminBanUserModal
          v-model:open="banOpen"
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
            <VTableRow v-for="(user, index) in paginatedUsers" :key="user.id">
              <VTableCell>{{ offset + index + 1 }}</VTableCell>
              <VTableCell>
                <div class="flex items-center gap-1">
                  <span>{{ truncateId(user.id) }}</span>
                  <TextCopyButton
                    :text="user.id"
                    size="xs"
                    variant="ghost"
                    icon="lucide:copy"
                  />
                </div>
              </VTableCell>
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
                <NuxtInPlace>
                  <NuxtBadge
                    :label="user.emailVerified.toString()"
                    :color="user.emailVerified ? 'success' : 'error'"
                    variant="subtle"
                  />

                  <template #in-place="{ close }">
                    <NuxtFieldGroup>
                      <NuxtSelect
                        :default-value="user.emailVerified"
                        :items="[true, false]"
                        size="sm"
                        class="w-20"
                        @update:model-value="
                          changeEmailVerified(user.id, $event, close)
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
              <VTableCell>
                <NuxtTooltip v-if="user.banned" :text="user.banReason || 'No reason given'">
                  <NuxtBadge label="Yes" color="error" variant="subtle" />
                </NuxtTooltip>
                <NuxtBadge v-else label="No" color="success" variant="subtle" />
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
                    v-if="user.banned"
                    label="Unban"
                    color="success"
                    variant="soft"
                    size="sm"
                    loading-auto
                    @click="unbanUser(user.id)"
                  />
                  <NuxtButton
                    v-else
                    label="Ban"
                    color="warning"
                    variant="soft"
                    size="sm"
                    @click="
                      {
                        selectUser(user);
                        banOpen = true;
                      }
                    "
                  />
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

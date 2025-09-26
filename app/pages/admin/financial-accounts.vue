<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "Financial Accounts"
    }
  ]
});

const { confirmAsync } = useConfirm();
const toast = useToast();

const page = ref<number>(0);
const limit = ref<number>(20);
const search = ref<string>();

const query = computed(() => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page.value.toString());
  searchParams.set("limit", limit.value.toString());
  if (search.value) {
    searchParams.set("search", search.value.toLowerCase());
  }
  return Object.fromEntries(searchParams.entries());
});

const {
  data: accounts,
  error,
  refresh
} = await useFetch("/api/admin/financial-accounts", { query });

const allLoaded = computed(() => {
  return accounts.value ? accounts.value.length < limit.value : false;
});

export type FinancialAccountItem = NonNullable<
  (typeof accounts)["value"]
>[number];

const open = ref<boolean>(false);
const selected = ref<FinancialAccountItem | null>(null);

const headers = [
  "#",
  "Name",
  "Creator",
  "Email",
  "Status",
  "Type",
  "Ownership",
  "Account Balance",
  "Created",
  "Actions"
];

const handleItemEdit = (id: string) => {
  selected.value = accounts.value?.find((acc) => acc.id === id) || null;
  if (!selected.value) {
    return;
  }
  open.value = true;
};

const deleteItem = async (id: string) => {
  const ask = await confirmAsync({
    title: "Delete Financial Account",
    description: "Are you sure you want to delete this financial account?",
    acceptProps: { color: "error", label: "Delete" }
  });

  if (!ask) {
    return;
  }

  try {
    const { message } = await $fetch(`/api/admin/financial-accounts/${id}`, {
      method: "DELETE"
    });
    toast.add({
      color: "success",
      title: "Success",
      description: message
    });
    refresh();
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
  <MyPage :error @refresh="() => refresh()">
    <section class="space-y-10">
      <div class="flex items-end justify-between gap-5 flex-wrap">
        <h1 class="text-3xl font-semibold">Financial Accounts</h1>
        <div>
          <NuxtFieldGroup>
            <NuxtButton
              icon="lucide:search"
              color="neutral"
              variant="outline"
            />
            <NuxtInput v-model="search" placeholder="Search..." />
          </NuxtFieldGroup>
        </div>
      </div>

      <div v-if="accounts">
        <div v-if="selected">
          <AdminFinancialAccountEditor
            v-model:open="open"
            :account="selected"
            @done="() => refresh()"
          />
        </div>

        <VTable>
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="(account, index) in accounts" :key="account.id">
              <VTableCell>
                {{ index + 1 + page * limit }}
              </VTableCell>
              <VTableCell>{{ account.name }}</VTableCell>
              <VTableCell>{{ account.creator.name }}</VTableCell>
              <VTableCell>{{ account.creator.email }}</VTableCell>
              <VTableCell>{{ account.status }}</VTableCell>
              <VTableCell>{{ account.type }}</VTableCell>
              <VTableCell>{{ account.ownership }}</VTableCell>
              <VTableCell>{{ toDollar(account.balance) }}</VTableCell>
              <VTableCell>
                {{ useDateFormat(account.createdAt, "YYYY-MMM-DD hh:mm aa") }}
              </VTableCell>
              <VTableCell>
                <div class="flex items-center gap-2">
                  <NuxtButton
                    label="Edit"
                    variant="soft"
                    size="sm"
                    @click="handleItemEdit(account.id)"
                  />
                  <NuxtButton
                    label="Delete"
                    color="error"
                    variant="soft"
                    size="sm"
                    loading-auto
                    @click="deleteItem(account.id)"
                  />
                </div>
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>

        <div>
          <NuxtSimplePaginator
            v-model:page="page"
            :rows="limit"
            :all-loaded="allLoaded"
          />
        </div>
      </div>
    </section>
  </MyPage>
</template>

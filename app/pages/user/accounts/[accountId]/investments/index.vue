<template>
  <MyPage :error="error || accountError" @refresh="refresh()">
    <div v-if="account && data" class="flex w-full flex-1 gap-1 overflow-auto">
      <div class="flex-1">
        <NuxtTable
          :data="investments"
          :columns="columns"
          sticky
          :loading="pending"
          @select="onSelect"
        />

        <div class="flex justify-center border-t border-default pt-4">
          <NuxtPagination
            v-model:page="page"
            :total="account?.totalInvestments"
            :items-per-page="limit"
            show-edges
          />
        </div>
      </div>
    </div>
  </MyPage>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { useDateFormat } from "@vueuse/core";
import { h, resolveComponent } from "vue";

definePageMeta({
  layout: "user",
});

const accountId = useRouteData().getParams("accountId");
const route = useRoute();
const router = useRouter();

const page = computed({
  get: () => Number(route.query.page || 1),
  set: (val) => {
    router.replace({ query: { ...route.query, page: val } });
  },
});

const limit = 20;

const query = computed(() => ({ page: page.value, limit }));

const { data: account, error: accountError } = await useFetch(
  `/api/user/financial-accounts/${accountId}`,
  {
    pick: ["totalInvestments"],
  },
);

const { pending, data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}/investments`,
  {
    query,
  },
);

const investments = computed(() => {
  return data.value?.map((investment) => {
    return {
      id: investment.id,
      deposit: investment.deposit,
      name: investment.investmentName,
      category: investment.category,
      status: investment.status,
      date: investment.createdAt,
    };
  });
});

type Investment = NonNullable<(typeof investments)["value"]>[number];

const Badge = resolveComponent("NuxtBadge");

const columns: TableColumn<Investment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id") || "";
      const value = id.length > 8 ? id.slice(0, 8).toUpperCase() + "..." : id;
      return h("div", { title: id }, value);
    },
  },
  {
    accessorKey: "deposit",
    header: "Deposit",
    cell: ({ row }) => toDollar(row.getValue("deposit")),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "capitalize" },
        toCase(row.getValue("category"), "sentence"),
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = getInvestmentStatusBadgeColor(row.getValue("status"));
      return h(Badge, { variant: "subtle", color }, () =>
        row.getValue("status"),
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      useDateFormat(row.getValue("date"), "MMM-DD-YYYY, hh:mm aa").value,
  },
];

async function onSelect(row: TableRow<Investment>) {
  const investmentId = row.getValue("id");
  await navigateTo(`/user/accounts/${accountId}/investments/${investmentId}`);
}
</script>

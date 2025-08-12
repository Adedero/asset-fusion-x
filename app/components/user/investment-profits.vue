<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { useDateFormat } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";

interface Props {
  investmentId: string;
  profitCount: number;
}

const { investmentId, profitCount } = defineProps<Props>();

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

const { pending, data, error, refresh } = useFetch(
  `/api/user/financial-accounts/${accountId}/investments/${investmentId}/profits`,
  {
    query,
  },
);

const profits = computed(() => {
  return (
    data.value?.map((txn) => {
      return {
        id: txn.id,
        amount: txn.USDAmount,
        status: txn.status,
        date: txn.createdAt,
      };
    }) ?? []
  );
});

type Profit = NonNullable<(typeof profits)["value"]>[number];

const Badge = resolveComponent("NuxtBadge");

const columns: TableColumn<Profit>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id") || "";
      return id.length > 12 ? id.slice(0, 12).toUpperCase() + "..." : id;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => toDollar(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = getTransactionBadgeColor(row.getValue("status"));
      return h(Badge, { variant: "subtle", color }, () =>
        row.getValue("status"),
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      useDateFormat(row.getValue("date"), "MMM DD, YYYY").value,
  },
];

async function onSelect(row: TableRow<Profit>) {
  const transactionId = row.getValue("id");
  await navigateTo(`/user/accounts/${accountId}/transactions/${transactionId}`);
}
</script>

<template>
  <NuxtCard>
    <header>
      <p class="card-title">Profits</p>
    </header>

    <div class="mt-4 flex overflow-auto">
      <div v-if="pending" class="flex-center">
        <NuxtIcon
          name="lucide:loader"
          size="2rem"
          class="animate animate-spin"
        />
      </div>

      <FetchErrorAlert
        v-else-if="error"
        :message="normalizeException(error).message"
        show-retry
        @retry="refresh()"
      />

      <NuxtTable
        v-else-if="data"
        :data="profits"
        :columns
        :loading="pending"
        class="w-full"
        @select="onSelect"
      />
    </div>

    <div class="flex justify-center border-t border-default pt-4">
      <NuxtPagination
        v-model:page="page"
        :total="profitCount"
        :items-per-page="limit"
        show-edges
      />
    </div>
  </NuxtCard>
</template>

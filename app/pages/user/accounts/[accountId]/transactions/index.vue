<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";

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
    pick: ["totalTransactions"],
  },
);

const {
  data: transactions,
  error,
  refresh,
} = useFetch(`/api/user/financial-accounts/${accountId}/transactions`, {
  query,
});
</script>

<template>
  <MyPage :error="error || accountError" @refresh="refresh()">
    <div v-if="account && transactions">
      <div v-if="transactions.length" class="mb-4">
        <div class="space-y-4">
          <NuxtLink
            v-for="txn in transactions"
            :key="txn.id"
            :to="`/user/accounts/${accountId}/transactions/${txn.id}`"
            class="block"
          >
            <NuxtCard class="cursor-pointer">
              <div class="flex flex-wrap gap-4">
                <div class="grid-center">
                  <div
                    class="grid-center aspect-square p-1.5 bg-primary-50 text-primary rounded-full"
                  >
                    <NuxtIcon
                      :name="getTransactionIcon(txn.type)"
                      size="1.5rem"
                    />
                  </div>
                </div>

                <div>
                  <p>{{ txn.description ?? toCase(txn.type, "sentence") }}</p>
                  <p class="text-xs text-muted">
                    {{ useDateFormat(txn.createdAt, "MMM DD, YYYY") }} at
                    {{ useDateFormat(txn.createdAt, "hh:mm aa") }}
                  </p>
                </div>

                <div class="ml-auto flex flex-col items-end">
                  <p class="font-semibold">
                    <span>{{ txn.type === "deposit" ? "+" : "-" }}</span>
                    <span>{{ toDollar(txn.USDAmount) }}</span>
                  </p>

                  <NuxtBadge
                    :color="getTransactionStatusBadgeColor(txn.status)"
                    :label="txn.status"
                    variant="subtle"
                  />
                </div>
              </div>
            </NuxtCard>
          </NuxtLink>
        </div>
        <div class="mt-4 flex-center">
          <NuxtPagination
            v-model:page="page"
            :total="account.totalTransactions"
            :items-per-page="limit"
            show-edges
          />
        </div>
      </div>

      <div v-else>
        <EmptyIcon label="No transactions" />
      </div>
    </div>
  </MyPage>
</template>

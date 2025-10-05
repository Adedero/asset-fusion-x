<script setup lang="ts">
import normalizeException from "~~/shared/helpers/normalize-exception";

const investmentId = useRouteData().getParams("investmentId");

const { data, error, pending, refresh } = useFetch(
  `/api/admin/investments/${investmentId}`
);
</script>

<template>
  <div>
    <div v-if="pending" class="flex-center p-5">
      <NuxtLoader />
    </div>

    <div v-else-if="error" class="w-full">
      <FetchErrorAlert
        :message="normalizeException(error).message"
        show-retry
        @retry="() => refresh()"
      />
    </div>

    <div v-else-if="data">
      <header>
        <p class="text-xs font-semibold text-muted">
          Investment ID: {{ data.id }}
        </p>
        <div class="flex items-center gap-2">
          <h1 class="text-3xl">{{ data.investmentName }}</h1>
          <NuxtBadge
            :label="data.status"
            :color="getInvestmentStatusBadgeColor(data.status)"
            variant="subtle"
          />
        </div>
        <p class="text-sm text-primary-500">
          {{ data.category }}
        </p>
      </header>

      <div class="mt-8 space-y-10">
        <section>
          <h3 class="text-xl">
            Status:
            <span class="font-geist-mono font-semibold">
              {{ data.status }}
            </span>
          </h3>
          <NuxtSeparator class="my-2" />
          <div class="mt-4">
            <AdminInvestmentStatusUpdater
              :investment-id="data.id"
              :termination-fee="data.terminationFee"
              :status="data.status"
              @done="() => refresh()"
            />
          </div>
        </section>

        <section>
          <h3 class="text-xl">
            Termination Fee:
            <span class="font-geist-mono font-semibold">
              {{ toDollar(data.terminationFee) }}
            </span>
          </h3>
          <NuxtSeparator class="my-2" />
          <div class="mt-4">
            <AdminInvestmentTerminationFeeUpdater
              :investment-id="data.id"
              :termination-fee="data.terminationFee"
              @done="() => refresh()"
            />
          </div>
        </section>

        <section>
          <h3 class="text-xl text-error">Delete Investment</h3>
          <NuxtSeparator class="my-2" color="error" />
          <div class="mt-4">
            <AdminInvestmentDeleter
              :investment-id="data.id"
              @done="() => navigateTo('/admin/investments')"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style soped>
@reference "../../../../assets/css/main.css";

.section-grid {
  @apply mt-4 grid md:grid-cols-2 gap-x-5 gap-y-8;
}

.section-grid-label {
  @apply text-sm text-muted font-semibold;
}
</style>

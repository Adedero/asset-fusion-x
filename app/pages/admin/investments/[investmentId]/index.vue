<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
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
          <h3 class="text-xl">Investor</h3>
          <NuxtSeparator class="my-2" />
          <div class="mt-4 flex items-center gap-5">
            <NuxtAvatar
              :src="data.investor.user.image ?? undefined"
              :alt="data.investor.user.name"
              size="3xl"
              :ui="{ root: 'size-16' }"
            />

            <div>
              <p class="text-xl">{{ data.investor.user.name }}</p>
              <p class="text-muted">{{ data.investor.user.email }}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl">Financial Account</h3>
          <NuxtSeparator class="my-2" />
          <div class="section-grid">
            <div>
              <p class="section-grid-label">Name</p>
              <p>
                {{ data.financialAccount.name }}
              </p>
            </div>
            <div>
              <p class="section-grid-label">Type</p>
              <p>
                {{
                  `${data.financialAccount.type}, ${data.financialAccount.ownership}`
                }}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl">Information</h3>
          <NuxtSeparator class="my-2" />
          <div class="section-grid">
            <div>
              <p class="section-grid-label">Deposit</p>
              <p>{{ toDollar(data.deposit) }}</p>
            </div>

            <div>
              <p class="section-grid-label">Percentage Profit</p>
              <p>{{ data.totalReturn }}%</p>
            </div>

            <div>
              <p class="section-grid-label">Expected Returns</p>
              <p>{{ toDollar(data.deposit * (data.totalReturn / 100)) }}</p>
            </div>

            <div>
              <p class="section-grid-label">Current Returns</p>
              <p>{{ toDollar(data.totalProfit) }}</p>
            </div>

            <div>
              <p class="section-grid-label">Termination Fee</p>
              <p>{{ toDollar(data.terminationFee) }}</p>
            </div>

            <div>
              <p class="section-grid-label">Profit Distribution</p>
              <p>{{ data.profitDistribution }}</p>
            </div>

            <div>
              <p class="section-grid-label">Duration</p>
              <p>{{ data.duration }}</p>
            </div>

            <div>
              <p class="section-grid-label">Days Completed</p>
              <p>{{ data.daysCompleted }}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl">Status : {{ data.status }}</h3>
          <NuxtSeparator class="my-2" />
          <div v-if="data.status === 'closed'" class="space-y-8">\
            <div v-if="data.closedAt">
              <p class="section-grid-label">Closure date</p>
              <p>
                {{ useDateFormat(data.closedAt, "MMM DD, YYYY hh:mm aa") }}
              </p>
            </div>

            <div v-if="data.closedReason">
              <p class="section-grid-label">Reason for closure</p>
              <p>
                {{ data.closedReason }}
              </p>
            </div>
          </div>

          <div v-if="data.status === 'paused'" class="space-y-8">
            <div v-if="data.pausedAt">
              <p class="section-grid-label">Pause date</p>
              <p>
                {{ useDateFormat(data.pausedAt, "MMM DD, YYYY hh:mm aa") }}
              </p>
            </div>

            <div v-if="data.pausedReason">
              <p class="section-grid-label">Reason for pause</p>
              <p>
                {{ data.pausedReason }}
              </p>
            </div>
          </div>

          <div v-if="data.status === 'terminated'" class="space-y-8">
            <div v-if="data.terminatedAt">
              <p class="section-grid-label">Termination date</p>
              <p>
                {{ useDateFormat(data.terminatedAt, "MMM DD, YYYY hh:mm aa") }}
              </p>
            </div>

            <div v-if="data.terminatedReason">
              <p class="section-grid-label">Reason for termination</p>
              <p>
                {{ data.terminatedReason }}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl">Meta Data</h3>
          <NuxtSeparator class="my-2" />
          <div class="section-grid">
            <div>
              <p class="section-grid-label">Created</p>
              <p>
                {{ useDateFormat(data.createdAt, "MMM DD, YYYY hh:mm aa") }}
              </p>
            </div>

            <div>
              <p class="section-grid-label">Last Updated</p>
              <p>
                {{ useDateFormat(data.updatedAt, "MMM DD, YYYY hh:mm aa") }}
              </p>
            </div>
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

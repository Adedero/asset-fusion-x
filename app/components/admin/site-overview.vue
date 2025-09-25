<script setup lang="ts">
const { data, error, refresh, pending } = useFetch("/api/admin/overview");
</script>

<template>
  <div>
    <p class="text-sm text-muted font-semibold mb-2">Site Overview</p>
    <div v-if="pending">Loading...</div>

    <FetchErrorAlert
      v-else-if="error"
      :error="error"
      show-retry
      @retry="() => refresh()"
    />

    <div
      v-else-if="data"
      class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
    >
      <NuxtCard>
        <header>
          <p class="card-title">Users</p>
        </header>

        <div class="mt-2 text-2xl font-semibold font-geist-mono">
          {{ data.users }}
        </div>

        <footer class="mt-2">
          <NuxtBadge
            variant="soft"
            class="mr-2"
            icon="lucide:user"
          />
        </footer>
      </NuxtCard>

      <NuxtCard>
        <header>
          <p class="card-title">Pending Transactions</p>
        </header>

        <div class="mt-2 text-2xl font-semibold font-geist-mono">
          {{ data.pendingTransactions }}
        </div>

        <footer class="mt-2">
          <NuxtBadge
            color="error"
            variant="soft"
            class="mr-2"
            icon="lucide:clock"
          />
        </footer>
      </NuxtCard>

      <NuxtCard>
        <header>
          <p class="card-title">Financial Accounts</p>
        </header>

        <div class="mt-2 text-2xl font-semibold font-geist-mono">
          {{ data.financialAccounts }}
        </div>

        <footer class="mt-2">
          <NuxtBadge
            color="success"
            variant="soft"
            class="mr-2"
            icon="lucide:coins"
          />
        </footer>
      </NuxtCard>
    </div>
  </div>
</template>

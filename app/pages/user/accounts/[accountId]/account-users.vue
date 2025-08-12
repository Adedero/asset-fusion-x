<script setup lang="ts">
definePageMeta({
  layout: "user",
});

const accountId = useRouteData().getParams("accountId");

const { data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}`,
  {
    pick: ["id", "name", "type", "ownership", "status"],
  },
);
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <div class="space-y-8">
      <NuxtCard>
        <template #header>
          <p class="card-title">Account Owners</p>
        </template>
        <div>
          <UserFinancialAccountCurrentUsers />
        </div>
      </NuxtCard>

      <NuxtCard v-if="data?.ownership === 'joint'">
        <template #header>
          <div class="flex items-center gap-4 justify-between">
            <div>
              <p class="card-title">Pending Requests</p>
              <small>
                These users are yet to accept the joint account request
              </small>
            </div>

            <UserAddAccountUserWidget :account-id="accountId" />
          </div>
        </template>

        <div>
          <UserFinancialAccountRequestedAccountUsers />
        </div>
      </NuxtCard>
    </div>
  </MyPage>
</template>

<script setup lang="ts">
const { data, error, refresh } = await useFetch(
  "/api/user/financial-accounts",
  {
    key: "user-financial-accounts",
  },
);

const maxAvatarGroup = 3;
</script>

<template>
  <MyPage :error @retry="refresh()">
    <div v-if="data">
      <div v-if="!data.financialAccounts.length" class="h-96">
        <div class="fluid flex-col-center gap-4 text-muted">
          <EmptyIcon label="No accounts" size="100px" />

          <UserOpenAccountWidget />
        </div>
      </div>

      <div v-else>
        <header class="flex justify-end mb-4">
          <UserOpenAccountWidget
            :account-count="data.financialAccounts.length"
          />
        </header>
        <div
          class="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]"
        >
          <NuxtCard
            v-for="account in data.financialAccounts"
            :key="account.id"
            class="cursor-context-menu transition-colors hover:bg-muted/70! group"
            @click="navigateTo(`/user/accounts/${account.id}`)"
          >
            <div>
              <header class="mb-2 flex items-start gap-2 justify-between">
                <div>
                  <div
                    class="border-2 border-accented rounded-md py-1 px-2 flex items-center gap-2"
                  >
                    <div class="w-2 h-2 bg-success rounded-full" />
                    <p class="card-title">{{ account.name }}</p>
                  </div>
                </div>

                <div
                  class="flex flex-wrap items-end justify-end gap-x-2 gap-y-1 md:hidden"
                >
                  <NuxtBadge
                    size="sm"
                    variant="soft"
                    :label="account.ownership"
                  />
                  <NuxtBadge
                    size="sm"
                    variant="soft"
                    color="error"
                    :label="account.type"
                  />
                </div>

                <div class="space-x-2 hidden md:block">
                  <NuxtBadge variant="soft" :label="account.ownership" />
                  <NuxtBadge
                    variant="soft"
                    color="error"
                    :label="account.type"
                  />
                </div>
              </header>

              <div class="flex items-center gap-2 justify-between">
                <div>
                  <p class="font-geist-mono text-muted text-[0.9rem]">
                    {{ account.number }}
                  </p>
                  <div class="flex gap-x-2 flex-wrap items-baseline">
                    <p class="font-geist-mono text-4xl font-semibold">
                      {{ toDollar(account.balance) }}
                    </p>

                    <p class="font-geist-mono font-semibold text-muted">
                      +{{ toDollar(account.totalProfit) }}
                    </p>
                  </div>
                </div>

                <div
                  class="text-primary/50 transition-all translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <NuxtIcon size="3rem" name="lucide-circle-arrow-right" />
                </div>
              </div>
            </div>

            <template #footer>
              <footer v-if="account.primaryUser">
                <div class="flex items-center gap-1">
                  <NuxtAvatarGroup size="xl">
                    <NuxtAvatar
                      v-for="user in [account.primaryUser, ...account.users]"
                      :key="user.id"
                      :alt="user.name"
                      :src="user.image ?? undefined"
                    />
                  </NuxtAvatarGroup>
                  <span
                    v-if="account.userCount === 1"
                    class="text-sm text-muted ml-2"
                    >You</span
                  >
                  <span
                    v-else-if="account.userCount - maxAvatarGroup > 0"
                    class="text-sm text-muted ml-2"
                  >
                    +{{
                      `${account.userCount - maxAvatarGroup} ${
                        account.userCount - maxAvatarGroup === 1
                          ? "other"
                          : "others"
                      }`
                    }}</span
                  >
                </div>
              </footer>
            </template>
          </NuxtCard>
        </div>
      </div>
    </div>
  </MyPage>
</template>

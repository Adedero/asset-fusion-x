<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth.store";

const accountId = useRouteData().getParams("accountId");

const { data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}/mod-requests`,
  { key: "account-mod-requests" },
);
const store = useAuthStore();

type RequestItem = NonNullable<
  NonNullable<typeof data.value>["allRequests"]
>[number];

function ownApproval(request: RequestItem) {
  const approval = request.approvals.find(
    (approval) => approval.approver.id === store.user.value?.id,
  );
  return approval;
}
</script>

<template>
  <MyPage :error @refres="refresh()">
    <div v-if="data" class="mb-4 lg:grid lg:grid-cols-2 lg:gap-4">
      <div class="space-y-2">
        <p class="card-title">Your Requests</p>

        <div v-if="data.ownRequests.length" class="space-y-4">
          <NuxtCard v-for="request in data.ownRequests" :key="request.id">
            <template #header>
              <div class="flex items-center gap-2">
                <NuxtAvatar
                  :alt="request.creator.name"
                  :src="request.creator.image ?? undefined"
                />

                <p class="text-sm text-muted">
                  {{
                    request.description ??
                    `${request.creator.name} initiated a ${toCase(
                      request.type,
                      "lower",
                    )} request ${
                      request.transaction
                        ? `of ${toDollar(request.transaction.USDAmount)}`
                        : ""
                    }`
                  }}
                </p>
              </div>
            </template>

            <div>
              <div>
                <NuxtCollapsible class="flex flex-col gap-2">
                  <NuxtButton
                    label="Approval Status"
                    color="neutral"
                    variant="soft"
                    trailing-icon="i-lucide-chevron-down"
                    block
                  />

                  <template #content>
                    <div class="mt-2 ml-2 space-y-2">
                      <div
                        v-for="approval in request.approvals"
                        :key="approval.id"
                      >
                        <div class="flex items-center gap-3">
                          <NuxtAvatar
                            :alt="approval.approver.name"
                            :src="approval.approver.image ?? undefined"
                          />

                          <p class="text-sm">{{ approval.approver.name }}</p>

                          <NuxtBadge
                            :color="getModRequestStatusColor(approval.status)"
                            :label="approval.status"
                            size="sm"
                            variant="subtle"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                </NuxtCollapsible>
              </div>

              <div class="mt-4 flex justify-end">
                <p class="text-xs">
                  {{
                    useDateFormat(request.createdAt, "MMM DD, YYYY | hh:mm aa")
                  }}
                </p>
              </div>
            </div>
          </NuxtCard>
        </div>

        <div v-else>
          <EmptyIcon label="No requests" size="4rem" />
        </div>
      </div>

      <NuxtSeparator class="lg:hidden my-8" />

      <div class="space-y-2">
        <p class="card-title">Other Requests</p>

        <div v-if="data.otherRequests.length" class="space-y-4">
          <NuxtCard v-for="request in data.otherRequests" :key="request.id">
            <template #header>
              <div class="flex items-center gap-2">
                <NuxtAvatar
                  :alt="request.creator.name"
                  :src="request.creator.image ?? undefined"
                />

                <p class="text-sm text-muted">
                  {{
                    request.description ??
                    `${request.creator.name} initiated a ${toCase(
                      request.type,
                      "lower",
                    )} request ${
                      request.transaction
                        ? `of ${toDollar(request.transaction.USDAmount)}`
                        : ""
                    }`
                  }}
                </p>
              </div>
            </template>

            <div>
              <div>
                <NuxtCollapsible class="flex flex-col gap-2">
                  <NuxtButton
                    label="Approval Status"
                    color="neutral"
                    variant="soft"
                    trailing-icon="i-lucide-chevron-down"
                    block
                  />

                  <template #content>
                    <div class="mt-2 ml-2 space-y-2">
                      <div
                        v-for="approval in request.approvals"
                        :key="approval.id"
                      >
                        <div class="flex items-center gap-3">
                          <NuxtAvatar
                            :alt="approval.approver.name"
                            :src="approval.approver.image ?? undefined"
                          />

                          <p class="text-sm">{{ approval.approver.name }}</p>

                          <NuxtBadge
                            :color="getModRequestStatusColor(approval.status)"
                            :label="approval.status"
                            size="sm"
                            variant="subtle"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                </NuxtCollapsible>
              </div>
            </div>

            <template #footer>
              <div class="flex justify-between">
                <p class="text-xs">
                  {{
                    useDateFormat(request.createdAt, "MMM DD, YYYY | hh:mm aa")
                  }}
                </p>

                <div
                  v-if="
                    ownApproval(request) &&
                    ownApproval(request)?.status === 'pending'
                  "
                  class="flex items-center gap-2"
                >
                  <UserModRequestStatusUpdater
                    :approval-id="ownApproval(request)!.id"
                    :mod-request-id="request.id"
                    :account-id="accountId"
                    status="accepted"
                    button-size="sm"
                    button-label="Accept"
                    @done="(success: boolean) => success && refresh()"
                  />

                  <UserModRequestStatusUpdater
                    :approval-id="ownApproval(request)!.id"
                    :mod-request-id="request.id"
                    :account-id="accountId"
                    status="rejected"
                    button-size="sm"
                    button-label="Reject"
                    button-color="error"
                    button-variant="subtle"
                    @done="(success: boolean) => success && refresh()"
                  />
                </div>
              </div>
            </template>
          </NuxtCard>
        </div>

        <div v-else>
          <EmptyIcon label="No requests" size="4rem" />
        </div>
      </div>
    </div>
  </MyPage>
</template>

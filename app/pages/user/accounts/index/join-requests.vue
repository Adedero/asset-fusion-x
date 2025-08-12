<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();

const { data, error, refresh } = await useFetch("/api/user/join-requests", {
  key: "user-join-requests",
});

const joinRequests = computed(
  () => data.value?.map((item) => ({ ...item, loading: false })) ?? [],
);

type JoinRequest = (typeof joinRequests.value)[number];

const acceptError = ref<Error | null>(null);
async function acceptRequest(item: JoinRequest, close: () => void) {
  try {
    await $fetch(`/api/user/join-requests/${item.id}/accept`, {
      method: "post",
    });
    toast.add({
      color: "success",
      title: "Success",
      description: "You are now an account member.",
    });
    await refresh();
    close();
  } catch (e) {
    acceptError.value = normalizeException(e);
  }
}

const rejectError = ref<Error | null>(null);

async function rejectRequest(item: JoinRequest, close: () => void) {
  try {
    await $fetch(`/api/user/join-requests/${item.id}`, {
      method: "delete",
    });
    await refresh();
    close();
  } catch (e) {
    rejectError.value = normalizeException(e);
  }
}
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <div v-if="data">
      <div
        v-if="joinRequests.length > 0"
        class="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]"
      >
        <NuxtCard v-for="item in joinRequests" :key="item.id">
          <template #header>
            <div class="flex items-center gap-2">
              <NuxtAvatar
                :src="item.creator.image ?? undefined"
                :alt="item.creator.name"
                size="lg"
              />
              <div>
                <p class="text-sm text-muted">
                  Invited by <b>{{ item.creator.name }}</b>
                </p>
                <p class="text-xs text-muted">{{ item.creator.email }}</p>
              </div>
            </div>
          </template>

          <div class="space-y-2">
            <header>
              <h3 class="text-3xl font-medium">
                {{ item.financialAccount.name }}
              </h3>
              <p class="text-xs">
                Created
                <b>
                  {{
                    useDateFormat(
                      item.financialAccount.createdAt,
                      "MMM DD, YYYY",
                    )
                  }}
                </b>
              </p>
            </header>

            <div>
              <NuxtBadge
                variant="soft"
                :label="toCase(item.role, 'sentence')"
              />
              <NuxtBadge
                color="success"
                variant="soft"
                :label="item.ownership + '% ownership'"
                class="ml-2"
              />
            </div>

            <div v-if="item.description" class="text-xs">
              <p class="underline">Added note</p>
              <p class="text-muted">
                {{ item.description }}
              </p>
            </div>

            <div class="flex justify-end">
              <p class="text-muted text-xs">
                Request sent on
                {{ useDateFormat(item.createdAt, "MMM DD, YYYY hh:mm aa") }}
              </p>
            </div>
          </div>

          <template #footer>
            <div>
              <div class="flex items-center gap-2 justify-end">
                <NuxtModal title="Account Request">
                  <NuxtButton
                    color="error"
                    variant="soft"
                    icon="lucide-circle-x"
                    size="sm"
                    label="Reject"
                  />

                  <template #body="{ close }">
                    <div class="space-y-4">
                      <p>Are you sure you want to reject this request?</p>

                      <FetchErrorAlert
                        v-if="rejectError"
                        :message="rejectError.message"
                      />

                      <div class="flex items-center justify-end gap-2">
                        <NuxtButton
                          color="neutral"
                          variant="soft"
                          label="Cancel"
                          @click="close()"
                        />

                        <NuxtButton
                          color="error"
                          label="Proceed"
                          loading-auto
                          @click="rejectRequest(item, close)"
                        />
                      </div>
                    </div>
                  </template>
                </NuxtModal>

                <NuxtModal title="Account Request">
                  <NuxtButton
                    label="Accept"
                    size="sm"
                    icon="lucide-circle-check"
                  />

                  <template #body="{ close }">
                    <div class="space-y-4">
                      <p>Are you sure you want to accept this request?</p>

                      <FetchErrorAlert
                        v-if="acceptError"
                        :message="acceptError.message"
                      />

                      <div class="flex items-center justify-end gap-2">
                        <NuxtButton
                          color="neutral"
                          variant="soft"
                          label="Cancel"
                          @click="close()"
                        />

                        <NuxtButton
                          label="Proceed"
                          loading-auto
                          @click="acceptRequest(item, close)"
                        />
                      </div>
                    </div>
                  </template>
                </NuxtModal>
              </div>
            </div>
          </template>
        </NuxtCard>
      </div>

      <div v-else class="h-60 fluid flex-col-center gap-4 text-muted">
        <EmptyIcon label="No requests" size="100px" />
      </div>
    </div>
  </MyPage>
</template>

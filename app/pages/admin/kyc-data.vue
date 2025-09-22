<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import type { SelectedProfile } from "~/components/admin/kyc-editor.vue";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "KYC Requests"
    }
  ]
});

const authStore = useAuthStore();

const page = ref<number>(0);
const limit = ref<number>(20);
const search = ref<string>();

const query = computed(() => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page.value.toString());
  searchParams.set("limit", limit.value.toString());
  if (search.value) {
    searchParams.set("search", search.value.toLowerCase());
  }
  return Object.fromEntries(searchParams.entries());
});

const {
  data: profiles,
  error,
  refresh
} = await useFetch("/api/admin/kyc-data", { query });

const allLoaded = computed(() => {
  return profiles.value ? profiles.value.length < limit.value : false;
});

const selectedProfile = ref<SelectedProfile | null>(null);
const open = ref<boolean>(false);
const handleProfileSelect = (id: string) => {
  selectedProfile.value =
    profiles.value?.find((profile) => profile.id === id) ?? null;

  if (selectedProfile.value) {
    open.value = true;
  }
};
const headers = ["#", "", "Name", "Email", "KYC Status", "ID Type", "Actions"];
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <section class="space-y-10">
      <div class="flex items-end justify-between gap-5 flex-wrap">
        <h1 class="text-3xl font-semibold">KYC Data</h1>
        <div>
          <NuxtButtonGroup>
            <NuxtButton
              icon="lucide:search"
              color="neutral"
              variant="outline"
            />
            <NuxtInput v-model="search" placeholder="Search..." />
          </NuxtButtonGroup>
        </div>
      </div>

      <div v-if="profiles">
        <VTable>
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="(profile, index) in profiles" :key="profile.id">
              <VTableCell>
                {{ index + 1 + page * limit }}
              </VTableCell>
              <VTableCell>
                <NuxtAvatar
                  :src="profile.image ?? undefined"
                  :alt="profile.fullName"
                  size="md"
                />
              </VTableCell>
              <VTableCell>
                <div class="flex items-center gap-1">
                  <p>{{ profile.fullName }}</p>
                  <NuxtBadge
                    v-if="profile.userId === authStore.user.value?.id"
                    label="you"
                    color="error"
                    variant="subtle"
                    size="sm"
                  />
                </div>
              </VTableCell>
              <VTableCell>{{ profile.email }}</VTableCell>
              <VTableCell>
                <NuxtBadge
                  :label="profile.kycStatus ?? 'not submitted'"
                  :color="getKycStatusBadgeColor(profile.kycStatus ?? null)"
                  variant="subtle"
                />
              </VTableCell>
              <VTableCell>{{ profile.governmentIdType ?? "n/a" }}</VTableCell>
              <VTableCell>
                <div class="flex items-center gap-2">
                  <NuxtButton
                    label="Edit"
                    icon="lucide:file-edit"
                    variant="soft"
                    size="sm"
                    @click="handleProfileSelect(profile.id ?? '')"
                  />
                  <a
                    v-if="profile.governmentId"
                    :href="profile.governmentId ?? undefined"
                    download
                  >
                    <NuxtButton
                      label="Download"
                      icon="lucide:download"
                      color="neutral"
                      variant="outline"
                      size="sm"
                      class="pointer-none"
                    />
                  </a>
                </div>
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>

        <div>
          <NuxtSimplePaginator
            v-model:page="page"
            :rows="limit"
            :all-loaded="allLoaded"
          />
        </div>

        <div v-if="selectedProfile">
          <AdminKycEditor
            v-model:open="open"
            :profile="selectedProfile"
            @done="
              () => {
                selectedProfile = null;
                refresh();
              }
            "
          />
        </div>
      </div>
    </section>
  </MyPage>
</template>

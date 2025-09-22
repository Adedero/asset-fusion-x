<script setup lang="ts">
definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "Business Profiles"
    }
  ]
});

const page = ref<number>(0);
const limit = ref<number>(20);
const search = ref<string>();
const approvalFilter = ref<string>("not approved");

const query = computed(() => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page.value.toString());
  searchParams.set("limit", limit.value.toString());
  if (search.value) {
    searchParams.set("search", search.value.toLowerCase());
  }
  if (approvalFilter.value !== "all") {
    searchParams.set(
      "approved",
      approvalFilter.value === "approved" ? "true" : ""
    );
  }
  return Object.fromEntries(searchParams.entries());
});

const {
  data: profiles,
  error,
  refresh
} = await useFetch("/api/admin/business-profiles", { query });

const allLoaded = computed(() => {
  return profiles.value ? profiles.value.length < limit.value : false;
});

export type BusinessProfile = NonNullable<typeof profiles.value>[number];

const selectedProfile = ref<BusinessProfile | null>(null);
const open = ref<boolean>(false);
const handleProfileSelect = (id: string) => {
  selectedProfile.value =
    profiles.value?.find((profile) => profile.id === id) ?? null;

  if (selectedProfile.value) {
    open.value = true;
  }
};
const headers = [
  "#",
  "Business Name",
  "Approved",
  "Address",
  "Business Created",
  "Actions"
];
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <section class="space-y-10">
      <div class="flex items-end justify-between gap-5 flex-wrap">
        <h1 class="text-3xl font-semibold">Business Profiles</h1>
        <div class="flex items-end gap-2">
          <NuxtButtonGroup>
            <NuxtButton
              icon="lucide:search"
              color="neutral"
              variant="outline"
            />
            <NuxtInput v-model="search" placeholder="Search..." />
          </NuxtButtonGroup>

          <div class="flex flex-col items-end gap-1">
            <p class="text-xs font-semibold">Approval status</p>
            <NuxtSelect
              v-model="approvalFilter"
              :items="['all', 'approved', 'not approved']"
              class="w-36"
            />
          </div>
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
              <VTableCell>{{ profile.financialAccountName }}</VTableCell>
              <VTableCell>
                <NuxtBadge
                  :label="profile.approved ? 'Yes' : 'No'"
                  :color="profile.approved ? 'success' : 'error'"
                  variant="subtle"
                />
              </VTableCell>
              <VTableCell>{{ profile.address }}</VTableCell>

              <VTableCell>
                {{ `${profile.creationMonth}, ${profile.creationYear}` }}
              </VTableCell>
              <VTableCell>
                <NuxtButton
                  label="More"
                  icon="lucide:ellipsis-vertical"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  @click="handleProfileSelect(profile.id ?? '')"
                />
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>

        <div class="mt-2 border-t border-t-default">
          <NuxtSimplePaginator
            v-model:page="page"
            :rows="limit"
            :all-loaded="allLoaded"
          />
        </div>

        <div v-if="selectedProfile">
          <AdminBusinessProfileEditor
            v-model:open="open"
            :profile="selectedProfile"
            @done="
              () => {
                refresh();
                selectedProfile = null;
              }
            "
          />
        </div>
      </div>
    </section>
  </MyPage>
</template>

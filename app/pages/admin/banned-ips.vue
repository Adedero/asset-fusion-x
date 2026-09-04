<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "Banned IPs"
    }
  ]
});

const { confirmAsync } = useConfirm();
const toast = useToast();

const open = ref<boolean>(false);

const { data, error, refresh } = await useFetch("/api/admin/banned-ips");

const headers = [
  "IP Address",
  "Reason",
  "Linked User",
  "Expires",
  "Created",
  "Actions"
];

const isExpired = (expiresAt: string | Date | null) =>
  !!expiresAt && new Date(expiresAt).getTime() < Date.now();

const removeBan = async (id: string) => {
  const confirm = await confirmAsync({
    title: "Remove IP Ban",
    description: "Are you sure you want to unban this IP address?",
    acceptProps: { color: "error", label: "Remove" }
  });
  if (!confirm) return;

  try {
    await $fetch(`/api/admin/banned-ips/${id}`, { method: "DELETE" });
    toast.add({
      color: "success",
      title: "Success",
      description: "IP address unbanned successfully"
    });
    refresh();
  } catch (err) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(err).message
    });
  }
};
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <div>
      <header class="flex items-center gap-2 justify-between flex-wrap">
        <h1 class="text-3xl font-semibold">Banned IPs</h1>

        <NuxtButton label="Ban IP" icon="lucide:plus" @click="open = true" />
      </header>

      <section v-if="data" class="mt-5">
        <AdminBannedIpModal v-model:open="open" @done="() => refresh()" />

        <VTable>
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="ban in data" :key="ban.id">
              <VTableCell>{{ ban.ipAddress }}</VTableCell>
              <VTableCell>{{ ban.reason }}</VTableCell>
              <VTableCell>
                <div v-if="ban.user">
                  <p>{{ ban.user.name }}</p>
                  <p class="text-sm text-muted">{{ ban.user.email }}</p>
                </div>
                <span v-else>&mdash;</span>
              </VTableCell>
              <VTableCell>
                <NuxtBadge
                  v-if="!ban.expiresAt"
                  label="Permanent"
                  color="neutral"
                  variant="subtle"
                />
                <div v-else class="flex items-center gap-2">
                  <span>{{ useDateFormat(ban.expiresAt, "YYYY-MMM-DD") }}</span>
                  <NuxtBadge
                    v-if="isExpired(ban.expiresAt)"
                    label="Expired"
                    color="warning"
                    variant="subtle"
                  />
                </div>
              </VTableCell>
              <VTableCell>
                {{ useDateFormat(ban.createdAt, "YYYY-MMM-DD") }}
              </VTableCell>
              <VTableCell>
                <NuxtButton
                  label="Remove"
                  color="error"
                  variant="soft"
                  size="sm"
                  loading-auto
                  @click="removeBan(ban.id)"
                />
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>
      </section>
    </div>
  </MyPage>
</template>

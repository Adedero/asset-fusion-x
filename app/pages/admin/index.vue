<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
    },
  ] as BreadcrumbItem[],
});
</script>

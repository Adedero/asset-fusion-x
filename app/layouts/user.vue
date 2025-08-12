<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import { links, secondaryLinks } from "~/data/user-links";
import { useAuthStore } from "~/stores/auth.store";
import { authClient } from "~/lib/auth";
import normalizeException from "~~/shared/helpers/normalize-exception";

const runtimeConfig = useRuntimeConfig();

const route = useRoute();
const router = useRouter();

const breadcrumb = ref<BreadcrumbItem[]>([]);

router.beforeEach((to, from, next) => {
  breadcrumb.value = to.meta.breadcrumb as BreadcrumbItem[];
  next();
});

const { data, error, pending, refresh } = await useFetch(
  "/api/user/notifications/unread/check",
  {
    key: "user-unread-notifications-check",
  },
);

const authStore = useAuthStore();

const open = ref<boolean>(false);

const signOutError = ref<Error | null>(null);
const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo("/sign-in");
      },
      onError: (ctx) => {
        signOutError.value = normalizeException(ctx.error);
      },
    },
  });
};
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtSidebar>
      <template #header>
        <div class="w-full bg-elevated rounded-md px-2 py-4">
          <div class="flex items-center gap-2">
            <NuxtLink to="/user">
              <AppLogo size="32" />
            </NuxtLink>
            <div>
              <p class="text-sm font-semibold">
                {{ runtimeConfig.public.appName }}
              </p>
              <p class="text-muted text-xs">Investment made easy</p>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <div>
          <NuxtNavigationMenu
            orientation="vertical"
            :items="links({ signOut: () => (open = true) })"
          />
        </div>
      </template>

      <template #footer>
        <NuxtDropdownMenu
          :items="
            secondaryLinks({
              name: authStore.user.value?.name ?? 'Anonymous',
              image: authStore.user.value?.image ?? undefined,
              signOut: () => (open = true),
            })
          "
          :ui="{
            content: 'w-48',
          }"
        >
          <div
            class="cursor-context-menu select-none w-full transition-colors hover:bg-elevated rounded-md p-2"
          >
            <div class="flex items-center gap-2 justify-between">
              <div class="flex items-center gap-2">
                <NuxtAvatar
                  size="xl"
                  :text="initials(authStore.user.value?.name ?? 'Anonymous')"
                  :src="authStore.user.value?.image ?? undefined"
                />
                <div>
                  <p class="font-semibold text-sm">
                    {{ authStore.user.value?.name ?? "Anonymous" }}
                  </p>
                  <p class="text-xs">
                    {{ authStore.user.value?.email ?? "unverified" }}
                  </p>
                </div>
              </div>

              <NuxtIcon
                name="lucide-chevrons-up-down"
                size="1rem"
                class="flex-shrink-0"
              />
            </div>
          </div>
        </NuxtDropdownMenu>
      </template>

      <template #body-header>
        <div class="flex items-center gap-1 justify-between overflow-x-auto">
          <div v-if="route.meta.breadcrumb" class="hidden md:block">
            <NuxtBreadcrumb :items="breadcrumb" :ui="{ link: 'text-sm' }" />
          </div>

          <div class="w-full h-full flex items-center gap-3 justify-end">
            <div>
              <NuxtChip :show="data?.hasUnreadNotifications">
                <NuxtButton
                  :loading="pending"
                  :icon="error ? 'i-lucide-alert-triangle' : 'i-lucide-bell'"
                  size="sm"
                  variant="outline"
                  color="neutral"
                  @click="error ? refresh() : navigateTo('/user/notifications')"
                />
              </NuxtChip>
            </div>

            <div>
              <ColorModeToggler size="sm" />
            </div>

            <NuxtDropdownMenu
              :items="
                secondaryLinks({
                  name: authStore.user.value?.name ?? 'Anonymous',
                  image: authStore.user.value?.image ?? undefined,
                  signOut: () => (open = true),
                })
              "
              :ui="{
                content: 'w-48',
              }"
            >
              <div>
                <NuxtAvatar
                  size="xl"
                  :text="initials(authStore.user.value?.name ?? 'Anonymous')"
                  :src="authStore.user.value?.image ?? undefined"
                />
              </div>
            </NuxtDropdownMenu>
          </div>
        </div>
      </template>

      <template #body>
        <NuxtPage />

        <NuxtModal v-model:open="open" title="Sign out">
          <template #body="{ close }">
            <div class="space-y-4">
              <p>Are you sure you want to proceed?</p>

              <FetchErrorAlert
                v-if="signOutError"
                :message="signOutError.message"
              />

              <div class="flex items-center gap-2 justify-end">
                <NuxtButton
                  label="Cancel"
                  color="neutral"
                  variant="soft"
                  @click="close"
                />
                <NuxtButton label="Sign out" loading-auto @click="signOut" />
              </div>
            </div>
          </template>
        </NuxtModal>
      </template>
    </NuxtSidebar>
  </div>
</template>

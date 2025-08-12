<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useAuthStore } from "~/stores/auth.store";
import normalizeException from "~~/shared/helpers/normalize-exception";

interface Props {
  size?: string;
  fontSize?: string;
}

const { size = "10rem", fontSize = "3rem" } = defineProps<Props>();

const authStore = useAuthStore();
const toast = useToast();
const open = ref<boolean>(false);

const user = computed(() => authStore.user.value);

const items = computed<DropdownMenuItem[][]>(() => {
  const dropdownItems: DropdownMenuItem[][] = [[]];
  if (user.value?.image) {
    dropdownItems[0]!.push({ label: "Remove image", onSelect: removeImage });
    dropdownItems[0]!.push({
      label: "Change image",
      onSelect: () => (open.value = true),
    });
  } else {
    dropdownItems[0]!.push({
      label: "Add image",
      onSelect: () => (open.value = true),
    });
  }
  return dropdownItems;
});

const newImage = ref<string | null>(null);

const pending = ref<boolean>(false);
const error = ref<Error | null>(null);
async function addImage() {
  pending.value = true;
  error.value = null;
  try {
    const data = await $fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ image: newImage.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    authStore.setUser({ ...authStore.user.value!, image: data.image });
    newImage.value = null;
    open.value = false;
  } catch (err) {
    error.value = normalizeException(err);
    toast.add({
      title: "Error",
      description: "Failed to update image",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
}

async function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  if (!file) {
    return;
  }
  if (!file.type.startsWith("image/")) {
    toast.add({
      title: "Invalid file type",
      description: "Please select an image file.",
      color: "error",
    });
    return;
  }
  //Check file size. file should not be more than 2mb
  if (file.size > 2 * 1024 * 1024) {
    toast.add({
      title: "File too large",
      description: "Please select an image file smaller than 2MB.",
      color: "error",
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    newImage.value = reader.result as string;
    open.value = true;
  };
  reader.readAsDataURL(file);
}

const res = useFetch("/api/user", {
  body: { image: null },
  method: "PUT",
  immediate: false,
});

async function removeImage() {
  await res.execute();
  if (res.error.value || !res.data.value) {
    console.log(res.error.value);
    toast.add({
      title: "Error",
      description: "Failed to remove image",
      color: "error",
    });
    return;
  }
  authStore.setUser({ ...authStore.user.value!, image: null });
  toast.add({
    title: "Success",
    description: "Image removed successfully",
    color: "success",
  });
}
</script>

<template>
  <div>
    <div v-if="user">
      <slot :user="user">
        <div class="flex-col-center">
          <NuxtDropdownMenu :items :ui="{ content: 'w-48' }">
            <div
              class="cursor-pointer rounded-full bg-accented text-muted overflow-hidden *:transition-transform hover:*:scale-120"
              :style="{ width: size, height: size }"
            >
              <div
                v-if="!user.image"
                class="w-full h-full flex-center text-2xl p-4 font-semibold uppercase"
                :style="{ fontSize }"
              >
                {{ initials(user.name ?? "") }}
              </div>

              <img
                v-else
                :src="user.image"
                class="w-full h-full object-cover rounded-full"
              />
            </div>

            <template #content>
              <div>Content sd sd sdsdsdsdsdsds</div>
            </template>
          </NuxtDropdownMenu>
        </div>
      </slot>
    </div>

    <NuxtModal v-model:open="open" title="Profile image editor">
      <template #body>
        <div class="flex-col-center gap-4">
          <div class="w-40 h-40 rounded-full overflow-hidden bg-muted">
            <img
              v-if="newImage || user?.image"
              :src="newImage || user?.image || undefined"
              class="w-full h-full object-cover"
            />
          </div>

          <div>
            <NuxtButtonGroup class="w-full">
              <NuxtInput
                type="file"
                accept="image/*"
                class="w-full"
                :loading="pending"
                :disabled="pending"
                @change="onFileChange"
              />
              <NuxtButton
                :disabled="!newImage"
                icon="i-lucide-x"
                color="neutral"
                variant="outline"
                @click="newImage = null"
              />
              <NuxtButton
                icon="i-lucide-check"
                :disabled="!newImage || pending"
                :loading="pending"
                @click="addImage"
              />
            </NuxtButtonGroup>
          </div>
        </div>
      </template>
    </NuxtModal>
  </div>
</template>

<script setup lang="ts">
import type { UserWithRole } from "better-auth/plugins";
import z from "zod";
import { PasswordSchema } from "~~/shared/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";

const toast = useToast();

interface User extends UserWithRole {
  password?: string;
}

const { user = null } = defineProps<{
  user?: User | null;
}>();
const emit = defineEmits<{
  done: [];
}>();
const open = defineModel<boolean>("open", { default: false });
const isEditing = computed(() => !!user);
const roles: Array<"user" | "admin"> = ["user", "admin"];

/* @ts-expect-error dynamic-role */
const state = reactive<Partial<z.infer<typeof schema>>>(user ?? {});
const schema = z.object({
  name: z.string("Invalid name").nonempty("Name is required"),
  email: z.email("Invalid email"),
  role: z.enum(["user", "admin"], "Invalid role"),
  password: PasswordSchema
});

const handleSubmit = async (event: FormSubmitEvent<z.infer<typeof schema>>) => {
  const { data } = event;
  await authClient.admin.createUser(data, {
    onSuccess() {
      emit("done");
      toast.add({
        color: "success",
        title: "Success",
        description: "User created successfully"
      });
      open.value = false;
    },
    onError(ctx) {
      toast.add({
        color: "error",
        title: "Error",
        description: ctx.error.message
      });
    }
  });
};
</script>

<template>
  <NuxtModal
    v-model:open="open"
    :title="isEditing ? 'Edit User' : 'New User'"
    :dismissible="false"
  >
    <template #body="{ close }">
      <div>
        <NuxtForm :state :schema @submit.prevent="handleSubmit">
          <div class="grid md:grid-cols-2 gap-3">
            <NuxtFormField name="name" label="Name" required>
              <NuxtInput v-model="state.name" class="w-full" />
            </NuxtFormField>

            <NuxtFormField name="role" label="Role" required>
              <NuxtSelect
                v-model="state.role as 'admin' | 'user'"
                :items="roles"
                class="w-full"
              />
            </NuxtFormField>

            <NuxtFormField
              name="email"
              label="Email"
              required
              class="md:col-span-2"
            >
              <NuxtInput v-model="state.email" class="w-full" />
            </NuxtFormField>

            <NuxtFormField
              name="password"
              label="Password"
              required
              class="md:col-span-2"
            >
              <NuxtInput v-model="state.password" class="w-full" />
            </NuxtFormField>

            <div class="flex items-center justify-end gap-2 md:col-span-2">
              <NuxtButton
                color="neutral"
                variant="soft"
                label="Cancel"
                @click="close"
              />
              <NuxtButton type="submit" label="Submit" loading-auto />
            </div>
          </div>
        </NuxtForm>
      </div>
    </template>
  </NuxtModal>
</template>

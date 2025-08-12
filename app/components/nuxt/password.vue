<script setup lang="ts">
import { NuxtButton, NuxtInput } from "#components";
import { ref, useAttrs } from "vue";

const show = ref(false);
const modelValue = defineModel<string>();
const attrs = useAttrs();
</script>

<template>
  <NuxtInput
    v-bind="attrs"
    v-model="modelValue"
    :type="show ? 'text' : 'password'"
    :ui="{ ...(attrs.ui ?? {}), trailing: 'pe-1' }"
  >
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>

    <template #trailing>
      <slot name="trailing">
        <NuxtButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          aria-controls="password"
          @click="show = !show"
        />
      </slot>
    </template>
  </NuxtInput>
</template>

<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>

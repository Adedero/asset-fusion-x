<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

interface Props {
  text?: unknown;
  resetAfter?: number;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  icon?: ButtonProps["icon"];
  label?: ButtonProps["label"];
}

const {
  text = "",
  resetAfter = 3000,
  color = "neutral",
  variant = "soft",
  size = "lg",
  icon = "lucide:clipboard",
  label = undefined,
} = defineProps<Props>();

const buttonIcon = ref<string>(icon);

const copy = async () => {
  if (!navigator) return;
  try {
    await navigator.clipboard.writeText(String(text));
    buttonIcon.value = "lucide-circle-check";
    setTimeout(() => {
      buttonIcon.value = icon;
    }, resetAfter);
  } catch (error) {
    console.error(error);
    buttonIcon.value = "lucide-circle-x";
    setTimeout(() => {
      buttonIcon.value = icon;
    }, resetAfter);
  }
};
</script>

<template>
  <slot :copy>
    <NuxtButton :color :size :variant :label :icon="buttonIcon" @click="copy" />
  </slot>
</template>

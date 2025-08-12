<script setup lang="ts">
import base64Logo from "~/data/logo";

interface Props {
  size?: string | number;
  width?: string | number;
  height?: string | number;
}

const {
  size = "28",
  width = undefined,
  height = undefined,
} = defineProps<Props>();
</script>

<template>
  <img :src="base64Logo" :width="width ?? size" :height="height ?? size" />
</template>

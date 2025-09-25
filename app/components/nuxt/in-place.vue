<script setup lang="ts">
interface Props {
  trigger?: "click" | "hover" | "dblclick" | "contextmenu";
}
const { trigger = "click" } = defineProps<Props>();

const isOpen = ref<boolean>(false);

const triggerEl = useTemplateRef("el");

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

const cleanupFns: (() => void)[] = [];

function bindListeners(el: HTMLElement) {
  if (trigger === "click") {
    const handler = () => open();
    el.addEventListener("click", handler);
    cleanupFns.push(() => el.removeEventListener("click", handler));
  }

  if (trigger === "hover") {
    const enter = () => open();
    el.addEventListener("mouseenter", enter);
    cleanupFns.push(() => {
      el.removeEventListener("mouseenter", enter);
    });
  }

  if (trigger === "dblclick") {
    const handler = () => open();
    el.addEventListener("dblclick", handler);
    cleanupFns.push(() => el.removeEventListener("dblclick", handler));
  }

  if (trigger === "contextmenu") {
    const handler = (e: Event) => {
      e.preventDefault();
      open();
    };
    el.addEventListener("contextmenu", handler);
    cleanupFns.push(() => el.removeEventListener("contextmenu", handler));
  }
}

onMounted(() => {
  if (triggerEl.value) {
    bindListeners(triggerEl.value);
  }
});

onUnmounted(() => {
  cleanupFns.forEach((fn) => fn());
});
</script>

<template>
  <div v-show="!isOpen" ref="el">
    <slot />
  </div>

  <div v-show="isOpen">
    <slot name="in-place" :close="close" />
  </div>
</template>

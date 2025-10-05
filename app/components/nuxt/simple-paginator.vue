<script setup lang="ts">
interface Props {
  allLoaded?: boolean;
  totalPages?: number;
  rows?: number;
  length?: number;
}

const {
  rows = undefined,
  length = undefined,
  allLoaded = false,
  totalPages = undefined
} = defineProps<Props>();

// Two-way binding with v-model:page
const page = defineModel<number>("page", { default: 0 });

const emit = defineEmits<{
  (e: "next" | "prev", value: number): void;
}>();

const prev = () => {
  if (page.value === 0) return;
  page.value -= 1;
  emit("prev", page.value);
};

const next = () => {
  if (allLoaded || (totalPages !== undefined && page.value >= totalPages - 1))
    return;
  page.value += 1;
  emit("next", page.value);
};
</script>

<template>
  <div class="w-full select-none">
    <div
      class="w-full flex items-center justify-center gap-2 bg-default p-2 rounded-lg"
    >
      <NuxtButton
        aria-label="Previous Page"
        :disabled="page < 1"
        color="neutral"
        variant="outline"
        icon="lucide:chevron-left"
        @click="prev"
      />

      <div
        class="border border-default rounded-md flex p-1 items-center gap-2 flex-shrink-0 text-sm"
        aria-label="Current Page"
      >
        <div v-if="rows && length" class="text-center flex-shrink-0 py-1 px-2">
          <span class="font-medium">{{ page * rows + 1 }}</span>
          to
          <span class="font-medium"
            >{{ Math.min((page + 1) * rows, length) }}
          </span>
        </div>

        <p class="border border-default text-center p-1 px-2 rounded-md">
          page
          <span class="font-medium text-muted">{{ page + 1 }}</span>
        </p>
      </div>

      <NuxtButton
        aria-label="Next Page"
        :disabled="
          allLoaded || (totalPages !== undefined && page >= totalPages - 1)
        "
        color="neutral"
        variant="outline"
        trailing-icon="lucide:chevron-right"
        @click="next"
      />
    </div>

    <div v-if="allLoaded" class="text-center mt-2 text-sm text-muted">
      All data loaded
    </div>
  </div>
</template>

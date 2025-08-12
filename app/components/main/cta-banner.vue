<script setup lang="ts">
interface Props {
  color?: "primary" | "neutral";
  title?: string;
  description?: string;
  buttonHref?: string;
  buttonLabel?: string;
  buttonIcon?: string;
}

const {
  color = "primary",
  title = "",
  description = "",
  buttonHref = "",
  buttonLabel = "",
  buttonIcon = "",
} = defineProps<Props>();

const classes = computed(() => {
  const map = {
    primary: {
      card: "bg-gradient-to-br from-tertiary-400 to-primary-700",
      text: "",
      button: "bg-white text-primary-500 hover:bg-slate-100",
    },

    neutral: {
      card: "bg-slate-800/50 border border-slate-700 bg-gradient-t-b from-primary/50",
      text: "text-muted",
      button: "bg-primary-500 hover:bg-primary-600",
    },
  };

  return map[color];
});
</script>

<template>
  <div class="px-12 pt-4 pb-12">
    <div class="py-10 px-40 rounded-2xl text-center" :class="classes.card">
      <h4 class="text-3xl font-semibold">
        {{ title || "Ready To Take Control of Your Financial Future?" }}
      </h4>

      <p class="mt-5" :class="classes.text">
        {{
          description ||
          "Let us help you achieve your financial goals with personalized strategies and expert advice. Schedule a free consultation today to start your journey toward financial freedom."
        }}
      </p>

      <div class="mt-5 grid place-content-center">
        <NuxtLink :to="buttonHref || '/sign-up'">
          <button
            class="cursor-pointer pointer-events-none rounded-full font-medium px-6 py-3 flex items-center gap-2 transition-colors"
            :class="classes.button"
          >
            <p>{{ buttonLabel || "Create Account" }}</p>
            <NuxtIcon
              :name="buttonIcon || 'lucide:circle-arrow-right'"
              size="1.2rem"
            />
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

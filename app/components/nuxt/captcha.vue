<script setup lang="ts">
const { open, config, close } = useCaptcha();

const code = ref<string>(generateCode());
const state = ref<string>();
const hasError = ref<boolean>(false);

const handleSubmit = async () => {
  hasError.value = false;
  if (state.value === code.value) {
    await config?.value?.accept?.();
    close();
  } else {
    hasError.value = true;
  }
};

function refresh() {
  hasError.value = false;
  code.value = generateCode();
}
function generateCode(length = 6) {
  try {
    // Characters sets
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const all = lower + upper + digits;

    // Ensure at least one character from each set
    const required = [
      lower[
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0]! / (0xffffffff + 1)) *
            lower.length
        )
      ],
      upper[
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0]! / (0xffffffff + 1)) *
            upper.length
        )
      ],
      digits[
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0]! / (0xffffffff + 1)) *
            digits.length
        )
      ]
    ];

    const remainingLength = Math.max(0, length - required.length);
    const arr = [];
    const randomBuffer = new Uint32Array(remainingLength);
    crypto.getRandomValues(randomBuffer);

    for (let i = 0; i < remainingLength; i++) {
      const idx = Math.floor(
        (randomBuffer[i]! / (0xffffffff + 1)) * all.length
      );
      arr.push(all[idx]);
    }

    // Combine required chars with random chars and shuffle
    const combined = required.concat(arr);
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(
        (crypto.getRandomValues(new Uint32Array(1))[0]! / (0xffffffff + 1)) *
          (i + 1)
      );
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined.join("");
  } catch (error) {
    console.error(error);
    return Math.random()
      .toString(36)
      .slice(1, length + 1);
  }
}
</script>

<template>
  <NuxtModal
    v-model:open="open"
    title="CAPTCHA"
    description="We need to verify you are not a robot."
    :dismissible="false"
    @update:open="
      async (val) => {
        if (!val) await config?.reject?.();
      }
    "
  >
    <template #body>
      <div class="w-full flex flex-col items-center justify-center gap-2">
        <NuxtAlert
          v-if="hasError"
          description="Invalid code"
          color="error"
          variant="subtle"
        />

        <p class="text-center">Enter the code shown below:</p>

        <NuxtCard class="w-full">
          <div class="flex flex-col items-center justify-center gap-2">
            <p class="tex-center text-3xl font-bold text-muted">
              {{ code }}
            </p>

            <NuxtInput v-model="state" size="lg" class="w-full" />
          </div>
        </NuxtCard>

        <div class="flex gap-2 mt-2">
          <NuxtButton
            label="Refresh"
            color="neutral"
            variant="soft"
            @click="refresh"
          />
          <NuxtButton label="Submit" @click="handleSubmit" />
        </div>
      </div>
    </template>
  </NuxtModal>
</template>

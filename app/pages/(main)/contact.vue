<script setup lang="ts">
import { mailingSchema, type MailingSchema } from "~~/shared/schemas/mail";
import type { FormSubmitEvent } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "main"
});

const toast = useToast();
const { validate } = useCaptcha();
const { sendMail } = useMail();

const state = ref<Partial<MailingSchema>>({});
const fields = [
  "Financial Advice",
  "Trades & Investments",
  "Customer Support",
  "Other"
];

const reset = () => (state.value = {});

const handleSubmit = async (event: FormSubmitEvent<MailingSchema>) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    field,
    subject,
    message
  } = event.data;

  const body = `
  <div>
    <p>Dear AssetFusionX Admin</p>
    <p>You have received a new message from ${firstName} ${lastName}.</p>

    <div>
      <p>Details</p>
      <ul>
        <li>First Name: ${firstName}</li>
        <li>Last Name: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Location: ${location}</li>
        <li>Field: ${field}</li>
        <li>Subject: ${subject}</li>
      </ul>

      <div>
        <p>Message</p>
        <p style="white-space: pre-line">${message}</p>
      </div>
    </div>
  </div>
  `;

  try {
    const isValidated = await validate();

    if (!isValidated) {
      return;
    }

    const response = await sendMail({
      name: "AssetFusionX",
      email: "info@assetfusionx.com",
      subject: "Contact Form Submission",
      body
    });

    toast.add({
      title: "Success",
      description:
        response?.message || "Your message has been sent successfully.",
      color: "success"
    });
    reset();
  } catch (error) {
    toast.add({
      title: "Error",
      description: normalizeException(error).message,
      color: "error"
    });
  }
};
</script>

<template>
  <main>
    <NuxtCaptcha />
    <header class="grid *:[grid-column:1/2] *:[grid-row:1/2]">
      <div class="flex flex-col items-center justify-center z-10">
        <div
          class="text-white max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"
        >
          <h1 class="text-6xl font-medium">Contact Us</h1>
          <div class="mt-5">
            <p>
              Whether you're looking for an advisor or simply want to make
              inquiries, our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </div>
      <div class="h-96">
        <img
          src="/img/pages/about/about-us.jpg"
          class="h-full w-full object-cover"
        />
      </div>
    </header>

    <div>
      <div class="space-y-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p class="mt-4 text-lg text-center">
          Have a question or need guidance? Fill out the form below or start a
          live chat using the button at the bottom right — we're ready to help.
        </p>

        <div>
          <NuxtForm
            :state
            :schema="mailingSchema"
            @submit.prevent="handleSubmit"
          >
            <div class="grid gap-x-2 gap-y-5 md:grid-cols-2">
              <NuxtFormField name="firstName" label="First Name">
                <NuxtInput v-model="state.firstName" size="lg" class="w-full" />
              </NuxtFormField>

              <NuxtFormField name="lastName" label="Last Name">
                <NuxtInput v-model="state.lastName" size="lg" class="w-full" />
              </NuxtFormField>

              <NuxtFormField
                name="email"
                label="Email Address"
                class="md:col-span-2"
              >
                <NuxtInput v-model="state.email" size="lg" class="w-full" />
              </NuxtFormField>

              <NuxtFormField name="phone" label="Phone Number">
                <NuxtInput v-model="state.phone" size="lg" class="w-full" />
              </NuxtFormField>

              <NuxtFormField name="location" label="Location">
                <NuxtInput
                  v-model="state.location"
                  placeholder="State or region, Country"
                  size="lg"
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField name="field" label="Request Field">
                <NuxtSelect
                  v-model="state.field"
                  :items="fields"
                  size="lg"
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField name="subject" label="Email Subject">
                <NuxtInput v-model="state.subject" size="lg" class="w-full" />
              </NuxtFormField>

              <NuxtFormField
                name="message"
                label="Message"
                class="md:col-span-2"
              >
                <NuxtTextarea
                  v-model="state.message"
                  size="lg"
                  class="w-full"
                  autoresize
                  :maxrows="6"
                />
              </NuxtFormField>

              <div class="md:col-span-2 flex justify-end">
                <NuxtButton
                  type="submit"
                  label="Submit"
                  trailing-icon="lucide:send"
                  size="lg"
                  loading-auto
                />
              </div>
            </div>
          </NuxtForm>
        </div>
      </div>
    </div>

    <div>
      <div
        aria-hidden="true"
        class="bg-primary size-12 rounded-full animate-ping fixed bottom-[1.8rem] right-[2.1rem]"
      ></div>
      <MainCtaBanner color="neutral" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import html2canvas from "html2canvas-pro";

const runtimeConfig = useRuntimeConfig();

const [accountId, transactionId] = useRouteData().getParams([
  "accountId",
  "transactionId",
]);

const {
  data: transaction,
  error,
  refresh,
} = await useFetch(
  `/api/user/financial-accounts/${accountId}/transactions/${transactionId}`,
  {
    key: () => `transaction-${transactionId}`,
  },
);

const receipt = useTemplateRef("receipt");

async function download(type: "pdf" | "img" = "img") {
  if (!receipt.value) return;
  const canvas = await html2canvas(receipt.value, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const docName = `TXN-${transactionId?.toUpperCase()}`;

  if (type === "pdf") {
    const jsPDF = (await import("jspdf")).default;

    const pdf = new jsPDF("p", "pt", "a4", true);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${docName}.pdf`);
  } else {
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `${docName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <div v-if="transaction">
      <div class="flex flex-col items-center px-0 py-4 md:p-4 gap-4">
        <div
          ref="receipt"
          class="receipt border border-muted p-3 md:p-5 md:pb-8 w-full max-w-[28rem]"
        >
          <header class="flex justify-end">
            <div class="text-right flex flex-col items-end">
              <AppLogo size="38" />
              <p class="text-primary text-sm font-semibold">
                {{ runtimeConfig.public.appName }}
              </p>
            </div>
          </header>

          <p class="my-4 font-semibold text-center">Transaction Receipt</p>

          <div class="flex-col-center gap-2">
            <NuxtBadge
              color="neutral"
              variant="soft"
              :label="transaction.status"
            />

            <p class="font-geist-mono font-semibold text-4xl">
              {{ toDollar(transaction.USDAmount) }}
            </p>

            <p class="text-sm text-muted">
              {{ useDateFormat(transaction.createdAt, "MMM-DD-YYYY hh:mm aa") }}
            </p>
          </div>

          <NuxtSeparator class="my-4" />

          <div class="space-y-2 *:p-1 text-[0.9rem]">
            <div class="flex justify-between gap-4">
              <span>Name</span>
              <span class="capitalize text-right">{{
                transaction.initiator.user.name
              }}</span>
            </div>

            <div class="flex justify-between gap-4">
              <span>Type</span>
              <span class="capitalize text-right">{{ transaction.type }}</span>
            </div>

            <div class="flex justify-between gap-4">
              <span>Currency</span>
              <span class="text-right">{{ transaction.currency }}</span>
            </div>

            <div class="flex justify-between gap-4">
              <span>Amount</span>
              <span class="text-right"
                >{{ transaction.amount }} {{ transaction.currency }}</span
              >
            </div>

            <div class="flex justify-between gap-4">
              <span>Rate</span>
              <span class="text-right">{{ transaction.rate }}</span>
            </div>

            <div class="flex justify-between gap-4">
              <span>Charges</span>
              <span class="text-right">{{
                toDollar(transaction.charges)
              }}</span>
            </div>

            <div v-if="transaction.bank" class="flex justify-between gap-4">
              <span>Bank</span>
              <span class="text-right">{{ transaction.bank }}</span>
            </div>

            <div
              v-if="transaction.bankAccount"
              class="flex justify-between gap-4"
            >
              <span>Bank Account</span>
              <span class="text-right">{{ transaction.bankAccount }}</span>
            </div>

            <div
              v-if="transaction.depositWalletAddress"
              class="flex justify-between gap-4"
            >
              <span>Wallet Address</span>
              <span class="text-right">{{
                transaction.depositWalletAddress
              }}</span>
            </div>

            <div
              v-if="transaction.depositWalletAddressNetwork"
              class="flex justify-between gap-4"
            >
              <span>Wallet Address Network</span>
              <span class="text-right">{{
                transaction.depositWalletAddressNetwork
              }}</span>
            </div>

            <div
              v-if="transaction.withdrawalWalletAddress"
              class="flex justify-between gap-4"
            >
              <span>Wallet Address</span>
              <span class="text-right">{{
                transaction.withdrawalWalletAddress
              }}</span>
            </div>

            <div
              v-if="transaction.withdrawalWalletAddressNetwork"
              class="flex justify-between gap-4"
            >
              <span>Wallet Address Network</span>
              <span class="text-right">{{
                transaction.withdrawalWalletAddressNetwork
              }}</span>
            </div>

            <div
              v-if="transaction.description"
              class="flex justify-between gap-4"
            >
              <span>Description</span>
              <span class="text-right">{{ transaction.description }}</span>
            </div>
          </div>

          <NuxtSeparator class="my-4" />

          <div>
            <small>
              <b>Disclaimer</b>: This receipt is provided for informational
              purposes only. {{ runtimeConfig.public.appName }} is not
              responsible for errors, omissions, or discrepancies. Please refer
              to your official account statement for authoritative records.
            </small>
          </div>
        </div>

        <div class="flex gap-2 w-full md:w-[28rem]">
          <NuxtButton
            label="Save as PDF"
            variant="outline"
            block
            loading-auto
            @click="download('pdf')"
          />

          <NuxtButton
            label="Save as image"
            block
            loading-auto
            @click="download('img')"
          />
        </div>
      </div>
    </div>
  </MyPage>
</template>

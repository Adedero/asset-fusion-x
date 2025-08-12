<script setup lang="ts">
import type { ButtonProps, InputProps } from "@nuxt/ui";
import { v7 as uuid } from "uuid";
import createDataURL from "~/utils/create-data-url";

interface Props {
  label?: string;
  description?: string;
  accept?: string | string[];
  size?: ButtonProps["size"];
  maxFileSize?: number; // In bytes
  multiple?: boolean | number;
  inputClass?: InputProps["class"];
  forceConstraints?: boolean;
}

const {
  label = undefined,
  description = undefined,
  maxFileSize = undefined,
  accept = undefined,
  size = "lg",
  multiple = false,
  inputClass = undefined,
  forceConstraints = false,
} = defineProps<Props>();

export interface CustomFile {
  url: string;
  id: string;
  ext: string;
  blob: File;
}

const files = defineModel<CustomFile[]>({ default: [] });

const error = ref<string | boolean | undefined>(undefined);

const handleInputChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFiles = Array.from(target.files ?? []);
  const acceptedTypes = normalizeAccept(accept);
  const limit = typeof multiple === "number" ? multiple : Infinity;

  const validFiles: CustomFile[] = [];
  const errorMessages: string[] = [];

  for await (const file of selectedFiles) {
    const fileErrors: string[] = [];

    // Validate type
    if (!isFileTypeAccepted(file, acceptedTypes)) {
      fileErrors.push(`"${file.name}" is not an accepted file type.`);
    }

    // Validate size
    if (maxFileSize && file.size > maxFileSize) {
      fileErrors.push(
        `"${file.name}" exceeds max size of ${formatBytes(maxFileSize)}.`,
      );
    }

    if (fileErrors.length > 0) {
      if (forceConstraints) {
        error.value = fileErrors[0]; // Show first error
        break;
      } else {
        errorMessages.push(...fileErrors);
        continue;
      }
    }

    // Check limit
    if (validFiles.length >= limit) {
      if (forceConstraints) {
        error.value = `Upload limit of ${limit} exceeded.`;
        break;
      } else {
        break;
      }
    }

    const extensionMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
    const fileExtension = extensionMatch
      ? (extensionMatch[1]?.toLowerCase() ?? "unknown")
      : "";

    validFiles.push({
      id: uuid(),
      url: await createDataURL(file),
      blob: file,
      ext: fileExtension,
    });
  }

  // Accumulate errors (if not forcing stop)
  if (!forceConstraints && errorMessages.length > 0) {
    //error.value = errorMessages.join("\n");
    error.value = errorMessages[0];
  }

  // Final assignment
  if (multiple) {
    files.value = [...files.value, ...validFiles].slice(0, limit);
  } else {
    files.value = validFiles.slice(0, 1);
  }

  // Reset input
  //target.value = "";
};

function normalizeAccept(accept?: string | string[]) {
  if (!accept) return [];
  return Array.isArray(accept)
    ? accept
    : accept.split(",").map((s) => s.trim());
}

function isFileTypeAccepted(file: File, acceptedTypes: string[]) {
  if (acceptedTypes.length === 0) return true;

  return acceptedTypes.some((type) => {
    if (type.startsWith(".")) {
      // Check by file extension
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }

    if (type.includes("/*")) {
      // Handle wildcard MIME types like image/*, audio/*, etc.
      const [acceptedMainType] = type.split("/");
      const [fileMainType] = file.type.split("/");
      return acceptedMainType === fileMainType;
    }

    // Exact MIME type match
    return file.type === type;
  });
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formatted} ${sizes[i]}`;
}
</script>

<template>
  <NuxtFormField :label :description :error="error">
    <NuxtInput
      type="file"
      :size="size"
      :accept="Array.isArray(accept) ? accept.join(',') : accept"
      :multiple="!!multiple"
      :class="inputClass"
      @change="handleInputChange"
    />
  </NuxtFormField>
</template>

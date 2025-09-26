import type { ButtonProps } from "@nuxt/ui";

export type ConfirmConfig = {
  title?: string;
  description?: string;
  icon?: string;
  showCloseIcon?: boolean;
  acceptProps?: ButtonProps;
  rejectProps?: ButtonProps;
  accept?: () => void | Promise<void>;
  reject?: () => void | Promise<void>;
};

const open = ref(false);
const config = ref<ConfirmConfig | null>(null);

export default function useConfirm() {
  const require = (opts: ConfirmConfig = {}) => {
    config.value = {
      showCloseIcon: false,
      acceptProps: {
        color: "primary",
        variant: "solid",
        label: "Proceed",
        ...opts.acceptProps
      },
      rejectProps: {
        color: "neutral",
        variant: "soft",
        label: "Cancel",
        ...opts.rejectProps
      },
      ...opts
    };
    open.value = true;
  };

  const close = () => {
    open.value = false;
  };

  const confirmAsync = async (opts?: ConfirmConfig) => {
    const { resolve, promise } = Promise.withResolvers<boolean>();

    require({
      ...opts,
      accept: () => {
        resolve(true);
        close();
      },
      reject: () => {
        resolve(false);
        close();
      }
    });

    return await promise;
  };

  return {
    open,
    config,
    require,
    close,
    confirmAsync
  };
}

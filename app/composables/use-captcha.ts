import type { ButtonProps } from "@nuxt/ui";

export type ConfirmConfig = {
  acceptProps?: ButtonProps;
  rejectProps?: ButtonProps;
  accept?: () => void | Promise<void>;
  reject?: () => void | Promise<void>;
};

const open = ref(false);
const config = ref<ConfirmConfig | null>(null);

export default function useCaptcha() {
  const require = (opts: ConfirmConfig = {}) => {
    config.value = {
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

  const validate = async (opts?: ConfirmConfig) => {
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
    validate
  };
}

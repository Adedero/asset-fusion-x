export interface TypewriterOptions {
  speed?: number;
  loop?: number; // undefined = infinite
  pause?: number;
  textPause?: number;
}

export function useTypewriter(
  elementRef: Ref<HTMLElement | null>,
  options: TypewriterOptions = {},
) {
  const defaultOptions: Required<TypewriterOptions> = {
    speed: 50,
    loop: undefined as unknown as number,
    pause: 2000,
    textPause: 2000,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function getTextsFromElement(el: HTMLElement): string[] {
    if (el.dataset.text) {
      try {
        if (el.dataset.text.includes("|")) {
          return el.dataset.text.split("|").map((t) => t.trim());
        }
        const parsed = JSON.parse(el.dataset.text);
        return Array.isArray(parsed) ? parsed : [el.dataset.text];
      } catch {
        return el.dataset.text.includes("|")
          ? el.dataset.text.split("|").map((t) => t.trim())
          : [el.dataset.text];
      }
    }

    const textAttrs: string[] = [];
    let i = 0;
    while (el.dataset[`text${i}`] !== undefined) {
      textAttrs.push(el.dataset[`text${i}`]!);
      i++;
    }
    if (textAttrs.length > 0) return textAttrs;

    return [el.textContent || ""];
  }

  function typeText(el: HTMLElement, text: string, i: number) {
    if (i < text.length) {
      if (i === 0) el.innerHTML = "";
      el.innerHTML += text.charAt(i);
      timeoutId = setTimeout(
        () => typeText(el, text, i + 1),
        mergedOptions.speed,
      );
    } else {
      handleNextText(el);
    }
  }

  function handleNextText(el: HTMLElement) {
    const state = el._typewriterState!;
    const nextTextIndex = state.currentTextIndex + 1;

    if (nextTextIndex < state.texts.length) {
      state.currentTextIndex = nextTextIndex;
      timeoutId = setTimeout(() => {
        typeText(el, state.texts[nextTextIndex] || "", 0);
      }, mergedOptions.textPause);
    } else {
      handleLoop(el);
    }
  }

  function handleLoop(el: HTMLElement) {
    const state = el._typewriterState!;
    if (
      mergedOptions.loop === undefined ||
      state.currentLoop < mergedOptions.loop - 1
    ) {
      state.currentLoop++;
      state.currentTextIndex = 0;
      timeoutId = setTimeout(() => {
        typeText(el, state.texts[0] || "", 0);
      }, mergedOptions.pause);
    }
  }

  function init() {
    const el = elementRef.value;
    if (!el) return;

    const texts = getTextsFromElement(el);

    if (!el.dataset.originalTexts) {
      el.dataset.originalTexts = JSON.stringify(texts);
    }

    el._typewriterState = {
      currentLoop: 0,
      currentTextIndex: 0,
      texts,
    };

    typeText(el, texts[0] || "", 0);
  }

  function restart() {
    const el = elementRef.value;
    if (el && el._typewriterState) {
      el._typewriterState.currentLoop = 0;
      el._typewriterState.currentTextIndex = 0;
      init();
    }
  }

  function stop() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  onMounted(init);
  onBeforeUnmount(stop);

  return {
    restart,
    stop,
  };
}

declare global {
  interface HTMLElement {
    _typewriterState?: {
      currentLoop: number;
      currentTextIndex: number;
      texts: string[];
    };
  }
}

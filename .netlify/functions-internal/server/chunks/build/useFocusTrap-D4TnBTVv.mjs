import { ref, watch, readonly, nextTick } from 'vue';

function useFocusTrap(target, options = {}) {
  const isActive = ref(false);
  const previousActiveElement = ref(null);
  const getFocusableElements = (container) => {
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ];
    return Array.from(
      container.querySelectorAll(focusableSelectors.join(","))
    ).filter((el) => el.offsetParent !== null);
  };
  const trapFocus = (e) => {
    if (!isActive.value || !target.value) return;
    const focusableElements = getFocusableElements(target.value);
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if ((void 0).activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if ((void 0).activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };
  const activate = () => {
    if (isActive.value || !target.value) return;
    isActive.value = true;
    previousActiveElement.value = (void 0).activeElement;
    nextTick(() => {
      if (!target.value) return;
      const focusableElements = getFocusableElements(target.value);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else if (target.value.tabIndex === -1) {
        target.value.tabIndex = 0;
        target.value.focus();
      } else {
        target.value.focus();
      }
    });
    (void 0).addEventListener("keydown", trapFocus);
  };
  const deactivate = () => {
    if (!isActive.value) return;
    isActive.value = false;
    (void 0).removeEventListener("keydown", trapFocus);
    if (previousActiveElement.value && previousActiveElement.value.focus) {
      previousActiveElement.value.focus();
    }
  };
  if (options.immediate) {
    watch(target, (newTarget) => {
      if (newTarget) {
        activate();
      } else {
        deactivate();
      }
    }, { immediate: true });
  }
  return {
    activate,
    deactivate,
    isActive: readonly(isActive)
  };
}

export { useFocusTrap as u };
//# sourceMappingURL=useFocusTrap-D4TnBTVv.mjs.map

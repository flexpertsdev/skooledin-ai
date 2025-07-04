import { reactive } from 'vue';

const toastState = reactive({
  toasts: []
});
const useToast = () => {
  const show = (options) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toastOptions = typeof options === "string" ? { description: options } : options;
    const toast = {
      id,
      type: "info",
      duration: 5e3,
      closable: true,
      showProgress: true,
      position: "bottom-right",
      ...toastOptions
    };
    toastState.toasts.unshift(toast);
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        remove(id);
      }, toast.duration);
    }
    return id;
  };
  const remove = (id) => {
    const index = toastState.toasts.findIndex((t) => t.id === id);
    if (index > -1) {
      toastState.toasts.splice(index, 1);
    }
  };
  const clear = () => {
    toastState.toasts = [];
  };
  const info = (options) => {
    const opts = typeof options === "string" ? { description: options } : options;
    return show({ ...opts, type: "info" });
  };
  const success = (options) => {
    const opts = typeof options === "string" ? { description: options } : options;
    return show({ ...opts, type: "success" });
  };
  const warning = (options) => {
    const opts = typeof options === "string" ? { description: options } : options;
    return show({ ...opts, type: "warning" });
  };
  const error = (options) => {
    const opts = typeof options === "string" ? { description: options } : options;
    return show({ ...opts, type: "error" });
  };
  return {
    toasts: toastState.toasts,
    show,
    remove,
    clear,
    info,
    success,
    warning,
    error
  };
};

export { useToast as u };
//# sourceMappingURL=useToast-BD9RVwOt.mjs.map

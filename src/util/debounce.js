export default function debounce(func, wait, immediate, ...rest) {
  let timeout;
  function execute() {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, rest);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, rest);
  }

  execute.cancel = cancel;
  return execute;
  function cancel() {
    clearTimeout(timeout);
  }
}

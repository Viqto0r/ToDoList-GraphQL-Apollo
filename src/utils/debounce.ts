export const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let timer: number
  return (...args: any[]) => {
    window.clearInterval(timer)
    timer = window.setTimeout(() => fn.apply(this, args), delay)
  }
}

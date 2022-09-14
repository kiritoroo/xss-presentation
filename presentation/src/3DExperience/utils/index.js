export const ev = (eventName, data, once = false) => {
  const e = new CustomEvent(eventName, { detail: data }, { once })
  document.dispatchEvent(e)
}
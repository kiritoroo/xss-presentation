export const ev = (eventName, data, once = false) => {
  const e = new CustomEvent(eventName, { detail: data }, { once })
  if (eventName != 'scene:update') {
    console.log(e)
  }
  document.dispatchEvent(e)
}
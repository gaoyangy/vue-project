const bundle = 'hf.lms.'
const _localStorage = localStorage
const _JSON = JSON

export function get(key, _item) {
  return (_item = _localStorage.getItem(bundle + key)) && _JSON.parse(_item)
}
export function set(key, value) {
  _localStorage.setItem(bundle + key, _JSON.stringify(value))
}
export function getString(key, _item) {
  return (_item = _localStorage.getItem(bundle + key))
}
export function setString(key, value) {
  _localStorage.setItem(bundle + key, value)
}
export function remove(key) {
  _localStorage.removeItem(bundle + key)
}

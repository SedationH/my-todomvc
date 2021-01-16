function parse(str) {
  let value
  try {
    value = JSON.parse(str)
  } catch (error) {
    value = null
  }
  return value
}

function stringfy(value) {
  let str
  try {
    str = JSON.stringify(value)
  } catch (error) {
    str = ''
  }
  return str
}

export default function useLocalStorage() {
  function setItem(key, value) {
    value = stringfy(value)
    window.localStorage.setItem(key, value)
  }

  function getItem(key) {
    const value = window.localStorage.getItem(key)
    return parse(value)
  }

  return {
    setItem,
    getItem
  }
}

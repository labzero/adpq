const KEY = 'auth'

export function getUserData() {
  return JSON.parse(sessionStorage.getItem(KEY))
}

export function setUserData(data) {
  sessionStorage.setItem(KEY, JSON.stringify(data))
}

export function deleteUserData() {
  sessionStorage.removeItem(KEY)
}

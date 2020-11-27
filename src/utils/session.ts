// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => window.localStorage[sidebarStatusKey]
export const setSidebarStatus = (sidebarStatus: string) => {
  window.localStorage[sidebarStatusKey] = sidebarStatus
}

export const getUid = () => window.localStorage.uid
export const setUid = (uid: string | number) => {
  window.localStorage.uid = uid;
}
export const removeUid = () => window.localStorage.removeItem('uid')

export const getToken = () => window.localStorage.token
export const setToken = (token: string) => {
  window.localStorage.token = token
}
export const removeToken = () => window.localStorage.removeItem('token')

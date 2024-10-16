const guidIdCode = import.meta.env.VITE_APP_GUID_NAME;
const orderIdCode = import.meta.env.VITE_APP_ORDERID_NAME;
export function setGuidAndOrderId(guidNum: string, orderNum: string) {
  // 設置 guid 和 orderId 的 cookie
  document.cookie = `${guidIdCode}=${guidNum}; path=/`;
  document.cookie = `${orderIdCode}=${orderNum}; path=/`;
}

// 設置 cookie 的過期時間為過去的時間，從而將其移除 ( 用於完成訂單 )
export function deleteCookie(guidNum: string, orderNum: string) {
  document.cookie = `${guidIdCode}=${guidNum}; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `${orderIdCode}=${orderNum}; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// 獲取指定 cookie 的值
export function getCookie(name: string) {
  return document.cookie.replace(
    new RegExp("(?:(?:^|.*;\\s*)" + name + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
    "$1"
  );
}

// 判斷字符串是否非空
function isNotEmpty(str: string) {
  return str === '' ? false : true
}

// 判斷 guid 和 orderId 是否存在cookie中
export function checkGuidAndOrderIdExist() {
  const guidNum = getCookie(guidIdCode);
  const orderNum = getCookie(orderIdCode);
  return isNotEmpty(guidNum) && isNotEmpty(orderNum);
}

// 如果你想保持原來的結構，也可以這樣導出：
export const useGuidOrder = {
  setGuidAndOrderId,
  deleteCookie,
  checkGuidAndOrderIdExist,
  getCookie,
};
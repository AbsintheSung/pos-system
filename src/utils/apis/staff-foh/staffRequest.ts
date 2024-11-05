const staffFohName = import.meta.env.VITE_APP_STAFF_FOH_TOKENNAME;

type RequestOptions = RequestInit & {
  data?: any;
};

async function customFetch(url: string, options: RequestOptions = {}) {
  const { data, headers: customHeaders, ...customOptions } = options;

  // 添加 token 
  const staffFohToken = document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\\s*)${staffFohName}\\s*=\\s*([^;]*).*$)|^.*$`),
    "$1"
  );

  const headers = new Headers(customHeaders);
  if (staffFohToken) {
    headers.append('Authorization', `Bearer ${staffFohToken}`);
  }

  // 如果有 data，新增 body 並配置Content-Type
  if (data) {
    customOptions.body = JSON.stringify(data);
    headers.append('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...customOptions,
    headers,
  });
  try {
    const responseData = await response.json();

    // console.log('返回正確回應後解析json', responseData);
    return responseData;

  } catch (error) {
    console.log('拋出錯誤Json');
    throw error;
  }
}

export default {
  get: (url: string, options?: RequestOptions) =>
    customFetch(url, { ...options, method: 'GET' }),
  post: (url: string, data: any, options?: RequestOptions) =>
    customFetch(url, { ...options, method: 'POST', data }),
  put: (url: string, data: any, options?: RequestOptions) =>
    customFetch(url, { ...options, method: 'PUT', data }),
  patch: (url: string, data: any, options?: RequestOptions) =>
    customFetch(url, { ...options, method: 'PATCH', data }),
  delete: (url: string, options?: RequestOptions) =>
    customFetch(url, { ...options, method: 'DELETE' }),
};
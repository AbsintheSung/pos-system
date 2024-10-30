// const staffFohName = import.meta.env.VITE_APP_STAFF_FOH_TOKENNAME;
// type RequestOptions = RequestInit & {
//   data?: any;
// };
// async function customFetch(url: string, options: RequestOptions = {}) {
//   const { data, headers: customHeaders, ...customOptions } = options;

//   // 添加 token 
//   // const staffFohToken = document.cookie.replace(/(?:(?:^|.*;\s*)staffFohToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
//   const staffFohToken = document.cookie.replace(
//     new RegExp(`(?:(?:^|.*;\\s*)${staffFohName}\\s*=\\s*([^;]*).*$)|^.*$`),
//     "$1"
//   );
//   const headers = new Headers(customHeaders);
//   if (staffFohToken) {
//     headers.append('Authorization', `Bearer ${staffFohToken}`);
//   }

//   // 如果有 data，新增 body 並配置Content-Type
//   if (data) {
//     customOptions.body = JSON.stringify(data);
//     headers.append('Content-Type', 'application/json');
//   }
//   //配置反向代理
//   const response = await fetch(url, {
//     ...customOptions,
//     headers,
//   });

//   console.log('外場請求攔截', response)
//   // 先檢查狀態碼
//   if (!response.ok) {
//     //針對不同狀態碼拋出不同的錯誤
//     switch (response.status) {
//       case 401:
//         throw new Error('未授權訪問');
//       case 403:
//         throw new Error('禁止訪問');
//       case 404:
//         throw new Error('資源未找到');
//       case 500:
//         throw new Error('服務器錯誤');
//       default:
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   }

//   try {
//     const data = await response.json();
//     // 檢查業務邏輯錯誤（假設後端返回格式包含 success 字段）
//     if (data && data.success === false) {
//       throw new Error(data.message || '業務邏輯錯誤');
//     }
//     console.log('返回正確回應後解析json')
//     return data;
//   } catch (error) {
//     // 處理 JSON 解析錯誤
//     if (error instanceof SyntaxError) {
//       console.log('拋出錯誤Json')
//       throw new Error('Invalid JSON response');
//     }
//     console.log('拋出錯誤')
//     throw error; // 重新拋出其他錯誤
//   }

// }

// export default {
//   get: (url: string, options?: RequestOptions) => customFetch(url, { ...options, method: 'GET' }),
//   post: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'POST', data }),
//   put: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'PUT', data }),
//   patch: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'PATCH', data }),
//   delete: (url: string, options?: RequestOptions) => customFetch(url, { ...options, method: 'DELETE' }),
// };
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

    console.log('返回正確回應後解析json');
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
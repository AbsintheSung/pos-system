const baseURL = import.meta.env.VITE_APP_API_URL || '';

type RequestOptions = RequestInit & {
	data?: any;
};

async function customFetch(url: string, options: RequestOptions = {}) {
	const { data, headers: customHeaders, ...customOptions } = options;

	// 添加 token 
	const tokenCode = document.cookie.replace(/(?:(?:^|.*;\s*)tokenCode\s*=\s*([^;]*).*$)|^.*$/, "$1");
	const headers = new Headers(customHeaders);
	if (tokenCode) {
		headers.append('Authorization', `Bearer ${tokenCode}`);
	}

	// 如果有 data，新增 body 並配置Content-Type
	if (data) {
		customOptions.body = JSON.stringify(data);
		headers.append('Content-Type', 'application/json');
	}

	//配置反向代理
	const response = await fetch(`${url}`, {
		...customOptions,
		headers,
	});

	//無配置反向代理
	// const response = await fetch(`${baseURL}${url}`, {
	// 	...customOptions,
	// 	headers,
	// });

	// //處理401
	// if (response.status === 400) {

	//     throw new Error('Unauthorized');
	// }

	// // 如果失敗，丟出錯誤
	// if (!response.ok) {
	//     throw new Error(`HTTP error! status: ${response.status}`);
	// }

	return response.json();
}

export default {
	get: (url: string, options?: RequestOptions) => customFetch(url, { ...options, method: 'GET' }),
	post: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'POST', data }),
	put: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'PUT', data }),
	patch: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'PATCH', data }),
	delete: (url: string, options?: RequestOptions) => customFetch(url, { ...options, method: 'DELETE' }),
};
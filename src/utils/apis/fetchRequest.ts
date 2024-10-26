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
	const response = await fetch(`${baseURL}/${url}`, {
		...customOptions,
		headers,
	});


	// 先檢查狀態碼
	if (!response.ok) {
		//針對不同狀態碼拋出不同的錯誤
		switch (response.status) {
			case 401:
				throw new Error('未授權訪問');
			case 403:
				throw new Error('禁止訪問');
			case 404:
				throw new Error('資源未找到');
			case 500:
				throw new Error('服務器錯誤');
			default:
				throw new Error(`HTTP error! status: ${response.status}`);
		}
	}

	try {
		const data = await response.json();
		// 檢查業務邏輯錯誤（假設後端返回格式包含 success 字段）
		if (data && data.success === false) {
			throw new Error(data.message || '業務邏輯錯誤');
		}
		return data;
	} catch (error) {
		// 處理 JSON 解析錯誤
		if (error instanceof SyntaxError) {
			throw new Error('Invalid JSON response');
		}
		throw error; // 重新拋出其他錯誤
	}

}

export default {
	get: (url: string, options?: RequestOptions) => customFetch(url, { ...options, method: 'GET' }),
	post: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'POST', data }),
	put: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'PUT', data }),
	patch: (url: string, data: any, options?: RequestOptions) => customFetch(url, { ...options, method: 'PATCH', data }),
	delete: (url: string, options?: RequestOptions) => customFetch(url, { ...options, method: 'DELETE' }),
};
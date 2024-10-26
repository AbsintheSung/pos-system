
//處理深拷貝
export const deepClone = <T>(objData: T): T => {
	if (objData === null || typeof objData !== 'object') {
		return objData;
	}
	if (Array.isArray(objData)) {
		return objData.map(item => deepClone(item)) as T;
	}
	const result = {} as T;
	for (const key in objData) {
		if (Object.prototype.hasOwnProperty.call(objData, key)) {
			result[key] = deepClone(objData[key]);
		}
	}
	return result;
};
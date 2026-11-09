// 获取 URL 查询参数
// 注意：没有参数时必须返回空字符串，绝不能返回布尔 false，
// 否则会被拼进请求地址（例如 /vm/skuList/false），导致后端查不到设备并抛出空指针。
function getUrlParam(param){
	let urlObj = {};
	let search = window.location.search || '';
	if(search.length > 1){
		let urlArr = search.substring(1).split('&');
		for(let i = 0; i < urlArr.length; i++){
			let item = urlArr[i].split('=');
			let key = item[0];
			let value = item.length > 1 ? item.slice(1).join('=') : '';
			try {
				urlObj[key] = decodeURIComponent(value);
			} catch (e) {
				urlObj[key] = value;
			}
		}
	}
	// 判断是否有参数
	if(arguments.length >= 1){
		return urlObj[param] || '';
	}
	return urlObj;
}

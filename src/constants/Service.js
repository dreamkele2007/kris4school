import axios from 'axios';
export default function Service ({
	mode = '',
	method = 'get',
	url = '/',
	data = {},
	success = function(res) {
		console.log(res);
	},
	error = function(res) {
		console.error(res);
	}
}) {
	axios({
		method: method,
		url: url,
		data: data
	})
		.then((res) => {
			if (res.data.code===200) {
				success(res.data);
			} else {
				throw new Error(res.data.message ? res.data.message.message : '系统报错, 请联系管理员');
			}
		})
		.catch((res) => {
			error(res);
		});
}

import Axios from 'axios';
import ReactDOM from 'react-dom';

// import Loading from 'bee-loading';
export default function ajax({
	loading = true,
	loadingContainer,
	mode = '',
	method = 'get',
	url = '/',
	data = {},
	params = {},
	success = function(res) {
		console.log(res);
	},
	error = function(res) {
		console.error(res);
	}
}) {
	// 安全校验需要
	// data.vs1h8do0 = parent.window.vs1h8do0;
	let div;
	if (loading) {
		div = document.createElement('div');
    	document.body.appendChild(div);
		// loadingContainer
			// ? ReactDOM.render(<Loading show={true} container={loadingContainer} />, div)
			// : ReactDOM.render(<Loading show={true} fullScreen />, div);
	}
	Axios({
		method: method,
		params: params,
		url: url,
		data: data
	})
		.then((res) => {
			div && ReactDOM.unmountComponentAtNode(div);
			if (mode === 'normal') {
				success(res);
			} else {
				if (res.data.code===200) {
					success(res.data);
				} else {
					throw new Error(res.data.message ? res.data.message.message : '系统报错, 请联系管理员');
				}
			}
		})
		.catch((res) => {
			div && ReactDOM.unmountComponentAtNode(div);
			error(res);
		});
}

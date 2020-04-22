import React,{Component} from 'react';
import {default as _LocaleProvider} from 'antd/lib/locale-provider';
class LocaleProvider extends Component{
	render(){
		return(
			<_LocaleProvider {...this.props}>{this.props.children}</_LocaleProvider>
			)
	}
}

export default LocaleProvider;

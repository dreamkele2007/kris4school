import React,{Component} from 'react';
import {default as _Layout} from 'antd/lib/layout';
import {Sider} from 'antd/lib/layout';
import {Header, Content, Footer} from 'antd/lib/layout/layout';
class Layout extends Component{
	render(){
		return(
			<_Layout {...this.props}>{this.props.children}</_Layout>
			)
	}
}
Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;
export default Layout;


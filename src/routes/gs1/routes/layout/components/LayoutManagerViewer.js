/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
const { Header, Content, Footer } = Layout;
class LayoutManagerViewer extends React.Component {
  render() {
    return (
        <div>
          <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px',color:'#ff585d' }}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
              </Menu>
            </Header>
          </Layout>
        </div>
    );
  }
}

export default LayoutManagerViewer;

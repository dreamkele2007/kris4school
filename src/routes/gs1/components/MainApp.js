import React from 'react';
import {Layout} from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
const { Content } = Layout;

class MainApp extends React.Component {
 
  render() {
    const {children} = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <div style={{width:'240px',height:'70px',backgroundColor:'#90000A',position:'absolute',overflow: 'auto'}}>
          <img alt="example" src={require('assets/images/ui/school.png')} style={{width:'220px',height:'65px'}} />
        </div>
        <Sidebar {...this.props}></Sidebar>
        <Layout >
          <Header/>
          <Content style={{margin:'70px 20px 0 20px',padding:'10px 10px 0 10px',backgroundColor:'#ffffff',overflow: 'auto'}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }

 
}
const mapStateToProps = (state, ownProps) => {
  return {};
}
export default connect(mapStateToProps)(MainApp);


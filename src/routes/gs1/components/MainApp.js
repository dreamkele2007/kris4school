import React from 'react';
import {Modal,Button,Tooltip,Affix,Layout} from 'vdap-ui';
import Header from './Header';
import Sidebar from './Sidebar';
import  {sideNavConfig,sideNavPin} from 'actions/ui/uiAction';
import { connect } from 'react-redux';
import SideNavConfig from './SideNavConfig';
import Favorites from './Favorites';
import './layout.css';
const {Content} = Layout;

class MainApp extends React.Component {
  state = {
      visible:false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

    onOpenChange=(open) =>{
	    console.log('onOpenChange', open);
	    this.setState({ open });
	  };

    setMenusClick = () => {
       const {dispatch} = this.props;
      dispatch(sideNavConfig(SideNavConfig.menus));
      this.setState({ visible: true });
    };
    setRolesClick = () => {
      const {dispatch} = this.props;
      dispatch(sideNavConfig(SideNavConfig.roles));
      this.setState({ visible: true });
    };
    setFavoritesClick = () => {
       const {dispatch} = this.props;
      dispatch(sideNavConfig(SideNavConfig.favorites));
      this.setState({ visible: true });
    };

    setTitlesClick = () => {
       const {dispatch} = this.props;
      dispatch(sideNavPin(SideNavConfig.titles));
    };


  render() {
    const {children} = this.props;
    const siderMenu = (<Favorites />);

    return (
      <Layout style={{ height: '100vh' }}>
        <div style={{width:'240px',height:'70px',backgroundColor:'#90000A',position:'absolute',overflow: 'auto'}}>
          <img alt="example" src={require('assets/images/ui/1.png')} style={{width:'200px',height:'70px'}} />
        </div>
        <Sidebar {...this.props}>
        </Sidebar>
        <Layout >
          <Header/>
          <Content style={{margin:'70px 20px 0 20px',padding:'10px 10px 0 10px',backgroundColor:'#ffffff',overflow: 'auto'}}>
              <div  style={{position: 'absolute' }}>
                <Affix style={{position: 'absolute',top:'50px', left: '-45px',zIndex:'9'}}>
                  <div style={{width:'32px',height:'90px'}}>
                    <Tooltip title="主菜单">
                      {/*<Button  shape="circle" icon="bars" onClick={this.setMenusClick} style={{marginBottom:'10px', border:'none',color:'#fff',backgroundColor:'#4e92f5',boxShadow:'0 0 5px 0 #4e92f5'}} />*/}
                      <Button  shape="circle" icon="bars" style={{marginBottom:'10px', border:'none',color:'#fff',backgroundColor:'#4e92f5',boxShadow:'0 0 5px 0 #4e92f5'}} />
                    </Tooltip>
                    <Tooltip title="角色切换">
                      {/*<Button shape="circle" icon="user" onClick={this.setRolesClick} style={{marginBottom:'10px',border:'none',color:'#fff',backgroundColor:'#a398e3',boxShadow:'0 0 5px 0 #a398e3'}}/>*/}
                      <Button shape="circle" icon="user"  style={{marginBottom:'10px',border:'none',color:'#fff',backgroundColor:'#a398e3',boxShadow:'0 0 5px 0 #a398e3'}}/>
                    </Tooltip>
                    <Tooltip title="收藏夹">
                      {/*<Button shape="circle" icon="star" onClick={this.setFavoritesClick} style={{border:'none',color:'#f6a623',backgroundColor:'#fff',boxShadow:'0 0 5px 0 #d8d8d8'}}/>*/}
                      <Button shape="circle" icon="star"  style={{border:'none',color:'#f6a623',backgroundColor:'#fff',boxShadow:'0 0 5px 0 #d8d8d8'}}/>
                    </Tooltip>
                  </div>
                </Affix>
              </div>
            {children}
          </Content>
        </Layout>
       <Modal
        title=""
        width='240px'
        style={{ top: 0,left:0,position:'absolute'}}
        visible={this.state.visible}
        closable
        onCancel={this.hideModal}
        footer={null}
        >
         {siderMenu}
        </Modal>

      </Layout>

    );
  }

   componentDidMount() {
     this.setTitlesClick();
   }
}
const mapStateToProps = (state, ownProps) => {
  return {
    fixedSide: state.settings.fixedSide,
    sideCollapsed: state.settings.sideCollapsed,
    fixedAside: state.settings.fixedAside,
    fixedHeader: state.settings.fixedHeader,
    hideAside: state.settings.hideAside,
    sidebarWidth : state.settings.sidebarWidth,
    theme: state.settings.theme,
  };
}
export default connect(
  mapStateToProps
)(MainApp);


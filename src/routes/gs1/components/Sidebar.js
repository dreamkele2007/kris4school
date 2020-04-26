import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import {Layout,Menu,Icon,Button} from 'vdap-ui';
import { connect } from 'react-redux';
const SubMenu=Menu.SubMenu;
const {Sider} = Layout;
// 侧边栏
class Sidebar extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
  };
  onCollapse = () => {
    let collapsed =!this.state.collapsed;
    this.setState({
      mode: collapsed ? 'vertical' : 'inline',
      collapsed:collapsed,
    });
  };
  getMenus = (menuArray, parentPath) => {
    parentPath = parentPath || '/ui/';
    if (!menuArray) return null;
    return menuArray.map(item => {
      if (item.child) {
        return (
          <SubMenu key={item.key} title={<span> {item.icon? <Icon type={item.icon}/>: ''}<span>{item.name}</span></span>}>
            {this.getMenus(item.child, parentPath + item.key + '/')}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>

            <NavLink to={parentPath + item.key} >
              {item.icon ? <Icon type={item.icon}/> : ''}{item.name}
            </NavLink>

          </Menu.Item>
        )
      }
    })
  };

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  render() {
    const {match} = this.props;
    return (
        <Sider  width={240}   collapsed={this.state.collapsed}  style={{backgroundColor: 'white',position: 'relative',marginTop:'70px'}} >
          {/* <Button onClick={ this.onCollapse } style={{zIndex:'999',position:'absolute',top:'-60px',right:'0',width:'60px',height:'50px',border:'none',borderRadius:'0',background:'rgb(42, 91, 181)',color:'#abc8fd'}} >
            <i className="icon iconfont icon-zhediecaidan"></i>
          </Button> */}
          <Menu theme="light"  mode={this.state.mode} style={{border:'none'}} className={this.state.collapsed?'show':'scroll' } >
            <Menu.Item key="1">
              <Link to={`${match.url}/shome`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 首页</Link>
            </Menu.Item>
            {/*<Menu.Item key="2">*/}
              {/*<Link to={`${match.url}/thome`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 首页</Link>*/}
            {/*</Menu.Item>*/}
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>基础数据</span></span>}>
              <Menu.Item key="3">
                <Link to={`${match.url}/site/manage`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 站点维护</Link>
              </Menu.Item>  
              <Menu.Item key="4">
                <Link to={`${match.url}/Product/Hospital`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 实验室</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to={`${match.url}/Product/PraductData`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 计算机</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to={`${match.url}/Product/ManufacturingData`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 服务器</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>实验排课</span></span>}>
              <Menu.Item key="8">
                <Link to={`${match.url}/result/DataRenewManagerViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 实验安排</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to={`${match.url}/result/ResultViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 预约审核</Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to={`${match.url}/result/UpdateRecordManagerViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 课表发布</Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to={`${match.url}/result/NoticeRecordManagerViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 通知记录</Link>
              </Menu.Item>
             </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>文档管理</span></span>}>
              <Menu.Item key="21">
                <Link to={`${match.url}/fileSharing/DocumentDistributeManagerViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 公告维护</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>教学课件</span></span>}>
              <Menu.Item key="13">
                <Link to={`${match.url}/platform/platformDomainManuDict`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 厂商</Link>
              </Menu.Item>
              <Menu.Item key="14">
                <Link to={`${match.url}/platform/platformDomainDataDict`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 产品</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><Icon type="appstore" /><span>监控管理</span></span>}>
              <Menu.Item key="15">
                <Link to={`${match.url}/api/ApiCallLogViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> API调用日志</Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to={`${match.url}/api/TaskMonitorManagerViewer`} className="nav-link" activeClassName="active"><i className="icon-grid"></i> 任务监控</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
    )
  }
}

Sidebar.__ANT_LAYOUT_SIDER = true;
const mapStateToProps = (state, ownProps) => {
  return {
    sideNavPin:state.ui.sideNavPin,
  };
}
export default connect(
  mapStateToProps
)(Sidebar);

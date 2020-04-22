import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card} from 'vdap-ui';
import {Button, Icon,Avatar} from 'antd';
import {fetchAllSite,addSiteAction,saveSiteAction,addOKSiteAction} from '../../models/site';
import Users from './components/Users';
import UserCard from './components/UserCard';

const ButtonGroup = Button.Group;

const dataSource = [{
  key: "1",
  name: '管理系统A',
  code: 'system-A',
  ip: '127.0.0.1'
}, {
  key: '2',
  name: '管理系统A',
  code: 'system-B',
  ip: '127.0.0.2'
},{
  key: '3',
  name: '管理系统C',
  code: 'system-C',
  ip: '127.0.0.2'
}, {
  key: '4',
  name: '管理系统D',
  code: 'system-D',
  ip: '127.0.0.2'
}];


class Page extends Component {
  state = {
    model: 'card'
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchAllSite())
  }  

  toggleModel = (model) => {
    this.setState({
      model: model
    })
  };
  setListClick = (e) => {
    this.toggleModel('list');
  };
  setCardClick = (e) => {
    this.toggleModel('card');
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col span={24}>

            <ButtonGroup>
              <Button icon="bars" onClick={this.setListClick} key="list"/>

              <Button icon="appstore-o" onClick={this.setCardClick} key="card"/>
            </ButtonGroup>
          </Col>
        </Row>
        {
          this.renderContent(this.props.users.data)
        }


      </div>
    )
  }

  renderContent = (users) => {
    if (this.state.model === 'list') {
      return (<Row><Col><Users list={users}/></Col></Row>)
    } else {
      return (
        <Row gutter={10}>
          {
            users.map((user, i) => {
              return (<Col span={6} key={user.siteId}><UserCard user={user}/></Col>)
            })
          }
        </Row>

      )
    }
  }
}


const mapStateToProps = (state, ownProps) => ({
  users: state.site,
});
export default connect(mapStateToProps)(Page);


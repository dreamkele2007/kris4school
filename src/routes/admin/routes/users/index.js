import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';
import {fetchAllSite} from '../../models/site';
import SiteCard from './components/SiteCard';

class Page extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchAllSite())
  }  

  render() {
    return (
      <div className="animated fadeIn" style={{ background: '#ECECEC', padding: '30px' }}>
        {
          this.renderContent(this.props.users.data)
        }
      </div>
    )
  }

  renderContent = (users) => {
      return (
        <Row gutter={16}>
          {
            users.map((user, i) => {
              return (<Col span={8} key={user.siteId}><SiteCard user={user}/></Col>)
            })
          }
        </Row>

      )
  }
}


const mapStateToProps = (state, ownProps) => ({
  users: state.site,
});
export default connect(mapStateToProps)(Page);


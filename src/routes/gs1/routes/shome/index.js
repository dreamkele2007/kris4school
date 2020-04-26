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
    let {sites} = this.props;
    return (
      <div className="animated fadeIn" style={{ padding: '30px' }}>
          <Row gutter={16}>
          {
            sites.map((site, i) => {
              return (<Col span={8} key={i} ><SiteCard site={site}/></Col>)
            })
          }
        </Row>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  sites: state.site.data || [],
});
export default connect(mapStateToProps)(Page);


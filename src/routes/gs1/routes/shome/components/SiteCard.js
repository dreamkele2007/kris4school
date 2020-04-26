import React, {Component} from 'react';
import {Card, Icon} from 'antd';


class SiteCard extends Component {
  render() {
    const {site} = this.props;
    const siteIp = "https://"+site.siteIp;
    return (
      <Card title={site.siteName} extra={<a href={siteIp} target="_blank" rel="noopener noreferrer">点击进入</a>}>
         <Icon type="global" style={{ fontSize: 16, color: '#08c' }}/><span style={{fontSize:"16"}}>站点地址:{site.siteIp}</span>
      </Card>
    )
  }
}

export default SiteCard;


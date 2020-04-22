import React from 'react';
import {Tabs, Card, Table, Icon} from 'antd';
import KPIsChart from './KPIsChart';
import ContentMore from '../../components/common/ContentMore.js';
import ContentUl from '../../components/common/ContentUl.js';
import {connect} from 'react-redux';
import SideNavConfig from '../../components/SideNavConfig';

const TabPane = Tabs.TabPane;

class HomePage extends React.Component {
  render() {

    return (
      <div style={{height: '80vh'}}>
        <div style={{float: 'left', width: '57%'}}>
          <div style={{height: '35vh', margin: '30px'}}>
            <div>
              <ContentMore contents={SideNavConfig.taskMore}/>
            </div>

          </div>
          <div style={{height: '45vh', margin: '30px'}}>
            <div style={{marginBottom: 16}}>
		    		<span style={{fontSize: '13px', color: '#333333', letterSpacing: '1.17px'}}>
		    		统计
		    		</span>
            </div>

            <div style={{marginLeft: '30px'}}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="订单数" key="1">
                  <div width="90px"><KPIsChart /></div>
                </TabPane>
                <TabPane tab="商品" key="2">
                  <div><KPIsChart /></div>
                </TabPane>
                <TabPane tab="金额" key="3">
                  <div><KPIsChart /></div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>

        <div style={{float: 'left', width: '43%'}}>
          <div style={{height: '30vh', margin: '30px'}}>
            <img src={require('assets/images/ui/14.png')} style={{width: '100%'}}/>
          </div>
          <div style={{height: '35vh', margin: '30px'}}>
            <div>
              <ContentMore contents={SideNavConfig.statistic}/>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default HomePage;





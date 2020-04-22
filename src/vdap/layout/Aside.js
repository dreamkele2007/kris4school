import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Progress } from 'reactstrap';
import classnames from 'classnames';

class Aside extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <aside className="aside-menu">
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
              <i className="icon-speech"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="callout m-0 py-2 text-muted text-center bg-faded text-uppercase">
              <small><b>今天</b></small>
            </div>
            <hr className="transparent mx-3 my-0"/>
            <div className="callout callout-warning m-0 py-3">
              <div className="avatar float-right">
                <img src={'/assets/images/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div>关于 <strong>页面风格</strong>的讨论</div>
              <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
              <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; 第五会议室 </small>
            </div>
            <hr className="mx-3 my-0"/>
            <div className="callout callout-info m-0 py-3">
              <div className="avatar float-right">
                <img src={'/assets/images/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div>参加 <strong>新员工培训</strong></div>
              <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 5pm</small>
              <small className="text-muted"><i className="icon-social-skype"></i>&nbsp; 网络会议 </small>
            </div>
            <hr className="transparent mx-3 my-0"/>
            <div className="callout m-0 py-2 text-muted text-center bg-faded text-uppercase">
              <small><b>明天</b></small>
            </div>
            <hr className="transparent mx-3 my-0"/>
            <div className="callout callout-danger m-0 py-3">
              <div>关于 <strong>主题一</strong></div>
              <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
              <small className="text-muted"><i className="icon-home"></i>&nbsp; 地点一 </small>
              <div className="avatars-stack mt-2">
                <div className="avatar avatar-xs">
                  <img src={process.env.PUBLIC_URL+'assets/images/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </div>
                <div className="avatar avatar-xs">
                  <img src={process.env.PUBLIC_URL+'assets/images/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </div>
                <div className="avatar avatar-xs">
                  <img src={process.env.PUBLIC_URL+'assets/images/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </div>
                <div className="avatar avatar-xs">
                  <img src={process.env.PUBLIC_URL+'assets/images/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </div>
                <div className="avatar avatar-xs">
                  <img src={process.env.PUBLIC_URL+'assets/images/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </div>
              </div>
            </div>
            <hr className="mx-3 my-0"/>
            <div className="callout callout-success m-0 py-3">
              <div><strong>#10 Startups.Garden</strong> Meetup</div>
              <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
              <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA </small>
            </div>
            <hr className="mx-3 my-0"/>

          </TabPane>
          <TabPane tabId="2" className="p-3">
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={process.env.PUBLIC_URL+'assets/images/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">李某</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">关于xxx的决议</div>
              <small className="text-muted">这是一段文字</small>
            </div>
            <hr/>

          </TabPane>
          <TabPane tabId="3" className="p-3">
            <h6>Settings</h6>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Option 1</b></small>
                <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                  <input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </label>
              </div>
              <div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Option 2</b></small>
                <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                  <input type="checkbox" className="switch-input" />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </label>
              </div>
              <div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Option 3</b></small>
                <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                  <input type="checkbox" className="switch-input" />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </label>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Option 4</b></small>
                <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                  <input type="checkbox" className="switch-input" defaultChecked />
                  <span className="switch-label" data-on="On" data-off="Off"></span>
                  <span className="switch-handle"></span>
                </label>
              </div>
            </div>


          </TabPane>
        </TabContent>
      </aside>
    )
  }
}

export default Aside;

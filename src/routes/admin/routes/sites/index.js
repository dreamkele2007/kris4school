import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Col, Card, Icon} from 'vdap-ui';
import SiteForm from './components/SiteForm';
import SiteCard from './components/SiteCard';
import {fetchAllSite,addSiteAction,saveSiteAction,addOKSiteAction} from '../../models/site';
import { Button, Modal } from 'antd';

class Sites extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchAllSite())
  }  



  onCancel = ()=>{
    const {dispatch} = this.props;
    dispatch(addSiteAction(false))
  }

  onOk = () =>{
    this.refs.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch(saveSiteAction(values));
          this.props.dispatch(addSiteAction(false));
      }
  });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  showModal = () => {
    const {dispatch} = this.props;
    dispatch(addSiteAction(true))
  }
  handleCancel = () => {
    const {dispatch} = this.props;
    dispatch(addSiteAction(false))
  }

  drawSiteForm = () => {
    const {site} = this.props;
    let formList = [];
    if(site.data){
      site.data.map((item,index)=>{
        formList.push(
            <Col key={index} span={8}>
              <Card title={item.siteName} extra={<Icon type="info-circle" style={{fontSize: 16, color: '#08c'}}/>}>
                <SiteCard {...this.props} item={item} index={index} edit={item.id===site.edit} />
              </Card>
            </Col>
          )
      })
    }
    return formList;
  }
  render() {
    let formLists = this.drawSiteForm();
    return (
      <div className="animated fadeIn">
        {formLists}
        <Button type="primary" onClick={this.showModal}>新增</Button>
        <Modal
            visible={this.props.site.visible}
            title="新增"
            okText="确定"
            onCancel={()=>{this.onCancel()}}
            onOk={()=>{this.onOk()}}
          >
            <SiteForm edit={true} add={true} item={{}} ref="form" onSubmit={this.onOk}/>
          </Modal>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  site: state.site || {},
});
export default connect(mapStateToProps)(Sites);

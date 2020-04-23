import React, {Component} from 'react';
import {connect} from 'react-redux';
import SiteCard from './components/SiteCard';
import SiteModal from './components/SiteModal';
import {fetchAllSite,addSiteAction,saveSiteAction,addOKSiteAction} from '../../models/site';
import { Button,Col } from 'antd';

class Sites extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchAllSite())
  }  


  submitForm = (formData) =>{
      this.props.dispatch(saveSiteAction(formData));
      this.props.dispatch(addSiteAction(false));
  }

  closeModal =()=>{
    const {dispatch} = this.props;
    dispatch(addSiteAction(false))
  }

  showModal = () => {
    const {dispatch} = this.props;
    dispatch(addSiteAction(true))
  }

  drawSiteForm = () => {
    const {site} = this.props;
    let formList = [];
    if(site.data){
      site.data.map((item,index)=>{
        formList.push(
            <Col key={index} span={8}>
                <SiteCard {...this.props} item={item} index={index} edit={item.id===site.edit} />
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
        <SiteModal  onOk={this.submitForm} onCancel={this.closeModal}/>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  site: state.site || {},
});
export default connect(mapStateToProps)(Sites);

import React, {Component} from 'react';
import SiteForm  from './SiteForm';
import { Modal } from 'antd';
import {connect} from 'react-redux';
class SiteModal extends Component {

  getModalValues() {
    let formData = this.formRef.props.form.getFieldsValue();
    this.props.onOk(formData);
  }

    render() {
        return (
            <Modal
                visible={this.props.show}
                title="新增"
                okText="确定"
                onCancel={this.props.onCancel}
                onOk={()=>{this.getModalValues()}}
                afterClose={this.props.afterClose}
              >
              <SiteForm edit={true} wrappedComponentRef={(form) => this.formRef = form} item={{}}  />
            </Modal>
        )
      }
}
const mapStateToProps = (state, ownProps) => ({
    show: state.site.showModal,
});
export default connect(mapStateToProps)(SiteModal);
  
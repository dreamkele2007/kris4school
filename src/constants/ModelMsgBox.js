/**
 * Created by Bojc on 2017/6/12.
 */

import { Modal } from 'antd';

class ModelMsgBox{
  static ErrorMsg(title,content) {
    Modal.error({
      title: title,
      content: content,
      onOk(){}
    });
  }
}

export default ModelMsgBox;

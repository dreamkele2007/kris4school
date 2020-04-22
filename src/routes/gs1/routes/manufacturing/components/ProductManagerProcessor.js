/**
 * Created by hp on 2017/6/15.
 */

import 'antd/dist/antd.css';


import HttpUtil from '../../../../../constants/httpUtil';
import  {MasterDataMenuAction} from '../../../models/actions/masterDataMenu/MasterDataMenuAction';


class ProductManagerProcessor {
  tableChange(pagination, condition, props) {
    const {dispatch} = props;
    var dc = props.params;
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 0);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    HttpUtil.post('/api/commonProcessor/commonMethod',dc, function (data) {
      //下面的就是请求来的数据
      dispatch(MasterDataMenuAction(data,props.params))
    });
  }
}
export default ProductManagerProcessor;

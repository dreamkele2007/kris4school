/**
* 为全局添加业务信息
* 如： 业务日期 业务集团信息 用户id
* @param {String} businessDate 业务日期
* @param {String} userId 用户id
* @param {String} groupId 集团id
*/
export default function getBusinessInfo() {
    if (window.top && typeof window.top.GETBUSINESSINFO === 'function') {
        return window.top.GETBUSINESSINFO();
    } else {
        return null;
    }
}
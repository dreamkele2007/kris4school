const date = new Date();
const year = date.getFullYear();

const APPCONFIG = {
  brand: '青岛理工大学',
  user: 'huahua',
  year: year,
  productLink: 'http://www.qtech.edu.cn/',
  PublicURL:'/',
  color: {
    primary: '#00BCD4',
    success: '#8BC34A',
    info: '#66BB6A',
    infoAlt: '#7E57C2',
    warning: '#FFCA28',
    danger: '#F44336',
    text: '#3D4051',
    gray: '#EDF0F1'
  },
  settings: {
    fixedSidebar: true,                             // true, false
    fixedAside: false,                               // true, false
    fixedHeader: true,                              // true, false
    hideAside: true,
    hideSidebar: true,
    collapsedSidebar: false,                            // true, false
    sidebarWidth: 'middle',                         // small, middle, large
    colorOption: '14',                              // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
    theme: 'light',                                 // light, gray, dark
  }
};


export default APPCONFIG;

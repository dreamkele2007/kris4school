import Loadable from 'components/Loadable';
import Login from './login/';
import Admin from './admin/';
import Kris from './gs1/';


const routes = [
  {
    exact: true,
    path: '/',
    component: Login,
  },
  {
    name: "系统管理",
    path: '/admin',
    component: Admin
  },
  {
    name: "实验室管理",
    path: '/kris',
    component: Kris
  }
  
];
export  default routes;

import Loadable from 'react-loadable';
import LoadingPage from './LoadingPage';

const withLoadable = comp =>
  Loadable({
    loader: comp,
    LoadingComponent:LoadingPage,
    delay:300,
  });

export default withLoadable;


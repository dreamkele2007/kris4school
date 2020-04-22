import React,{Component} from 'react';
import { NavLink as Link } from 'react-router-dom';


class Home extends Component{
  render(){
    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link to={`/ui`} className="nav-link" activeClassName="active">UI</Link>
          </li>
        </ul>
      </div>
    )
  }
}


export default Home;

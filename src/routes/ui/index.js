import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {MainApp} from './components';

import Layouts from './routes/layouts/';
import UiLogin from './routes/uiLogin/';
import MultiQuery from './routes/multiQuery/MultiQuery.js';
import TableNormal from './routes/table/TableNormal.js';
import FixHead from './routes/table/FixHead.js';
import FixCol from './routes/table/FixCol.js';
import EditableTable from './routes/table/EditableTable.js';
import SortTable from './routes/table/SortTable.js';
import MultiHead from './routes/table/MultiHead.js';
import BatchOperation from './routes/table/BatchOperation.js';
import Modality from './routes/table/Modality.js';
import Detail from './routes/table/Detail.js';

import Pages from './routes/pages/';
import HomePage from './routes/pages/HomePage.js';

import MyLoan from './routes/myLoan/';
import MyExpense from './routes/myExpense/';

import DatePickerSingle from './routes/datepicker/DatePickerSingle.js';
import DatePickerDouble from './routes/datepicker/DatePickerDouble.js';

class UI extends Component {
  render() {
    const {match} = this.props;
    return (
      <MainApp {...this.props}>
        <Switch>
          <Route path={`${match.url}/project/project-1/`} component={MyExpense}/>
          <Route path={`${match.url}/project/project-2`} component={MyLoan}/>

          <Route path={`${match.url}/datePicker/datePicker-1`} component={DatePickerSingle}/>
          <Route path={`${match.url}/datePicker/datePicker-2`} component={DatePickerDouble}/>

          <Route path={`${match.url}/UiLogin`} component={UiLogin}/>
          <Route path={`${match.url}/pages`} component={Pages}/>
          <Route path={`${match.url}/homepage`} component={HomePage}/>
          <Route path={`${match.url}/two`} component={MultiQuery}/>
          <Route path={`${match.url}/table-1/table-1-1`} component={TableNormal}/>
          <Route path={`${match.url}/table-1/table-1-2`} component={MultiHead}/>
          <Route path={`${match.url}/table-1/table-1-3`} component={EditableTable}/>

          <Route path={`${match.url}/table-1/table-1-7`} component={FixCol}/>

          <Route path={`${match.url}/table-1/table-1-8`} component={FixHead}/>
          <Route path={`${match.url}/table-1/table-1-9`} component={BatchOperation}/>
          <Route path={`${match.url}/table-1/table-1-10`} component={SortTable}/>
          <Route path={`${match.url}/table-1/table-1-11`} component={Modality}/>
          <Route path={`${match.url}/table-1/table-1-4`} component={Detail}/>

          <Route path={`${match.url}/capital-1/capital-1-1`} component={MyLoan}/>
          <Route path={`${match.url}/capital-1/capital-1-2`} component={MyExpense}/>

          <Redirect from={match.url} to={`${match.url}/UiLogin`}/>
        </Switch>
      </MainApp>
    )
  }
}

export default UI

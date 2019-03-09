import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import TaskList from './containers/ConbanBoardList/ConbanBoardList.js';
import TaskDetail from './containers/TaskDetail/TaskDetail.js';
import TaskAdd from './containers/TaskAdd/TaskAdd.js';
import TaskUpdate from './containers/TaskUpdate/TaskUpdate.js';
import Layout from './Layout.js'


class App extends Component {
  render() {
    return (
        <div className="container">
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/tasks/:id/update" component={TaskUpdate}/>
                        <Route path="/tasks/add" component={TaskAdd}/>
                        <Route path="/tasks/:id" component={TaskDetail}/>
                        <Route path="/" component={TaskList}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;

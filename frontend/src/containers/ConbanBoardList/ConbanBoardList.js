import React, {Fragment, Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import axios from 'axios';
import TaskCard from '../../components/TaskCard/TaskCard.js';
import { Row, Col } from 'reactstrap';


class TaskList extends Component {

    state = {
        tasks_turn: [],
        tasks_done: [],
        tasks_in_work: []

    };

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => { return response.data;})
            .then(tasks => {
                let tasks_turn = [];
                let tasks_done = [];
                let tasks_in_work = [];
                Object.values(tasks).map(task => {
                        if (task.status === 'Очередь') tasks_turn.push(task);
                        else if (task.status === 'В работе') tasks_in_work.push(task);
                        else if (task.status === 'Сделано') tasks_done.push(task);
                    });
                this.setState({tasks_turn, tasks_done, tasks_in_work});
            })
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <Row>
                <Col xs={4}>
                    <h1 className="mt-3 mb-3 text-center">Очередь</h1>
                    {this.state.tasks_turn.map(task => {
                        return <div key={task.id}>
                            <TaskCard task={task}/>
                        </div>
                    })}
                </Col>
                <Col xs={4}>
                    <h1 className="mt-3 mb-3 text-center">В работе</h1>
                    {this.state.tasks_in_work.map(task => {
                        return <div key={task.id}>
                            <TaskCard task={task}/>
                        </div>
                    })}
                </Col>
                <Col xs={4}>
                    <h1 className="mt-3 mb-3 text-center">Сделано</h1>
                    {this.state.tasks_done.map(task => {
                        return <div key={task.id}>
                            <TaskCard task={task}/>
                        </div>
                    })}
                </Col>
            </Row>
        </Fragment>
    }
}


export default TaskList;
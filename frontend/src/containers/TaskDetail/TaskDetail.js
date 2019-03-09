 import React, {Component} from 'react'
import {TASKS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import {Container} from 'reactstrap';
import Form from "../../components/UI/Form/Form";


class TaskDetail extends Component {
    state = {
        task: [],
        alert: null,
        submitDisabled: false
    };


    componentDidMount() {
        const match = this.props.match;

        axios.get(TASKS_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }


    updateTaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            console.log(task);
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString());
    };

    selectChanged = (field, values) => {
        const status = values.map(item => item.value);
        this.updateTaskState(field, status);
    };

    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        console.log(this.state.task);
        axios.put(TASKS_URL + this.state.task.id + '/', this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
            })
            .then(task => this.props.history.replace('/tasks/'))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };


    render() {
        if (!this.state.task) return null;

        const {summary, description, due_date, status, time_planned} = this.state.task;

        const due_date_selected = due_date ? new Date(due_date) : null;

        const options = [
            {value: 'Очередь', label: 'Очередь'},
            {value: 'В работе', label: 'В работе'},
            {value: 'Сделано', label: 'Сделано'},
        ];


        return <Container className="mt-3">
            {alert}
            <Form description={description} summary={summary} time_planned={time_planned} submit={this.formSubmitted}
                  change={this.inputChanged} due_date={due_date_selected}
                  datechange={(date) => this.dateChanged('due_date', date)} options={options}
                  onChange={this.selectChanged} selectchange={(value) => this.updateTaskState('status', value.value)}/>
            <NavLink to='/tasks/' className="btn btn-danger">Cancel</NavLink>
        </Container>
    }
}


export default TaskDetail;
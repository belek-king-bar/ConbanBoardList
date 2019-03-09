import React, {Component} from 'react';
import {TASKS_URL} from "../../api-urls";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import axios from 'axios';

const options = [
  { value: 1, label: 'Очередь' },
  { value: 2, label: 'В работе' },
  { value: 3, label: 'Сделано' }
];


class TaskUpdate extends Component {
    state = {
        task: {
            summary: "",
            description: "",
            due_date: "",
            time_planned: "",
            status: ""
        },

        alert: null,
        submitDisabled: false
    };


    updateTaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            console.log(value);
            newState.task= task;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };


    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString().slice(0, 10));
    };



    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        console.log(this.state.task);


        axios.put(TASKS_URL, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Movie was not created');
            })

            .then(task => this.props.history.replace('/tasks/' + task.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Movie was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {

        const {summary, description, due_date, time_planned, status} = this.state.task;

        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }


        const due_date_selected = due_date ? new Date(due_date) : null





        return <div className="mt-3">
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Срок</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={due_date_selected} className="form-control"
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Время для задачи</label>
                    <div>
                        <input type="number" className="form-control"
                                    name="time_planned" value={time_planned} onChange={this.inputChanged}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <div>
                        <Select
                            name="status"
                            onChange={(value) => this.updateTaskState('status', value.label)}
                            options={options}
                        />
                    </div>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default TaskUpdate;
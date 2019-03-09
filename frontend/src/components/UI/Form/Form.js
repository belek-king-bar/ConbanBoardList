import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';


const Form = props => {
    return <form onSubmit={props.submit}>
        <div className="form-group">
            <label className="font-weight-bold">Название</label>
            <input type="text" className="form-control" name='summary' value={props.summary} onChange={props.change}/>
        </div>
        <div className="form-group">
            <label>Описание</label>
            <input type="text" className="form-control" name='description' value={props.description}
                   onChange={props.change}/>
        </div>
        <div className="form-group">
            <label className="font-weight-bold">Время до</label>
            <div>
                <DatePicker dateFormat="yyyy-MM-dd HH:mm:ss" selected={props.due_date}
                            className="form-control"  showTimeSelect
                            name="due_date" onChange={props.datechange}/>
            </div>
        </div>
        <div className="form-group">
            <label>Планируемое время</label>
            <div>
                <input type='number' value={props.time_planned} className="form-control"
                       name="time_planned" onChange={props.change}/>
            </div>
        </div>
        <div className="form-group">
            <label>Статус</label>
            <Select options={props.options} name='status' value={props.status}
                    onChange={props.selectchange}/>
        </div>
        <button disabled={props.disabled} type="submit"
                className="btn btn-primary mb-2">Submit</button>
    </form>
};

export default Form;
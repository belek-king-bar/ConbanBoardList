import React from 'react';
import TCard from "../UI/Card/Card.js";

const TaskCard = props => {
    const {task} = props;

    const {summary, description, id, due_date, time_planned} = task;

    let shortString = description.substring(0,60);

    const link = {
        text: 'Read more',
        url: '/tasks/' + id
    };

    return <TCard summary={summary} description={shortString} link={link} due_date={due_date} time_planned={time_planned} className='h-100'/>;
};


export default TaskCard;
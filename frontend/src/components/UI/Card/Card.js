import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardFooter} from 'reactstrap';
import {NavLink} from 'react-router-dom'

const TCard = props => {
    return (

            <div>
                <Card body outline color="warning" className="p-1 mb-2">
                    <CardBody className="p-0">
                        <CardHeader>{props.summary}</CardHeader>
                        <CardText className="ml-3">{props.description} ...</CardText>
                        {props.link ? <NavLink to={props.link.url} className="btn btn-primary mb-2 ml-3">
                            {props.link.text}
                        </NavLink> : null}
                        <CardFooter>
                            <small className="text-muted mr-5">До: {props.due_date}<small className="float-right mt-1">Время: {props.time_planned} часа</small></small>
                        </CardFooter>

                    </CardBody>
                </Card>
            </div>
    )
};

export default TCard;
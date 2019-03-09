import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Layout extends Component {
    render() {
        return <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse ml-5" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to="/" className="nav-item nav-link">Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tasks/add" className="nav-item nav-link">Добавить задачу</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            {this.props.children}
        </div>

    }
}

export default Layout;
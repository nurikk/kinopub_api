import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as css from './HeaderNav.css';

class HeaderNav extends Component {
  render() {
    const {data, onClick} = this.props;

    return (
      <nav className="header-nav">
        <Link to="/search">Поиск</Link>
        <Link to="/search">Фильмы</Link>
        <Link to="/search">Сериалы</Link>
        <Link to="/search">Мои</Link>
        <Link to="/search">ТВ</Link>
        <Link to="/search">Настройки</Link>
      </nav>
    )
  }
}
export default HeaderNav;
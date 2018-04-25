import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Movie extends Component {
  render() {
    const {data, onClick} = this.props;

    return (
      <Link to={`/video/${data.id}`} className="movie">
        <div className="title">{data.title}</div>
        <div className="poster"><img src={data.posters.small}/></div>
      </Link>
    )
  }
}
export default Movie;
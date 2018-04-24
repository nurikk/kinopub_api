import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as kinopub from './Api';
import s from './demo.css';

class Movie extends Component {
  render(){
    const {data, onClick} = this.props;

    return (
      <div onClick={this.props.onClick} className="movie">
        <div className="title">{data.title}</div>
        <div className="poster"><img src={data.posters.small}/></div>
      </div>
    )
  }
}
class App extends Component {
  onMovieLoaded(response) {
    this.setState({
      movie: response.item,
      page: 'details'
    });
  }
  loadMovie(videoId){
    this.api.getVideo(this.onMovieLoaded.bind(this), {
      id: videoId
    });
  }

  onPairing(user_code, verification_uri){
    this.setState({
      page: 'pair',
      user_code: user_code,
      verification_uri: verification_uri
    });
  }

  onCategoriesLoaded(cats){
    this.setState({
      categories: cats.items,
      page: 'categories'
    });
  }

  onTokenLoaded(){
    this.api.getCategories(this.onCategoriesLoaded.bind(this));
  }

  pairingPage(){
    return (
      <ul>
        <li>Open <a target="_blank" href={this.state.verification_uri}>{this.state.verification_uri}</a></li>
        <li>Enter <b>{this.state.user_code}</b></li>
      </ul>
    )
  }
  showVideos(response){
    this.setState({
      videos: response.items,
      pagination: response.pagination,
      page: 'list'
    });
  }

  loadCategory(categoryId){
    this.api.getPopularVideos(this.showVideos.bind(this), {type: categoryId});
  }
  categoriesPage(){
    return (
      <ul>
        {this.state.categories.map(function(category, index){
            return <li key={ category.id }><a onClick={this.loadCategory.bind(this, category.id)} href="#">{category.title}</a></li>;
        }, this)}
      </ul>
    )
  }
  listPage(){
    return (
      <div className="movies">
        {this.state.videos.map((movie, idx) => {
          return <Movie onClick={this.loadMovie.bind(this, movie.id)} data={movie} key={idx}/>
        }, this)}
      </div>
    )
  }
  detailsPage(){
    return (
      <div className="details">
      <div>title: {this.state.movie.title}</div>
      <div>year: {this.state.movie.year}</div>
      <div>cast: {this.state.movie.cast}</div>
      <div>director: {this.state.movie.director}</div>
      <ul>
        {this.state.movie.genres.map((genre, idx) => {
          return <li key={idx}>{genre.title}</li>
        })}
      </ul>
      <ul>
        {this.state.movie.countries.map((country, idx) => {
          return <li key={idx}>{country.title}</li>
        })}
      </ul>
      <div>voice: {this.state.movie.voice}</div>
      <div>quality: {this.state.movie.quality}</div>
      <div>plot: {this.state.movie.plot}</div>
      <div><img src={this.state.movie.posters.medium}/></div>

       <ul>
        {this.state.movie.videos.map((video, idx) => {
          return video.files.map((video, video_idx) => {

            return (
              <video key={video_idx} width="480" controls poster={video.thumbnail} src={video.url.http} type="video/mp4">
              </video>
            )
          })

        })}
      </ul>

      </div>
    );
  }
  render() {
    switch(this.state.page){
      case 'pair':
        return this.pairingPage();
      break;

      case 'categories':
        return this.categoriesPage();
      break;

      case 'list':
        return this.listPage();
      break;

      case 'details':
        return this.detailsPage();
      break;

      default:
        return (
          <div>hello</div>
        )
      break;


    }
  }
  constructor(props){
    super(props);

    this.state = {
      page: 'index',
      categories: [],
      videos: [],
      pagination: {}
    };

    this.api = new kinopub.Api();
    this.api.on('pair', this.onPairing.bind(this));
    this.api.on('loaded', this.onTokenLoaded.bind(this));
    this.api.auth.init();

  }
}
ReactDOM.render(<App />, document.getElementById('root'));


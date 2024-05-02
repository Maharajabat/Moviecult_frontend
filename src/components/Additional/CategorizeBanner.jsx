import React from 'react'
import { useNavigate } from 'react-router-dom';
import star from './images/star.png'
import starborder from './images/starborder.png'
export default function CategorizeBanner(props) {
    const {movie,fav,fun,state,userid,token}=props
    const nav = useNavigate();
    function viewmovie(id) {
      nav(`/movie-details/${id}`);
    }
  return (
        <div className="listmovie" key={movie.id}>
          <div id="fav"><img src={fav?star:starborder} alt="" title="Add to favourites" onClick={()=>fun(movie.id,state[0],state[1],userid,token)}/></div>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="movieimg"
            width="250"
            height="350px"
          />
          <div className="details" onClick={() => viewmovie(movie.id)}>
            <span id="title" >
              {movie.title}
            </span>
            <span id="reldate" >
              {movie.release_date}
            </span>
            <span id="lan">{movie.language}</span>
            <span id="rating" >
              {movie.rating}
              <img src={star} alt=""  width="15px" style={{"marginLeft":"4px"}}/>
            </span>
          </div>
        </div>
      );
}

import React from 'react'
import './ViewMovie.css'
import { useParams } from 'react-router-dom'
import star from './Additional/images/star.png'
import movielist from './movies.json'
import Nav from './Nav'
export default function ViewMovie() {
const {id}=useParams()
const moviearr=movielist.filter((arr)=> arr.id===Number(id))
const movie=moviearr[0];
  return (
    <>
    <Nav/>
    <div className="viewmovie">
        <div className="poster">
          <img src={movie.poster_path} alt="" />
        </div>
        <span className="divide"></span>
        <div className="info">
          <div className="movieinfo">
            <span id="movietitle">{movie.title}</span>
            <span id="movierating">{movie.rating}    <img src={star} alt=""  width="12px" /></span>
            <span id="moviereldate">{movie.release_date}</span>
          </div>
          <div className="overview">
            {movie.overview}
          </div>
          <span id='heading'>Casts</span>
          <div className="casts">
            {movie.starring.map((cast)=>
            <span id="cast">{cast}</span>
            )}
          </div>
          <span id='heading'>Genre</span>
          <div className="categories">
            {movie.genres.map((genre)=>
            <span id="genre">{genre}</span>
          )}
          </div>
          <span id='heading'>Trailer</span>
          <div className="trailer">
            <iframe src={movie.trailer} frameborder="0" style={{"width":"400px" ,"height":"200px"}}></iframe>
          </div>
        </div>
    </div>
    </>
  )
}

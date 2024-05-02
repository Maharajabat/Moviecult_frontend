import React, { useEffect, useState } from 'react'
import './Nav.css'
import movielist from './movies.json'
import logo from './Additional/images/moviecult_logo.png'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'
export default function Nav() {
  const[cookie]=useCookies()
  const nav=useNavigate();
  const [searchtext,setsearch]=useState("");
  const [movies,setmovies]=useState([]);
  const viewmovie=(id)=>{
    nav(`/movie-details/${id}`)
    const results=document.querySelector(".searchresults");
  results.style.display="none"
  }

const handlefocus=()=>{
  setmovies(movielist);
  const results=document.querySelector(".searchresults");
  results.style.display="block"
}
const close=()=>{
  const results=document.querySelector(".searchresults");
  results.style.display="none"
}
  const handlesearch=(e)=>{
    const text=e.target.value;
    const resmovie=movielist.filter((movie)=>movie.title.toLowerCase().includes(text.toLowerCase()));
    setsearch(text)
    setmovies(resmovie);
  }
  return (
    <div className="header">
    <div className="navbar">
        <div className="logo"  onClick={()=>nav('/home')}>
            <img src={logo} alt="" width="100px"/>
        </div>
        <div className="search"  >
            <input type="text" className="searchbox" placeholder='Search Movie'  onChange={(e)=>handlesearch(e)} onFocus={()=>handlefocus()}/>
        </div>
        <div className="categorize">
          <button title='Categorize by genre' id='more' onClick={()=> nav('/categorize')}>More and More</button>
        </div>
        <div className="signin">
            <button id='signin'title='User Profile' onClick={()=>nav('/userprofile')}>{cookie.username}</button>
        </div>
    </div>
    <div className="searchresults">
    <div className="close"><span onClick={()=>close()}>X</span></div>
      {searchtext.length>0 && movies.length===0 &&
      <div className="noresults">
        <span>No results found</span>
      </div>
     }
      {movies.map((item)=>{
        return(
        <div className="results" onClick={()=>viewmovie(item.id)}>
          <img src={item.poster_path} alt="" width="50px" height="80px" />
          <span id="title">{item.title}</span>
        </div>
        )
      })}
    </div>
    </div>
  )
}

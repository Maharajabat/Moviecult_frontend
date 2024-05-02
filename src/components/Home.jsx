import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./Home.css";
import movielist from "./movies.json";
import Banner from "./Additional/Banner";
import { handlefav } from "./Handlefav";
import { useCookies } from "react-cookie";
export default function Home() {
  const [latest, setlatest] = useState([]);
  const [top, settop] = useState([]);
  const [series, setseries] = useState([]);
  const [soon, setsoon] = useState([]);
  const [others, setothers] = useState([]);
  const[fav,setfav]=useState([]);
 const[cookie,setCookie]=useCookies([]);
  useEffect(() => {
    const latestm = [],
      topm = [],
      seriesm = [],
      comingsoon=[],
      other=[];
    movielist.map((movie) => {
      if (movie.moviestatus.toLowerCase() === "latest") {
        latestm.push(movie);
      } else if (movie.moviestatus.toLowerCase() === "top") {
        topm.push(movie);
      } else if (movie.moviestatus.toLowerCase() === "series") {
        seriesm.push(movie);
      }
      else if (movie.moviestatus.toLowerCase()==="coming soon"){
        comingsoon.push(movie);
      }
      else if(movie.moviestatus.toLowerCase()==="others"){
        other.push(movie)
      }
    });
    fetch(`${import.meta.env.VITE_BACKEND}/fav/${cookie.userid}`,{
      headers:{
        'Authorization':`Bearer ${cookie.token}`
      }
    }).then(res=>res.json()).then(data=>setfav(data.fav));
    topm.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    other.sort((a,b)=>a.rating<b.rating?1:-1);
    setlatest(latestm);
    settop(topm);
    setseries(seriesm);
    setsoon(comingsoon);
    setothers(other);
  }, [movielist]);
  
  return (
    <>
      <Nav />
      <div className="homepage">
        <span>Latest</span>
        <div className="sections">
          {latest.map((item) => {
            return <Banner movie={item} fav={fav.includes(item.id)?true:false} fun={handlefav} state={[fav,setfav]} userid={cookie.userid} token={cookie.token}/>;
          })}
        </div>
        <span>Top IMBd Movies</span>
        <div className="sections">
          {top.map((item) => {
            return <Banner movie={item} fav={ fav.includes(item.id)?true:false} fun={handlefav} state={[fav,setfav]}  userid={cookie.userid} token={cookie.token}/>;
          })}
        </div>
        <span>Series</span>
        <div className="sections">
          {series.map((item) => {
            return <Banner movie={item} fav={ fav.includes(item.id)?true:false} fun={handlefav} state={[fav,setfav]}  userid={cookie.userid} token={cookie.token}/>;
          })}
        </div>
        <span>Coming Soon</span>
        <div className="sections">
          {soon.map((item) => {
            return <Banner movie={item} fav={ fav.includes(item.id)?true:false} fun={handlefav} state={[fav,setfav]}  userid={cookie.userid} token={cookie.token}/>;
          })}
        </div>
        <span>Also Watch</span>
        <div className="sections">
          {others.map((item) => {
            return <Banner movie={item} fav={ fav.includes(item.id)?true:false} fun={handlefav} state={[fav,setfav]}  userid={cookie.userid} token={cookie.token}/>;
          })}
        </div>
        <span>Your Favourites</span>
        <div className="sections">
          {fav.length==0 && <span>Add Your Favourites +</span>}
          { fav.map((id) => {
            const movie=movielist.find((movie)=>movie.id===id);
            return <Banner movie={movie} fav={ fav.includes(movie.id)?true:false} fun={handlefav} state={[fav,setfav]}  userid={cookie.userid} token={cookie.token}/>;
          })}
        </div>
      </div>
    </>
  );
}

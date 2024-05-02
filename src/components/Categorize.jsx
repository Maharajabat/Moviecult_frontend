import React, { useEffect, useState } from "react";
import movielist from "./movies.json";
import Nav from "./Nav";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./Categorize.css";
import { handlefav } from "./Handlefav";
import { useCookies } from "react-cookie";
import CategorizeBanner from "./Additional/CategorizeBanner";
import Filter from "./Additional/Filter";
export default function () {
  const [cookie,setCookie]=useCookies([])
  const [gdrop, setgdrop] = useState(false);
  const [ldrop, setldrop] = useState(false);
  const [rdrop, setrdrop] = useState(false);
  const [movies, setmovies] = useState([]);
  const [categories, setcat] = useState([]);
  const [language, setlanguage] = useState([]);
  const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selected, setselected] = useState([]);
  const [selectedlan,setsellan]=useState([]);
  const [selectedcat,setselcat]=useState([]);
  const [selectedrat,setselrat]=useState([]);
  const [lbtn,setlbtn]=useState(false);
  const [tbtn,settbtn]=useState(false);
  const [sbtn,setsbtn]=useState(false);
  const [fbtn,setfbtn]=useState(false);
  const [cbtn,setcbtn]=useState(false);
  const[fav,setfav]=useState([]);
  useEffect(()=>{
    const btn=document.querySelector("#more")
    btn.classList.add("navactive")
   const cat=[],lan=[];
   movielist.map((movie)=>{
    movie.genres.map((genre)=>{
        if(!cat.includes(genre)){
          cat.push(genre);
        }
    })
    if(!lan.includes(movie.language)){
       lan.push(movie.language);
    }
    setcat(cat);
    setlanguage(lan);
   })
   fetch(`${import.meta.env.VITE_BACKEND}/fav/${cookie.userid}`,{
    headers:{
      'Authorization':`Bearer ${cookie.token}`
    }
   }).then(res=>res.json()).then(data=>setfav(data.fav));
  },[movielist])
 useEffect(()=>{
      let newmovie=movielist.filter((movie)=>movie.moviestatus.toLowerCase()!="coming soon");
      if(selectedlan.length>0){
        newmovie=movielist.filter((movie)=>selectedlan.includes(movie.language))
      }
      if(selectedcat.length>0){
        let count=0;
        newmovie=newmovie.filter((movie)=>{
         return movie.genres.some((genre)=>{
           if(selectedcat.includes(genre)){
            count++;
            return true;
           }
          })
          })
          if(count==0){
            newmovie=[];
          }
        }
        if(selectedrat.length>0){
          const min=selectedrat.reduce((a,b)=> a<b?a:b);
          let count=0;
          newmovie=newmovie.filter((movie)=>{
            if(movie.rating>=min){
              count++;
              return true;
            }
        });
        if(count==0){
          newmovie=[];
        }
        }
      else if(newmovie.length==0){
        setmovies(movielist)
      }
      newmovie.sort((a,b)=>a.rating<b.rating?1:-1);
    if(newmovie.length>0) setmovies(newmovie);
    else {setmovies(newmovie)}
 },[selectedlan,selectedcat,selectedrat])

  const handledrop = (drop) => {
    setlbtn(false);
    settbtn(false);
    setsbtn(false)
    setfbtn(false);
    setcbtn(false);
    if(drop==='g'){ setgdrop(!gdrop) ;setldrop(false);setrdrop(false)}
    else if(drop==='l'){setldrop(!ldrop);setgdrop(false);setrdrop(false);}
    else {setrdrop(!rdrop);setldrop(false);setgdrop(false);}
  };
 const handlegenre=(genre)=>{
     if(!selected.includes(genre)){
      setselected([...selected,genre])
     }
     if(!selectedcat.includes(genre)){
      setselcat([...selectedcat,genre])
     }

 }
 const handlelan=(lan)=>{
  if(!selected.includes(lan)){
    setselected([...selected,lan])
   }
   if(!selectedlan.includes(lan)){
    setsellan([...selectedlan,lan]);
   }
 }
 const handlerat=(rat)=>{
  const newmovie=movies.filter((movie)=>movie.rating>=rat);
  if(!selected.includes(rat)){
    setselected([...selected,rat])
  }
  if(!selectedrat.includes(rat)){
    setselrat([...selectedrat,rat]);
  }
 }
 const handletitlefilter=(btn)=>{
  setgdrop(false) ;
  setldrop(false);
  setrdrop(false)
  if(btn==='l'){
    setlbtn(!lbtn);
    settbtn(false);
    setsbtn(false)
    setfbtn(false);
    setcbtn(false);
    
  }
  else if(btn==='t'){
    setlbtn(false);
    settbtn(!tbtn);
    setsbtn(false)
    setfbtn(false);
    setcbtn(false);
  }
  else if(btn==='s'){
    setlbtn(false);
    settbtn(false);
    setsbtn(!sbtn)
    setfbtn(false);
    setcbtn(false);
   
  }
  else if(btn==='f'){
    setlbtn(false);
    settbtn(false);
    setsbtn(false)
    setfbtn(!fbtn);
    setcbtn(false);
  }
  else if(btn==='c'){
    setlbtn(false);
    settbtn(false);
    setsbtn(false)
    setfbtn(false);
    setcbtn(!cbtn);
    const latest=movielist.filter((movie)=>movie.moviestatus.toLowerCase()==='coming soon');
    setmovies(latest)
  }

 }
 useEffect(()=>{
  const titlebtn=document.querySelector("#tbtn");
  const labtn=document.querySelector("#lbtn");
  const sebtn=document.querySelector("#sbtn");
  const fabtn=document.querySelector("#fbtn");
  const cobtn=document.querySelector("#cbtn");
  if(!tbtn)titlebtn.classList.remove("active")
  if(!lbtn)labtn.classList.remove("active")
  if(!sbtn)sebtn.classList.remove("active")
  if(!cbtn)cobtn.classList.remove("active")
  if(!fbtn)fabtn.classList.remove("active")
  if(tbtn){
    const latest=movielist.filter((movie)=>movie.moviestatus.toLowerCase()==='top');
    titlebtn.classList.add("active")
    setmovies(latest)
  }
  else if(lbtn){
    const latest=movielist.filter((movie)=>movie.moviestatus.toLowerCase()==='latest');
    labtn.classList.add("active")
    setmovies(latest)
  }
  else if(sbtn){
    const latest=movielist.filter((movie)=>movie.moviestatus.toLowerCase()==='series');
    sebtn.classList.add("active")
    setmovies(latest)
  }
  else if(fbtn){
    const latest=movielist.filter((movie)=>fav.includes(movie.id));
    fabtn.classList.add("active")
    setmovies(latest)
  }
  else if(cbtn){
    const latest=movielist.filter((movie)=>movie.moviestatus.toLowerCase()==='coming soon');
    cobtn.classList.add("active")
    setmovies(latest)
  }
  else{
    setmovies(movielist)
  }

 },[lbtn,tbtn,sbtn,cbtn,fbtn])


  const del = (genre) => {
    const newgenre=selectedcat.filter((l)=>l!==genre);
    const newlan=selectedlan.filter((l)=>l!==genre);
    const newrat=selectedrat.filter((rat)=>rat!=genre)
    const newarr = selected.filter((cat) => cat !== genre);
    setselected(newarr);
    setselcat(newgenre);
    setselrat(newrat);
    setsellan(newlan);
  };
  return (
    <>
      <Nav />
      <div className="categorize">
        <div className="sort">
          <div className="genre">
            <span  onClick={() => handledrop("g")} id="filterbtn">Filter by genre </span>
            <span id="icon" onClick={() => handledrop("g")}>
              {gdrop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </span>
          </div>
          <div className="genre">
            <span  onClick={() => handledrop("l")} id="filterbtn">Filter by language </span>
            <span id="icon" onClick={() => handledrop("l")}>
              {ldrop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </span>
          </div>
          <div className="genre">
            <span  onClick={() => handledrop("r")} id="filterbtn">Filter by rating </span>
            <span id="icon"  onClick={() => handledrop("r")}>
              {rdrop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </span>
          </div>
        </div>
        <div className="filter">
          {gdrop && (
            <Filter array={categories} title="Available Genres" call={handlegenre}/>
          )}
          {ldrop && (
            <Filter array={language} title="Available Languages" call={handlelan}/>
          )}
          {rdrop && (
           <Filter array={rating} title="Ratings Above" call={handlerat}/>
          )}
          {(gdrop || ldrop || rdrop) && (
            <div className="selectedbox">
              <span id="yourcat">Your Categorize</span>
              {selected.map((item) => {
                return (
                  <div className="cat">
                    <span id="selected-title">{item}</span>
                    <span id="del" onClick={() => del(item)}>
                      x
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="titlefilter">
         <div className="latest"><span onClick={()=>handletitlefilter("l")} id="lbtn">latest</span></div>
         <div className="top"><span onClick={()=>handletitlefilter("t")} id="tbtn">top rated</span></div>
         <div className="series"><span onClick={()=>handletitlefilter("s")} id="sbtn">series</span></div>
         <div className="fav"><span onClick={()=>handletitlefilter("f")} id="fbtn">your favourites</span></div>
         <div className="soon"><span onClick={()=>handletitlefilter("c")} id="cbtn">coming soon</span></div>
        </div>
        {movies.length==0 && 
        <div className="noresult"><span>No Results Found</span></div>
        }
        <div className="movielist">
          {movies.map((item) => {
            return(
              <CategorizeBanner movie={item} fav={fav.includes(item.id)?true:false} fun={handlefav} state={[fav,setfav]} userid={cookie.userid} token={cookie.token}/>
            )
          })}
        </div>
      </div>
    </>
  );
}

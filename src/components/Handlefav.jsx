export const handlefav=async(id,fav,setfav,userid,token)=>{
    if(fav.includes(id)){
      const newfav=fav.filter((movie)=>movie!=id);
      await fetch(`${import.meta.env.VITE_BACKEND}/delfav/${userid}/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      setfav(newfav)
    }
    else{
      await fetch(`${import.meta.env.VITE_BACKEND}/addfav/${userid}/${id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      setfav([...fav,id]);
    }
   
  }
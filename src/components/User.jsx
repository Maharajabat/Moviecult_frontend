import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import './User.css'
import Nav from './Nav'
import { RiMovie2Fill } from "react-icons/ri";
export default function User() {
  const [cookie,setCookie,removeCookie]=useCookies([]);
  const [success,setsuccess]=useState(false);
  const[loading,setloading]=useState(false)
  const [fail,setfail]=useState(false);
  const [username,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const userid=cookie.userid;
  useEffect(()=>{
    const btn=document.querySelector("#signin")
    btn.classList.add("navactive")
    fetch(`https://moviecult-backend.onrender.com/getuser/${userid}`).then(res=>res.json())
    .then(data=>{
      setname(data.user[0].username);
      setemail(data.user[0].email);
      setpassword(data.user[0].password);
    });
  },[])

  const handlesubmit=(e)=>{
    e.preventDefault()
    setloading(true);
    const upd=document.querySelector("#update");
    upd.disabled=true;
    upd.style.opacity="50%";
         const username=document.querySelector("#username").value;
         const email=document.querySelector("#email").value;
         const password=document.querySelector("#password").value;
         fetch(`https://moviecult-backend.onrender.com/updateuser/${userid}`,{
          method:'PATCH',
          headers:{
            'content-type':"application/json",
            'Authorization': `Bearer ${cookie.token}`
          },
          body:JSON.stringify({
            username:username,
            email:email,
            password:password
          })
         }).then(res=>res.json())
         .then(data=>{
          if(data.message==="updated"){
            setsuccess(true)
            setfail(false)
          }
          else {
            setfail(true)
            setsuccess(false)
          }
          setloading(false);
         }
        );
         
       
  }
  const handlelogout=()=>{
    removeCookie('token')
    removeCookie('userid')
    removeCookie('username')
  }
  return (
    <>
    <Nav/>
    <div className="userprofile">
      <button id='logout' onClick={()=>handlelogout()}>logout</button>
      <span id='userhead'>User Profile</span>
      <form action="" className="userform" onSubmit={handlesubmit}>
        <label htmlFor="username">UserName</label>
        <input type="text" value={username} id="username"  style={{textTransform:"none"}} onChange={(e)=>{setname(e.target.value);setfail(false);setsuccess(false); const upd=document.querySelector("#update");upd.disabled=false;
    upd.style.opacity="100%";}} required/>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} id="email" style={{textTransform:"lowercase"}} onChange={(e)=>{setemail(e.target.value);setfail(false);setsuccess(false); const upd=document.querySelector("#update");upd.disabled=false;
    upd.style.opacity="100%";}} required />
        <label htmlFor="password">Password</label>
        <input type="password" value={password}  id="password"  style={{textTransform:"none"}} onChange={(e)=>{setpassword(e.target.value);setfail(false);setsuccess(false); const upd=document.querySelector("#update");upd.disabled=false;
    upd.style.opacity="100%";}} required/>
        <button type='submit' id="update">Update</button>
        {loading &&
        <div id='load'><RiMovie2Fill /></div>
        }
        {success && 
        <span id="success">User updated successfully</span>
        }
        {fail && 
        <span id="error">User already exists</span>
        }
      </form>
    </div>
    </>
  )
}

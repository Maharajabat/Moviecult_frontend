import React, { useState } from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { RiMovie2Fill } from "react-icons/ri";
export default function Login() {
    const [cookie,setCookie]=useCookies([])
    const[login,setlogin]=useState(true);
    const[username,setname]=useState("");
    const[email,setemail]=useState("");
    const[error,seterror]=useState(false);
    const [success,setsuccess]=useState(false);
    const [loading,setloading]=useState(false);
    const[reg,setreg]=useState(false);
    const[msg,setmsg]=useState(false);
    const nav=useNavigate();
    const[pw,setpw]=useState("");
    const handlesubmit=async (e)=>{
        e.preventDefault();
        setloading(true);
        const log=document.querySelector("#login");
        log.disabled=true;
        log.style.opacity="50%";
       try{
        const login=await fetch(`${import.meta.env.VITE_BACKEND}/validate`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:pw
            })
        })
        const response=await login.json();
        if(response.status.toLowerCase()==="success"){
            setCookie('token',response.token,{maxAge:7200});
            setCookie('userid',response.user._id,{maxAge:7200});
            setCookie('username',response.user.username,{maxAge:7200});
            setsuccess(true)
            setTimeout(()=>nav('/home'),1000)
        }
        else{
            setsuccess(false)
            seterror(true);
        }
        setloading(false);
       }
       catch(error){
        console.log("Error at Api");
       }
    }
    const handleregister=async (e)=>{
        e.preventDefault();
        setloading(true);
        const reg=document.querySelector("#register");
        reg.disabled=true;
        reg.style.opacity="50%";
        try{
       
         const login=await fetch('https://moviecult-backend.onrender.com/adduser',{
             method:"POST",
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                username:username,
                 email:email,
                 password:pw
             })
         })
         const response=await login.json();
         if(response.status.toLowerCase()==="success"){
            setreg(true);
            setmsg(true);
         }
         else{
             setreg(true);
             setmsg(false);
         }
         setloading(false)
        }
        catch(error){
         console("Error at Api");
        }
     }
  return (
    <div className="startup">
        <div className="enterform">
            {login && <form id='loginform'  onSubmit={handlesubmit}>
                <label >Email</label>
            <input type="email" className="email" onChange={(e)=>{setemail(e.target.value); seterror(false); const log=document.querySelector("#login");log.disabled=false;
        log.style.opacity="100%";}} style={{"textTransform":"lowercase"}} required/>
            <label >Password</label>
            <input type="password" className="pw" onChange={(e)=>{setpw(e.target.value); seterror(false);  const log=document.querySelector("#login");log.disabled=false;
        log.style.opacity="100%";}} style={{"textTransform":"none"}} required/>
            <button type="submit" className="login" id='login'>Login</button>
            </form>
}
{!login && <form id='loginform' onSubmit={handleregister}>
<label >UserName</label>
           <input type="text" className="username" onChange={(e)=>{setname(e.target.value);setreg(false); const reg=document.querySelector("#register");
        reg.disabled=false; reg.style.opacity="100%";}} style={{textTransform:"none"}}  required/>
           <label>Email</label>
            <input type="email" className="email" onChange={(e)=>{setemail(e.target.value);setreg(false); const reg=document.querySelector("#register");
        reg.disabled=false; reg.style.opacity="100%";}} style={{"textTransform":"lowercase"}}required/>
            <label >Password</label>
            <input type="password" className="pw" onChange={(e)=>{setpw(e.target.value);setreg(false); const reg=document.querySelector("#register");
        reg.disabled=false; reg.style.opacity="100%";}}style={{"textTransform":"none"}} required/>
            <button type="submit" className="login" id='register'>Register</button>
            </form>
}
      {loading &&
        <div id='load'><RiMovie2Fill /></div>
      }
       {error && 
       <span className="error" style={{background:"black",color:"red",borderRadius:"10px",padding:"10px"}}>Invalid UserName or Password</span>
       }
       {success && 
        <span className="success" style={{background:"black",color:"green",borderRadius:"10px",padding:"10px"}}>Login Successful</span>
       }
       {reg && !msg && <span className="error" style={{background:"black",color:"red",borderRadius:"10px",padding:"10px"}}>User Email Already Exists</span>}
       {reg && msg && <span className="success" style={{background:"black",color:"green",borderRadius:"10px",padding:"10px"}}>Account Created -- you can login now</span>}
        <span className="toggle" onClick={()=>{setlogin(!login); seterror(false);setreg(false)}}>{login?"Don't have an account?":"Already have an account?"}</span>
        </div>
    </div>
  )
}

import React, { useState } from "react";



const Login=()=>{
    const [body,setBody]=useState({username:'',password:''})
    const inputChange = ({target}) => {
        const {name,value}=target
        setBody({
            ...body,
            [name]:value
        })
    }

    const onSubmit=()=>{
        console.log(body)
    }
    return(
        <div>
            
        </div>
    )
}
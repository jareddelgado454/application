'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Airtable from 'airtable'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const BASE_ID = process.env.NEXT_PUBLIC_BASE_USERS_ID;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const base = new Airtable({apiKey: API_KEY}).base(BASE_ID);
    const router = useRouter();
    const [validation, setValidation] = useState({
        email : "",
        password : "",
    });

    const handleChange = (event) => {
        setValidation({...validation, [event.target.name] : event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(validation.email != "" && validation.password != ""){
            try {
                const records = await base('userCredentials').select({
                    filterByFormula: `AND(email="${validation.email}", password="${validation.password}")`,
                }).firstPage();
    
                if (records.length > 0) {
                    toast.success("Welcome, you are registered", {
                        className: "toastSuccess",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                    setValidation({
                        email : "",
                        password : "",
                    });
                    router.push('/data-form');
                } else {
                    toast.error("There is no record with that email and user, enter the data correctly", {
                        className: "toastError",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                    setValidation({
                        email : "",
                        password : "",
                    });
                    // Puedes mostrar un mensaje de error aquí si lo deseas.
                }
            } catch (error) {
                toast.error("An error occurred, try again", {
                    className: "toastError",
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                setValidation({
                    email : "",
                    password : "",
                });
                // Puedes manejar errores aquí.
            }
        }else{
            toast.error("You must complete all fields", {
                className: "toastError",
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
        
    }
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='w-[700px] h-[600px] rounded-xl border-[3px] border-orange-300/40 p-5 flex flex-col justify-center items-center' style={{backgroundColor:"#16171A"}}>
            <h2 className='w-full text-center text-[40px] text-orange-400/50 mb-10'>Verification Form</h2>
            <form className='flex flex-col w-[80%] ' onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-white/80'>Email</label>
                <input id='email' onChange={handleChange} value={validation.email} name='email' type='email' placeholder='Enter the email' className='p-2 rounded-lg bg-white/5 text-white mb-6'/>

                <label htmlFor="password" className='text-white/80'>Password</label>
                <input id='password' onChange={handleChange} name='password' type='password' value={validation.password} placeholder='Enter the password' className='p-2 rounded-lg bg-white/5 text-white mb-8'/>

                <button type='submit' className='p-2 bg-orange-400/35 text-white/80 rounded-lg'>Verify Information</button>
            </form>
        </div>
    </div>
  )
}

export default Page;
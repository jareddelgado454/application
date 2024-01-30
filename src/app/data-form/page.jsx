'use client';
import React, { useState } from 'react'
import Airtable from 'airtable';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const DataForm = () => {
    const BASE_ID = process.env.NEXT_PUBLIC_BASE_USERS_ID;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const base = new Airtable({apiKey: API_KEY}).base(BASE_ID);
    const router = useRouter();
    const [data,setData] = useState({
        StudentName : "",
        HoursMetThisWeek : "",
        ProgressDescription : "",
    })

    const handleChange = (event) => {
        setData({...data, [event.target.name] : event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(data.StudentName != "" && data.HoursMetThisWeek != "" && data.ProgressDescription != ""){
            try {
                const records = await base('StudentInformation').create([
                    {
                        "fields": {
                            "StudentName": data.StudentName,
                            "HoursMetThisWeek": data.HoursMetThisWeek, 
                            "ProgressDescription": data.ProgressDescription
                        }
                    }
                ]);
    
                if (records && records.length > 0) {
                    toast.success("Student information was added correctly", {
                        className: "toastSuccess",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                    setData({
                        StudentName : "",
                        HoursMetThisWeek : "",
                        ProgressDescription : "",
                    });
                    router.push('/thankyou');
                } else {
                    toast.error("Student information was not added.", {
                        className: "toastError",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                    setData({
                        StudentName : "",
                        HoursMetThisWeek : "",
                        ProgressDescription : "",
                    });
                }
            } catch (error) {
                toast.error("An error occurred, try again.", {
                    className: "toastError",
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                setData({
                    StudentName : "",
                    HoursMetThisWeek : "",
                    ProgressDescription : "",
                });
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
            <h2 className='w-full text-center text-[40px] text-orange-400/50 mb-10'>Student Information</h2>
            <form className='flex flex-col w-[80%] ' onSubmit={handleSubmit}>
                <label htmlFor="StudentName" className='text-white/80'>Student Name</label>
                <input id='StudentName' onChange={handleChange} name='StudentName' value={data.StudentName} type='text' placeholder='Enter the student name' className='p-2 rounded-lg bg-white/5 text-white mb-6'/>

                <label htmlFor="HoursMetThisWeek" className='text-white/80'>How many hours did you meet with your student this week?</label>
                <input id='HoursMetThisWeek' onChange={handleChange} name='HoursMetThisWeek' value={data.HoursMetThisWeek} type='number' placeholder='Enter the number of hours' className='p-2 rounded-lg bg-white/5 text-white mb-8'/>

                <label htmlFor="ProgressDescription" className='text-white/80'>Progress description</label>
                <textarea id='ProgressDescription' style={{ resize: 'none' }} rows={5} onChange={handleChange} value={data.ProgressDescription} name='ProgressDescription' type='text' placeholder='Enter a description of the progress' className='p-2 rounded-lg bg-white/5 text-white mb-8'/>

                <button type='submit' className='p-3 bg-orange-400/35 text-white/80 rounded-lg'>Save student information</button>
            </form>
        </div>
    </div>
  )
}

export default DataForm
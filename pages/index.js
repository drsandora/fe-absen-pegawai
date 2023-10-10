"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import {
    LogoIcon,
  } from "../components/icons";


const LoginForm = () => {
    const router = useRouter()
    const [username, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const API_LOGIN = process.env.NEXT_PUBLIC_LOGIN;

    const Submit = async (e) => {
        e.preventDefault()
        if( !username || !password){
            setError("Silahkan Cek Inputan Kembali")
            setTimeout(() => {
                setError("")
            }, 3000);
            return;
        }

        try{
            const res = await fetch(API_LOGIN,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, password
                }),
            })

            if(res.ok){
                const form = e.target
                form.reset()
                const data = await res.json();
                cookie.set('username', data.username, { expires: 1 }); 
                cookie.set('role_id', data.role_id, { expires: 1 }); 
                cookie.set('token', data.token, { expires: 1 }); 
                cookie.set('temp_token', data.temp_token, { expires: 1 }); 
                cookie.set('pegawai_id', data.pegawai_id, { expires: 1 }); 

                setSuccess("Login Berhasil")
                setTimeout(() => {
                    setSuccess("")
                }, 3000);
                router.push({
                    pathname: '/home',
                  });
            }else {
                const data = await res.json();
                setError(data.message)
                setTimeout(() => {
                    setError("")
                }, 3000);
                return;
            }
        } catch(error){

        }
    };

    return (
        <div className="grid place-items-center h-screen bg-slate-100">
            <div className="shadow-lg p-5 rounded-lg border-t-4 bg-teal-50 border-teal-500">
                <h1 className="text-xl font-bold my-4">
                <div className="flex items-center pl-1 gap-4">
                    <LogoIcon />
                    <span   
                    >
                    TALENTO
                    </span>
                </div>

                </h1>
                <form onSubmit={Submit} className="flex flex-col gap-3">
                    <input className="bg-slate-300" onChange={(e) => setEmail(e.target.value)}  type="text" placeholder="Email"/>
                    <input className="bg-slate-300" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    <button className="bg-teal-500 text-white font-bold cursor-pointer px-6 py-2">
                        Login
                    </button>
                    { error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                        )
                    }

                    { success && (
                        <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {success}
                        </div>
                        )
                    }
                </form>
            </div>
        </div>
    )
}


export default LoginForm;
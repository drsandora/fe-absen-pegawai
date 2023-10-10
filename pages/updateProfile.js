"use client"
import React from 'react';
import { useState } from "react";
import { useRouter } from "next/router";

export default function updateProfile (payload )  {

  const isOpen = payload.isOpen;
  const closeModal = payload.closeModal
  const profile = payload.profile
  const [foto, setFoto] = useState(profile.foto);
  const [phone, setPhone] = useState(profile.phone);
  const [password, setPassword] = useState(profile.password);
  const [pegawai_id, setPegawai_id] = useState(profile.pegawai_id);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();


  const resetStateAndSendData = () => {
    setFoto(profile.foto);
    setPhone(profile.phone);
    setPassword(profile.password);
    setPegawai_id(profile.pegawai_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
        const res = await fetch('http://localhost:8000/pegawai/updateProfile?',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pegawai_id, foto, phone, password
            }),
        })
        if(res.ok){
            const form = e.target
            form.reset()
            const data = await res.json();
            setSuccess("Login Berhasil")
            setTimeout(() => {
                setSuccess("")
                closeModal()
            }, 200);
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
    <div className={isOpen ? "modal ml-20" : "hidden" }>
      <div className={"modalContent "}>
        <span className="close" onClick={() => {closeModal(), resetStateAndSendData()}}>&times;</span>
        <h2 className='mb-5'>Edit Profile</h2>
          { error && (
                <div className="bg-red-500 w-20 h-15 text-white font-bold px-1 py-1 left-2 mb-2">
                    {error}
                </div>
              )
          }

          { success && (
                <div className="bg-green-500 w-20 h-15 text-white font-bold px-1 py-1 left-2 mb-2">
                    {success}
                </div>
              )
          }
        <form  onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h3 className="font-bold">Foto</h3>
            <input className="bg-slate-300 mb-5 w-full" value={foto}  onChange={(e) => setFoto(e.target.value)} type="text" placeholder={foto}/>
            <h3 className="font-bold">No Phone</h3>
            <input className="bg-slate-300 mb-5 w-full"  value={phone}  onChange={(e) => setPhone(e.target.value)} type="text" placeholder={phone}/>
            <h3 className="font-bold">Password</h3>
            <input className="bg-slate-300 mb-5 w-full" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

            <button className="bg-teal-500 text-white font-bold cursor-pointer px-1 py-2 left-2">
                Update
            </button>
        </form>
      </div>
    </div>
  );
};


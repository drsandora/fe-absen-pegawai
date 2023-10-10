"use client"
import React from 'react';
import { useState } from "react";
import { useRouter } from "next/router";

export default function addPegawai (payload )  {
    
  const isOpen = payload.isOpen;
  const closeModal = payload.closeModal
  const [foto, setFoto] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nama_pegawai, setNamaPegawai] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();

  const resetStateAndSendData = () => {
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
        const res = await fetch('http://localhost:8000/pegawai/addPegawai?',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama_pegawai, password, email, foto, phone, position
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
        <span className="close text-black" onClick={() => {closeModal(), resetStateAndSendData()}}>&times;</span>
        <h3 className='text-black font-bold'>Add Data Pegawai</h3>
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
        <form  onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
            <p className="font-bold text-black">Nama Pegawai</p>
            <input className="bg-slate-300  w-full"  onChange={(e) => setNamaPegawai(e.target.value)} type="text" placeholder={foto}/>
            <h1 className="font-bold text-black">Email</h1>
            <input className="bg-slate-300  w-full"   onChange={(e) => setEmail(e.target.value)} type="email" placeholder={phone}/>
            <h3 className="font-bold text-black">Password</h3>
            <input className="bg-slate-300 w-full"  onChange={(e) => setPassword(e.target.value)} type="password" />
            <p className="font-bold text-black">Position</p>
            <input className="bg-slate-300  w-full"  onChange={(e) => setPosition(e.target.value)} type="text" placeholder={foto}/>
            <h1 className="font-bold text-black">No Phone</h1>
            <input className="bg-slate-300  w-full"   onChange={(e) => setPhone(e.target.value)} type="text" placeholder={phone}/>
            <h3 className="font-bold text-black">Foto</h3>
            <input className="bg-slate-300 w-full"  onChange={(e) => setFoto(e.target.value)} type="text" />

            <button className="bg-blue-400  text-white font-bold cursor-pointer px-1 py-2 left-2">
                Create
            </button>
        </form>
      </div>
    </div>
  );
};


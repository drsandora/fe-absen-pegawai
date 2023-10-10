"use client"
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import cookie from 'js-cookie';
import UpdateProfile from "./updateProfile";

const  Absensi =() => {
  const router = useRouter();
  const token = cookie.get('token');
  const [data, setData] = useState("")
  const [statusabsen_id, setStatus] = useState(true);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const pegawai_id = cookie.get('pegawai_id');
    // return
    try{
        const res = await fetch('http://localhost:8000/absen/AddAbsen?',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pegawai_id, statusabsen_id
            }),
        })
        if(res.ok){
            const form = e.target
            form.reset()
            const data = await res.json();

            setSuccess("Login Berhasil")
            setTimeout(() => {
                setSuccess("")
            }, 1000);
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

  const sendMasuk = () => {
    statusabsen_id = 1
  };

  const sendPulang = () => {
    statusabsen_id = 2
  };

  return (
    <Layout>
                <div className="grid place-items-center w-full h-full bg-slate-100">
          <div className="shadow-lg w-full h-full p-5 rounded-lg  bg-slate-50">
  
              <div className="flex items-right pl-1 gap-4 text-black mb-3">
                <h1 className="text-xl font-bold my-4">

                    Absensi
                </h1>
              </div>
              <hr></hr>
                { error && (
                <div className="bg-red-500 w-20 h-15 text-white font-bold px-1 py-1 left-2 mb-2">
                    {error}
                </div>
                )
                }

                { success && (
                    <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Data Berhasil Di simpan</span>
                    </div>
                    </div>
                    )
                }
              <div class="w-full ">
                <form onSubmit={handleSubmit}  class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-center items-center">
                    <div class="flex items-center justify-between">
                    <button onClick={sendMasuk}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                        Masuk
                    </button>
                    <button onClick={sendPulang} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Pulang
                    </button>
                    </div>
                </form>
            </div>


          </div>
       </div>
      </Layout>
  );
}

export default Absensi;
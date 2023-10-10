"use client"
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import cookie from 'js-cookie';
import UpdateProfile from "./updateProfile";

const  Home =() => {
  const router = useRouter();
  const token = cookie.get('token');
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasFetched, sethasFetched] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {

    const GetData = async () => {
      const pegawai_id = cookie.get('pegawai_id');
      try {
          const res = await fetch(`http://localhost:8000/pegawai/getPegawai?pegawai_id=${pegawai_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!res.ok) {
            if(res.status == 403) router.replace('/')
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const {data} = await res.json();
          setData(data)
          setLoading(false);
        } catch (error) {

          console.error("Error fetching data:", error);
        }

  };
  GetData()

  }, []);

  return (
    <Layout>
      {loading ? (
        <div>Loading user data...</div>
      ) : data ? (
        <div className="grid place-items-center w-full h-full bg-slate-100">
          <div className="shadow-lg w-full h-full p-5 rounded-lg  bg-slate-50">
  
              <div className="flex items-center pl-1 gap-4 text-black mb-3">
                <h1 className="text-xl font-bold my-4">

                    Profile
                </h1>
              </div>
              <hr></hr>
              <div class="flex">
                <div class="flex-1 p-4 mt-3 gap-3 flex-col-6 text-black">
                    <h3 className="font-bold">Nama Pegawai</h3>
                    <input className="bg-slate-300 mb-5 w-full" value={data.nama_pegawai}  type="text" placeholder="Email"/>
                    <h3 className="font-bold">Email</h3>
                    <input className="bg-slate-300 mb-5 w-full" value={data.email} type="text" placeholder="Email"/>
                    <h3 className="font-bold">Password</h3>
                    <input className="bg-slate-300 mb-5 w-full" value={data.password}  type="password" placeholder="password"/>
                    <h3 className="font-bold">Jabatan</h3>
                    <input className="bg-slate-300 mb-5 w-full" value={data.position}  type="text" placeholder="Posisi"/>
                    <h3 className="font-bold">No Phone</h3>
                    <input className="bg-slate-300 mb-5 w-full" value={data.phone} type="text" placeholder="Phone"/>
                    <div className="text-xl font-bold my-4">
                    <button className="bg-teal-500 text-white font-bold cursor-pointer px-6 py-2 w-full" onClick={handleModalToggle}>EDIT</button>
                    <UpdateProfile  className="" isOpen={modalOpen} closeModal={handleModalToggle} profile={data} fromHome={true} />
                    </div>

                </div>
                {/* <div class="flex-1 p-4 mt-3 gap-3 flex-col-6 text-black">

                  <img
                    src="/image/foto.jpg" 
                    alt="Example Image"
                    className="w-64 h-64 object-cover"
                  />
                  <h3 className="font-bold">Foto</h3>
                  <input className="bg-slate-300 mb-5 w-full" value={data.foto}  type="text" placeholder="Foto"/>
                </div> */}
              </div>


          </div>
       </div>
      ) : (
        <p>Error fetching user data.</p>
      )}

      </Layout>
  );
}

export default Home;
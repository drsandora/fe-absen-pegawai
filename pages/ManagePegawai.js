"use client"
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import cookie from 'js-cookie';
import AddPegawai from "./addPegawai";
import UpdatePegawai from "./updatePegawai"

const  ManagePegawai =() => {
  const router = useRouter();
  const token = cookie.get('token');
  const [dataPegawai, setDataPegawai] = useState("")
  const [loading, setLoading] = useState(true);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; 

  const handleModalToggleAdd = () => {
    setModalOpenAdd(!modalOpenAdd);
  };

  const handleModalEditToggle = () => {
    setModalOpenEdit(!modalOpenEdit);
  };

  useEffect(() => {
    GetData(currentPage)
  }, []);

  const GetData = async (page) => {
    const pegawai_id = cookie.get('pegawai_id');
    try {
        const res = await fetch(`http://localhost:8000/pegawai/getAllPegawai?page=${page}&pageSize=${pageSize}`, {
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
    
        const {data, totalPages} = await res.json();
        setDataPegawai(data)
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {

        console.error("Error fetching data:", error);
      }

  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      GetData(currentPage -1 )
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      GetData(currentPage + 1)
    }
  };


  const handleUpdate = (pegawai_id, newName) => {
    // Update the data with the new name
    const updatedData = dataPegawai.map(item => {
      if (item.pegawai_id == pegawai_id) {
        return { ...item };
      }
      return item;
    });

    setDataPegawai(updatedData);
  };

  return (
    <Layout>
            {loading ? (
        <div>Loading user data...</div>
      ) : dataPegawai  ? (
        <div class="flex flex-col">
        <div className="grid place-items-center w-full h-full bg-slate-100">
          <div className="shadow-lg w-full h-full p-5 rounded-lg  bg-slate-50">
          {/* <addPegawai/> */}
            <button  className="border-b bg-teal-500 font-semibold py-1 px-1 border border-gray-400 rounded shadow"onClick={handleModalToggleAdd}>Add Pegawai</button>
            <AddPegawai  className="" isOpen={modalOpenAdd} closeModal={handleModalToggleAdd}  />
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light mt-3">
                  <thead
                    class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" class="px-6 py-4">No</th>
                      <th scope="col" class="px-6 py-4">Nama Pegawai</th>
                      <th scope="col" class="px-6 py-4">Email</th>
                      <th scope="col" class="px-6 py-4">Position</th>
                      <th scope="col" class="px-6 py-4">Phone</th>
                      <th scope="col" class="px-6 py-4">Foto</th>
                      <th scope="col" class="px-6 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPegawai.map((data, index) => (
                    <tr key={data.pegawai_id}
                      class="border-b bg-neutral-100 text-black">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                      <td class="whitespace-nowrap px-6 py-4">{data.nama_pegawai}</td>
                      <td class="whitespace-nowrap px-6 py-4">{data.email}</td>
                      <td class="whitespace-nowrap px-6 py-4">{data.position}</td>
                      <td class="whitespace-nowrap px-6 py-4">{data.phone}</td>
                      <td class="whitespace-nowrap px-6 py-4">{data.foto}</td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div className="mr-1">
                        <button  className="border-b mr-1 bg-blue-400 font-semibold py-1 px-1 border border-gray-400 rounded shadow"onClick={handleModalEditToggle}>Edit</button>
                          <UpdatePegawai className="" isOpen={modalOpenEdit} data={data} closeModal={handleModalEditToggle} />
                          {/* <button  className="border-b bg-red-500 font-semibold py-1 px-1 border border-gray-400 rounded shadow">Delete</button>
                          <UpdatePegawai className="" data={data}  /> */}
                       </div>

                      </td>
                    </tr>
                      ))}
                      <tr>
                      <td colSpan={5} className="text-black">
                      <button 
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow"
                      onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous Page
                      </button>
                      <button className="bg-white mr-3 ml-2 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow"
                      onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next Page
                      </button>
                      Page : {currentPage}  Total Page : {totalPages}

                      </td>
                      </tr>

                  
                  </tbody>

                  
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Error fetching user data.</p>
      )}

    </Layout>

  );
}

export default ManagePegawai;
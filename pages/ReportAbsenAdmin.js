"use client"
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import cookie from 'js-cookie';

const  ReportAbsenAdmin =() => {
  const router = useRouter();
  const token = cookie.get('token');
  const [dataReport, setDataReport] = useState("")
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const pageSize = 10;


  useEffect(() => {
    GetData(currentPage)
  }, []);

  const GetData = async (page) => {
    
    try {
        const res = await fetch(`http://localhost:8000/report/GetAllReport?page=${page}&pageSize=${pageSize}`, {
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
    
        const {data, totalPages, total_data} = await res.json();
        setDataReport(data)
        setTotalPages(totalPages);
        setTotalData(total_data)
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

  return (
    <Layout>
            {loading ? (
        <div>Loading user data...</div>
      ) : dataReport  ? (
        <div class="flex flex-col">
            <div className="grid place-items-center w-full h-full bg-slate-100">
                <div className="shadow-lg w-full h-full p-5 rounded-lg  bg-slate-50">
                    <div className="font-bold text-black">
                        <h1>List Absen Pegawai</h1>
                    </div>

                    <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm font-light mt-3">
                        <thead
                        class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th scope="col" class="px-6 py-4">No</th>
                                <th scope="col" class="px-6 py-4">Nama Pegawai</th>
                                <th scope="col" class="px-6 py-4">Tanggal</th>
                                <th scope="col" class="px-6 py-4">Status</th>
                                <th scope="col" class="px-6 py-4">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataReport.map((val, i) => (
                            <tr key={val.resumeabsen_id} class="border-b bg-neutral-100 text-black">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
                                <td class="whitespace-nowrap px-6 py-4">{val.nama_pegawai}</td>
                                <td class="whitespace-nowrap px-6 py-4">{val.waktu_absen}</td>
                                <td class="whitespace-nowrap px-6 py-4">{val.status_absen_nama}</td>
                                <td class="whitespace-nowrap px-6 py-4">{val.email}</td>
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
                                Page : {currentPage}  Total Page : {totalPages}  Total Data : {totalData}

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

export default ReportAbsenAdmin;
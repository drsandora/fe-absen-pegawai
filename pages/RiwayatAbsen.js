"use client"
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import cookie from 'js-cookie';

const  RiwayatAbsen =() => {
  const router = useRouter();
  const token = cookie.get('token');
  const [dataReport, setDataReport] = useState("")
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const pageSize = 10;
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState('');


  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const formattedFirstDay = formatDate(firstDayOfMonth);
    const formattedToday = formatDate(today);

    setStartDate(formattedFirstDay);
    setEndDate(formattedToday);
    GetData(currentPage)
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  const GetData = async (page) => {
    const pegawai_id = cookie.get('pegawai_id');
    try {
        if(!startDate || !endDate){
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const formattedFirstDay = formatDate(firstDayOfMonth);
            const formattedToday = formatDate(today);
            setStartDate(formattedFirstDay);
            startDate = formattedFirstDay
            endDate =formattedToday
            setEndDate(formattedToday);
        }
        const res = await fetch(`http://localhost:8000/report/GetReport?pegawai_id=${pegawai_id}&page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`, {
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

  const handleFilter = () => {
    GetData(1)
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
                    
                    <div date-rangepicker class="flex items-center">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input 
                        name="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                    </div>
                    <span class="mx-4 text-gray-500">to</span>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input 
                            type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} name="end" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>

                    </div>
                    <button class="bg-blue-500 hover:bg-blue-700 ml-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                             onClick={handleFilter}>Search</button>
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

export default RiwayatAbsen;
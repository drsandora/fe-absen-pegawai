import React from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();
  let init = true;
  if(router.pathname == '/'){
    init = false
  }
  return (
    <div className="h-screen flex flex-row justify-start">
      
      {init && <Sidebar />}
      <div className="bg-blue-400 backdrop-opacity-50 flex-1 p-4 text-white">

          {children}
      </div>
    </div>
  );
};

export default Layout;

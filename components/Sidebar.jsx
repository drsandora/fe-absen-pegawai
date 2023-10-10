import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import cookie from 'js-cookie';
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons";




const API_LOGOUT = process.env.NEXT_PUBLIC_LOGOUT;
const API_GET = process.env.NEXT_PUBLIC_GET;

const menuItemsAdmin = [
  { id: 1, label: "Home Admin", icon: HomeIcon, link: "/home" },
  { id: 2, label: "Manage Pegawai", icon: UsersIcon, link: "/ManagePegawai" },
  { id: 3, label: "Report Absen", icon: ArticleIcon, link: "/ReportAbsenAdmin" },
];

const menuItemsPegawai = [
  { id: 1, label: "Home Pegawai", icon: HomeIcon, link: "/home" },
  { id: 2, label: "Absensi", icon: ArticleIcon, link: "/Absensi" },
  { id: 3, label: "Riwayat Absen", icon: UsersIcon, link: "/RiwayatAbsen" },
];


const Sidebar = () => {

  const router = useRouter();
  const token = cookie.get('token');
  const temp_token = cookie.get('temp_token');
  const pegawai_id = cookie.get('pegawai_id');
  const role_id = cookie.get('role_id');
  const username = cookie.get('username');
  const menuItems = role_id == 1 ? menuItemsAdmin : menuItemsPegawai
  // return
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);



  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const Logout = async () => {
    try{
        const res = await fetch(API_LOGOUT,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'cookies': temp_token,
            },
            body: JSON.stringify({
                "cookies": temp_token,
            }),
        })
        if(res.ok){
            cookie.remove('token');
            router.replace('/')
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

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              TALENTO
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes}>
                <Link href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <button onClick={Logout} className={classNames("text-md font-medium text-text-light")}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

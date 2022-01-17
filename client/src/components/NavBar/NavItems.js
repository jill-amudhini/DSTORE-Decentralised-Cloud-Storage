import React from 'react'
import * as Icons from "react-icons/fa";

export const navItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "./../dashboard",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome />,
  },
  {
    id: 2,
    title: "Store House",
    path: "./../storeHouse",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaBriefcase />,
  },
  // {
  //   id: 3,
  //   title: "Resources",
  //   path: "./../resources",
  //   nName: "nav-item",
  //   sName: "sidebar-item",
  //   icon: <Icons.FaCartArrowDown />,
  // },
  {
    id: 3,
    title: "Contact Us",
    path: "./../contact",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaPhone />,
  },
];
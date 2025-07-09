// import React, { useEffect, useState } from 'react'
// import { HiMenu } from "react-icons/hi";
// import { HiX } from "react-icons/hi";


// const navLinks = ["Home", "Services", "Process", "Schedule"];

// function Header() {
//       const [menuOpen, setMenuOpen] = useState(false);

//       useEffect(() => {
//     if (menuOpen) {
//       document.body.classList.add('overflow-hidden');
//     } else {
//       document.body.classList.remove('overflow-hidden');
//     }
//   }, [menuOpen]);




//   const handleNavClick = (id) => {
//   const el = document.getElementById(id);
//   if (el) {
//     el.scrollIntoView({ behavior: 'smooth' });
//     setMenuOpen(false); 
//   }
// };

//   return (
//     <div className="w-full flex justify-between items-center px-[20px] md:px-[100px]  py-[15px] bg-secondary select-none">
//       <img
//         className="md:w-[100px] w-[70px]"
//         src="/Images/logo.png"
//         alt="Logo"
//       />

//       <div className=" hidden md:flex gap-[30px]">
//         {navLinks.map((link, index) => (
//           <span
//             key={index}
//             onClick={() => handleNavClick(link)}
//             className="text-primary font-DMSans text-[20px] font-normal cursor-pointer"
//           >
//             {link}
//           </span>
//         ))}
//       </div>

//       <div>
//         <a
//           href="https://buttar.hk/contact/"
//           target='_blank'
//           rel="noreferrer"
//           className=" hidden md:block text-white bg-primary rounded-full font-DMSans text-[16px] font-normal px-[20px] py-[12px] cursor-pointer"
//         >
//           Let's Talk Now
//         </a>
//       </div>

//       {/* Mobile Hamburger */}
//       <div className="block md:hidden">
//         <HiMenu
//           className="text-primary text-[30px] cursor-pointer"
//           onClick={() => setMenuOpen(true)}
//         />
//       </div>

//       {/* Mobile Menu Overlay */}
//       {menuOpen && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-60 z-40"></div>

//           <div
//             className={`
//           fixed top-0 right-0 h-full w-[65%] bg-secondary z-50 flex flex-col gap-8 shadow-lg
//           transform ${menuOpen ? "translate-x-0" : "translate-x-full"} 
//           transition-transform duration-300 ease-in-out
//         `}
//           >
//             <HiX
//               className="absolute top-5 right-5 text-primary text-[35px] cursor-pointer"
//               onClick={() => setMenuOpen(false)}
//             />

//             <div className=" flex flex-col ml-6 mt-[80px] gap-[20px]">
//               {navLinks.map((link, index) => (
//                 <span
//                   key={index}
//                   onClick={() => handleNavClick(link)}
//                   className="text-primary font-DMSans text-[22px] font-normal cursor-pointer"
//                 >
//                   {link}
//                 </span>
//               ))}
//               <a href="https://buttar.hk/contact/" target='_blank' rel="noreferrer" className="text-white w-fit mt-4 bg-primary rounded-full font-DMSans text-[16px] font-normal px-[20px] py-[12px] cursor-pointer">
//                 Let's Talk Now
//               </a>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Header

import React from 'react';

function Header() {
    return (
        <header className="bg-white p-6 shadow-md rounded-lg mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
            {/* You can add user info, logout button, etc. here */}
            {/* <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200">
                Logout
            </button> */}
        </header>
    );
}

export default Header;
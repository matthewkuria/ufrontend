// 'use client';
// import React, { useState, useEffect } from 'react';
// import "./routes.css";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import imageMoon from "../assets/destination/image-moon.png"
// import imageMars from "../assets/destination/image-mars.png"
// import imageEuro from "../assets/destination/image-europa.png"
// import imageTitan from "../assets/destination/image-titan.png"

// const imageMap = {
//     'image-moon.png': imageMoon,
//     'image-mars.png': imageMars,
//     'image-europa.png': imageEuro,
//     'image-titan.png': imageTitan
    
// };
// const Destination = () => {
//     const [data, setData] = useState([])
//     // Fetch data from the  JSON file
//      useEffect(() => {
//     // Fetch data from the JSON file
//     fetch('/data.json')
//       .then((response) => response.json())
//       .then((data) => setData(data.destinations))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);  
//     return (
//         <section className='destination'>
//             <h1 className="uppercase  text-white text-2xl pt-12 pb-0 pl-20"><span className="text-slate-500">01</span> Pick your destination</h1>
//             <Tabs>
//             <TabList className="flex justify-end md:mr-28 uppercase ">
//                 {Array.isArray(data) && data.map((item, index) => (
//                 <Tab key={index}>{item.name}</Tab>
//                 ))}
//             </TabList>
//             {Array.isArray(data) && data.map((item, index) => (
//                 <TabPanel key={index}>
//                 <div className='flex flex-col md:flex-row justify-around'>
//                     <div className=''>
//                     <img
//                         src={imageMap[item.images.png]}
//                         alt={item.title}
//                         style={{ width: '90%', height: '90%' }}
//                     />
//                     </div>
//                     <div className="flex flex-col text-white w-full md:w-1/2">
//                         <h2 className='uppercase text-7xl'>{item.name}</h2>
//                         <p>{item.description}</p>
//                         <div className="flex justify-between mt-10 ">
//                             <div className="flex flex-col">
//                                 <p className="">AVG. DISTANCE</p>
//                                 <p>{item.distance}</p>
//                             </div>
//                             <div className="flex flex-col">
//                                 <p className="">EST. TRAVEL TIME</p>
//                                 <p>{ item.travel}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 </TabPanel>
//             ))}
//             </Tabs>
//         </section>
//     )
// }
// export default Destination
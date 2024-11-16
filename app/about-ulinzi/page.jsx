'use client';
import React, { useState, useEffect } from 'react';
import "../styles/routes.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import  Image from "next/image"
import imageUlinziStars from "../../public/images/ulinzi-stars-kenyan-military-team.jpg"
import imageUlinziStarlets from "../../public/images/ulinzi-starlets-2.jpg"
import imageUlinziYouths from "../../public/images/ulinzi-stars-kenyan-team.jpg"
import Link from 'next/link';



const imageMap = {
    'ulinzi-stars-kenyan-military-team.jpg': imageUlinziStars,
    'ulinzi-starlets-1.jpg': imageUlinziStarlets,
    'ulinzi-stars-kenyan-team.jpg': imageUlinziYouths
    
    
};
const Destination = () => {
    const [data, setData] = useState([])
    // Fetch data from the  JSON file
     useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data.teams))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);  
    return (
        <section className='destination text-[13px]'>
            <h1 className="uppercase  text-white text-xl pt-12 pb-0 pl-20">
               Ulinzi FootBall Teams
            </h1>
            <Tabs>
            <TabList className="flex justify-end md:mr-28 uppercase">
                {Array.isArray(data) && data.map((item, index) => (
                <Tab key={index}>{item.name}</Tab>
                ))}
            </TabList>
            {Array.isArray(data) && data.map((item, index) => (
                <TabPanel key={index}>
                <div className='flex flex-col md:flex-row justify-around'>
                    <div className='flex justify-center'>
                    <Image
                        src={imageMap[item.images.jpg]}
                        alt={item.name}
                        style={{ width: '80%', height: '90%' }}
                        className='rounded-lg ml-3 mt-10 md:mt-0'
                    />
                    </div>
                    <div className="flex flex-col text-white w-full md:w-1/2 p-3">
                        <h2 className='uppercase text-5xl my-4'>{item.name}</h2>
                        <p>{item.description}</p>
                        <div className="flex justify-around md:justify-between mt-10 ">
                            <div className="flex flex-col">
                                <p className="uppercase">Technical Bench</p>
                                <Link href={`/${item.benchUrl}`} className='flex justify-center bg-white py-2 px-2  rounded-lg hover:underline hover:bg-blue-900 hover:text-white text-red-500'>Explore</Link>
                            </div>
                            <div className="flex flex-col">
                                <p className="uppercase">Team</p>
                                 <Link href={`about-ulinzi/${item.playersUrl}`} className='bg-blue-900 py-2 px-3  rounded-lg hover:bg-white hover:underline hover:text-red-500'>View</Link>
                            </div>
                        </div>
                    </div>
                </div>
                </TabPanel>
            ))}
            </Tabs>
        </section>
    )
}
export default Destination
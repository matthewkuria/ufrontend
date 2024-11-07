import Image from "next/image";
import ulinziPlayers from "../../public/images/Ulinzi-players.webp"
import ulinziNow from "../../public/images/ulinzi-logo.png"
export default function About() {
  return (
    <main className="text-[13px] text-slate-500">
      <section className="p-5">
        <p className="text-2xl text-blue-900 font-bold my-5">About Ulinzi</p>
        <div className="flex flex-col md:flex md:flex-row justify-around border-b-2 border-yellow-500 md:p-5 ">
          <div className="md:w-1/2">
            <Image src={ulinziPlayers} alt="Apostle Sammy Ngaho" width={400} height={300} className="rounded-lg" />
            <p className="text-blue-900 text-xs">Ulinzi stars in the beginning</p>
          </div>
          <div className="md:w-1/2 px-4">
            <p className="text-xl font-semibold text-blue-900 my-2">History</p>
            <p className="border-l-4 pl-2">Ulinzi Stars represent Kenya's Defence forces
              (the Kenya Army, the Airforce and the Kenya Navy).
              It was formed in 1995 when several military sides were combined. These teams were
            </p>
            <p className="border-l-4 pl-2">
              Ulinzi have played in the Afraha Stadium since 2004, after moving from Thika.
              They won the Kenyan Sports Team of the Year award in 2010
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex md:flex-row justify-between my-4 border-b-2 border-yellow-500 md:p-5">          
          <div className="md:w-1/2">
            <p className="text-xl font-semibold text-blue-900 my-2">Ulinzi Stars Now</p>
            <p className="border-l-4 pl-2">Ulinzi Stars Football Club is an association football club based in Nakuru, Kenya.
              They compete in the Kenyan Premier League, where they won three consecutive titles from 2003 to 2005. They are the only
              team to have done so, along with AFC Leopards and Gor Mahia, and won their most recent league title in 2010
            </p>
          </div>
          <div className="">
            <Image src={ulinziNow} alt="Ulinzi Stars Now" width={400} height={300} className="rounded-lg" />
            <p className="text-blue-900  text-xs">Current Ulinzi stars</p>
          </div>
        </div>
        <div className="">
          <p className="text-blue-900 font-bold text-xl">Our Teams</p>
          <p className="">The military sides that form Ulinzi Stars are:</p>
          <ul className="">
           <li> Waterworks</li>
            <li>Scarlet (Third Battalion of the Kenya Rifles, based in Lanet, Nakuru),</li>
           <li> Kahawa United (Kahawa Barracks, Kahawa, Nairobi)</li>
           <li> Silver Strikers (12th Engineers, Thika),</li>
           <li> Kenya Navy (Mombasa)</li>
           <li> Spitfire (Kenya Air Force, Moi Air Base, Nairobi).</li>
          </ul>
          <p className="font-bold text-blue-900 text-xl">
            
          </p>
         </div>
      </section>
    </main>
  );
}

import TbenchHero from "../../components/TbenchHero";
import YouthsTBench from "../../components/YouthsTBench";
export default function Page() {
    return (
        <main className="p-3 bg-slate-100 flex flex-col items-center md:items-start">
           <TbenchHero />
           <YouthsTBench />
        </main>
    )
}
import StarsTBench from "../../components/StarsTBench";
import TbenchHero from "../../components/TbenchHero";
export default function Page() {
    return (
        <main className="p-3 bg-slate-100 flex flex-col items-center md:items-start">
           <TbenchHero />
           <StarsTBench  />
        </main>
    )
}
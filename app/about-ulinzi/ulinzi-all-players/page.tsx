import Players from "../../components/Players";

export default function Page() {
    return (
        <main className="p-3 bg-slate-100 flex flex-col items-center md:items-start">
            <h1 className="text-4xl text-blue-900 font-extrabold py-2">Ulinzi Team Players</h1>
            <Players  />
        </main>
    )
}
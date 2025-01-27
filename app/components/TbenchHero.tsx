import { bebas_neue } from "../fonts/fonts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/components/ui/breadcrumb";

export default function TbenchHero() {
    return (
         <section className=" BENCH flex  items-center justify-center h-[200px] md:h-[300px] w-full">
                <div className=" flex flex-col">
                    <h1 className={`${bebas_neue.className} text-xl md:text-4xl text-white font-extrabold py-2`}>Ulinzi Technical Bench</h1>
                    <Breadcrumb className="text-white">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-red-600" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />                        
                            <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-red-600" href="/teams">Teams</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Ulinzi Technical Bench</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
    )
}
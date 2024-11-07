import Image from "next/image";

import paypalLogo from "../../public/images/paypallogo.png"
import Link from "next/link";
import { Button } from "../ui/components/ui/button";

export default function Support() {
  return (
    <main className="">
      <section className=" flex flex-col justify-center p-6">
        <div className=" bg-yellow-600 p-6 text-white rounded-lg">
          <h1 className=" text-2xl py-2 font-bold">Make a donation to Ulinzi Stars</h1>
          <p className="py-1">Keep the club running.</p>
        </div>
        <div className=" mt-4 flex flex-col justify-between md:flex md:flex-row md:justify-between">
          <div className="md:w-1/2 flex flex-col items-center">
            <p className="font-semibold">
             Your financial gift keeps Ulinzi Football Club going.
              </p>
            <Link href="https://www.paypal.com/donate/">
              <Button className="flex flex-col items-center py-6 px-5 bg-blue-600 hover:bg-red-600">
              <Image src={paypalLogo} alt="Paypal" width={50} height={50} />
              <p className="text-white">Donate Now</p>
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

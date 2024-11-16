
import Image from "next/image";
import confirmTick from "../../../public/images/icon-order-confirmed.svg";
export default function Page() {
    return (
        <main className="flex flex-col items-center">
            <div className="">
                <Image
                    src={confirmTick}
                    alt="Order confirmed tick"
                    height={100}
                    width={100}
                />
            </div>
            <div className="">
                <p className="">Purchase successful! Check your email for confirmation.</p>
            </div>
       </main>
    )
}
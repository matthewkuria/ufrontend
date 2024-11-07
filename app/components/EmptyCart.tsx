import Image from "next/image";
import illustrationIcon from "../../public/images/cart.png"
import { Card, CardFooter } from "../ui/components/ui/card";
export default function EmptyCart() {
    return (
          <Card className="w-[280px] h-[300px] bg-white border-none">
          <p className="text-red text-[16px] font-bold p-4">Your Cart <span>(0)</span></p>
          <Image
            src={illustrationIcon}
            height={150}
            width={150}
            alt="The image illustration for the empty cart"
            className="mx-auto"
          />
          <CardFooter>
            <p className="text-rose-500 mx-auto">Your items will appear here</p>
          </CardFooter>
        </Card>
    )
}
"use client"
import Image from "next/image"
import { IProduct } from "../interfaces/globalTypes"
import { useCart } from "../context/CartContext"
import addCartIcon from "../../public/images/icon-add-to-cart.svg"
import minusIcon from "../../public/images/icon-decrement-quantity.svg"
import addIcon from "../../public/images/icon-increment-quantity.svg"
import { Button } from "../ui/components/ui/button"
import { Card, CardFooter } from "../ui/components/ui/card"


const CardItem = ({item}:{item: any} ) => { 
  const { cartItems,addToCart, decreaseQuantity, increaseQuantity } = useCart();  

    return (
        <Card className="drop-shadow-none border-none w-[320px] md:w-[120px] lg:w-[150px] md:h-[220px] lg:h-[290px] rounded-md basis-1 flex-auto ">
                {/* The image for the desktop design */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={100}
                  className="rounded-lg flex-none hidden md:hidden lg:block mx-auto hover:scale-105"
                /> 
                {/* The image for the tablet design */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={350}
                  height={150}
                  className="rounded-md flex-none hidden md:block lg:hidden"
                />
                {/* The image for the mobile design */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={350}
                  height={150}
                  className="rounded-md flex-none block md:hidden lg:hidden"
                />              
                <div className="">                  
                    {cartItems[item.id] ? (
                    <div className="add-or-remove-item flex mx-auto border rounded-full border-red px-7 py-2 font-bold ">
                    <button onClick={() => decreaseQuantity(item.id)} className="minus-btn " >
                      <Image
                        src={minusIcon}
                        width={10}
                        height={10}
                        alt="Decrement button"
                        className="opacity-0"
                      />                    
                    </button>
                        <span className="quantity">{cartItems[item.id]?.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="add-btn">
                        <Image
                          src={addIcon}
                          width={12}
                          height={12}
                          alt="Increment button"
                          className="opacity-0 "
                        />
                      </button>
                    </div>
          ) : (
              <Button
                className="flex mx-auto border rounded-full border-red-500 px-7 py-2  hover:text-red-500 font-bold md:px-3 md:py-1 "
                onClick={() => addToCart(item)}
              >
                <Image
                    src={addCartIcon}
                    alt="The add to cart icon for the button"
                    width={20}
                    height={10}
                    className="mx-2"
                  />
                Add to Cart
              </Button>
                  
                )}
                </div>
                <CardFooter className="flex flex-col items-start text-left mt-2  px-1 font-bold ">
                  <p className="font-normal text-rose-400">{ item.category.name}</p>
                  <p className="text-[16px]">{ item.name}</p>
                  <p className=" text-red-500">Ksh.{ item.price}</p>
                </CardFooter>
              </Card>
    )
}
export default CardItem
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { MdOutlineCancel } from "react-icons/md";
import { useCart } from "../context/CartContext";
import EmptyCart from '../components/EmptyCart';
import carbonNeutral from "../../public/images/icon-carbon-neutral.svg";
import confirmOrder from "../../public/images/icon-order-confirmed.svg";
import { Button } from '../ui/components/ui/button';
import { Card } from '../ui/components/ui/card';
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../ui/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
      const { isAuthenticated } = useAuth();
        const router = useRouter();
        const [isModalOpen, setIsModalOpen] = useState(false);

        const handleConfirmOrder = () => {
            if (!isAuthenticated) {
            // Redirect to login with the current page URL as the `next` query parameter
            const currentPath = window.location.pathname;
            router.push(`/login?next=${encodeURIComponent(currentPath)}`);
            } else {
            setIsModalOpen(true);    // Open the confirmation modal if authenticated
            }
        };
    const { cartItems, removeFromCart } = useCart();

    // Convert the cartItems object to an array of items
    const cartItemsArray = Object.values(cartItems);
    const isEmpty = cartItemsArray.length === 0;

    // Calculate the cart subtotal
    const totalCartPrice = cartItemsArray.reduce((acc, item) => {
        return acc + (item.price * (item.quantity || 1));
    }, 0);
const handleClick = () => {
    router.push("/shop") 
 }
return (
        <div>
            {isEmpty ? (
                <EmptyCart />
            ) : (
                <div className="bg-white p-3">
                    <Card className="h-auto bg-white border-none">
                        <p className="text-red-500 text-[16px] font-bold p-4">
                            Your Cart <span>({cartItemsArray.length})</span>
                        </p>
                        <ul>
                            {cartItemsArray.map((item) => (
                                <div key={item.id} className="flex flex-row text-sm items-center justify-between p-4 w-full">
                                    <div className="flex flex-col text-left">
                                        <h4>{item.name}</h4>
                                        <div className="flex gap-2 text-rose-400">
                                            <p className="text-red-500 font-bold">x{item.quantity}</p>
                                            <p>@Ksh.{item.price}</p>
                                            <p className="font-bold">Ksh.{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button className="flex" onClick={() => removeFromCart(item.id)}>
                                        <MdOutlineCancel />
                                    </button>
                                </div>
                            ))}
                        </ul>
                        <div className="text-rose-500 flex justify-between p-2 mt-auto">
                            <div>Order Total</div>
                            <div className="font-bold text-rose-900">Ksh.{totalCartPrice.toFixed(2)}</div>
                        </div>
                    </Card>
                    <div className="flex justify-center items-center p-2 bg-rose-100 mt-2 rounded-lg text-xs">
                        <Image
                            src={carbonNeutral}
                            alt="Carbon-neutral image"
                            width={20}
                            height={20}
                            className="mx-2"
                        />
                        <p>This is <span className="font-bold mx-1">carbon-neutral</span> delivery</p>
                    </div>

                    {/* Order Confirmation Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={handleConfirmOrder} className="bg-red-500 flex text-white mx-auto w-full text-center justify-center py-1 px-7 rounded-full mt-3">
                                Confirm Order
                            </Button>
                        </DialogTrigger>
                        {isModalOpen &&
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <Image
                                    src={confirmOrder}
                                    alt="Order confirmed tick"
                                    height={30}
                                    width={30}
                                />
                                <DialogTitle className="font-bold text-2xl py-1">Order Confirmed</DialogTitle>
                                <DialogDescription className="text-rose-500 py-2">
                                    We hope you enjoy your shopping with Ulinzi Stars!
                                </DialogDescription>
                            </DialogHeader>
                            {cartItemsArray.map((item) => (
                                <div key={item.id} className="flex flex-row text-xs justify-between items-center px-5 py-2 rounded-sm bg-rose-100 mt-0">
                                    <div className="flex">
                                        <Image
                                            src={item.image || '/fallback-image.png'} 
                                            alt={`Image of ${item.name}`}
                                            height={40}
                                            width={40}
                                            className="block mx-1"
                                        />
                                        <div className="flex flex-col justify-around font-bold text-xs mx-2">
                                            <p>{item.name}</p>
                                            <div className="flex">
                                                <p className="text-red-500">x{item.quantity}</p>
                                                <p className="text-rose-400 font-normal px-2">@Ksh{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Ksh{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="text-rose-500 flex justify-between p-2 mt-auto">
                                <div>Order Total</div>
                                <div className="font-bold text-rose-900">Ksh.{totalCartPrice.toFixed(2)}</div>
                            </div>
                            <DialogFooter className="py-4">
                                    <Button onClick={handleClick } className="bg-red-500 flex text-white mx-auto w-full text-center justify-center py-1 px-7 rounded-full mt-3">
                                    Start New Order
                                </Button>
                            </DialogFooter>
                            </DialogContent>
                        }
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default Cart;

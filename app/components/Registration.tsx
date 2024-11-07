"use client";
import { UserCircleIcon } from "@heroicons/react/24/outline";


import Link from "next/link";
export default function Registration() {
    return (
        <div className="font-bold text-blue-900 flex flex-col justify-between items-center gap-2 md:flex md:flex-row">
            <Link href="/login">
                <UserCircleIcon className="size-8 md:text-blue-500 text-white hover:text-red-500" />
            </Link>
        </div>
    )
}
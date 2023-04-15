'use client'
import AddFriendButton from "@/src/components/AddfriendButton";
import { FC } from "react";

interface pageProps {

}

const page: FC<pageProps> =({}) => {
    return (
        <main className="pt-8">
            <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
            <AddFriendButton />
        </main>
    )
}


export default page
import { fetchRedis } from "@/src/helpers/redis"
import { authOptions } from "@/src/lib/auth"
import { addFriendValidator } from "@/src/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import { db } from "@/src/lib/db"
import { z } from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {email: emailToAdd} = addFriendValidator.parse(body.email)

        // const RESTResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user${emailToAdd}`,{
        //     headers: {
        //         Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
        //     },
        //     cache: 'no-store'
        // })

        // const data = (await RESTResponse.json()) as {result: string}

        // const idToAdd = data.result
        const idToAdd = await fetchRedis('get', `user:email${emailToAdd}`) as string
        if(!idToAdd) {
            return new Response('This person does not exist.', {status: 400})
        }
        const session = await getServerSession(authOptions)

        if(!session) {
            return new Response('Unauthorized', {status: 401})
        }

        if(idToAdd === session.user.id){
            return new Response('You cannot add yourselt as a friend', {status: 400})
        }
        // Check if user is adde
        const isAlreadyAdded = (await fetchRedis("sismember", `user:${idToAdd}:incoming_friend_request`, session.user.id)) as 0|1
        if (isAlreadyAdded) {
            return new Response('Already added this user', {status: 400})
        }

        //Check if someone is already a friend
        const isAlreadyFriends= (await fetchRedis("sismember", `user:${session.user.id}: Your friends`, idToAdd)) as 0|1
        if (isAlreadyFriends) {
            return new Response('Already added this user', {status: 400})
        }

        db.sadd(`user: ${idToAdd}:incoming_friend_request`, session.user.id)
        return new Response("OK")
    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response("Invalid request payload", {status: 422})
        }

        return new Response("Invalid Request", {status: 400})
    }
}
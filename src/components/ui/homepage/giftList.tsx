"use client"

import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../../firebase/clientApp"

type Gift = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    amountContributed: number;
    isAvailable: boolean;
  };

export const GiftList =()=>{

    const [gifts,setGifts] =useState<Gift[]>([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchGifts = async()=>{
            try{
                const giftsRef= collection(db,"gifts") 
                const snapshot = await getDocs(giftsRef)
                const giftsData = snapshot.docs.map((doc)=>(
                            {
                                id:doc.id,
                                ...doc.data()
                            }
                ))as Gift[];
                setGifts(giftsData)
                console.log(gifts);
                
            }catch(error){
                console.error("Error fetching Gifts",error);
                
            }finally{
                setIsLoading(false)
        }
    }


        fetchGifts();
    },[]);
    return(
        <>
        <div className="">
            {gifts.map((gift,index)=>(
                <h1 key={index}>{gift.name}</h1>
            ))}
        </div>
        </>
    )
}
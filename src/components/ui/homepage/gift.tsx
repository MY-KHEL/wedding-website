"use client"

import { Button } from "../button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle,
} from "../dialog"
import { GiftForm } from "../PayStack/form"
import { GiftContributeForm } from "../PayStack/contributeForm"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../../firebase/clientApp"
import { Progress } from "@/components/ui/progress"


type Gift = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  amountContributed: number;
  isAvailable: boolean;
};


export const GiftSection = () => {

  const [gifts, setGifts] = useState<Gift[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const giftsRef = collection(db, "gifts")
        const snapshot = await getDocs(giftsRef)
        const giftsData = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }
        )) as Gift[];
        setGifts(giftsData)
        console.log(gifts);

      } catch (error) {
        console.error("Error fetching Gifts", error);

      } finally {
        setIsLoading(false)
      }
    }


    fetchGifts();
  }, []);

  return (
    <div className="md:px-20 my-10" >
      <h1 className="text-3xl  text-center font-semibold mb-4 ">Gift Us </h1>
      <div className="grid md:grid-cols-4 gap-8">
        {gifts.map((item) => (
          <div className="col-span-1" key={item.id}>
            <Card className="pb-2 h-[450px]">
              <CardContent>
                <div className="bg-black/70  my-2 h-[300px] w-full p-0"></div>
                <div className=" flex justify-between items-center">
                  <div className="">
                    <h1 className="text-sm">{item.name}</h1>
                    {item.price === 0 ? "Already Given" : <p>₦{item.price.toLocaleString()}</p>}
                  </div>
                  <Progress value={33} className="w-1/2" />

                </div>



              </CardContent>
              {item.price !== 0 &&
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger>
                      Pay All
                    </DialogTrigger>
                    <DialogContent className='bg-white p-2'>
                      <DialogHeader>
                        <DialogTitle className="text-black md:text-2xl p-3 w-3/4 mx-auto">
                          Joy is found through giving to others, not by what you receive.
                        </DialogTitle>

                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  {/* Contribute Form */}
                  <Dialog>
                    <DialogTrigger className="bg-yellow-400 p-2 rounded">
                      Contribute
                    </DialogTrigger>
                    <DialogContent className='bg-white p-2'>
                      <DialogHeader>
                        <DialogTitle className="text-black  text-center md:text-2xl p-3 w-3/4 mx-auto">
                          Joy is found through giving to others, not by what you receive.
                        </DialogTitle>

                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                </CardFooter>}
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

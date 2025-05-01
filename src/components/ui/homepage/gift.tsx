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

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"
import { fetchGifts } from "@/services/giftServices"


type Gift = {
  id: string;
  name: string;
  price: number;
  image: string;
  contributed_amount: number;
  is_available: boolean;
};


export const GiftSection = () => {

  const [gifts, setGifts] = useState<Gift[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      const load =async ()=>{
            const data = await fetchGifts()
            setGifts(data);
            
      }
      load()
      

    
  }, []);

  return (
    <div className=" px-6 md:px-6 lg:px-20 my-10" >
      <h1 className="text-3xl  text-center font-semibold mb-4 ">Gift Us </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {gifts.map((item) => (
          <div className="col-span-1" key={item.id}>
            <Card className="pb-2 h-min-[450px]">
              <CardContent>
                <div className="bg-black/70  my-2 h-[300px] w-full p-0"></div>
                <div className=" flex justify-between items-center">
                  <div className="">
                    <h1 className="text-sm">{item.name}</h1>
                    {item.price === 0 ? "Already Given" : <p>₦{(item.price-item.contributed_amount).toLocaleString()}</p>}
                  </div>
                  <Progress value={(item.contributed_amount/item.price)*100} className="w-1/2" />

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
                          <GiftForm amount={item.price} giftId={item.id} initialContributedAmount={item.contributed_amount}/>
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
                    
                        <GiftContributeForm amount={0} giftId={item.id} />
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

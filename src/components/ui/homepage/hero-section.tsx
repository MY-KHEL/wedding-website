"use client"



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel"
import { difference } from "next/dist/build/utils"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [days,setDays] =useState(0)
  const [minutes,setMinutes] =useState(0)
  const [hours,setHours] =useState(0)
  const [seconds,setSeconds] =useState(0)


  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  
useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(()=>{
    const target = new Date("2025-05-25T23:59:59")
    const interval = setInterval(()=>{
      const now = new Date()

      const timeDifference = target.getTime() - now.getTime()

      const day = Math.floor(timeDifference /(1000*60*60*24))

      const hour = Math.floor((timeDifference % (1000*60*60*24))/(1000*60*60))

      const minute
      
       = Math.floor((timeDifference % (1000*60*60))/(1000*60))
      const second = Math.floor((timeDifference % (1000*60)) / (1000))
   
      setDays(day)
      setHours(hour)
      setMinutes(minute)
      setSeconds(second)
    
    },1000)

    return (()=>clearInterval(interval))
  },[])
  
  return (
    <div className="mx-auto  " >
      <Carousel setApi={setApi} className="w-full  ">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-screen  bg-black/90  ">
                <div className="flex justify-center items-center  " >
                  <div className="mt-50">

                  <h1 className="text-white text-2xl md:text-5xl lg:text-7xl font-semibold">{days} : {hours} : {minutes} : {seconds}</h1>
                  </div>
                </div>

              </div>



            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>


    </div>
  )
}

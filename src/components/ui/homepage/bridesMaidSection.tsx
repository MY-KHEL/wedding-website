"use client"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../carousel"


export const BridesMaidSection = () => {
    const [open, setOpen] = useState(false)
    const [initialSlide, setInitialSlide] = useState(0)


    const images = [
        {
            set: 1

        },
        {
            set: 2
        },
        {
            set: 3
        },
        {
            set: 4
        },
  
    ]
    const handleImage = (index: number) => {
        setInitialSlide(index)
        setOpen(true)
    }
    return (
        <>
            <div className=" px-2 md:px-20 my-4 mt-16" >
            <div className="text-center text-md">
                <h1 className="text-5xl text-bold my-4 font-style">BridesMaid Section</h1>
                <p className="mt-6 leading-7 mb-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nam odit ut ipsam maxime praesentium minima, dolorem distinctio tempore, odio consequatur reprehenderit dolor quod incidunt repudiandae cumque eius veritatis voluptates quis? Commodi at autem illum id deserunt quo minima deleniti doloribus cum quas nulla voluptatem soluta quia quibusdam libero aut totam itaque molestias, tempora dolorum hic nihil omnis aperiam? Optio facilis dolores corrupti, sapiente minima eveniet cumque in et nesciunt.</p>

               </div>
                <div className="grid md:grid-cols-4 gap-2 mt-16">
                    {images.map((item, i) => (
                        <div className=" w-full h-75 bg-purple-400 rounded-2xl cursor-pointer" key={i} onClick={() => { handleImage(i) }}>
                            <h1 className="text-lg text-white flex justify-center items-center ">{item.set}</h1>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen} >
  
  <DialogContent className="text-white border border-none p-0 pt-6" >
    <DialogHeader >
      <DialogTitle ></DialogTitle>
      
    </DialogHeader>
    <Carousel
            opts={{ startIndex: initialSlide, loop: true }}
            className="relative w-full"
          >
            <CarouselContent>
              {images.map((item, i) => (
                <CarouselItem key={i} className="flex justify-center items-center">
                   <div className=" w-full h-[300px] bg-black/60 rounded-2xl cursor-pointer" >
                            <h1 className="text-lg text-white flex justify-center items-center ">{item.set}</h1>
                        </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious
             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full" />
          </Carousel>
  </DialogContent>
</Dialog>


        </>
    )
}
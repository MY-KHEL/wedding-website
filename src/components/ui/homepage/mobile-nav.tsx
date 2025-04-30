
"use client"



import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer"
import Link from "next/link"

const mobileLinks = [
  {
    title:'Another thing',
    url:'#'
  },
  {
    title:'Somehing Else',
    url:'#'
  },
  {
    title:'Documentation',
    url:'#'
  },
  {
    title:'About',
    url:'#'
  },
 
]

export function MobileNav() {
  

  return (
    <div className="md:hidden">
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full  max-w-sm">
          
          <div className="p-4">
            <div className=" p-2">
            {mobileLinks.map((link)=>(
                <Link href={link.url} className="block font-semibold text-lg py-2" key={link.title}> {link.title} </Link>
            ))}
                
            </div>
           
          </div>
         
        </div>
      </DrawerContent>
    </Drawer>
    </div>
  )
}


"use client"



import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer"
import { Menu } from "lucide-react"
import Link from "next/link"

const components: { title: string; href: string }[] = [
  { title: "HOME", href: "#home" },
  { title: "WHERE AND WHEN", href: "#where-when" },
  { title: "COUPLE", href: "#couple" },
  { title: "GALLERY", href: "#gallery" },
  { title: "EVENTS", href: "#events" },
  { title: "BRIDESMAID", href: "#brides-maid" },
  { title: "GROOMSMEN", href: "#grooms-men" },
  { title: "GIFT", href: "#gifting" },
  { title: "RSVP", href: "#rsvp" },
]

export function MobileNav() {
  

  return (
    <div className="lg:hidden">
    <Drawer>
      <DrawerTrigger asChild>
       <Menu color="black" size={30} />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full  max-w-sm">
          
          <div className="p-4">
            <div className=" p-2">
            {components.map((link)=>(
                <Link href={link.href} className="block  text-lg py-2 " key={link.title}> {link.title} </Link>
            ))}
                
            </div>
           
          </div>
         
        </div>
      </DrawerContent>
    </Drawer>
    </div>
  )
}

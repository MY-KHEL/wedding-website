"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

// Define all your sections
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

export function NavBar() {
  const [activeSection, setActiveSection] = useState<string>("")

  const handleScroll = () => {
    let currentSection = ""
    
    // Check the scroll position and find the section in view
    components.forEach((item) => {
      const section = document.querySelector(item.href)
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = item.href
        }
      }
    })
    
    setActiveSection(currentSection)
  }

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="hidden lg:block">
      <NavigationMenu className="w-full bg-white py-2">
        <NavigationMenuList>
          {components.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                href={item.href}
                className={cn(
                  "text-purple-900/90 hover:text-purple-950 text-sm font-medium px-4 py-2 transition-colors",
                  activeSection === item.href ? "bg-yellow-300" : ""
                )}
              >
                {item.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

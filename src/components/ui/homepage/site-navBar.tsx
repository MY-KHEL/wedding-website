import { MobileNav } from "./mobile-nav"
import { NavBar } from "./navbar"

export const NavigationBar = ()=>{
    return(
        <>
        <div className="w-full shadow-sm sticky top-0 z-60 bg-white p-2 lg:p-0 ">
            <NavBar/>
            <MobileNav/>
        </div>
        </>
    )
}
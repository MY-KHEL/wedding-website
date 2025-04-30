import { Button } from "../button"

export const WhereWhen = () => {
    return (
        <>
            <section className="md:px-[80px] mb-10 p-4 md:mt-16 " >
               <div className="text-center text-md">
                <h1 className="text-4xl text-bold my-4 ">Where and When</h1>
                <p className="mt-6 leading-7">The ceremony will be held on Saturday, April 19 & 20, 2025 at Manalia Tower Floor 24 Room 256, Anfix Street ST01. It will start at Five O'Clock in the evenings. A celebration with dinner and dancing will follow at Forine Restaurant, Rose Street ST08. Check the map to get the direction. We have arranged accommodations at a nearby comfort inn for guests who are making a bit of a trip. Check for accomodations.</p>

                <Button size={'lg'} className="text-black mt-4 w-[250px] py-4 text-lg font-semibold "> RSVP</Button>
               </div>

               
            </section>
        </>
    )
}
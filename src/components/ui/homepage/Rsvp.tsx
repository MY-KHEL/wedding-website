"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "first name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "last name must be at least 2 characters.",
    }),
    event: z.string(),
})

export const RSVP = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            event:""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }



    return (
        <>
            <div className="lg:px-[120px] p-4" >
                <div className="text-center">
                    <h1 className="text-2xl font-semibold ">RSVP</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam magna ligula, aliquam nec auctor at, ultrices sollicitudin neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam aliquet sapien et tellus euismod faucibus. Vestibulum vitae hendrerit nisi, nec semper mi.</p>
                </div>

                <div className="md:w-[500px] mt-4 mx-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="firstName"
                              
                                render={({ field }) => (
                                    <FormItem className="m-0 p-0">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="FirstName" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                         
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem className="p-0 w-full">
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Wedding Day">Wedding Day</SelectItem>
                  <SelectItem value="Ceremony Day">Ceremony Day</SelectItem>
                  <SelectItem value="The Party">The Party</SelectItem>
                </SelectContent>
              </Select>
             
         
            </FormItem>
          )}
        />                      <div className="mx-auto md:w-[150px]">
                            <Button type="submit" size={'sm'} className="text-sm font-normal mx-auto w-full text-center">I'm Attending</Button></div>
                        </form>
                    </Form>

                </div>
            </div>
        </>
    )
}
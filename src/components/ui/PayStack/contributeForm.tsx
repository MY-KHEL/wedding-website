"use client"
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
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
import { Input } from "@/components/ui/input"


type GiftFormProps = {
  amount: number
  
}

export const GiftContributeForm =({ amount }: GiftFormProps)=>{
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    
    const formSchema = z.object({
        firstName : z.string().min(2,'First Name must be at least two characters'),
        lastName: z.string().min(2,'Last name must be at least two characters'),
        amount: z.coerce.number(),
        email:z.string().email('Enter a valid Email Address')
    })
    type FormData =z.infer<typeof formSchema>
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          email:"",
          lastName:"",
          amount:0
        },
      })
    
      function onSubmit(values: FormData) {
        if (!publicKey) {
            console.error("Paystack public key not set");
           
          }
        
          const handler = (window as any).PaystackPop.setup({
            key: publicKey,
            email:values.email,
            amount: values.amount * 100,
            currency: "NGN",
       
            callback: function (response: any) {
              alert("Payment complete! Reference: " + response.reference);
          
              const balance = (amount-values.amount )
              
              console.log(amount,values.amount)
            },
            onClose: function () {
              alert("Transaction was not completed, window closed.");
            },
            onError:function(){
                alert('Error , could not send funds')
            }
          });



        
          handler.openIframe();
     
      
      }
    return(
        <>

        <div className=" mt-4 px-3 z-50">

        <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
           
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
                <Input placeholder="Doe" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="JohnDoe@gmail.com" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type='number' placeholder="Amount" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className='bg-green-700 w-full text-white p-3 text-md'>Pay</button>
      </form>
    </Form>
        </div>
        </>
    )
}
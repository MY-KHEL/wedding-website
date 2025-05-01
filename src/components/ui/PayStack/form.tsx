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
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'


type GiftFormProps = {
  amount: number,
  giftId: string
  initialContributedAmount: number
 
}

export const GiftForm =({ amount,giftId,initialContributedAmount}: GiftFormProps)=>{
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
          amount:amount
        },
      })
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      function onSubmit(values: FormData) {
        if (!publicKey) {
          console.error("Paystack public key not set");
          return;
        }
      
        if (!(window as any).PaystackPop) {
          alert("Payment system not loaded yet, please wait.");
          return;
        }
      
        // Define an async function separately
        const handlePaymentSuccess = async (response: any) => {
          try {
            const res = await fetch("/api/verify-payment", {
              method: "POST",
              body: JSON.stringify({ reference: response.reference }),
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            const data = await res.json();
      
            if (data.status === "success") {
              // Ensure amount, initialContributedAmount, and giftId are accessible here
              const { error } = await supabase
                .from("gifts")
                .update({
                  contributed_amount: amount + initialContributedAmount,
                })
                .eq("id", giftId);
      
              if (error) {
                console.error("Supabase update error:", error.message);
              } else {
                alert("Contribution recorded successfully!");
              }
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("An error occurred during verification");
          }
        };
      
        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email: values.email,
          amount: values.amount * 100,
          currency: "NGN",
          callback: function (response: any) {
            // ✅ Call the async function
            handlePaymentSuccess(response);
          },
          onClose: function () {
            alert("Transaction was not completed, window closed.");
          },
        });
      
        handler.openIframe();
      }
      
    return(
        <>

        <div className=" mt-4 px-3 z-50">

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form {...form} >
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
    </Form>
      </form>
        </div>
        </>
    )
}
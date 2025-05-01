import { supabase } from "@/lib/supabaseClient";

export const fetchGifts = async ()=>{
    const {data,error} = await supabase.from('gifts').select('*').order('created_at',{ascending:true})

    if (error){
        console.error('Fetch Error',error);
        return[]
        
    }
    else{
        return data
    }
}
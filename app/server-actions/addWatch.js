'use server';
import { createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addWatch(formData){
  const model = formData.get('model');
  const brand = formData.get('brand');
  const referenceNumber = formData.get('referenceNumber');

  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  if (!user){
    console.log('User is not authenticated');
    return;
  }
  
  const {data, error} = await supabase
    .from('watches')
    .insert([
      {
        model,
        brand,
        reference_number: referenceNumber,
        user_id: user.id
      }
    ])

  if (error){
    console.log('Error adding watch',error);
    return;
  }

  revalidatePath('/watch-list');

  return {message:'Success'};
}
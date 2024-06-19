'use client';

import {Auth} from '@supabase/auth-ui-react';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';


// Create magci_link for login.
export default function AuthForm(){
  const supabase = createClientComponentClient();
  return (
    <Auth
      supabaseClient={supabase}
      view="sign_up"
      showLinks={false}
      providers={[]}
      redirectTo='http://localhost:3000/auth/callback'
      appearance={{
        theme: 'dark',
        button:{
          className: 'bg-white-400 text-gray-900 hover:bg-gray-600'
        },
        inputs:{
          className: 'bg-gray-700 border-gray-600 text-white'
        }
        
      }}
    />
  )
}

'use client';

import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {

    const path = usePathname();
    const {user ,isSignedIn } = useUser();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() =>{
        console.log(path);
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    } ,[])



  return (

    <div className={`p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 transition-all duration-300 ${scrolled ? 'h-24' : 'h-32'} bg-white`}>
        <div className='flex gap-12 items-center'>
        <Image 
        src={'/logo.svg'} width={150} height={150} alt='logo image'
        />

        <ul className='hidden md:flex gap-10 items-center'>
         <Link href={'/'} >  <li className={`'hover:text-primary font-medium text-sm cursor-pointer ' ${ path == '/' && 'text-primary'}`}>For Sale </li>
         </Link> 
            <li className='hover:text-primary font-medium text-sm cursor-pointer ' > For Agent</li>
            <li className='hover:text-primary font-medium text-sm cursor-pointer ' >Agent Finder </li>
        </ul>
        </div>
        <div className="flex items-center gap-5">
          <Link href='/add-new-listing'>   
  <Button className="flex items-center gap-2">
    <Plus className="h-5 w-5" />
    Post Your Ad
  </Button>
          </Link>

  {isSignedIn ? (
        <UserButton />
  ) : (
    <Link href='/sign-in'>
    <Button variant="outline" className="font-bold">
      Login
    </Button>
    </Link>
  )}
</div>
    </div>
  )
}

export default Header
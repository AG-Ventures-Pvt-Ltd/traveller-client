'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Input, InputAdornment, Box } from '@mui/material'
import Button from '@/common/components/atoms/Button'
import { MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  return (
    <div className='flex justify-between w-full mt-28 overflow-hidden'>
      <div className='flex flex-col gap-4 min-w-0'>
        <div className='flex gap-4 items-end -translate-x-16'>
          <Image
            src='/png/p1.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-32 h-32 object-cover rounded-lg'
          />
          <Image
            src='/png/p5.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-24 h-24 object-cover rounded-lg'
          />
          <Image
            src='/png/p2.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-16 h-16 object-cover rounded-lg'
          />
        </div>
        <div className='flex gap-4 items-start -translate-x-6'>
          <Image src='/png/p3.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-36 h-36 object-cover rounded-lg'
          />
          <Image src='/png/p4.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-24 h-24 object-cover rounded-lg'
          />
        </div>
      </div>
      <div className='flex flex-col items-center gap-8 w-[50%] min-w-0'>
        <h1 className='text-6xl font-bold leading-tight'>
          Where To ?
        </h1>
        <div className='flex gap-3 mb-2'>
          {['Manali','Kullu','Coorg','Mysuru'].map((i) => <div className='bg-black text-white rounded-4xl px-3 py-2 flex gap-1 items-center' key={i}><MapPin size={20}/>{i}</div>)}
        </div>
        <Box className="relative bg-[#F7F7F7] rounded-lg w-[90%]">
          <Input
            placeholder="Places to go, things to do"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-1 border-[#DBDBDB] rounded-lg px-2 py-2 !pr-24 w-full"
            disableUnderline
            sx={{
              '& .MuiInput-input::placeholder': {
                color: 'black',
                opacity: 1,
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src="/svg/searchCustom.svg"
                  alt="search"
                  width={20}
                  height={20}
                  className="ml-2 mr-4"
                />
              </InputAdornment>
            }
          />
          <Button
            className="!absolute !right-1 !top-1 !bottom-1 !rounded-lg !px-4 !py-2 !h-auto !mr-1.5 !my-1.5 !font-light"
            variant="contained"
            color="primary"
            onClick={() => router.push(`/trips?destination=${query}`)}
          >
            Search
          </Button>
        </Box>
      </div>
      <div className='flex flex-col gap-4 min-w-0'>
        <div className='flex gap-4 items-end justify-end translate-x-16'>
          <Image
            src='/png/p1.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-16 h-16 object-cover rounded-lg'
          />
          <Image
            src='/png/p5.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-24 h-24 object-cover rounded-lg'
          />
          <Image
            src='/png/p2.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-32 h-32 object-cover rounded-lg'
          />
        </div>
        <div className='flex gap-4 items-start justify-end translate-x-6'>
          <Image src='/png/p3.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
             className='w-24 h-24 object-cover rounded-lg'
          />
          <Image src='/png/p4.png'
            alt='p1'
            width={0}
            height={0}
            unoptimized
            className='w-36 h-36 object-cover rounded-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
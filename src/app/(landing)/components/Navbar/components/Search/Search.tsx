import React, { useState } from 'react'
import  Button from '@/common/components/atoms/Button'
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Search = () => {

    const [searchItem,setSearchItem] = useState('');

    const router = useRouter();

    const handleSearch = () => {
        router.push(`/search?q=${searchItem}`); 
    }

    return (
        <div className='w-[70%] items-center h-[80%] mt-4 relative'>
            <input
                className='bg-white w-full h-full rounded-4xl px-6 pr-24 focus:outline-0'
                placeholder='Find your next destination' 
                type='text'
                name='query'
                onChange={(e) => setSearchItem(e.target.value)}    
            />
            <Button
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#0064D7] hover:bg-blue-700 text-white rounded-full px-4 py-2 text-base font-semibold shadow flex items-center justify-center h-[80%] w-[20%]'
                aria-label='Search'
                onClick={handleSearch}
            >
                <ArrowRight size={22} />
            </Button>
        </div>
    )
}

export default Search
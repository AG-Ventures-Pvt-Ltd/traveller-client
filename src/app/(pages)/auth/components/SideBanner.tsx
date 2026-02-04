import Image from 'next/image';

export default function SideBanner() {
  return (
    <div className='hidden md:flex md:items-center md:justify-center h-screen relative'>
      <div className='absolute w-full flex flex-col items-center bottom-6 z-10 px-12'>
        <p className=' text-white text-[40px] w-full text-justify'>Explore the best places</p>
        <p className='text-white text-sm mb-6 text-justify'>Wondrr is India&apos;s one of first marketplace connecting group trip providers with travelers hassle-free.</p>
        <p className='w-full text-white text-end font-bold'>Wondrr</p>
      </div>
      <Image
        src='/png/AuthBG.png'
        alt='Authentication Background'
        fill
        className='object-cover'
        quality={90}
      />
    </div>
  );
}
import Image from 'next/image';

export default function SideBanner() {
  return (
    <div className='hidden md:flex md:items-center md:justify-center h-screen relative'>
      <div className='absolute w-full flex flex-col items-center bottom-6 z-10 px-12'>
        <p className=' text-white text-[40px] w-full text-justify'>Explore the best places</p>
        <p className='text-white text-sm mb-6 text-justify'>Lorem ipsum dolor sit amet pisum asyum de ret Lorem ipsum dolor sit amet pisum asyum de ret Lorem ipsum dolor sit amet pisum asyum de ret</p>
        <p className='w-full text-white text-end font-bold'>Wondrr</p>
      </div>
      <Image
        src='/png/AuthBG.png'
        alt='Authentication Background'
        fill
        className='object-cover'
        unoptimized={true}
      />
    </div>
  );
}
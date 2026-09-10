'use client';

import React from 'react';
import Image from 'next/image';

interface RecognitionSectionProps {
  variant?: 'desktop' | 'mobile';
}

const LOGOS = [
  { src: '/assets/aws_startups.png', alt: 'AWS Activate for Startups', width: 538, height: 141 },
  { src: '/assets/notion_startups.svg', alt: 'Notion for Startups', width: 160, height: 40 },
];

const RecognitionSection: React.FC<RecognitionSectionProps> = ({ variant = 'desktop' }) => {
  const compact = variant === 'mobile';

  return (
    <section className={compact ? 'w-full px-4 py-10' : 'w-full px-24 py-16'}>
      <div className={`flex flex-col items-center ${compact ? 'gap-6' : 'gap-10'}`}>
        <p className={`font-semibold uppercase tracking-wide text-neutral-600 ${compact ? 'text-sm' : 'text-md'}`}>
          Recognized by
        </p>
        <div className={`flex flex-wrap items-center justify-center ${compact ? 'gap-8' : 'gap-16'}`}>
          {LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              quality={90}
              className={compact ? 'h-10 w-auto' : 'h-12 w-auto'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;

'use client';

import { WhatsappLogoIcon } from '@phosphor-icons/react';

const WHATSAPP_PHONE_NUMBER = '919667427187';
const WHATSAPP_MESSAGE = "Hi Wondrr, I'd like some help.";

export default function WhatsAppButton() {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-neutral-900 bg-[#075E54] px-5 py-3.5 text-base font-semibold text-white shadow-[6px_6px_0_0_#111] transition-transform hover:-translate-y-0.5"
    >
      <WhatsappLogoIcon size={22} weight="fill" />
      Chat on WhatsApp
    </button>
  );
}

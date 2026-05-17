'use client';

import { WhatsappLogoIcon } from '@phosphor-icons/react';
import { useCallback } from 'react';


interface WhatsAppButton {
    tripTitle : string
    tripSlug : string
}
// WhatsApp Configuration
const WHATSAPP_PHONE_NUMBER = '919667427187'; // WhatsApp Business Number (country code + number, no + or spaces)

const generateWhatsAppMessage = ({tripTitle, tripSlug }: WhatsAppButton): string => {

    return `https://wondrr.in/trip/${tripSlug}\n\n Hi, I want to book the "${tripTitle}" trip. \nPlease help me confirm my spot.`;
};

interface WhatsAppButtonProps {
    tripTitle: string;
    tripSlug : string;
    className?: string;
}

export default function WhatsAppButton({
    tripTitle,
    tripSlug ,
    className = '',
}: WhatsAppButtonProps) {

    const handleWhatsAppClick = useCallback(() => {
        const message = generateWhatsAppMessage({tripTitle, tripSlug });
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in a new window
        if (typeof window !== 'undefined') {
            window.open(whatsappUrl, '_blank');
        }
    }, [tripTitle, tripSlug]);

    return (
        <button
            onClick={handleWhatsAppClick}
            className={`
        fixed right-4 flex items-center justify-center
        w-16 h-16 rounded-full
        bg-[#25D366] hover:bg-[#20ba5a] active:scale-95
        transition-all duration-200 ease-out
        shadow-lg hover:shadow-xl
        z-40
        ${className}
      `}
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
        >
            <WhatsappLogoIcon size={44} weight='regular' color="white"/>
        </button>
    );
}

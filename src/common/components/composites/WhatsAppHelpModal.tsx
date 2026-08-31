import MobileModal from '@/common/ui/MobileModal';
import Button from '@/common/components/atoms/Button';
import { WhatsappLogoIcon } from '@phosphor-icons/react';

const WHATSAPP_PHONE_NUMBER = '919667427187';

interface WhatsAppHelpModalProps {
  open: boolean;
  onClose: () => void;
  tripTitle: string;
  tripSlug: string;
}

export default function WhatsAppHelpModal({ open, onClose, tripTitle, tripSlug }: WhatsAppHelpModalProps) {
  const handleChat = () => {
    const msg = `https://wondrr.in/trip/${tripSlug}?utm_location=modal\n\n Hi, I want to book the "${tripTitle}" trip. \nPlease help me confirm my spot.`;
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <MobileModal isOpen={open} onClose={onClose} title="Need a hand?">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#075E54] flex items-center justify-center mx-auto mb-4">
          <WhatsappLogoIcon weight="fill" size={30} color="white" />
        </div>
        <p className="text-sm text-neutral-600 mb-5">
          Still deciding on <span className="font-semibold text-neutral-900">{tripTitle}</span>? Our trip experts can help you answer all your queries and lock your spot.
        </p>
        <Button
          onClick={handleChat}
          fullWidth
          startIcon={<WhatsappLogoIcon weight="fill" size={20} />}
          className="!bg-[#075E54] hover:!bg-[#20ba5a] !text-white !rounded-xl font-semibold"
        >
          Chat with a Trip Expert
        </Button>
        <button onClick={onClose} className="w-full text-center text-sm text-neutral-500 mt-3 py-1">
          Maybe later
        </button>
      </div>
    </MobileModal>
  );
}

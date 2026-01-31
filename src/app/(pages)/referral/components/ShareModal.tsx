'use client';

import React from 'react';

interface ShareModalProps {
    referralCode: string;
    isOpen: boolean;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ referralCode, isOpen, onClose }) => {
    const handleShare = (platform: string) => {
        const message = `Join me on Wondrr and use my referral code ${referralCode} to get 100% off on convenience fee when booking a trip!`;
        const url = `https://www.wondrr.in`;

        switch (platform) {
            case 'whatsapp':
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`,
                    '_blank'
                );
                break;
            case 'twitter':
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
                    '_blank'
                );
                break;
            case 'facebook':
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    '_blank'
                );
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent('Book now on Wondrr with my referral code')}&body=${encodeURIComponent(message + '\n' + url)}`;
                break;
            default:
                break;
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-neutral-900 text-2xl font-bold font-['Satoshi'] leading-8 mb-6">
                    Share your referral code
                </h3>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => handleShare('whatsapp')}
                        className="bg-[#25D366] text-white rounded-xl px-6 py-4 font-bold hover:bg-[#20ba5a] transition-colors"
                    >
                        Share on WhatsApp
                    </button>
                    <button
                        onClick={() => handleShare('facebook')}
                        className="bg-[#1877F2] text-white rounded-xl px-6 py-4 font-bold hover:bg-[#166FE5] transition-colors"
                    >
                        Share on Facebook
                    </button>
                    <button
                        onClick={() => handleShare('twitter')}
                        className="bg-[#1DA1F2] text-white rounded-xl px-6 py-4 font-bold hover:bg-[#1a91da] transition-colors"
                    >
                        Share on Twitter
                    </button>
                    <button
                        onClick={() => handleShare('email')}
                        className="bg-neutral-900 text-white rounded-xl px-6 py-4 font-bold hover:bg-neutral-800 transition-colors"
                    >
                        Share via Email
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-neutral-100 text-neutral-900 rounded-xl px-6 py-4 font-bold hover:bg-neutral-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;

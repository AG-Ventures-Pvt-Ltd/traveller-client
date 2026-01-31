import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refer & Win - Earn Rewards by Referring Friends',
    description: 'Invite your friends to join our group travel community and earn exclusive rewards! Share your referral code and get free trip on 8 successfull referrals. Start referring today and unlock amazing trips.',
    keywords: 'travel referral program, refer and earn, travel rewards, referral code, invite friends, earn rewards, travel benefits, referral bonuses',
    openGraph: {
        title: 'Refer & Win - Earn Rewards by Referring Friends',
        description: 'Share your referral code with friends and win free trips. Join our referral program today!',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Refer & Win - Earn Rewards by Referring Friends',
        description: 'Share your referral code with friends and earn exclusive travel rewards. Join our referral program today!',
    },
};

export default function ReferralLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

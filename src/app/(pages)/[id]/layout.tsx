import { Metadata } from "next";
import { getServerData } from "@/services/serverApi";

interface HostMeta {
    fullName: string;
    bio?: string;
    website?: string;
    totalTrips : number;
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {

    const { id } = await params;

    let fullName = id;
    let bio: string | undefined;
    let website: string | undefined;
    let totalTrips: number | undefined;

    try {
        const meta = await getServerData<HostMeta>(`/v1/user/host/meta/${id}`);
        fullName = meta.fullName || id;
        bio = meta.bio;
        website = meta.website;
        totalTrips = meta.totalTrips;
    } catch {
        // fallback to id-based defaults
    }

    const title = `${fullName} - Verified Trips & Adventures | Wondrr`;
    const generatedDescription = `${fullName} is a verified travel partner on Wondrr ${totalTrips ? ` with ${totalTrips}+ trips` : ''} across India. Browse and book directly.`;

    return {
        title,
        description : generatedDescription,
        openGraph: {
            title,
            description : generatedDescription,
        },
        alternates: {
            canonical: `https://wondrr.in/${id}`,
        },
        other: {
            'script:ld+json': JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TravelAgency",
                "name": fullName,
                "url": `https://wondrr.in/${id}`,
                 ...(bio && { "description": bio }),
                "sameAs": [website].filter(Boolean),
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN"
                }
            })
        }
    };
}

export default function Layout({ children }: LayoutProps) {
    return children;
}

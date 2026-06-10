import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getServerData } from "@/services/serverApi";
import { JsonLd } from "@/common/seo/JsonLd";

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

// Fetch host metadata; returns null when the slug is not a real host so the
// route can 404 instead of soft-200ing junk slugs (e.g. /llms.txt, /hdscjhdsch).
const fetchHostMeta = cache(async (id: string): Promise<HostMeta | null> => {
    try {
        return await getServerData<HostMeta>(`/api/client/v1/user/host/meta/${id}`);
    } catch {
        return null;
    }
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {

    const { id } = await params;

    const meta = await fetchHostMeta(id);

    // 404 unknown host slugs here (in generateMetadata) so the status is set
    // before the response shell streams — calling notFound() during render
    // would otherwise leave a soft 200.
    if (!meta || !meta.fullName) {
        notFound();
    }

    const fullName = meta.fullName;
    const totalTrips = meta.totalTrips;

    const title = `${fullName} - Verified Trips & Adventures | Wondrr`;
    const generatedDescription = `${fullName} is a verified travel partner on Wondrr${totalTrips ? ` with ${totalTrips}+ trips` : ''} across India. Browse and book directly.`;

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
    };
}

export default async function Layout({ children, params }: LayoutProps) {
    const { id } = await params;

    const meta = await fetchHostMeta(id);

    // Unknown slug → real 404 (no more soft-200 partner pages for junk slugs).
    if (!meta || !meta.fullName) {
        notFound();
    }

    const hostSchema = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": meta.fullName || id,
        "url": `https://wondrr.in/${id}`,
        ...(meta.bio && { "description": meta.bio }),
        "sameAs": [meta.website].filter(Boolean),
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
        },
    };

    return (
        <>
            <JsonLd data={hostSchema} />
            {children}
        </>
    );
}

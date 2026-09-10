import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHostMeta } from "./serverFetch";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

const resolveAvatar = (avatar?: string) =>
    avatar ? `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${avatar}` : undefined;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {

    // Ids are lowercase-canonical; normalize so meta + canonical match the
    // URL we redirect uppercase variants to (see page.tsx).
    const id = (await params).id.toLowerCase();

    const meta = await getHostMeta(id);

    // 404 unknown hosts here (in generateMetadata) so the status is set before the
    // response shell streams — calling notFound() during render leaves a soft 200.
    if (!meta) {
        notFound();
    }

    const fullName = meta.fullName;
    const totalTrips = meta.totalTrips;
    const avatar = resolveAvatar(meta.avatar);

    const title = `${fullName} - Verified Trips | Wondrr`;
    const generatedDescription = `${fullName} is a verified travel partner on Wondrr${totalTrips ? ` with ${totalTrips}+ trips` : ''} across India. Browse and book directly.`;
    const url = `https://wondrr.in/${id}`;

    // Host pages with no bio are thin content (~35 words). Noindex until content is enriched.
    const isThinContent = !meta?.bio;

    return {
        title,
        description: generatedDescription,
        ...(isThinContent && { robots: { index: false, follow: true } }),
        openGraph: {
            type: 'profile',
            siteName: 'Wondrr',
            url,
            title,
            description: meta?.bio || generatedDescription,
            ...(avatar && {
                images: [{ url: avatar, alt: fullName, width: 1200, height: 630 }],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: generatedDescription,
            ...(avatar && { images: [avatar] }),
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function Layout({ children, params }: LayoutProps) {
    const id = (await params).id.toLowerCase();
    const meta = await getHostMeta(id);

    const fullName = meta?.fullName || id;
    const avatar = resolveAvatar(meta?.avatar);
    const totalTrips = meta?.totalTrips;
    const ssrDescription = `${fullName} is a verified travel partner on Wondrr${totalTrips ? ` with ${totalTrips}+ trips` : ''} across India. Browse and book directly.`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": fullName,
        "url": `https://wondrr.in/${id}`,
        ...(meta?.bio && { "description": meta.bio }),
        ...(avatar && { "image": avatar }),
        "sameAs": [meta?.website].filter(Boolean),
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                // Escape `<` so user-controlled fields (bio/name) can't break out of the script tag (XSS via `</script>`).
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            {/* Server-rendered crawlable heading/intro. The profile UI is client-fetched,
                so this guarantees raw HTML carries the H1 + summary for non-JS crawlers (AI bots). */}
            <h1 className="sr-only">{fullName}</h1>
            <p className="sr-only">{ssrDescription}</p>
            {children}
        </>
    );
}

import { Metadata } from "next";

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

    return {
        title: `${id}'s Trips on Wondrr`,
        description: `Browse and book ${id}'s trips on Wondrr.`,

        openGraph: {
            title: `${id} is on Wondrr`,
            description: `Explore and book ${id}'s trips directly through Wondrr.`,
        },
    };
}

export default function Layout({ children }: LayoutProps) {
    return children;
}

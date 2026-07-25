import { NextRequest, NextResponse } from "next/server";
import { getServerData } from "@/services/serverApi";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

export const dynamic = 'force-dynamic';

const FALLBACK_URL = "https://wondrr.in";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: shortCode } = await params;

    try {
        const { destinationUrl } = await getServerData<{ destinationUrl: string }>(
            API_ENDPOINTS.LINKS.RESOLVE(shortCode)
        );
        return NextResponse.redirect(destinationUrl, 302);
    } catch {
        return NextResponse.redirect(FALLBACK_URL, 302);
    }
}

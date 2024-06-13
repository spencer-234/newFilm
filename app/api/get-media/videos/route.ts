import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/utils/urlConstants";

export const POST = async (request: NextRequest) => {

    const req = await request.json();
    const url = req.type === "tv" ? `${baseUrl}/tv/${req.id}/videos` : `${baseUrl}/movie/${req.id}/videos`

    try {
        const data = await fetch(`${url}?api_key=${process.env.API_KEY}`)
            .then(res => res.json());

        return NextResponse.json({ data: data }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to fetch video results' }, { status: 500 });
    }
}
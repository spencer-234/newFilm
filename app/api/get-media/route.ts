import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const req = await request.json();
    const id: number = req.id;
    const type: string = req.type;

    try {
        const movie = await fetch(`https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos%2Ccredits&language=en-US&api_key=${process.env.API_KEY}`)
            .then(res => res.json());

        return NextResponse.json({ data: movie }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to get movie data' }, { status: 500 });
    }
}
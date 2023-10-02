import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, username, street, city, email } = body;

		const user = await prisma.user.create({
			data: {
				name,
				email,
				username,
				street,
				city,
			},
		});

		return NextResponse.json(user);
	} catch (err: any) {
		console.log(err);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function GET() {
	try {
		const users = await prisma.user.findMany({});

		return NextResponse.json(users);
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}


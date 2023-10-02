import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { NextApiRequest } from "next";

export async function GET(
	req: any,
	{ params }: { params: { id: string } }
) {
	try {
		console.log("params", params);
		const { id } = params;
		const user = await prisma.user.findFirst({
			where: {
				id: id?.toString(),
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.log(error.message);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await req.json();
		const { id } = params;

		const user = await prisma.user.findUnique({
			where: {
				id: id?.toString(),
			},
		});

		if (!user) {
			return new NextResponse("Invalid Id", { status: 400 });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: id?.toString(),
			},
			data: {
				email: body.email || user.email,
				name: body.name || user.name,
				username: body.username || user.username,
				street: body.street || user.street,
				city: body.city || user.city,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.log(error, "error updating the user");
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	try {
		const { id } = params;

        const user = await prisma.user.findUnique({
			where: {
				id: id?.toString(),
			},
		});

		if (!user) {
			return new NextResponse("Invalid Id", { status: 400 });
		}

		const deletedUser = await prisma.user.delete({
			where: {
				id: id?.toString(),
			},
		});

		return NextResponse.json(deletedUser);
	} catch (error: any) {
		console.log(error.message, "error deleting the user");
		return new NextResponse("Internal Error", { status: 500 });
	}
}

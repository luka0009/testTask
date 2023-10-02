"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeftCircle, Loader } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

type Props = {};

const UserPage = (props: Props) => {
	const { user, isLoading } = useAppSelector((state) => state.user);
	const router = useRouter();
	console.log("THE USER: ", user);
	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Loader className="animate-spin mt-10" size={80} />
			</div>
		);
	}

	return (
		<div className="p-[100px] bg-gray-200 h-screen">
			<div className="flex items-center justify-center">
				<Card className={cn("w-[380px]")} {...props}>
					<CardHeader>
						<CardTitle>User Card</CardTitle>
						<CardDescription>User Id: {user?.id}</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="flex items-center space-x-4 rounded-md border p-4 shadow-lg">
							<div className="flex-1 space-y-1">
								<p className="text-md font-semibold">Name: {user?.name}</p>
								<p className="text-md font-semibold">
									Username: {user?.username}
								</p>
								<p className="text-md font-semibold">Email: {user?.email}</p>
								<p className="text-md font-semibold">City: {user?.city}</p>
								<p className="text-md font-semibold">Address: {user?.street}</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full" onClick={() => router.push("/")}>
							<ArrowLeftCircle className="mr-2 h-4 w-4" /> Back to Homepage
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default UserPage;

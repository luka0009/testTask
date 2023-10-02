"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useAppSelector } from "@/store/hooks";
import UserForm from "./user-form";
import { Loader } from "lucide-react";

export function UpdateModal({
	userId,
	isOpen,
	setIsOpen,
}: {
	userId: string;
	isOpen: boolean;
	setIsOpen: any;
}) {
	const { user, isLoading } = useAppSelector((state) => state.user);
	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to user profile here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{isLoading ? (
						<div className="flex items-center justify-center">
							<Loader className="animate-spin text-center" size={35} />
						</div>
					) : (
						<UserForm user={user} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTheUser, setModal } from "@/store/features/userSlice";
import { useToast } from "../ui/use-toast";
import { Loader } from "lucide-react";

const Modal = ({ userId }: { userId: string }) => {
	const { userAlertModal, isLoading } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const { toast } = useToast();
	return (
		<div>
			<Dialog
				open={userAlertModal}
				onOpenChange={() => dispatch(setModal(!userAlertModal))}
			>
				{!open && <DialogTrigger>Open</DialogTrigger>}
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Are you absolutely sure you want to delete this user?
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete the
							user and remove the data from our servers.
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center justify-between">
						<Button onClick={() => dispatch(setModal(false))} variant="ghost">
							Cancel
						</Button>
						<Button
							onClick={() => {
								dispatch(deleteTheUser({ userId }))
									.then(() => {
										toast({
											title: "User Deleted",
										});
									})
									.then(() => dispatch(setModal(false)))
									.catch((err) =>
										toast({
											title: "ERROR DELETING THE USER",
											variant: "destructive",
										})
									);
								if (!isLoading) {
									dispatch(setModal(false));
								}
							}}
							variant="destructive"
						>
							{isLoading ? "Loading" : "Delete"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Modal;

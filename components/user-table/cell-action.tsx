"use client";

import React, { useState } from "react";
import { MyUser } from "./columns";
import { useRouter } from "next/navigation";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import modal from "./modal";
import { useAppDispatch } from "@/store/hooks";
import { fetchUserById, setModal, setUpdateModal } from "@/store/features/userSlice";
import Modal from "./modal";
import { UpdateModal } from "./update-modal";

type Props = {
	data: MyUser;
};

const CellAction = ({ data }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const dispatch = useAppDispatch();
	return (
		<>
			<UpdateModal userId={data.id} isOpen={isOpen} setIsOpen={setIsOpen} />
			<Modal userId={data.id} />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => {
							console.log('dataid:', data.id);
							dispatch(fetchUserById(data.id));
							setIsOpen(true);
						}}
					>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							console.log(data.id);
							dispatch(fetchUserById(data.id));
							dispatch(setModal(true));
						}}
					>
						Delete
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => {
										dispatch(fetchUserById(data.id))
										router.push(`user/${data.id}`)
									}}>
						View user details
					</DropdownMenuItem>{" "}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default CellAction;

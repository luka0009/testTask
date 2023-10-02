"use client";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CellAction from "./cell-action";


export type MyUser = {
	id: string;
	name: string;
	email: string;
	city: string;
};


export const columns: ColumnDef<MyUser>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		header: "Actions",
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original}/>
	},
];

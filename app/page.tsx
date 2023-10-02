"use client";
import { columns, MyUser } from "@/components/user-table/columns";
import {
	fetchUsers,
} from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { DataTable } from "@/components/user-table/data-table";
import { Loader } from "lucide-react";

export default function Home() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const { users, usersIsLoading } = useAppSelector((state) => state.user);

	return (
		<div className="flex flex-col p-[50px] gap-8 items-center justify-center w-full">
			<h1 className="font-bold">Users Table</h1>
			<div className="w-full">
				{usersIsLoading ? (
					<div className="flex items-center justify-center">
						<Loader className="animate-spin mt-10" size={80} />
					</div>
				) : (
					<DataTable columns={columns} data={users} />
				)}
			</div>
		</div>
	);
}

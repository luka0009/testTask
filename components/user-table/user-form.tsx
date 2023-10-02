"use client";

import { user as UserType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { fetchUserById, updateTheUser } from "@/store/features/userSlice";
import { useToast } from "../ui/use-toast";

type Props = {
	user: UserType;
};

const formSchema = z.object({
	username: z.string().min(2).max(50),
	name: z.string().min(2).max(50),
	email: z.string().email(),
	city: z.string().min(2).max(50),
	street: z.string().min(2).max(50),
});

const UserForm = ({ user }: Props) => {
	const dispatch = useAppDispatch();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: user.username,
			name: user.name,
			email: user.email,
			city: user.city,
			street: user.street,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(updateTheUser({ userId: user.id, data: values }))
			.then(() => {
				toast({
					title: "User Updated Succesfully",
				});
			})
			.then(() => {
				dispatch(fetchUserById(user.id));
			})
			.catch((error) => {
				console.error("Update failed:", error);
				toast({
					title: "Updated Failed",
					variant: "destructive",
				});
			});
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder="City" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="street"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input placeholder="street" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center justify-end">
						<Button type="submit" className="">
							Save Changes
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default UserForm;

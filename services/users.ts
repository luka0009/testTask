import { user as UserType } from "@prisma/client";
import axios from "axios";

const url = "api/users";

export const getAllUsers = async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getSingleUser = async (userId: string) => {
	try {
		const response = await axios.get(`${url}/${userId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (userId: string, data: any) => {
	try {
		const response = await axios.patch(`${url}/${userId}`, data);
		if (response.status === 200) {
			return response.data;
		} else {
			console.error("Request failed with status:", response.status);
			return undefined;
		}
	} catch (error) {
		console.error("An error occurred:", error);
		return undefined;
	}
};

export const deleteUser = async (userId: string) => {
	try {
		const response = await axios.delete(`${url}/${userId}`);
		if (response.status === 200) {
			return response.data;
		} else {
			console.error("Request failed with status:", response.status);
			return undefined;
		}
	} catch (error) {
		console.error("An error occurred:", error);
		return undefined;
	}
};

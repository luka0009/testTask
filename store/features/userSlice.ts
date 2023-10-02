import {
	deleteUser,
	getAllUsers,
	getSingleUser,
	updateUser,
} from "@/services/users";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user as UserType } from "@prisma/client";

export const fetchUserById = createAsyncThunk(
	"user/fetchById",
	async (userId: string) => {
		return await getSingleUser(userId);
	}
);

export const fetchUsers = createAsyncThunk("user/fetchAll", async () => {
	return await getAllUsers();
});

export const updateTheUser = createAsyncThunk(
	"updatedUser/fetchAll",
	async ({ userId, data }: { userId: string; data: any }) => {
		await updateUser(userId, data);
		await fetchUserById(userId);
		return await getAllUsers();
	}
);

export const deleteTheUser = createAsyncThunk(
	"deletedUser/fetchAll",
	async ({ userId }: { userId: string }) => {
		await deleteUser(userId);
		return await getAllUsers();
	}
);

interface UserState {
	user: UserType;
	users: UserType[];
	isError: boolean;
	isSuccess: boolean;
	userAlertModal: boolean;
	usersIsLoading: boolean;
	isLoading: boolean;
	message: any;
}

const initialState = {
	user: {} as UserType,
	users: [],
	isError: false,
	isSuccess: false,
	userAlertModal: false,
	usersIsLoading: false,
	isLoading: false,
	message: "",
} as UserState;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setModal: (state, action: PayloadAction<boolean>) => {
			state.userAlertModal = action.payload;
		},
		setUpdateModal: (state, action: PayloadAction<boolean>) => {
			state.userAlertModal = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.user = action.payload;
		});
		builder.addCase(fetchUserById.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
		});
		builder.addCase(fetchUserById.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.usersIsLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.users = action.payload;
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.usersIsLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.payload;
		});
		builder.addCase(fetchUsers.pending, (state, action) => {
			state.usersIsLoading = true;
		});
		builder.addCase(updateTheUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isError = false;
			state.users = action.payload;
		});
		builder.addCase(updateTheUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.payload;
		});
		builder.addCase(updateTheUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deleteTheUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isError = false;
			state.users = action.payload;
		});
		builder.addCase(deleteTheUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.payload;
		});
		builder.addCase(deleteTheUser.pending, (state, action) => {
			state.isLoading = true;
		});
	},
});

export const { setModal, setUpdateModal } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
    selectedChat: string | null;
    receiverUser: any | null;
}

const initialState: ChatState = {
    selectedChat: null,
    receiverUser: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            const { selectedChat, receiverUser } = action.payload;
            state.selectedChat = selectedChat;
            if (receiverUser !== undefined) {
                state.receiverUser = receiverUser;
            }
        },
        clearSelectedChat: (state) => {
            state.selectedChat = null;
            state.receiverUser = null;
        },
    },
});

export const { setSelectedChat, clearSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
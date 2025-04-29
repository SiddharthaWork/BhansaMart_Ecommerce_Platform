import { createSlice } from '@reduxjs/toolkit';

interface EmailProp {
    email: string | null;
}

const initialState: EmailProp = {
    email: null,
}

const emailSlice = createSlice({
    name: 'emailSlice',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { setEmail } = emailSlice.actions;
export default emailSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { AccountInfo } from '../../common/types/account.types';

export interface AccountState {
  info: AccountInfo;
}

const initialState: AccountState = {
  info: {
    id: '1',
    email: 'mihail.sirghi@gmail.com',
    name: 'Mihail',
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
});

export default accountSlice.reducer;

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { LOCAL_DB } from '../..';

const mmkv=new MMKV();
// Define a type for the slice state
interface HomeDataState {
    fullName: string,
    shortName: string,
    systems: any[],
    rooms: any[],
}

// Define the initial state using that type
const initialState = {
    data: {
        "fullName": "Demo Home",
        "shortName": "Home",
        "systems": [],
        "rooms": [
            {
                "fullName": "Demo Room",
                "shortName": "DR",
                "sections": [
                    {
                        "name": "Demo Section",
                        "cameras": [],
                        "devices": []
                    }
                ]
            }
        ],
    },
    error: ""
}
const isValidateData = (data: any): boolean => {
    if (!data.fullName || !data.shortName || !data.systems || !data.rooms) {
        return false;
    }
    return true;
}


export const fetchData = createAsyncThunk('fetchData/fetchAllData',
    async (url: string, thunkApi) => {
        try {

            const result = await axios.get(url);
            if (isValidateData(result.data))
            {
                mmkv.set(LOCAL_DB.DATA,JSON.stringify( result.data));//<<== save into local storage
                return result.data;
            }
            else
                return thunkApi.rejectWithValue('Data invalid. Load demo data.');
        } catch (error) {
            console.log(">>> fetch data error: " + error)
        }
    })
export const fetchDataSlide = createSlice({
    name: 'app_data',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // load data into state
        setData: (state, action: PayloadAction<string>) => {
            // console.log(action.payload);
            state.data =JSON.parse(action.payload);
            state.error="";
            return state;
        },
        resetData:(state)=>{
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
            return state;
        }),
            builder.addCase(fetchData.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    }
})

export const { setData,resetData } = fetchDataSlide.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default fetchDataSlide.reducer
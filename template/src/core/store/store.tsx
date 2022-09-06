import { configureStore } from '@reduxjs/toolkit'
import fetchDataSlideReducer from './slide/fetchDataSlide'
// ...

export const store = configureStore({
  reducer: {
    app_data: fetchDataSlideReducer //<== application data 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
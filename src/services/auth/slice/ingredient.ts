import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const ingredientFromApi = createAsyncThunk(
  'ingredient/ingredientFromApi',
  async () =>  await getIngredientsApi()
);

export type TIngredientState = {
  ingredients: TIngredient[];
  isLoading: Boolean;
};

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredient: (state) => {
      state.isLoading = false;
    },
    addIngredient: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    }
  },
  selectors: {
    getIngredient: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientFromApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ingredientFromApi.rejected, (state) => {
        state.isLoading = false;
        state.ingredients = [];
      })
      .addCase(ingredientFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIsLoading, getIngredient } = ingredientSlice.selectors;
export const { setIngredient, addIngredient } = ingredientSlice.actions;
export const ingredientsReducer = ingredientSlice.reducer;

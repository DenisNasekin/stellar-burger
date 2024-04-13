import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TConstructorItems
} from '@utils-types';

export type TConstructorState = {
  constructorItems: TConstructorItems;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredient: (state, action) => {
      const index = action.payload.index;
      const move = action.payload.move;

      if (move === 'up') {
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index - 1]
        ] = [
          state.constructorItems.ingredients[index - 1],
          state.constructorItems.ingredients[index]
        ];
      } else if (move === 'down') {
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index + 1]
        ] = [
          state.constructorItems.ingredients[index + 1],
          state.constructorItems.ingredients[index]
        ];
      }
    },
    resetConstructor: (state) => (state = initialState)
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;
export const { getConstructor } = constructorSlice.selectors;
export const constructorReducer = constructorSlice.reducer;

import {
  initialState,
  constructorBurger,
  addIngredient,
  removeIngredient,
  ingredientFromApi
} from '../services/slices/ingredient';

const mockData = {
  fulfilled: {
    type: ingredientFromApi.fulfilled.type,
    payload: ['ingredientOne', 'ingredientTwo']
  },
  rejected: {
    type: ingredientFromApi.rejected.type,
    error: { message: 'ERROR' }
  }
};

describe('Проверяем работу constructorBurger.extraReducers', () => {
  it('Проверяем getFeedOrders.pending', () => {
    const res = constructorBurger(
      initialState,
      ingredientFromApi.pending('pending')
    );
    expect(res.isLoading).toBe(true);
  });
  it('Проверяем getFeedOrders.fulfilled', () => {
    const res = constructorBurger(initialState, mockData.fulfilled);
    expect(res.isLoading).toBe(false);
    expect(res.ingredients).toBe(mockData.fulfilled.payload);
  });
  it('Проверяем getFeedOrders.rejected', () => {
    const res = constructorBurger(initialState, mockData.rejected);
    expect(res.isLoading).toBe(false);
    expect(res.error).toBe(mockData.rejected.error.message);
  });
});

describe('Проверяем работу добавления и удаления игредиента', () => {
  const ingredient = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa093e',
    id: '1'
  };
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    ingredients: [],
    isLoading: false,
    error: null
  };
  it('Проверяем добавление ингредиента', () => {
    const newState = constructorBurger(initialState, addIngredient(ingredient));
    expect(newState.constructorItems.ingredients[0]._id).toEqual(
      ingredient._id
    );
  });
  it('Проверяем удаление ингредиента', () => {
    const newState = constructorBurger(
      initialState,
      removeIngredient(ingredient)
    );
    expect(newState.constructorItems.ingredients).not.toContainEqual(
      ingredient
    );
  });
});

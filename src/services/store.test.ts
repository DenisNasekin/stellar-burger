import story, {rootReducer} from './store';

test('Тест работы корневого редьюсера', () => {
    const res = rootReducer(undefined, {type: 'ACTION'});
    expect(res).toEqual(story.getState())
})
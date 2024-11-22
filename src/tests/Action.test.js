import { addRecipe, editRecipe, deleteRecipe, filterByCategory, openModal, closeModal } from "../Action";

test("add recipe action", () => {
    const recipe = {
        id: 1,
        name: "Pasta",
        ingredients: ["flour", "water"],
        instructions: ["Mix ingredients"],
        cuisine: ["Italian"],
        tags: ["easy", "vegetarian"],
    };
    const expectedAction = { type: "ADD_RECIPE", payload: recipe, };
    expect(addRecipe(recipe)).toEqual(expectedAction);
});


test("edit recipe action", () => {
    const recipe = {
        id: 12,
        name: "Pasta",
        ingredients: ["flour", "water"],
        instructions: ["Mix ingredients"],
        cuisine: ["Italian"],
        tags: ["easy", "vegetarian"],
    };
    const expectedAction = { type: "EDIT_RECIPE", payload: recipe, };
    expect(editRecipe(recipe)).toEqual(expectedAction);
});

test("delete recipe action", () => {
    const id = 12;

    const expectedAction = { type: "DELETE_RECIPE", payload: id, };
    expect(deleteRecipe(id)).toEqual(expectedAction);
});

test("filter by category action", () => {
    const category = "Dessert";

    const expectedAction = { type: "FILTER_BY_CATEGORY", payload: category, };
    expect(filterByCategory(category)).toEqual(expectedAction);
});

test("open modal action", () => {
    const recipe = null;

    const expectedAction = { type: "OPEN_MODAL", payload: recipe, };
    expect(openModal(recipe)).toEqual(expectedAction);
});

test("close modal action", () => {

    const expectedAction = { type: "CLOSE_MODAL" };
    expect(closeModal()).toEqual(expectedAction);
});

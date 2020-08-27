import React, { useState, createContext } from "react";

export const RecipesContext = createContext();

// stores the state of React for other components to connect with
export const RecipesContextProvider = props => {
    // [list of recipes, function to call db]
    const [recipes, setRecipes] = useState([]);

    return (
        <RecipesContext.Provider value={{ recipes: recipes, setRecipes }} >
            {props.children}
        </RecipesContext.Provider >
    );
}
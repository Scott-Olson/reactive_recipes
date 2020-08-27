import React, { useEffect, useContext } from 'react';
import RecipeFinder from "../APIs/RecipeFinder";
import { RecipesContext } from '../context/RecipesContext';


const RecipeList = (props) => {
    // desctructuring the useContext of RecipeContext
    const { recipes, setRecipes } = useContext(RecipesContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RecipeFinder.get("/");
                // sets the context of Recipe to the retrieved recipe data
                setRecipes(response.data.data.recipes);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Name</th>
                        <th scope="col">Creator</th>
                        <th scope="col">Placeholder origin</th>
                        <th scope="col">Placeholder tags</th>
                        <th scope="col">Placeholder Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {/* validate that recipes exists before running the rest of the map */}
                    {recipes && recipes.map(recipe => {
                        return (
                            <tr key={recipe.id}>
                                <td>recipe name</td>
                                <td>{recipe.creator}</td>
                                <td>{recipe.origin}</td>
                                <td>placeholder tag</td>
                                <td>placeholder rating</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default RecipeList

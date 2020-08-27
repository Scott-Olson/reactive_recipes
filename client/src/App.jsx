import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RecipeDetail from "./routes/RecipeDetail";
import NewRecipe from "./routes/NewRecipe";
import { RecipesContextProvider } from './context/RecipesContext';

const App = () => {
    return (
        <RecipesContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/recipes/:id/update" component={UpdatePage} />
                        <Route exact path="/recipes/new" component={NewRecipe} />
                        <Route exact path="/recipes/:id" component={RecipeDetail} />
                    </Switch>
                </Router>
            </div>
        </RecipesContextProvider>
    );
};



export default App;

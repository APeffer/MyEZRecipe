import { RecipesContext } from "../context/RecipeContext";
import { useContext } from "react";

export const useRecipesContext = () => {
    const context = useContext(RecipesContext);

    if(!context) {
        throw Error('useRecipesContext must be used inside of a RecipeContextProvider')
    }

    return context
}
//////////////////////////////////////////////
///////// ALGO 1 : Méthode filter() /////////

/*La recherche dans la barre de recherche s'initialise dès lors
que l'utilisateur entre au minimum 3 caractères
 */
function inputSearchRecipes(recipes, filteredRecipes, value) {
  /*Si une recherche est effectuée (>3), je filtre les recettes
      en prenant en paramètre ma fonction "FindMatchingWords",
      ui va vérifier si l'input matche avec un mot présent dans les champs
      noms, ingrédients, descriptions, ustensiles et appareils
      */

  if (filteredRecipes.length != 0) {
    filteredRecipes = [];
    filteredRecipes = filterRecipesByTags(recipes, filteredRecipes, false);

    if (value.length >= 3) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        findMatchingWords(recipe, value)
      );
    }
  } else {
    /*Sinon, tant que l'input != 3 caractères
      je retourne l'ensemble de mes recettes.
      Si j'ai une entrée à plus de 3 caractères MAIS
      aucun match, voir classe RECIPE : Message "no results"
      */
    //console.time("Timer1");
    if (value.length >= 3) {
      filteredRecipes = recipes.filter((recipe) =>
        findMatchingWords(recipe, value)
      );
    } else {
      filteredRecipes = recipes;
      //console.timeEnd("Timer1");
    }
  }
  return filteredRecipes;
}

/*Je créé une fonction qui va me permettre de matcher les entrées de l'utilisateur 
  avec les informations contenues dans les recettes : 
  nom, ingrédients, description, ustensiles & appareils*/
function findMatchingWords(recipe, value) {
  let MatchingWordsInRecipes = [
    recipe.name,
    recipe.description,
    recipe.appliance,
  ];
  let ingredientsList = recipe.ingredients;
  ingredientsList.forEach(function (recipeIngredient) {
    MatchingWordsInRecipes.push(recipeIngredient.ingredient);
  });
  let recipeUstensils = recipe.ustensils;
  recipeUstensils.forEach(function (recipeUstensil) {
    MatchingWordsInRecipes.push(recipeUstensil);
  });
  /*A chaque fois, j'utilise ma méthode "push()" qui va retourner à l'utilisateur,
    l'information demandée en fonction des entrées qu'il aura tapé*/

  /*Enfin, s'il y a match, je retourne vrai (méthode "some()"").
    A l'inverse, si aucun match n'a été trouvé 
    dans aucun des champs, je renvoie faux*/
  let matchingWords = MatchingWordsInRecipes.some((recipeField) =>
    /*J'ajoute également ma méthode "toLowerCase()"" 
      qui va permettre de prendre en compte les entrées 
      en majuscules (va les convertir en minuscules))*/
    recipeField.toLowerCase().includes(value.toLowerCase())
  );
  return matchingWords;
}

const researchInputFilter = document.querySelectorAll(".filter_research_input");

/*FONCTION AFIN DE FILTER LES RECETTES
  A PARTIR DES TAGS*/
function filterRecipesByTags(recipes, filteredRecipes, restart) {
  const tags = document.querySelectorAll(".tag");

  for (let i = 0; i < tags.length; i++) {
    let keywordTag = tags[i].getAttribute("id");

    /*Si l'utilisateur a au préalable effectué une recherche dans la barre de recherche
  continuer le filtre sur les recettes affichées à partir du résultat de recherche*/
    if (filteredRecipes.length != 0 && restart == false) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        findMatchingWords(recipe, keywordTag)
      );
    } else {
      /*Sinon, débuter le filtre à partir des tags*/
      filteredRecipes = recipes.filter((recipe) =>
        findMatchingWords(recipe, keywordTag)
      );
      restart = false;
    }
  }

  if (tags.length === 0) {
    filteredRecipes = recipes;
  }

  return filteredRecipes;
}

/*
  EFFECTUER UNE RECHERCHE A PARTIR D'UNE ENTREE 
  SUR L'INPUT DU FILTRE*/
function displayFilterInputSearchResults(elements, value) {
  for (let i = 0; i < elements.length; i++) {
    let id = elements[i].getAttribute("id");

    /*Au fur et à mesure que l'utilisateur entre un mot,
  masquer les mots clés qui ne matchent pas avec l'entrée de l'input*/
    if (id.toLowerCase().includes(value.toLowerCase())) {
      elements[i].style.display = "flex";
    } else {
      elements[i].style.display = "none";
    }
  }
}

researchInputFilter.forEach(function (inputFilter) {
  inputFilter.addEventListener("keyup", function () {
    const inputFilterValue = inputFilter.value;
    const filterDisplay = document.querySelectorAll(".filter_list_display");
    displayFilterInputSearchResults(filterDisplay, inputFilterValue);
  });
});

/**********************EXPORTS**************************/
export { findMatchingWords, inputSearchRecipes, filterRecipesByTags };

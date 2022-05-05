//////////////////////////////////////////////
///////// ALGO 2 : Méthode BOUCLE FOR /////////

/*La recherche dans la barre de recherche s'initialise dès lors
que l'utilisateur entre au minimum 3 caractères
 */
function inputSearchRecipes(recipes, filteredRecipes, value) {
  /*Si une recherche est effectuée (>3), je filtre les recettes
      en prenant en paramètre ma fonction "FindMatchingWords",
      qui va vérifier si l'input matche avec un mot présent dans les champs
      noms, ingrédients, descriptions, ustensiles et appareils
      */

  if (filteredRecipes.length != 0) {
    filteredRecipes = [];
    filteredRecipes = filterRecipesByTags(recipes, filteredRecipes, false);

    if (value.length >= 3) {
      /*Filtre sur les recettes déja filtrées*/
      let newFilteredRecipes = [];
      for (let i = 0; i < filteredRecipes.length; i++) {
        if (findMatchingWords(filteredRecipes[i], value) === true) {
          newFilteredRecipes.push(filteredRecipes[i]);
        }
      }
      filteredRecipes = newFilteredRecipes;
    }
    /*Si les recettes ne sont pas déja filtrées, alors : */
  } else {
    /*Sinon, tant que l'input != 3 caractères
      je retourne l'ensemble de mes recettes.
      Si j'ai une entrée à plus de 3 caractères MAIS
      aucun match, voir classe RECIPE : Message "no results"
      */
    if (value.length >= 3) {
      /*Filtrer les recettes*/
      let newFilteredRecipes = [];
      for (let j = 0; j < recipes.length; j++) {
        if (findMatchingWords(recipes[j], value) === true) {
          newFilteredRecipes.push(recipes[j]);
        }
      }
      filteredRecipes = newFilteredRecipes;
    } else {
      filteredRecipes = recipes;
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
  for (let i = 0; i < recipe.ingredients.length; i++) {
    MatchingWordsInRecipes.push(recipe.ingredients[i].ingredient);
  }
  for (let j = 0; j < recipe.ustensils.length; j++) {
    MatchingWordsInRecipes.push(recipe.ustensils[j]);
  }
  /*A chaque fois, j'utilise ma méthode "push()" qui va retourner à l'utilisateur,
    l'information demandée en fonction des entrées qu'il aura tapé*/

  /*Enfin, s'il y a match, je retourne vrai. A l'inverse, si aucun match n'a été trouvé 
    dans aucun des champs, je renvoie faux. J'ajoute également ma méthode "toLowerCase()" 
    qui va permettre de prendre en compte les entrées en majuscules 
    (va les convertir en minuscules))*/
  for (let k = 0; k < MatchingWordsInRecipes.length; k++) {
    if (MatchingWordsInRecipes[k].toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
  }
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

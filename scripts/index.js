/**********************IMPORTS**************************/

import { recipes } from "/scripts/data/recipes.js";
import {
  inputSearchRecipes,
  filterRecipesByTags,
} from "/scripts/utils/search.js";
import { Tag } from "/scripts/components/Tag.js";

let filteredRecipes = [];

/*Ajouter les recettes qui n'apparaissent
pas dans la liste*/
function addNewRecipes(recipe, recipeList) {
  /*Je vérifie que la recette n'est pas déja listée*/
  let isRecipePushed = false;
  for (let j = 0; j < recipeList.children.length; j++) {
    if (
      recipeList.children[j].getAttribute("id") === recipe.getAttribute("id")
    ) {
      isRecipePushed = true;
    }
  }
  //Si elle n'apparait pas dans le tableau, je l'ajoute
  if (isRecipePushed === false) {
    recipeList.appendChild(recipe);
  } else {
    //Sinon, je la supprime
    recipe.remove();
  }
}

/*De la même manière, je viens ajouter les ingrédients, appareils
 et ustensiles qui ne sont pas dans la liste : 
 IMPORTANT POUR EVITER LES DOUBLONS DANS LES FILTRES !
 */
function addNewElements(recipeElement, detailsListElements, tags) {
  let isElementPushed = false;
  //Je vérifie si les ingrédients/appareils/ustensiles
  //font déja partie des TAGS
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].getAttribute("id") == recipeElement.getAttribute("id")) {
      isElementPushed = true;
    }
  }
  //Je vérifie si les ingrédients/appareils/ustensiles
  //sont présents dans les filtres
  for (let j = 0; j < detailsListElements.children.length; j++) {
    if (
      detailsListElements.children[j].getAttribute("id") ==
      recipeElement.getAttribute("id")
    ) {
      isElementPushed = true;
    }
  }
  //Si un ingrédient, un appareil ou un ustensile n'apparait pas
  //dans un tag/filtre, ALORS je l'ajoute dans la liste déroulante
  //("li") de mes filtres
  if (isElementPushed === false) {
    detailsListElements.appendChild(recipeElement);
    //Sinon je le supprime
  } else {
    recipeElement.remove();
  }
}

/*
Je procède à l'affichage de mes recettes et de 
mes filtres sur mon "index.html"
 */
function displayRecipes(recipes) {
  //Ma section dédiée dans mon fichier html
  const recipesList = document.querySelector(".recipes_cards");
  const ingredientsListDisplay = document.querySelector(
    ".filter_list_ingredients"
  );
  const appliancesListDisplay = document.querySelector(
    ".filter_list_appliances"
  );
  const ustensilsListDisplay = document.querySelector(".filter_list_ustensils");
  recipesList.innerHTML = "";
  ingredientsListDisplay.innerHTML = "";
  appliancesListDisplay.innerHTML = "";
  ustensilsListDisplay.innerHTML = "";

  //Section TAGS
  const tags = document.querySelectorAll(".tag");

  /*Je créé une instance de ma classe RECIPE pour chaque
  nouvelle recette*/
  recipes.forEach(function (recipe) {
    let recipeExample = new Recipe(recipe);
    let recipeCard = recipeExample.createRecipeCard;
    addNewRecipes(recipeCard, recipesList);

    //Pour chaque nouvelle recette, j'ajoute également les
    //ingrédients + tags correspondants qui vont s'afficher
    //lorsque celui ci sera selectionné
    let ingredientsList = recipeExample.createIngredients;
    ingredientsList.forEach(function (recipeIngredient) {
      addNewElements(recipeIngredient, ingredientsListDisplay, tags);
    });

    // Pour chaque nouvelle recette, j'ajoute également les
    //appareils + tags correspondants qui vont s'afficher
    //lorsque celui ci sera selectionné
    let appliancesList = recipeExample.createAppliances;
    addNewElements(appliancesList, appliancesListDisplay, tags);

    //Pour chaque nouvelle recette, j'ajoute également les
    //ingrédients + tags correspondants qui vont s'afficher
    //lorsque celui ci sera selectionné
    let ustensilsList = recipeExample.createUstensils;
    ustensilsList.forEach(function (recipeUstensil) {
      addNewElements(recipeUstensil, ustensilsListDisplay, tags);
    });
  });

  /*
  Je créé ici un message qui va renvoyer à l'utilisateur qui vient
  d'effectuer une recherche, qu'aucune recette ne correspond à cette dernière
  si les mots clés entrés ne matchent pas avec le contenu des fiches recettes
  */
  if (recipesList.innerHTML === "") {
    recipesList.innerHTML = `
    <div class="results_message">
    <h2>Oups ! Aucune recette ne correspond à votre recherche...</h2>
          <p>Essayez d'effectuer une nouvelle recherche avec d'autres mots clés tels que
          "tarte aux pommes", "salade de riz", etc. 
          </p>
          <div class="main_page"> 
          <a href="index.html" title="recharger la page" id="retour">
          <i class="fa-solid fa-utensils"></i>
          <h3 class="all_recipes">Revenir à l'ensemble <br>  des recettes</h3>
          </a>
          </div>
          </div>
    `;
  }

  /////////////////////////////

  /*BLOC CONCERNANT L'AFFICHAGE DES FILTRES ET DES LISTES +
  AMELIORATION DU DISPLAY DES FICHES RECETTES*/
  const filterMenu = document.querySelectorAll(".filter_menu");
  const filterList = document.querySelectorAll(".filter_list");
  const filterStyle = [
    Math.ceil(
      document.querySelectorAll(".filter_list_display_ingredients").length / 10
    ),
  ];

  /*
Ajout d'une dive fictive afin de concerver le display grid
de 3 recettes par ligne + affichage sans espaces entre les fiches
recettes lors de la recherche
*/
  const recipeCard = document.querySelectorAll(".recipe_card");
  if (recipeCard.length % 3 == 2) {
    let hiddenDIV = document.createElement("div");
    recipesList.appendChild(hiddenDIV);
    hiddenDIV.style.width = "350px";
    hiddenDIV.style.height = "345px";
    hiddenDIV.style.margin = "15px auto";
    hiddenDIV.style.order = recipeCard.length;
  }

  /*
Adaptation de la taille du filtre déroulant
en fonction du nombre de mots clés présents ("li")
*/
  for (let i = 0; i < filterMenu.length; i++) {
    filterMenu[i].addEventListener("toggle", function () {
      if (!filterMenu[i].open) {
        filterMenu[i].style.width = "160px";
      } else {
        filterMenu[i].style.width = filterStyle[i] * 200 + "px";
        filterList[i].style.width = filterStyle[i] * 200 + "px";

        // A l'ouverture d'un filtre, si aucun élément n'est selectionné
        // le bloc déroulé se ferme automatiquement au passage
        // sur le filtre suivant
        /*Sinon, le filtre reste ouvert et il faut de nouveau cliquer
        sur le chevron afin de le fermer (user Xperience négative)*/
        for (let j = 0; j < filterMenu.length; j++) {
          if (filterMenu[i] != filterMenu[j]) {
            filterMenu[j].style.width = "160px";
            filterMenu[j].open = false;
          }
        }
      }
    });
  }
  for (let k = 0; k < filterMenu.length; k++) {
    filterMenu[k].open = false;
  }

  /*EventListener pour l'ouverture du filtre*/
  filtersEvents();
  /*EventListener sur mes tags*/
  tagsEvents();
}

//////////////////////////////////////////////

/*
LES FILTRES
 */
function filtersEvents() {
  //Section dédiée aux Tags dans mon html
  const tagSection = document.querySelector(".tags");
  const filterDisplay = document.querySelectorAll(".filter_list_display");

  /*
  Au clic sur l'un des mots clés présents 
  dans les filtres, créer un tag du même nom
  */
  filterDisplay.forEach(function (filterDisplay) {
    filterDisplay.addEventListener("click", function () {
      /*TAGS*/
      let keywordTag = filterDisplay.getAttribute("id");
      let tagExample = new Tag(keywordTag);
      let tag;
      //S'il s'agit d'un filtre de la section ingrédient,
      //Créer un tag ingrédient
      if (filterDisplay.classList.contains("filter_list_display_ingredients")) {
        tag = tagExample.createIngredientTag;
      } else if (
        //Filtre appareil = tag appareil
        filterDisplay.classList.contains("filter_list_display_appliances")
      ) {
        tag = tagExample.createApplianceTag;
      } else if (
        //Filtre ustensile = tag ustensile
        filterDisplay.classList.contains("filter_list_display_ustensils")
      ) {
        tag = tagExample.createUstensilTag;
      }
      tagSection.appendChild(tag);

      filteredRecipes = filterRecipesByTags(recipes, filteredRecipes, false);

      //Lister les recettes filtrées
      displayRecipes(filteredRecipes);

      const researchInputFilter = document.querySelectorAll(
        ".filter_research_input"
      );
      researchInputFilter.forEach(function (inputFilter) {
        inputFilter.value = "";
      });
    });
  });
}

/*
LES TAGS
 */
function tagsEvents() {
  const tagIcon = document.querySelectorAll(".tag_icon");

  tagIcon.forEach(function (tagIcon) {
    tagIcon.addEventListener("click", function () {
      //Au clic sur le tag (x), ce dernier se supprime
      tagIcon.parentElement.remove();

      //Lorsqu'un tag est supprimé, le mot correspondant
      //réapparait dans les filtres;
      //Les recettes sont actualisées*/
      filteredRecipes = filterRecipesByTags(recipes, filteredRecipes, true);
      displayRecipes(filteredRecipes);
    });
  });
}

//Correspond à ma barre de recherche
const searchbarInput = document.querySelector(".searchbar_input");

//A chaque entrée dans l'input de celle ci : effectuer une recherche
searchbarInput.addEventListener("keyup", function () {
  const userSearchValue = searchbarInput.value;

  /*
  Le Array de mes recettes filtrées va dépendre et correspondre
  à ce que l'utilisateur va entrer comme mot clés dans la barre de recherche
  */
  filteredRecipes = inputSearchRecipes(
    recipes,
    filteredRecipes,
    userSearchValue
  );
  displayRecipes(filteredRecipes);
});

/*
INITIALISATION DE MA PAGE
 */
function initPage() {
  displayRecipes(recipes);
}

initPage();

/*
Je créé ma classe RECIPE qui va regrouper l'ensemble
des données (recettes) de mon array "RECIPES.JS"
*/
class Recipe {
  constructor(recipe) {
    this._id = recipe.id;
    this._name = recipe.name;
    this._servings = recipe.servings;
    this._ingredients = recipe.ingredients;
    this._time = recipe.time;
    this._description = recipe.description;
    this._appliance = recipe.appliance;
    this._ustensils = recipe.ustensils;
  }

  /*
  Création des fiches recettes à partir des éléments
  de ma classe RECIPE
  */
  get createRecipeCard() {
    //Chaque fiche recette = article
    const recipeCard = document.createElement("article");
    recipeCard.classList.add("recipe_card");
    recipeCard.setAttribute("id", `${this._name}`);

    //Affichage de la photo, du titre et du temps de cuisson
    recipeCard.innerHTML = `
      <div class="card_background">
      <img src="/assets/img/recipesPictures/${this._id}.jpg"  alt="Photo illustrant la recette '${this._name}'">
      </div>
        <div class="card_header">
        <h2 class="recipe_title">${this._name}</h2>
        <p class="recipe_time">
            <i class="far fa-clock recipe_time_icon"></i>
            ${this._time} min
        </p>
        </div>
    `;

    //Affichage des ingrédients et des conseils de préparation
    const recipeInfo = document.createElement("div");
    recipeInfo.setAttribute("class", "recipe_info");

    //Ingrédients détaillés
    const ingredientsList = document.createElement("ul");
    ingredientsList.setAttribute("class", "recipe_ingredients");

    //Pour chaque section "ingrédients", renvoyer sous forme de liste ("li")
    //l'ensemble des ingrédients détaillés
    for (let i = 0; i < this._ingredients.length; i++) {
      const ingredientsDetails = document.createElement("li");
      ingredientsDetails.setAttribute("class", "ingredients_details");

      //Si la quantité n'est pas renseignée, on renvoie un champ vide ""
      //afin d'éviter l'apparition de "undefined"
      if (this._ingredients[i].quantity === undefined) {
        this._ingredients[i].quantity = "";
      }
      //Idem sur les unités de mesure
      if (this._ingredients[i].unit === undefined) {
        this._ingredients[i].unit = "";
      } else {
        //Uniformisation des unités de mesure
        switch (this._ingredients[i].unit) {
          case "gramme":
          case "grammes":
            this._ingredients[i].unit = "g";
            break;
          case "litre":
          case "litres":
          case "Litre":
          case "Litres":
            this._ingredients[i].unit = "L";
            break;
          case "cuillères à soupe":
          case "cuillère à soupe":
            this._ingredients[i].unit = "c à s";
            break;
          case "cuillères à café":
            this._ingredients[i].unit = "c à c";
            break;
          case "verres":
            this._ingredients[i].unit = "verre";
            break;
          case "pincées":
            this._ingredients[i].unit = "pincée";
            break;
          case "boites":
            this._ingredients[i].unit = "boite";
            break;
          case "barquettes":
            this._ingredients[i].unit = "barquette";
            break;
          default:
            this._ingredients[i].unit = this._ingredients[i].unit;
        }
      }

      //Je retourne l'ensemble de mes ingrédients détaillés :
      //Ingrédients + quantité/unité
      ingredientsList.innerHTML += `
    <li class="ingredients_details">
                  <span><strong>${this._ingredients[i].ingredient}</strong></span>
                  <span> ${this._ingredients[i].quantity} ${this._ingredients[i].unit}</span>
              </li>`;
      recipeInfo.appendChild(ingredientsList);
    }
    //Conseils de préparation
    recipeInfo.innerHTML += `<p class='recipe_description'>${this._description}<p>`;
    recipeCard.appendChild(recipeInfo);

    //Enfin, je retourne l'ensemble de ma fiche recette
    return recipeCard;
  }

  /*
  Création du filtre qui va contenir 
  le listing de l'ensemble des ingrédients
  présents dans toutes les fiches recettes
  */
  get createIngredients() {
    const ingredientsList = [];

    for (let i = 0; i < this._ingredients.length; i++) {
      /*"li" : chaque ingrédient*/
      const ingredientsFilterDisplay = document.createElement("li");
      ingredientsFilterDisplay.classList.add(
        "filter_list_display",
        "filter_list_display_ingredients"
      );
      ingredientsFilterDisplay.setAttribute(
        "id",
        `${this._ingredients[i].ingredient}`
      );
      ingredientsList.push(ingredientsFilterDisplay);
      const ingredientsFilterOption = document.createElement("a");
      ingredientsFilterOption.classList.add(
        "filter_list_option",
        "filter_list_option_ingredients"
      );
      ingredientsFilterOption.setAttribute("role", "option");
      ingredientsFilterOption.innerHTML = `${this._ingredients[i].ingredient}`;
      ingredientsFilterDisplay.appendChild(ingredientsFilterOption);
    }

    return ingredientsList;
  }

  /*
  Création du filtre qui va contenir 
  le listing de l'ensemble des ustensiles
  présents dans toutes les fiches recettes
  */
  get createUstensils() {
    const ustensilsList = [];

    for (let i = 0; i < this._ustensils.length; i++) {
      /*"li" : chaque ustensile*/
      const ustensilsFilterDisplay = document.createElement("li");
      ustensilsFilterDisplay.classList.add(
        "filter_list_display",
        "filter_list_display_ustensils"
      );
      ustensilsFilterDisplay.setAttribute("id", `${this._ustensils[i]}`);
      ustensilsList.push(ustensilsFilterDisplay);
      const ustensilsFilterOption = document.createElement("a");
      ustensilsFilterOption.classList.add(
        "filter_list_option",
        "filter_list_option_ustensils"
      );
      ustensilsFilterOption.setAttribute("role", "option");
      ustensilsFilterOption.innerHTML = `${this._ustensils[i]}`;
      ustensilsFilterDisplay.appendChild(ustensilsFilterOption);
    }

    return ustensilsList;
  }

  /*
  Création du filtre qui va contenir 
  le listing de l'ensemble des appareils
  présents dans toutes les fiches recettes
  */
  get createAppliances() {
    const appliancesFilterDisplay = document.createElement("li");
    appliancesFilterDisplay.classList.add(
      "filter_list_display",
      "filter_list_display_appliances"
    );
    appliancesFilterDisplay.setAttribute("id", `${this._appliance}`);
    const appliancesFilterOption = document.createElement("a");
    appliancesFilterOption.classList.add(
      "filter_list_option",
      "filter_list_option_appliances"
    );
    appliancesFilterOption.setAttribute("role", "option");
    appliancesFilterOption.innerHTML = `${this._appliance}`;
    appliancesFilterDisplay.appendChild(appliancesFilterOption);

    return appliancesFilterDisplay;
  }
}

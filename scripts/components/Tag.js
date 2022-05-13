/*
Je créé ma classe TAG qui va renvoyer les mots clés
selectionnés dans les filtres lors d'une 
recherche de recettes
*/
class Tag {
  constructor(tag) {
    this._tag = tag;
  }

  /*
    Création de la section
    TAGS de mon filtre INGREDIENTS
     */
  get createIngredientTag() {
    //Mon tag qui apparait à la selection
    //d'un mot dans mon filtre d'ingrédients
    const tag = document.createElement("div");
    tag.classList.add("tag", "tag_ingredients");
    tag.setAttribute("id", `${this._tag}`);

    //Le mot clé selectionné
    const keywordTag = document.createElement("p");
    keywordTag.classList.add("tag_name");
    keywordTag.innerHTML = `${this._tag}`;
    tag.appendChild(keywordTag);

    //L'icone "x" qui va permettre la fermeture du tag
    const tagIcon = document.createElement("i");
    tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
    tag.appendChild(tagIcon);

    return tag;
  }

  /*
    Création de la section
    TAGS de mon filtre APPAREILS
     */
  get createApplianceTag() {
    //Mon tag qui apparait à la selection
    //d'un mot dans mon filtre d'appareils
    const tag = document.createElement("div");
    tag.classList.add("tag", "tag_appliances");
    tag.setAttribute("id", `${this._tag}`);

    //Le mot clé selectionné
    const keywordTag = document.createElement("p");
    keywordTag.classList.add("tag_name");
    keywordTag.innerHTML = `${this._tag}`;
    tag.appendChild(keywordTag);

    //L'icone "x" qui va permettre la fermeture du tag
    const tagIcon = document.createElement("i");
    tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
    tag.appendChild(tagIcon);

    return tag;
  }

  /*
    Création de la section
    TAGS de mon filtre USTENSILES
     */
  get createUstensilTag() {
    //Mon tag qui apparait à la selection
    //d'un mot dans mon filtre d'ustensiles
    const tag = document.createElement("div");
    tag.classList.add("tag", "tag_ustensils");
    tag.setAttribute("id", `${this._tag}`);

    //Le mot clé selectionné
    const keywordTag = document.createElement("p");
    keywordTag.classList.add("tag_name");
    keywordTag.innerHTML = `${this._tag}`;
    tag.appendChild(keywordTag);

    //L'icone "x" qui va permettre la fermeture du tag
    const tagIcon = document.createElement("i");
    tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
    tag.appendChild(tagIcon);

    return tag;
  }
}

/**********************EXPORTS**************************/
export { Tag };

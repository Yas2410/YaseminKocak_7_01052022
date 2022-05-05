/*JE CREE MA CLASSE TAG QUI VA RENVOYER 
LES MOTS CLES SELECTIONNES LORS D'UNE RECHERCHE
DE RECETTES*/
class Tag {
  constructor(tag) {
    this._tag = tag;
  }

  /*
    Création de la section
    TAGS de mon filtre INGREDIENTS
     */
  get createIngredientTag() {
    const tag = document.createElement("div");
    tag.classList.add("tag", "tag_ingredients");
    tag.setAttribute("id", `${this._tag}`);

    const keywordTag = document.createElement("p");
    keywordTag.classList.add("tag_name");
    keywordTag.innerHTML = `${this._tag}`;
    tag.appendChild(keywordTag);

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
    const tag = document.createElement("div");
    tag.classList.add("tag", "tag_appliances");
    tag.setAttribute("id", `${this._tag}`);

    const keywordTag = document.createElement("p");
    keywordTag.classList.add("tag_name");
    keywordTag.innerHTML = `${this._tag}`;
    tag.appendChild(keywordTag);

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
    const tag = document.createElement("div");
    tag.classList.add("tag", "tag_ustensils");
    tag.setAttribute("id", `${this._tag}`);

    const keywordTag = document.createElement("p");
    keywordTag.classList.add("tag_name");
    keywordTag.innerHTML = `${this._tag}`;
    tag.appendChild(keywordTag);

    const tagIcon = document.createElement("i");
    tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
    tag.appendChild(tagIcon);

    return tag;
  }
}

/**********************EXPORTS**************************/
export { Tag };

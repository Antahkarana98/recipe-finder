function iniciarApp() {

  const selectCategorias = document.querySelector('#categorias');
  selectCategorias.addEventListener('change', seleccionarCategorias);

  const resultado = document.querySelector('#resultado');

  //modal bootstrap

  const modal = new bootstrap.Modal('#modal', {});

  obtenerCategorias();

  function obtenerCategorias() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
      .then(response => response.json())
      .then(categorias => mostrarCategorias(categorias.categories))
  }

  function mostrarCategorias( categorias = [] ) {
    categorias.forEach(categoria => {
      const { strCategory } = categoria;

      const option = document.createElement('OPTION');
      option.value = strCategory;
      option.textContent = strCategory;

      selectCategorias.appendChild(option);
    })
  }

  function seleccionarCategorias(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
    fetch(url)
      .then(response => response.json())
      .then(recetas => mostrarRecetas(recetas.meals))
  }

  function mostrarRecetas( recetas = [] ) {

    limpiarHTML(resultado);

    const heading = document.createElement('H2');
    heading.classList.add('text-center', 'text-black', 'my-5');
    heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
    resultado.appendChild(heading);

    recetas.forEach(receta => {
      const { strMeal, idMeal, strMealThumb } = receta;

      const recetaContenedor = document.createElement('DIV');
      recetaContenedor.classList.add('col-md-4');

      const recetaCard = document.createElement('DIV');
      recetaCard.classList.add('card', 'mb-4');

      const imagenReceta = document.createElement('IMG');
      imagenReceta.classList.add('card-img-top');
      imagenReceta.alt = `Imagen de la receta ${strMeal}`;
      imagenReceta.src = strMealThumb;

      const recetaCardBody = document.createElement('DIV');
      recetaCardBody.classList.add('card-body');

      const recetaHeading = document.createElement('H3');
      recetaHeading.classList.add('card-title', 'mb-3');
      recetaHeading.textContent = strMeal;

      const recetaButton = document.createElement('BUTTON');
      recetaButton.classList.add('btn', 'btn-danger', 'w-100');
      recetaButton.textContent = 'Ver receta';

      recetaButton.onclick = function (){
        seleccionarReceta(idMeal);
      }

      //texto y boton
      recetaCardBody.appendChild(recetaHeading);
      recetaCardBody.appendChild(recetaButton);

      //añadiendo la imagen y la estructura del body
      recetaCard.appendChild(imagenReceta);
      recetaCard.appendChild(recetaCardBody);

      recetaContenedor.appendChild(recetaCard);

      //agregando las recetas a la pagina
      resultado.appendChild(recetaContenedor);

    })
  }

  function seleccionarReceta(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetaModal(resultado.meals[0]))
  }

  function mostrarRecetaModal(receta) {
    console.log(receta);
    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

    const modalTitle = document.querySelector('.modal .modal-title');
    const modalBody = document.querySelector('.modal .modal-body');

    modalTitle.textContent = strMeal;
    modalBody.innerHTML = `
      <img class="img-fluid" src="${strMealThumb}" alt="Receta ${strMeal}" />
      <h3 class="my-3">Instrucciones</h3>
      <p>${strInstructions}</p>
      <h3 class="my-3">Ingredientes y cantidades</h3>
    `;

    //ul que alberga la lista de ingredientes
    const listGroup = document.createElement('UL');
    listGroup.classList.add('list-group');

    //iterando sobre los ingredientes y las cantidades
    for(let i = 1; i <= 20; i++) {
      if(receta[`strIngredient${i}`]){
        const ingrediente = receta[`strIngredient${i}`];
        const cantidad = receta[`strMeasure${i}`];

        const ingredienteLi = document.createElement('LI');
        ingredienteLi.classList.add('list-group-item');
        ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;
        console.log(ingredienteLi);
        listGroup.appendChild(ingredienteLi);
      }
    }
    modalBody.appendChild(listGroup);

    //mostrar el modal
    modal.show();
  }

  function limpiarHTML(selector) {
    while(selector.firstChild){
      selector.removeChild(selector.firstChild);
    }
  }
}

document.addEventListener('DOMContentLoaded', iniciarApp);

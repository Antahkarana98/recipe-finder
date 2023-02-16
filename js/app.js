function iniciarApp() {

  const selectCategorias = document.querySelector('#categorias');
  selectCategorias.addEventListener('change', seleccionarCategorias);

  const resultado = document.querySelector('#resultado');

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
}

document.addEventListener('DOMContentLoaded', iniciarApp);

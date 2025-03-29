const searchbox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".searchbutton");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetailscontent = document.querySelector(".recipe-details-content");
const recipeclosebtn = document.querySelector(".recipe-close-btn");
const quickSearchButtons = document.querySelectorAll(".quick-search");
const loadMoreButton = document.querySelector(".load-more");

const fetchRecipes = async (query) => {
  recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();

    recipecontainer.innerHTML = "";


    response.meals.forEach((meal) => {
      
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");


      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
         <h3>${meal.strMeal}</h3>
        <div class="info">
       
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
        <button>View Recipe</button>
        </div>
        `;
    
      //adding EventListener To recipe button
      const button = recipeDiv.querySelector("button");
      button.addEventListener("click", () => {
        openrecipePopup(meal);
      });
   
      recipecontainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipecontainer.innerHTML = "<h2>Error in fetching recipes</h2>";
  }
};

//function to fetch ingredients
const fetchIngredients = (meal) => {
  let ingredientslist = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientslist += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientslist;
};

const openrecipePopup = (meal) => {
  recipedetailscontent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ing">Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
      <h3 class="instr">Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
  `;

  recipedetailscontent.parentElement.style.display = "block";
};

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchbox.value.trim();
  if (!searchInput) {
    recipecontainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
    return;
  }
  fetchRecipes(searchInput);
});

recipeclosebtn.addEventListener("click", () => {
  recipedetailscontent.parentElement.style.display = "none";
});

quickSearchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const query = button.getAttribute("data-query");
    fetchRecipes(query);
  });
});

// Load more quick search buttons
const additionalQuickSearchButtons = [
  { query: 'fish', label: 'Fish' },
  { query: 'Goat', label: 'Goat' },
  { query: 'vegan', label: 'Vegan' },
  { query: 'vegetarian', label: 'Vegetarian' },
  { query: 'breakfast', label: 'Breakfast' },
  { query: 'Chocolate', label: 'Chocolate' },
  { query: 'beans', label: 'Beans' },
  { query: 'Potatoes', label: 'Potatoes' },
  { query: 'pizza', label: 'Pizza' },
  { query: 'Burger', label: 'Burger' },
  { query: 'Pudding', label: 'Pudding' },
  { query: 'Prawn', label: 'Prawns' },
  { query: 'Sausage', label: 'Suasages' },
  { query: 'lamb', label: 'Lamb' },
  { query: 'French', label: 'French' },
  { query: 'Pork', label: 'Pork' },
];

loadMoreButton.addEventListener('click', () => {
  additionalQuickSearchButtons.forEach(({ query, label }) => {
    const button = document.createElement('button');
    button.classList.add('quick-search');
    button.setAttribute('data-query', query);
    button.textContent = label;
    button.addEventListener('click', () => {
      fetchRecipes(query);
    });
    loadMoreButton.before(button);
  });
  loadMoreButton.style.display = 'none';
});
// Fetch recipes for "cheese" by default when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchRecipes("cheese");
});
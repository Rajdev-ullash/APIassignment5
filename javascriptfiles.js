document.getElementById('food-submit').addEventListener('click', function () {
    const inputValue = document.getElementById('food-search').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals === null){
                alert("No items Found");
                document.getElementById('food-search').value = "";
            }
            const allMeal = data.meals;
            const allMeals = allMeal.strMeal;
            removeElements(document.getElementById('content'));
            for (let i = 0; i < allMeal.length; i++) {
                const element = allMeal[i];
                generateCard(element.strMeal, element.strMealThumb, element.idMeal);
            }
            document.getElementById('food-search').value = "";
            document.getElementById('show-details').style.display = 'none';
        })
})
const removeElements = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function generateCard(name, image, cardClick) {
    const foodContainer = document.getElementById("content");

    const cardColum = document.createElement('div');
    cardColum.className = "col";

    const card = document.createElement('div');
    card.className = "card";
    card.id = "meal";


    const img = document.createElement('img');
    img.className = "card-img-top";
    img.setAttribute('src', image);

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardTitle = document.createElement('h3');
    cardTitle.className = "card-title";
    cardTitle.id = "food-list";
    cardTitle.innerText = name;
    cardTitle.style.textAlign = 'center';

    foodContainer.appendChild(cardColum);
    cardColum.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);

    cardColum.addEventListener('click', function (event) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${cardClick}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('food-names').innerText = data.meals[0].strMeal;
                document.getElementById('show-details').style.display = 'block';
                document.getElementById('food-detailsimages').setAttribute('src', data.meals[0].strMealThumb);
                const integreant = document.getElementById('show ingreants');
                integreant.innerHTML = `
                <h4>Integreants:</h4>
                <li>${data.meals[0].strIngredient1}</li>
                <li>${data.meals[0].strIngredient2}</li>
                <li>${data.meals[0].strIngredient3}</li>
                <li>${data.meals[0].strIngredient4}</li>
                <li>${data.meals[0].strIngredient5}</li>
                <li>${data.meals[0].strIngredient6}</li>
                <li>${data.meals[0].strIngredient7}</li>
                <li>${data.meals[0].strIngredient8}</li>
                <li>${data.meals[0].strIngredient9}</li>
                <li>${data.meals[0].strIngredient10}</li>`
            });
    })
}
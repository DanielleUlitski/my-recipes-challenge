const RecipeApp = function () {

    const recipes = [
        { 
            id: 1,
            name: 'Best Chicken Soup!', 
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken' },
                { name: 'medium carrots'},
                { name: 'onions' },
            ] 
        }
    ];

    const $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, image){
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 

        recipes.push(recipe);
    };

    var createIngredients = function(name, recipeId){
        const ingredient = {
            name: name,
            id: ingId
        }
        ingId ++;
        const recipe = _getRecipeById(recipeId);
        recipe.ingredients.push(ingredient);
    };

    var _getIngredientsHTML = function(recipe){
        let recipesHTML = "";

        for (let i = 0; i < recipe.ingredients.length; i++) {
            recipesHTML += "<li>" + recipe.ingredients[i].name + "</li>"
        }
        
        return recipesHTML;
    };

    const _getRecipeById = function (id) {
        for (let i = 0; i < recipes.length; i ++) {
            if(recipes[i].id == id) {
                return recipes[i];
            }
        }
    }

    const deleteRecipe = function (recipeId) {
        let recipe = _getRecipeById(recipeId)
        recipes.splice(recipes.indexOf(recipe), 1);
    }

    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        for(var i = 0; i < recipes.length; i ++){
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe);

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' + 
                    '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                    '<img class="recipe-img" src="' + recipe.image + '"/>' +
                    '<hr>' +
                    '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                    '<div class="input-group mb-3">' +
                        '<div class="input-group-prepend">' +
                            '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
                        '</div>' + 
                        '<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">' +
                        
                    '</div>' +
                    '<ul class="ingredients">' + ingredients + '</ul>'+
                    '<span class="delete-recipe input-group-text">Delete</span>' +
                '</div>'
            );
        }
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
        deleteRecipe: deleteRecipe
    }
};

var app = RecipeApp();


//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function(){
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('.recipes').on('click', '.add-ingredients', function(){
    const ingredientName = $(this).closest('.input-group').find('input').val();
    const recipeId = $(this).closest('.recipe').data("id");

    app.createIngredients(ingredientName, recipeId);
    app.renderRecipes();
})

$('.recipes').on('click', '.delete-recipe', function () {
    const recipeId = $(this).closest('.recipe').data('id');

    app.deleteRecipe(recipeId);
    app.renderRecipes();
})
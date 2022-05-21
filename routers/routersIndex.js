const GameCategoryRoute =require('../controller/GameCategoryController');
const UserRoute =require('../controller/UserController');
const FavoriteRoute =require('../controller/FavoriteController');

function route(app){
    app.use('/categoryGame', GameCategoryRoute);
    app.use('/user', UserRoute);
    app.use('/favorite',FavoriteRoute);
}

module.exports =route;
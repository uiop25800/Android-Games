const GameCategoryRoute =require('../controller/GameCategoryController');
const UserRoute =require('../controller/UserController');

function route(app){
    app.use('/categoryGame', GameCategoryRoute);
    app.use('/user', UserRoute);
}

module.exports =route;
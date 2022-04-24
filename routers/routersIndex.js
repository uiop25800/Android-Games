const GameCategoryRoute =require('../routers/GameCategoryRoutes');
const UserRoute =require('../routers/UserRoutes');

function route(app){
    app.use('/categoryGame', GameCategoryRoute);
    app.use('/user', UserRoute);
}

module.exports =route;
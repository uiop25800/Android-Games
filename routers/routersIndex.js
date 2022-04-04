const GameCategory =require('./GameCategory.routes');


function route(app){
    app.use('/api/categoryGame',GameCategory);
}

module.exports =route;
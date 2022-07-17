const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
  const { movieId } = req.params
  let data
    if (movieId) {
        data = await theatersService.listTheatersByMovieId(movieId)
    } 
    else {
        data = await theatersService.list()
    }
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}
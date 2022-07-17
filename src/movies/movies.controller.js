const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function movieExists(req, res, next) {
  moviesService
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

function list(req, res, next) {
  moviesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}
function list2(req, res, next) {
  const isShowing = req.query.is_showing;
  console.log(isShowing)
  if(isShowing==="true"){
      moviesService
          .listMovies()
          .then((data) => res.json({data}))
          .catch(next);
  }
  else{
    moviesService
          .list()
          .then((data) => res.json({ data }))
          .catch(next);
  }
}
async function movieExists2(req, res, next) {
  const movie = await moviesService.read2(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function movieExists3(req, res, next) {
  const movie = await moviesService.listReviewsAndMovie(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

module.exports = {
  list,
  list2,
  read: [asyncErrorBoundary(movieExists), read],
  read2: [asyncErrorBoundary(movieExists2), read],
  read3: [asyncErrorBoundary(movieExists3), read],
};
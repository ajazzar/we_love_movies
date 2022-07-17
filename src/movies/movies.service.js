const knex = require("../db/connection");


function list() {
  return knex("movies").select("*");
}
function listMovies() {
  return knex("movies as m").join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .distinct("m.*").where({ "mt.is_showing": true }).orderBy("m.movie_id")
}
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}
function read2(movie_id){
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("t.*")
  .where({"m.movie_id": movie_id})
}
function listReviewsAndMovie(movie_id) {
  return knex("movies as m")
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("r.*", "c.*")
  .where({"r.movie_id": movie_id})
  .then((reviews) =>{ return reviews.map((review) =>{
        return {
        review_id: review.review_id,
        content: review.content,
        score: review.score,
        created_at: review.created_at,
        updated_at: review.updated_at,
        critic_id: review.critic_id,
        movie_id: review.movie_id,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.created_at,
          updated_at: review.updated_at,
        },
      };
    });
    })
}
module.exports = {
  list,
  listMovies,
  read,
  read2,
  listReviewsAndMovie,
};
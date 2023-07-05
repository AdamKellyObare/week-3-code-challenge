const movieListContainer = document.getElementById('movie-list')
const movieDetails = document.getElementById('no-next-page')

//This function fetches the first movie and renders it 
function getFirstMovie(){

    fetch('http://localhost:3000/films/1')
    .then((response) => response.json())
    .then(movieInfo => {

        let movieCard = document.createElement('li');
        movieCard.className = 'movie-card'
        movieCard.innerHTML = `
            <img src="${movieInfo.poster}" alt="poster" class="first-poster">
            <div class = "content">
                <h3>${movieInfo.title}</h3>
                <p><span>Duration:</span> ${movieInfo.runtime} min
                <p><span>Airs At:</span> ${movieInfo.showtime}
                <p>Available Tickets: ${movieInfo.tickets_sold}
            </div>
    `
    document.querySelector('#first-movie').appendChild(movieCard)
    });
}

/*This creates and populates a list (movie-list hard-coded in the html) of the available movies that
can be watched by creating */
function showAllMovies() {
    fetch('http://localhost:3000/films')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        data.forEach(movieCatalog => {
             const movie = document.createElement('li')
             movie.className = "movie-list"
             movie.innerText = movieCatalog.title
             movieListContainer.append(movie)   
             
             movie.addEventListener('click', () => {
                printmovieCatalog(movieCatalog)
             })
        })
    })
}
//function that prints the movie list to the browser
function printmovieCatalog(movieCatalog){

    movieDetails.innerHTML= " "

    let menu = document.createElement('li');
    menu.className = 'movie-menu'
    menu.innerHTML = `
        <img src="${movieCatalog.poster}" alt="poster" class='pst'>
        <div class = "movie-content">
            <h3>Title: ${movieCatalog.title}</h3>
            <p>${movieCatalog.description}</p>
            <p><span>Duration:</span> ${movieCatalog.runtime} minutes</p>
            <p><span>Showtimes:</span> ${movieCatalog.showtime} </p>
            <p>Tickets availables: ${movieCatalog.tickets_sold}
        </div>
        <div class="button">
            <button id="buy-btn">Buy Ticket</button>
            <button id="delete-btn">Delete Movie</button>
        </div>
        `
        menu.querySelector('#delete-btn').addEventListener('click', () => {
        menu.remove()
        deleteMovie(movieCatalog.id)
    })
    movieDetails.appendChild(menu)
}

//This function then deletes the movie/film from the db.json server
function deleteMovie(id){
    console.log(id);
    fetch(`http://localhost:3000/films/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
    })
    .then(res => res.json())
    .then(movieCatalog => console.log(movieCatalog))
} 

function initialize(){
    getFirstMovie()
    showAllMovies()
}
initialize()
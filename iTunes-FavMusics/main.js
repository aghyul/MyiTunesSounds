/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
let musicPlayerArea = document.querySelector(".player");
let actualPlayer = document.querySelector(".music-player");
let searchArea = document.querySelector(".search");
let actualSearchForm = document.querySelector(".search-form");
let resultsArea = document.querySelector(".resultWrapper");
let submitButton = document.getElementById("button");
let eachSong = document.querySelector(".song");

let getSearch = encodeURIComponent("");

let baseURL = "https://itunes.apple.com/search?term="
let songUrl = ""
// 2. Create your `submit` event for getting the user's search term
function playSong(url){
  actualPlayer.setAttribute("src", url);
}

// This is to clear search results
function clearPage (){
  resultsArea.innerHTML = "";
}

actualSearchForm.addEventListener("submit", function(event) {
  event.preventDefault()
  // console.log("clicked");
  getSearch = event.target.querySelector("input[name='search']").value

  actualSearchForm.addEventListener("submit", callSearchAudio());
  function callSearchAudio(){
    let sound = document.getElementById("searchAudio")
    sound.play();
  }

// This clears the last search results
    clearPage();


  // 3. Create your `fetch` request that is called after a submission
  fetch(baseURL + getSearch + "&limit=15")
    .then(function(response) {
      response.json()
        // console.log(response.status);
        .then(function(data) {
          console.log(data.results);
          let songs = data.results
          // 4. Create a way to append the fetch results to your page
          for (i = 0; i < songs.length; i++) {
            function myHtml(data) {
              let song = songs[i];
              let results = `
                <div class="song" onclick="playSong('${song.previewUrl}')">
                  <img src="${song.artworkUrl100}" alt="Album Artwork">
                  <p class="track">${song.trackName}</p>
                  <p class="band">${song.artistName}</p>
                </div>
            `
              return results;

            }
            let addingSongs = myHtml(data);
            resultsArea.innerHTML += addingSongs;
          }
          // 5. Create a way to listen for a click that will play the song in the audio play
        })
    })

})

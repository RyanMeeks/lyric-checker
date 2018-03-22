const LYRICS_URL = "https://private-anon-b1f27724d6-lyricsovh.apiary-proxy.com/v1";


function getDataFromApi(artist, title, callback) {
    const query = {
    artist: artist,
    song: title,
  };
    const newURL = `${LYRICS_URL}/${query.artist}/${query.song}`;
    
console.log(newURL);
  
  $.getJSON(newURL, callback);
  
}

function renderResult(result) {
  return `<h2>${data.lyrics}</h2>
         `;
}


function displaySearchData(data) {
  console.log(data);
 results = data.lyrics;
 console.log(results);
 $(".js-search-results").replaceWith(results);
  
}

//watches for the form to be submitted
function watchSubmit() {
  $('.js-search-form').submit(event => {
    //prevent it from resetting
    event.preventDefault();
    //save as constants to clear out form after submission.
    const artistInput = $(this).find('.artist');
    const titleInput = $(this).find('.title');
    const artist = artistInput.val().trim();
    const title = titleInput.val().trim();
    artistInput.val('');
    titleInput.val('');
    
    getDataFromApi(artist, title, displaySearchData);
  });
}


$(watchSubmit);
//make function to call api,
// look at the output..
// figure out how to put it on the screen. 
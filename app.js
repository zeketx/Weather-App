let appId = '881b3f7c08ad54b75bda4f21bfe917ff'; 

let units = 'imperial';

let searchMethod;


function getSearchMethod(searchTerm) {

    // zipcode or city name

    // parse all items in searchTerm into numbers, make sure its zipcode

    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)

    searchMethod = 'zip';

    else 

    searchMethod = 'q';
}

function searchWeather(searchTerm) {

    getSearchMethod(searchTerm);

    // `` = help inject js parameters = ${}=${}&variale${}

    // call to API to return JSON
 
    // we want to recieve JSON data before we move on with code

    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {

    // converts HTTP resonse into JSON = JS objects

    return result.json();

    }).then(result => {

        // init(); = initialize function 

        init(result); 

    })

}

// pasing JSON object

// get all data from this function

function init(resultFromServer) {

    console.log(resultFromServer);

    // can run switch statement to display background according to temperatures

    switch(resultFromServer.weather[0].main) {

        // adding background to <div>

        // <img> optional if wanting to use API icons

        case 'Clear':

            document.getElementById('weatherDesc_Icon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/861/861060.svg')";

            document.body.style.backgroundColor = "#fff"; 

            break;

        case 'Thunderstorm':

            document.getElementById('weatherDesc_Icon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/1146/1146860.svg')";

            document.body.style.backgroundColor = "#9aacbc"; 

            break;

        case 'Drizzle':

        case 'Rain':

            document.getElementById('weatherDesc_Icon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/826/826957.svg')";

            document.body.style.backgroundColor = "#a8c2db"; 

            break;

        case 'Snow':

            document.getElementById('weatherDesc_Icon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/614/614116.svg')";

            document.body.style.backgroundColor = "#e0f0ff"; 

            break;

        case 'Clouds':

            document.getElementById('weatherDesc_Icon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/414/414927.svg')";

            document.body.style.backgroundColor = "#a8c2db"; 

            break;

        case 'Fog':

            document.getElementById('weatherDesc_Icon').style.backgroundImage = "url('https://image.flaticon.com/icons/svg/305/305834.svg')";

            document.body.style.backgroundColor = "#a8c2db"; 

            break;


        default:

            break;
    }

    // weather App Display Elements

    let weatherDescription = document.getElementById('weatherDescription');

    let currentTemperature = document.getElementById('temperature');

    let currentHumidity = document.getElementById('current_humidity');

    let currentCity = document.getElementById('current_city');

    // weather Icon API 

    //let weatherDescriptionIcon = document.getElementById('weatherDescriptionIcon'); // 

    //weatherDescriptionIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    // taking from API and placing it on front end 

    let resultDescription = resultFromServer.weather[0].description;

    weatherDescription.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1); // charAt() --> add uppercase to first letter

    currentTemperature.innerText = Math.floor(resultFromServer.main.temp) + ' F';

    currentCity.innerText = resultFromServer.name;

    currentHumidity.innerText = resultFromServer.main.humidity + ' %' + ' Humidity';


}



// get search_button to search for input


document.getElementById('search_button').addEventListener('click', () => {

    // remove landing elements function

    removeLandingItems();


    // when button is pressed ... search what is in input

    let searchTerm = document.getElementById('search_input').value;

    console.log('btn clicked');

    if(searchTerm)
    
        searchWeather(searchTerm);

})

function removeLandingItems () {

    document.getElementById('landing_image').style.display = 'none';

    document.getElementById('landing_title').style.display = 'none';

    document.getElementById('landing_sub_title').style.display = 'none';

}
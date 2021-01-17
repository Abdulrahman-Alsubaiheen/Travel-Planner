/* Global Variables */
const geonames_url='http://api.geonames.org/searchJSON?'
// const geonames_username=process.env.GEONAMES_USERNAME;
const geonames_username='aboXmsa3d';

const weatherbit_url='https://api.weatherbit.io/v2.0/forecast/daily?'
// const weatherbit_key=process.env.WEATHERBIT_KEY;
const weatherbit_key='2786925f25eb4dbda5092a77308dadb7';

const pixabay_url='https://pixabay.com/api/?'
// const pixabay_key=process.env.PIXABAY_KEY;
const pixabay_key='19923689-9fad423265cae25149f469479';

let allData = {}

function handleSubmit(event) {
    event.preventDefault()

    const location =  document.getElementById('location').value;
    const start_date =  document.getElementById('start-date').valueAsNumber;
    const end_date =  document.getElementById('end-date').valueAsNumber;

    const total_days = tripDuration(start_date , end_date) ;

    allData.Total_days = total_days ;
    allData.Location = location ;

    //~~~ check the input ~~~

    getGeo()
    .then(function(data){
      getWeather();
      })
      .then(function(data){
        getPixabay()
      })
        .then(function(data){
          updateUI()
        })

      console.log(allData)

  
}

function tripDuration (start_date , end_date){

  const diffTime = Math.abs(end_date - start_date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  return diffDays;
}

async function getGeo(){
  const res = await fetch(`${geonames_url}placename=${allData.Location}&username=${geonames_username}&maxRows=1`)
  const data = await res.json();

  allData.Geo = {
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng
  }
}

async function getWeather(){
  const res = await fetch(`${weatherbit_url}city=${allData.Location}&lat=${allData.Geo.lat}&lng=${allData.Geo.lng}&key=${weatherbit_key}`)
  const data = await res.json();

  allData.Weather = {
    temp: data.data[0].temp,
    low_temp: data.data[0].low_temp,
    max_temp: data.data[0].max_temp,
  }
  }

async function getPixabay(){
  const res = await fetch(`${pixabay_url}q=${allData.Location}&key=${pixabay_key}&image_type=photo`)
  const data = await res.json();

  allData.Pixabay = {
    image_1: data.hits[0].webformatURL,
    image_2: data.hits[1].webformatURL
  }
}

function updateUI(){

  document.getElementById('destination').innerHTML = `The Destination : ${allData.Location}`;
  document.getElementById('total_days').innerHTML = `The Total days : ${allData.Total_days}`;

  document.getElementById('weather').innerHTML = `Average Temperature : ${allData.Weather.temp}, The Minimum Temperature : ${allData.Weather.low_temp} and The Maximum Temperature : ${allData.Weather.max_temp}`;

  document.getElementById('image_1').src = allData.Pixabay.image_1;
  document.getElementById('image_2').src = allData.Pixabay.image_2;


}

// ~~~~~~ ( GET ) data ~~~~~~
const getData = async (url) => {

  const response = await fetch(url)
    const data = await response.json();

    return data;
  }


// ~~~~~~ ( POST ) data ~~~~~~
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
  };


export { handleSubmit }

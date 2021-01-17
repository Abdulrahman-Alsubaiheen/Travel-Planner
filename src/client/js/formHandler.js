/* Global Variables */


function handleSubmit(event) {
    event.preventDefault()

    const location =  document.getElementById('location').value;
    const start_date =  document.getElementById('start-date').valueAsNumber;
    const end_date =  document.getElementById('end-date').valueAsNumber;

    const total_days = tripDuration(start_date , end_date) ;
    // console.log(total_days + " days");

    
    //check the input 


    //

    // getData(baseUrl , zip , API_Key)
    // .then(function(data){
    //   postData('/data', {date: newDate, feelings: feelings , temp: data.main.temp} );
    // })
    // .then(
    //   updateUI()
    // )
}

function tripDuration (start_date , end_date){

  const diffTime = Math.abs(end_date - start_date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  return diffDays;
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

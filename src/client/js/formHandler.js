function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const Url = document.getElementById('name').value

    // alert(" handleSubmit-> Url : " + Url);

    if(Client.checkForUrl(Url)){

        postData('http://localhost:8081/api' , {url : Url})

        .then(function(data){
            document.getElementById('agreement').innerHTML = `agreement: ${data.agreement}`;
            document.getElementById('confidence').innerHTML = `confidence: ${data.confidence}`;
            document.getElementById('irony').innerHTML = `irony: ${data.irony}`;
            document.getElementById('score_tag').innerHTML = `score_tag: ${data.score_tag}`;
            document.getElementById('subjectivity').innerHTML = `subjectivity: ${data.subjectivity}`;        
        })
    }

    else {
        alert('the URL is invalid.');
    }  

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

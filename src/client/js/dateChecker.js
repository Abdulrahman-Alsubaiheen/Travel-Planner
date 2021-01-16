function checkForDate(inputText) {

    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    if (pattern.test(inputText))
    {
      return true;
    }
    else
    {
      return false;
    }
}

export { checkForDate }


// var validUrl = require('valid-url');


// function UrlIsValid(inputText) {
//   if (validUrl.isUri(inputText)){
//     console.log('Looks like an URI');
//     return true;
// } else {
//     console.log('Not a URI');
//     return false;
// }
//   }
var date = new Date("11/10/2026");
var deleteDate = new Date("11/10/1999");


// set
function setCookie(key, value, date) {
    if(key.trim() == "" || value.trim() == "" || key== undefined || value== undefined ){
        throw('error');
    }else if(date==undefined){
        document.cookie = `${key}=${value}`;
    }else{
        document.cookie = `${key}=${value};expires=${date}`;
    }
  
}



// get
function getCookie(key) {
    var res = "not found";
  if (key == undefined || key.trim() == "") {
    throw ("error");
  } else {
    
    var data = document.cookie;
    var array = data.split("; ");
    array.forEach(function (element) {
      var keyValueArray = element.split("=");

      if (keyValueArray[0] === key) {
        res = keyValueArray[1];
      }
    });
    return res;
  }
}

// delete
function deleteCookie(key) {
    var res = false;
    if (key == undefined || key.trim() == "") {
      throw ("error");
    } else if(getCookie(key)==="not found"){
        res=false;
    } else{
      
      var data = document.cookie;
      var array = data.split("; ");
      array.forEach(function (element) {
        var keyValueArray = element.split("=");
  
        if (keyValueArray[0] === key) {
          res = true;
          setCookie(keyValueArray[0],'deleted',deleteDate);
        }
      });
    }
    return res;
}

deleteCookie('undefined');
deleteCookie('undefined');


// all cookies
function allCookiesList(){
    var data=document.cookie;
    var arr=data.split('; ');
    return arr;

}



function hasCookie(key){
    var res=true;
    if (getCookie(key)=="not found"){
        res=false;
    }
    return res;
}
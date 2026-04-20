 var localUser = {
 }
if(localStorage.USER_ID){
    localUser = {
    id:localStorage.USER_ID,
     nome : localStorage.USER_NOME,
     arroba : localStorage.USER_ARROBA,
     email : localStorage.USER_EMAIL,
     img : localStorage.USER_IMG,
     curvatura : localStorage.USER_CURVATURA,
    }
}else{
    window.location = "login.html"  
}
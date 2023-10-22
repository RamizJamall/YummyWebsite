  var del=0;
  var allmeals=[];
  var allareas=[];
  var allrandommeals=[];
  var allingred=[];
  var searchv=[];
  var oneMeal=[];
  var filtermeal=[];
  var searcha=[];
  var flags=["US" ,"GB","CA","CN","US" ,"NL","EG","PH" ,"FR","GR","IN","IE" ,"IT","CA","CN","US" ,"NL","EG","PH" ,"FR","GR","CN","US" ,"NL","EG","PH" ,"FR","GR"];

 
 


 
 function getRandom(){

   var x = new Promise  (  async function(fresh) {

    var req4 = await fetch('https://themealdb.com/api/json/v1/1/search.php?s');

    allrandommeals = await req4.json();

     console.log("randommeals done");
     
     display( allrandommeals.meals,"randommeals","idMeal","strMeal","strInstructions","strMealThumb");
     

      fresh();
     });

     
     
     return x;

    };


 function getAllmeals(){


     var y = new Promise (async function(jan){

  
      var req = await fetch('https://themealdb.com/api/json/v1/1/categories.php');

      allmeals = await req.json();
     
      console.log("categories done")
       jan();
     });



     return y;
     
    




  }


  function getAllareas(){

    var a = new Promise (async function(van){

      var req2 = await fetch('https://themealdb.com/api/json/v1/1/list.php?a=list');

      allareas = await req2.json();
   
      console.log("areas done")


        van();
    });


    return a;




  }


 function getAllingred(){

   var a = new Promise (async function(kan){


    var req3 = await fetch('https://themealdb.com/api/json/v1/1/list.php?i=list');
    allingred = await req3.json();
  
     console.log("ingred done")
       kan();
   });


  return a;


 }


async function test(){


 await getRandom();
 await getAllmeals();
 await getAllingred();
 await getAllareas();
 load();

};


test();




//getRandom().then(getAllmeals()).then(getAllareas()).then(getAllingred()).then(load());



function load(){ 
  console.log("screen load")
  if (2==2){
 $('.load').fadeOut(500,function(){

 $('body').css('overflow','visible')
 })
 }
    };


 
 
function loadOut(){


$('.loadsearch').fadeOut(500,function(){
    $('body').css('overflow','visible')
  })
}



function loadIn(){
  $('.loadsearch').fadeIn(500,function(){
    $('body').css('overflow','hidden')
  })
}





$('.cate').click(function(){
  $('.searchInput').html(``); 
    mode();
   display(allmeals.categories,"category","idCategory","strCategory","strCategoryDescription","strCategoryThumb");
})

$('.ingd').click(function(){

  $('.searchInput').html(``);
  display(allingred.meals,"ingredients","idMeal","strIngredient","strDescription","strCategoryThumb");
  mode();

})


function search(){
  
  $('.searchInput').html(``);
  $('.showMeals').html(``)
  $('.cards').html(``); 
  $('.searchInput').append(`
   
   <input type="text" class=" position-absolute z-1 m-3  form-control mb-5 col-lg-12 col-md-6 col-sm-4" onkeyup="dsearch(this.value)" placeholder="Search By Name">
   <input type="text" class=" form-control mb-5 col-lg-12 col-md-6 col-sm-4 opacity-0" onkeyup="dsearch(this.value)" placeholder="Search By Name">
    
   
   `)
    

}

async function dsearch(term){
  $('.loadsearch').css('display','flex')
  loadIn();
  var req5 = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`);

   searchv = await req5.json();
  if(searchv != []){
    loadOut();
 display(searchv.meals,"randommeals","idMeal","strMeal","strInstructions","strMealThumb");

  }
}
async function asearch(term){
  $('.loadsearch').css('display','flex')
  loadIn();
  var req9 = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${term}`);

   searcha = await req9.json();
  if(searcha != []){
    loadOut();
 display(searcha.meals,"randommeals","idMeal","strMeal","strInstructions","strMealThumb");

  }
}
 



function displayArea(){


   
  $('.showMeals').html(``)
  $('.searchInput').html(``);
  $('.cards').html(``);

 
  for(var i=0 ;i < allareas.meals.length; i++){

    $('.cards').append(`

    <div class=" col-lg-3 col-md-3 col-sm-12 pp">
     <div class="bbg overflow-hidden bg-white d-flex  justify-content-center   align-items-center  rounded-3"  onclick="asearch('${allareas.meals[i].strArea}')"  >
             
              <img src="https://flagsapi.com/${flags[i]}/shiny/48.png"  >
           
             
              <h3   class="m-3 w-50 text-center">${allareas.meals[i].strArea}</h3>
            
             </div>
            </div>
    
    `)
    del=(i*200)
    $('.pp').show(1000+del);



  }



}


function display(arr,typ,v0,v1,v2,v3){
  $('.showMeals').html(``)
  $('.cards').html(``); 
 for(var i=0 ;i < 15 ; i++)
{

  const id = arr[i][v0] ;                              
  const category = arr[i][v1];
  const description= arr[i][v2];
  const thumb=arr[i][v3];
  if(category=="category"){

    category =  category.toLowerCase()
  }

$('.cards').append(`

<div class=" col-lg-3 col-md-3 col-sm-12 pp">
 <div class="bbg overflow-hidden bg-white  rounded-3" >
        <div class="position-absolute h-100 d-flex flex-column bh d-flex align-items-center" onclick="get('${ typ === "ingredients" ?  category :  id}')">
    
             <h2  class="m-2">${category}</h2>
             <p class="hat text-center ms-2 me-2">
             ${typ === "randommeals" ? "" : description.slice(0,100)}
             </p>
          </div>
          <img src=${typ === "randommeals" ? thumb : `https://www.themealdb.com/images/${typ}/${category.split(" ")[0]}.png` }  width="100%
         " >
         </div>
        </div>

`)
del=(i*200)
$('.pp').show(1000+del);
}

}   

async function get(elmo){
 
$('.cards').html(``); 



if(elmo>15){
  $('.loadsearch').css('display','flex')
  loadIn();
var req6 = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${elmo}`);
oneMeal = await req6.json();

  if(oneMeal != []){


    console.log(elmo)
    instopage();
    loadOut();
  }

}
else if(elmo <=15){
 
   const m=allmeals.categories[elmo-1].strCategory;
   console.log(m);
   $('.loadsearch').css('display','flex')
   loadIn('loadsearch');
  var req7 = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${m}`);
  filtermeal = await req7.json();
  if(filtermeal != []){
    loadOut('loadsearch'); 
  display(filtermeal.meals,"randommeals","idMeal","strMeal","strCategoryDescription","strMealThumb");
  }
}
else{
  $('.loadsearch').css('display','flex')
  loadIn('loadsearch');
  var req10 = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${elmo}`);
  filterintegrats = await req10.json();
  if(filterintegrats != []){
    loadOut('loadsearch'); 
  display(filterintegrats.meals,"randommeals","idMeal","strMeal","strCategoryDescription","strMealThumb");
  }
}


}


function instopage(){

  $('.searchInput').html(``);
$('.cards').html(``); 
 $('.showMeals').append(`
 <div class="row m-3">
 <div class="left col-lg-4">

   <img src=" ${oneMeal.meals[0].strMealThumb}" alt="" width="100%">
   <h2 class=" bg-white text-center m-3 ">${oneMeal.meals[0].strMeal}</h2>
 </div>    
 <div class="right col-lg-8">

   <div class=' w-25  bg-white '>
  <h2 class=' m-3 '>Instructions</h2>
  </div>

  <p class="h4">
        ${oneMeal.meals[0].strInstructions}
  </p>

  <h2>Area : <span class="h4"> ${oneMeal.meals[0].strArea}</span>  </h2>
  <h2>Category : <span  class="h4" > ${oneMeal.meals[0].strCategory}</span>  </h2>
  <h2>Recipes : </h4>
  <div class=" container">
   <div class="row ">

     ${
      (() => {
        let result = '';
      
        for (var i = 0; i < 20; i++) {
          if (oneMeal.meals[0][`strMeasure${i+1}`] === null || oneMeal.meals[0][`strMeasure${i+1}`] === '' ||oneMeal.meals[0][`strMeasure${i+1}`] === ' '){
            result += ` `;
          }
          else{
          result += `
            <div class="col-lg-4">
              <h6 class="bg-white hat p-2 text-center rounded-3 text-black">${oneMeal.meals[0][`strMeasure${i+1}`]}</h6>
            </div>
          `;
          }
        }
        return result;
      })()
     }
 
   </div>
  </div>


 </div>   


</div>



 `)





}






function mode(){

  if ($('.dropv').css("left")=="-220px"){
    $('.dropv').animate({"left":"0"}, 500);
    }
    else
    {
      $('.dropv').animate({"left":"-220px"}, 500);
    }
      
   $('.x').toggleClass('d-none');
   $('.men').toggleClass('d-none');
     
  
  
    $('li').slideToggle(900);

}


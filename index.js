let pageNum = 1
const baseUrl = `https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}&per_page=50`
const nextPage = document.querySelector('#next')
const previousPage = document.querySelector('#previous')
const collection = document.querySelector('#all-Breweries')
const nextSearchPage = document.querySelector('#moreSearched')
const getShowAll = document.querySelector('#toggleList')
let submit = document.querySelector('#cityForm')


document.addEventListener('DOMContentLoaded', () => {

  getBrews() 
  
  nextPage.addEventListener('click', handleNextPage)

   previousPage.addEventListener('click', handlePreviousPage) 
         
   
   submit.addEventListener('submit', handleSubmit)
  
   nextSearchPage.addEventListener('click', moreBySearchedCity)

   let searchedCity = document.getElementById('citySearch').value
   
   nextSearchPage.innerHTML = ` More Breweries in this city`
  
   
})
            
    const getBrews = () => {
        fetch(baseUrl) 
        .then(resp => resp.json())
        .then((breweries) =>  {
            collection.innerHTML = `Page ${pageNum}` 
           
            breweries.forEach((element) => {   
             collection.append(renderBrewery(element), document.createElement('hr'))
            })
        })
        }    

     function renderBrewery (element){
    
        const breweryList = document.createElement('section')
        breweryList.className = 'card'
        const brewName =  document.createElement('div')
        brewName.innerHTML = `${element.name}, ${element.city}`
        brewName.dataset.id = element.id
        return brewName

     }  
    

     const handleNextPage = () => {  
       pageNum+=1
       fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}&per_page=50`)
       .then(resp => resp.json())
       .then(breweries => {
        
        if(breweries.length === 0){
          pageNum -= 1
          window.alert('You are on the Final page')

        }else{ collection.innerHTML = `Page ${pageNum}` 
        breweries.forEach((element) => {
            collection.append(renderBrewery(element),document.createElement('hr'))
       })}            
    }) 
   
     }

     const handlePreviousPage = () => {
         if(pageNum===1){
           window.alert('You are on the first page')
       }else{ 
          pageNum -= 1
           fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}&per_page=50`)
           .then(resp=>resp.json())
           .then((breweries) => {
             collection.innerHTML = `Page ${pageNum}` 
              breweries.forEach((element) => {
               collection.append(renderBrewery(element),document.createElement('hr'), )
              })
           })
        }
     }

     const handleSubmit = (e) => { 
        e.preventDefault() 
        let pageNum = 1
        let searchedCity = document.getElementById('citySearch').value

        fetch(baseUrl + '&' + `by_city=${searchedCity}`)
        .then(resp=>resp.json())
        .then((breweries)=>{
            collection.innerHTML = `Page ${pageNum}`
            breweries.forEach((element) => {
               if(element.city===searchedCity){
                    
                     collection.append(renderBrewery(element), document.createElement('hr'))
               }
              
             })    

             })  
             if(searchedCity === ''){
                 window.alert('Please enter a valid city in Oregon')
             }
     }

    const moreBySearchedCity = (e) => {
        // e.preventDefault() only needed on forms, prevents default post req, which would prevent fetch/ submit

        let searchedCity = document.getElementById('citySearch').value

         fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&by_city=${searchedCity}&per_page=50&page=2`)
         .then(resp=>resp.json())
         .then((breweries)=>{
             collection.innerHTML = `Page ${pageNum}`
             breweries.forEach((element) => {
                if(element.city===searchedCity){
                      collection.append(renderBrewery(element), document.createElement('hr'))
                }
             })   
         }) 
        
    }  
 
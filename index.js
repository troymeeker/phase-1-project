let pageNum = 1
const baseUrl = `https://api.openbrewerydb.org/breweries?by_state=oregon&${pageNum}`
const nextPage = document.querySelector('#next')
const previousPage = document.querySelector('#previous')
const collection = document.querySelector('#all-Breweries')


document.addEventListener('DOMContentLoaded', () => {

  getBrews() 
// const liker = document.createElement('button')
// liker.innerHTML = ('')
// const unliker = document.createElement('button')
// unliker.innerHTML = ('X')  
  
  nextPage.addEventListener('click', handleNextPage)

   previousPage.addEventListener('click', handlePreviousPage) 
     //submit -filters by city      
   let submit = document.querySelector('#cityForm')
   submit.addEventListener('submit', handleSubmit)

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
     const handleNextPage = (e) => {  
       pageNum+=1
       fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}`)
       .then(resp => resp.json())
       .then(breweries => {
        // console.log(breweries)
        if(breweries.length === 0){
          pageNum -= 1
          window.alert('You are on the Final page')
        }else{ collection.innerHTML = `Page ${pageNum}` 
        breweries.forEach((element) => {
            collection.append(renderBrewery(element),document.createElement('hr'))
       })}            
    }) 
   
     }

     const handlePreviousPage = (e) => {
         if(pageNum===1){
           window.alert('You are on the first page')
       }else{ 
          pageNum -= 1
           fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}`)
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
        let searchedCity = document.getElementById('citySearch').value
        fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&by_city=${searchedCity}`)
        .then(resp=>resp.json())
        .then((breweries)=>{
            collection.innerHTML = `Page ${pageNum}`
            breweries.forEach((element) => {
               if(element.city===searchedCity){
                    console.log(element)
                     collection.append(renderBrewery(element), document.createElement('hr'))
               }
              
             })    

             })   
           
     }
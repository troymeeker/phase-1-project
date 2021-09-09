document.addEventListener('DOMContentLoaded', () => {
let pageNum = 1
const baseUrl = `https://api.openbrewerydb.org/breweries?by_state=oregon&${pageNum}`
const nextPage = document.querySelector('#next')
const previousPage = document.querySelector('#previous')
const collection = document.querySelector('#all-Breweries')
//  collection.innerHTML = `Page ${pageNum}` 

// const liker = document.createElement('button')
// liker.innerHTML = ('')
// const unliker = document.createElement('button')
// unliker.innerHTML = ('X')
            
   const getBrews = () => {
        fetch(baseUrl) 
        .then(resp => resp.json())
        .then((breweries) =>  {
            collection.innerHTML = `Page ${pageNum}` 
            breweries.forEach((element) => {   
             collection.append(renderBrewery(element), document.createElement('hr'))
            })
        }
     )} 
     function renderBrewery (element){
    
        const breweryList = document.createElement('section')
        breweryList.className = 'card'
        const brewName =  document.createElement('div')
        brewName.innerHTML = `${element.name}, ${element.city}`
         brewName.dataset.id = element.id
       return brewName

        }    
    getBrews() 
  
  nextPage.addEventListener('click', () => {
      pageNum+=1
      fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}`)
      .then(resp => resp.json())
      .then(breweries => {
        console.log(breweries)
        if(breweries.length === 0){
          pageNum -= 1
          window.alert('You are on the Final page')
        }else{ collection.innerHTML = `Page ${pageNum}` 
        breweries.forEach((element) => {
            collection.append(renderBrewery(element),document.createElement('hr'))
       })}            
    }) 
   })

   previousPage.addEventListener('click', (e) => {
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
     }) 
     //submit -filters by city      
     let submit = document.querySelector('#cityForm')
     submit.addEventListener('submit', ()=>{
         fetch(`https://api.openbrewerydb.org/breweries?by_state=oregon&page=${pageNum}`)
        .then(resp=>resp.json())
        .then((breweries)=>{
            collection.innerHTML = `Page ${pageNum}` 
            breweries.forEach((element) => {
              const filteredBrews = breweries.filter((element)=>{
                     return element.city === element.city;
              })      
      })
        })
     })
        

  
      })
  


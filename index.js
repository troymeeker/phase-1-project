document.addEventListener('DOMContentLoaded', () => {

const baseUrl = `https://api.openbrewerydb.org/breweries?by_state=colorado&`
 
     
   const getBrews = () => {
        fetch(baseUrl) 
        .then(resp => resp.json())
        .then(breweries =>  
            breweries.forEach(element => { 
                let brewInfo = element.name  + ' ' +  element.city + ', '  + element.state
                const collection = document.querySelector('#all-Breweries')
                collection.append(brewInfo);
                renderBrewery(element)
                
            
        })
     )} 
     function renderBrewery (brewInfo){
    //create div w class card
        const breweryList = document.createElement('ul')
        breweryList.className = 'card'
        
        // let brewInfo = element.name  && ' ' &&  element.city && ', '  && element.state
        const brewName =  document.createElement('li')
  
        brewName.innerText = brewInfo
       
        //HELP with error message here
        //want brewery name & City, State

        breweryList.append(brewName)
       

        const collection = document.querySelector('#all-Breweries')
    
        collection.append(breweryList)
        //append to collection
        //get collection
        //append it
     }
    
    
    getBrews()  
    
   

  const submit = document.getElementById('submit')
  
   submit.addEventListener('click', (e) => {

  }) 
  //if(element.name === citySearch.innerHTML){
    //return 
  //}
 


})

document.addEventListener('DOMContentLoaded', () => {

const baseUrl = 'https://api.openbrewerydb.org/breweries?by_state=oregon'
 
      
    const getBrews = () => {
        fetch(baseUrl) 
        .then(resp => resp.json())
        .then(breweries =>  
            breweries.forEach(brew => {
                console.log(brew.name)
                console.log(brew.city)
                console.log(brew.website_url);
                renderBrewery(brew)

            })) 
     } 
     const renderBrewery = (element) => {
    //create div w class card
        const breweryItem = document.createElement('div')
        breweryItem.className = 'card'

        const brewName =  document.createElement('h2')
        brewName.innerHTML = element.name
        //HELP with error message here

        breweryItem.append(brewName)
       

        const allBreweries = document.querySelector('#all-Breweries')
    
        allBreweries.append(breweryItem)
        //append to collection
        //get collection
        //append it

     

     }
    
    renderBrewery()
    getBrews()    
    
    // const breweries = baseUrl.names
   
//    forEach
   //filter by state w/ dropdown of specific cities & returns top 20 in that city
   // turn to p elements
   //append each state to the dom in list
   //favorite

  const submit = document.getElementById('submit')
  
   submit.addEventListener('click', (e) => {
      
      


  }) 

//   const state = document.getElementById('stateSearch')
  //state.innerHTML = 
})

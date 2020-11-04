const jscontainer = document.getElementById('jscontainer');



printCountries();


async function printCountries(){
    try{
        countries = await getCountries();
        console.log(countries);
        countries.sort((a, b) => {
            return a.population - b.population;
        });

        const column1 = document.createElement('ul');
        const column2 = document.createElement('ul');
        const column3 = document.createElement('ul');
        const numCountries = countries.length;
        countries.map((country, i) =>{
            let name = country.name;
            let countryDiv = document.createElement('li');
            countryDiv.setAttribute('class', 'country-container');
            let flagAndNameDiv = document.createElement('div');
            flagAndNameDiv.setAttribute('class','flag-name')
            let countryFlag = document.createElement('img');
            countryFlag.setAttribute('class', 'flag');
            countryFlag.setAttribute('src', country.flag);
            flagAndNameDiv.appendChild(countryFlag);
            let countryNameDiv = document.createElement('span');
            countryNameDiv.textContent = name;

            switch (country.region){
                case 'Americas':
                    countryNameDiv.setAttribute('class', 'americas');
                    break;
                case 'Europe':
                    countryNameDiv.setAttribute('class','europe');
                    break;
                case 'Asia':
                    countryNameDiv.setAttribute('class', 'asia');
                    break;
                case 'Africa':
                    countryNameDiv.setAttribute('class', 'africa');
                    break;
                case 'Oceania':
                    countryNameDiv.setAttribute('class', 'oceania');
                    break;
                default:
                    countryNameDiv.setAttribute('class', 'unknown-continent');
            }
            flagAndNameDiv.appendChild(countryNameDiv);
            countryDiv.appendChild(flagAndNameDiv);
            let populationDiv = document.createElement('div');
            countryDiv.appendChild(populationDiv);
            let columnNum = Math.floor(i/numCountries*3)+1;
            let column;
            switch (columnNum){
                case 1:
                    column = column1;
                    break;
                case 2:
                    column = column2;
                    break;
                case 3:
                    column = column3;
                    break;
                default:
                    column = column3;
            }
            countryDiv.addEventListener('click', ()=>{
                let popSpan = document.createElement('span');
                popSpan.setAttribute('class','population');
                popSpan.setAttribute('id', ('pop' + i));
                popSpan.textContent= "Population: " + country.population;
                try {
                    const oldPop = document.getElementById(('pop' + i));
                    populationDiv.removeChild(oldPop);
                } catch(e){
                    populationDiv.appendChild(popSpan);
                } finally {

                }

            })
            column.appendChild(countryDiv)
        })
        jscontainer.appendChild(column1);
        jscontainer.appendChild(column2);
        jscontainer.appendChild(column3);
    } catch (e){
        console.error(e);
    }
}

async function getCountries() {
    try {
        const countries = await axios.get('https://restcountries.eu/rest/v2/all');
        return countries.data;
    } catch (e) {
        return e;
    }

}
const searchField = document.getElementById('searchbox');
const submitButton = document.getElementById('submitbutton');

const countryInfoContainer = document.getElementById('countryinfo-container')

submitButton.addEventListener('click', parseResult);
searchField.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        parseResult();
    }
})

//searchField.addEventListener('input', parseCountryInfo);

async function parseResult() {
    const resultDiv = document.createElement('div');
    resultDiv.setAttribute('id', 'searchresult');

    const countryList = await getCountries(searchField.value);
    if(countryList && countryList.length !== 0){
        countryList.map((country) => {
            const currentCountryDiv = getCountryInfoDiv(country);
            resultDiv.appendChild(currentCountryDiv);
        })
    }else{
        noresultDiv = document.createElement('div');
        noresultDiv.textContent = "No such country found!";
        resultDiv.appendChild(noresultDiv);
    }

    try {
        const oldResult = document.getElementById('searchresult');
        countryInfoContainer.removeChild(oldResult);
    } catch(e){

    } finally {
        countryInfoContainer.appendChild(resultDiv);
    }

}

function getCountryInfoDiv(country) {

    const countryDescription = buildCountryDescription(country);
    const capitalDescription = buildCapitalDescription(country);
    const currencyDescription = buildCurrencyDescription(country);
    const languageDescription = buildLanguageDescription(country);
    const flagUrl = country.flag;

    //build country information div
    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.setAttribute('class', 'country');
    const flagElement = document.createElement('img');
    flagElement.setAttribute('src', flagUrl);
    flagElement.setAttribute('width', '400px');
    countryInfoDiv.appendChild(flagElement);
    const countryText = document.createElement('div');
    countryText.textContent = countryDescription + " " + capitalDescription + " " + currencyDescription + " " + languageDescription;
    countryInfoDiv.appendChild(countryText);

    return countryInfoDiv;
}

async function getCountries(countryName) {
    try {
        const countries = await axios.get('https://restcountries.eu/rest/v2/name/' + countryName);
        console.log(countries)
        return countries.data;
    } catch (e) {
    }

}

function buildCountryDescription(country) {
    return country.name + " is situated in " + country.subregion + ". It has a population of " + country.population + " people.";
}

function buildCapitalDescription(country) {
    return "The capital is " + country.capital;
}

function buildCurrencyDescription(country) {
    const currencies = country.currencies;
    let output = "and you can pay with "
    currencies.map((currency, i) => {
        if (i === 0) {
            output = output + currency.name + "\'s";
        } else if (i < currencies.length - 1) {
            output = output + ", " + currency.name + "\'s";
        } else {
            output = output + " and " + currency.name + "\'s";
        }
    })
    output += "."
    return output;
}

function buildLanguageDescription(country) {
    const languages = country.languages;
    let output = "They speak "
    languages.map((language, i) => {
        if (i === 0) {
            output += language.name + ".";
        } else if (i < languages.length - 1) {
            output += ", " + language.name;
        } else {
            output += " and " + language.name;
        }
    })
    return output;
}
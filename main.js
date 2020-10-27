const searchField = document.getElementById('searchbox');
const submitButton = document.getElementById('submitbutton');
const form = document.getElementById('countrysearch')

const countryInfoContainer = document.getElementById('countryinfo-container')

submitButton.addEventListener('click', parseCountryInfo);
searchField.addEventListener('keydown', (e) => {
    if (e.keyCode === 13){
        e.preventDefault();
        parseCountryInfo();
    }
} )

//searchField.addEventListener('input', parseCountryInfo);

async function parseCountryInfo() {
    country = await getCountry(searchField.value);
    console.log(country);
    const countryDescription = buildCountryDescription(country);
    console.log(countryDescription);
    const capitalDescription = buildCapitalDescription(country);
    console.log(capitalDescription);
    const currencyDescription = buildCurrencyDescription(country);
    console.log(currencyDescription);
    const languageDescription = buildLanguageDescription(country);
    console.log(languageDescription);
    const flagUrl = country.flag;

    //build country information div
    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.setAttribute('id' , 'countryinfo')
    countryInfoDiv.setAttribute('class','country');
    const flagElement = document.createElement('img');
    flagElement.setAttribute('src',flagUrl);
    flagElement.setAttribute('width', '400px');
    countryInfoDiv.appendChild(flagElement);
    const countryText = document.createElement('div');
    countryText.textContent = countryDescription + " " + capitalDescription + " " + currencyDescription + " " + languageDescription;
    countryInfoDiv.appendChild(countryText);

    try{
        const oldcountryelement = document.getElementById('countryinfo')
        countryInfoContainer.removeChild(oldcountryelement);
    } catch (e){
        console.log("De catch wordt uitgevoerd")
    } finally {
        countryInfoContainer.appendChild(countryInfoDiv);
    }
}

async function getCountry(countryName) {
    try {
        const country = await axios.get('https://restcountries.eu/rest/v2/name/' + countryName);
        return country.data[0];
    } catch (e) {
        console.error(e);
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
            output += language.name;
        } else if (i < languages.length - 1) {
            output += ", " + language.name;
        } else{
            output += " and " + language.name;
        }
    })
    return output;
}
const countriesEl = document.getElementById('countries');
const filterBtn = document.getElementById('filter');
const searchEl = document.getElementById('search');
const modal = document.getElementById('info');
const closeBtn = document.getElementById('close');
const regionFilters = filterBtn.querySelectorAll('li')
const populationBtn = document.getElementById('population');
const populationFilters = filterBtn.querySelectorAll('li')
const languagesBtn = document.getElementById('languages');
const languagesFilters = filterBtn.querySelectorAll('li')

getCountries();

async function getCountries() {
	const res = await fetch('https://restcountries.com/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}

function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');

		countryEl.innerHTML = `
            <div  >
                <img src="${country.flag}"   alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p class="country-population">
                    Population:
                    ${country.population}
                </p>
                <p class="country-region">
                    Region:
                    ${country.region}
                </p>
                <p>
                    Capital:
                    ${country.capital}
                </p>
            </div>
        `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showCountryDetails(country);
		});

		countriesEl.appendChild(countryEl);
	});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.modal-body');
	const modalImg = modal.querySelector('img');
   
	modalImg.src = country.flag;
    
	modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            Native Name:
            ${country.nativeName}
        </p>
        <p>
            Alpha 2 code:
            ${country.alpha2Code}
        </p>
        <p>
            Capital:
            ${country.capital}
        </p>
        <p>
            Region:
            ${country.region}
        </p>
        <p>
        Population:
        ${country.population}
    </p>
        <p>
        LatLng:
        ${country.latlng}
        </p>
        <p>
        Area:
        ${country.area}
        </p>
        <p>
        Timezone:
        ${country.timezones}
        </p>
        <p>
            Currencies:
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p class="country-languages">
            Languages:
            ${country.languages.map(language => language.name)}
        </p>
        <p>
        
        <button class="neighbour" id="neighbore">
					${country.borders}
				</button>
    `;
    
}




filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});

populationBtn.addEventListener('click', () => {
	populationBtn.classList.toggle('open');
});

languagesBtn.addEventListener('click', () => {
	languagesBtn.classList.toggle('open');
});


closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});



searchEl.addEventListener('input', e => {
	const { value } = e.target;
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});



regionFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'Refresh') {
				
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});






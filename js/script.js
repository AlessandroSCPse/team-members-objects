// Partendo dall'array di oggetti di squadre di calcio e dal relativo
// template html:
// 1- stampare in pagina le squadre di calcio considerando che non 
// tutte le squadre hanno l'anno di fondazione e l'allentarore

// 2- al click su add favourite, si deve incrementare il 
// relativo counter, ma solo se la squadra non fa già parte 
// delle mie squadre preferite

const teams = [
    {
        name: 'Ascoli',
        coach: {
            name: 'Christian Bucchi',
            age: 45
        },
        founded: 1898,
        favourites: 4999
    },
    {
        name: 'Milan',
        coach: {
            name: 'Stefano Pioli',
            age: 57
        },
        founded: 1899,
        favourites: 10
    },
    {
        name: 'ASD Porto S. Elpidio Calcio',
        coach: null,
        founded: null,
        favourites: 250
    },
];

// Parte all'avvio della pagina
drawAllTeams(teams);

// -------------
// EVENT LISTENERS
// -------------
const allFavouriteClickable = document.querySelectorAll('.js-favourite-btn');
const allFavouriteTexts = document.querySelectorAll('.js-favourite-numb');
for(let i = 0; i < allFavouriteClickable.length; i++) {
    const thisFavouriteBtn = allFavouriteClickable[i];
    thisFavouriteBtn.addEventListener('click', function(event) {
        // Evitiamo il comportamento di default del browser
        event.preventDefault();

        // Incrementiamo il like solo se l'elemento su cui ho cliccato non ha gia classe clicked
        if(!this.classList.contains('clicked')) {
            // Aggiungo all'elemento cliccato la classe 'clicked'
            this.classList.add('clicked');
            // Prenderci l'elemento html di testo che ha il numero relativo a questo btn
            const relatedNumberText = allFavouriteTexts[i];
            // Ci prendiamo il numero dentro relatedNumberText
            let relatedNumber = parseInt(relatedNumberText.innerHTML);
            console.log(relatedNumber);
            // Incrementiamo di 1
            relatedNumber++;
            // Scriviamo il numero incrementato dentro relatedNumberText
            relatedNumberText.innerHTML = relatedNumber;
        }
    });
}

// -------------
// FUNCTIONS
// -------------

// Per ogni elemento di teams lo stampo in pagina
// teamsArray -> array di squadre
function drawAllTeams(teamsArray) {
    const teamsContainer = document.querySelector('.teams-container');

    for(let i = 0; i < teamsArray.length; i++) {
        const thisTeam = teamsArray[i];
        const {name, coach, founded, favourites} = thisTeam;

        // Per ogni squadra creo il template e lo stampo
        // Qui sotto i ternari hanno 2 approcci diversi, scegliete il preferito :)
        const teamTemplate = `
        <div class="team">
            <h2 class="team-name">${name}</h2>
            ${founded ? getFoundedTeamHtml(founded) : '' }

            ${coach === null ? 'Al momento nessu allenatore' : getCoachTeamHtml(coach)}

            <div class="actions-container">
                <a href="#" class="js-favourite-btn">Add to favourite</a>

                <div><span class="js-favourite-numb">${favourites}</span> favourites</div>
            </div>
        </div>
        `;

        teamsContainer.innerHTML += teamTemplate;
    }
}

function getFoundedTeamHtml(foundedYear) {
    return `
    <div class="team-founded">
        Since ${foundedYear}
    </div>
    `;
}

function getCoachTeamHtml(teamCoach) {
    return `
    <div class="team-coach">
        <h3>${teamCoach.name}</h3>
        <div>${teamCoach.age} anni</div>
    </div>
    `;
}
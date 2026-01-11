// Team data
const teams = [
    {
        name: 'Licensee',
        description: 'As the Licensee of TEDxMGMU, Prof. Vijaya Musande leads with a steady and guiding vision. She guides students to channel curiosity into clear, substantive ideas worth sharing. Her approach nurtures discipline, humility, and respect, nurturing thoughtful voices on stage and beyond.',
        icon: 'fa-certificate',
        image: 'assets/teams/Licencee.png',
        designation: 'Prof. Vijaya Musande'
    },
    {
        name: 'Faculty Coordinator',
        description: 'Associate Professor, Naval Architecture Department',
        icon: 'fa-user-tie',
        image: 'assets/teams/facultycoordinator2.webp',
        designation: 'Ar. Saranga. S. Naval'
    },
    {
        name: 'Faculty Coordinator',
        description: 'Asst Professor, Computer Science & Engineering Department, JNEC',
        icon: 'fa-user-tie',
        image: 'assets/teams/facultycoordinator1.webp',
        designation: 'Sukhwant Kour Siledar'
    },
    {
        name: 'Co-Licensee',
        description: 'Leading TEDx event oversight',
        icon: 'fa-certificate',
        image: 'assets/teams/Co-Licensee .webp'
    },
    {
        name: 'Advisory',
        description: 'Providing strategic guidance and mentorship',
        icon: 'fa-lightbulb',
        image: 'assets/teams/Advisory1by1.webp'
    },
    // --- The cards below this point will be shuffled ---
    {
        name: 'Web Development',
        description: 'Building digital experiences',
        icon: 'fa-code',
        image: 'assets/teams/Web Development.webp'
    },
    {
        name: 'Technical',
        description: 'Powering seamless event operations',
        icon: 'fa-tools',
        image: 'assets/teams/Technical.webp'
    },
    {
        name: 'Creatives',
        description: 'Bringing ideas to life through design',
        icon: 'fa-palette',
        image: 'assets/teams/Creatives.webp'
    },
    {
        name: 'Social Media and Marketing',
        description: 'Amplifying our voice across platforms',
        icon: 'fa-bullhorn',
        image: 'assets/teams/Social Media and Marketing.webp'
    },
    {
        name: 'Curation',
        description: 'Selecting speakers and shaping content',
        icon: 'fa-search',
        image: 'assets/teams/Curation.webp'
    },
    {
        name: 'Sponsorship',
        description: 'Building partnerships and collaborations',
        icon: 'fa-handshake',
        image: 'assets/teams/Sponsorship.webp'
    },
    {
        name: 'Budget',
        description: 'Managing financial planning and resources',
        icon: 'fa-calculator',
        image: 'assets/teams/Budget.webp'
    },
    {
        name: 'Logistics',
        description: 'Coordinating event operations',
        icon: 'fa-truck',
        image: 'assets/teams/Logistics.webp'
    },
    {
        name: 'Hospitality',
        description: 'Ensuring comfort and care for guests',
        icon: 'fa-coffee',
        image: 'assets/teams/Hospitality.webp'
    },
    {
        name: 'Documentation',
        description: 'Capturing and preserving moments',
        icon: 'fa-camera',
        image: 'assets/teams/Documentation.webp'
    },
    {
        name: 'Event Management',
        description: 'Orchestrating seamless execution',
        icon: 'fa-calendar-check',
        image: 'assets/teams/Event Management.webp'
    },
    {
        name: 'Graphics Designing',
        description: 'Creating visual identity',
        icon: 'fa-paint-brush',
        image: 'assets/teams/Graphics Designing.webp'
    }
];

// State management
let showingAll = false;
const INITIAL_TEAMS_COUNT = 5; 
let displayedTeamList = []; 

// --- 1. Shuffle Logic ---
function getShuffledTeams() {
    const fixedTeams = teams.slice(0, 5);
    let randomTeams = teams.slice(5);
    for (let i = randomTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomTeams[i], randomTeams[j]] = [randomTeams[j], randomTeams[i]];
    }
    return [...fixedTeams, ...randomTeams];
}

// --- NEW createTeamCard function ---
function createTeamCardNew(team, index, isSpecialCard) {
    let colClass = '';
    // SpecialCard implies the card needs to fit its content
    let extraWrapperClass = isSpecialCard ? 'team-card-fit-content' : ''; 

    if (isSpecialCard) { // This covers the first card.
        colClass = 'col-auto team-tier-1';
    } else if (index === 1 || index === 2) {
        colClass = 'col-12 col-md-6 col-lg-6 team-tier-2';
    } else if (index === 3 || index === 4) {
        colClass = 'col-12 col-md-6 col-lg-4 team-tier-2';
    } else { // All other cards
        colClass = 'col-12 col-md-6 col-lg-3 team-tier-3';
    }
    
    const nameDisplay = team.designation ? team.designation : team.name;
    
    return `
        <div class="${colClass} ${extraWrapperClass} team-card-wrapper" data-index="${index}">
            <div class="team-card" style="animation-delay: ${(index % INITIAL_TEAMS_COUNT) * 0.1}s">
                <div class="team-image-wrapper">
                    <img src="${team.image}" alt="${nameDisplay}" class="team-image" loading="lazy">
                    <div class="team-overlay">
                        <i class="fas ${team.icon} team-icon"></i>
                    </div>
                </div>
                <div class="team-content">
                    <h3 class="team-name">${nameDisplay}</h3>
                    <p class="team-role">${team.name}</p>
                    <p class="team-description">${team.description}</p>
                </div>
            </div>
        </div>
    `;
}

// --- NEW renderTeamCards function ---
function renderTeamCardsNew(showAll = false) {
    const teamSection = document.getElementById('team');
    const teamGrid = document.getElementById('teamGrid');

    // Clear existing content
    teamGrid.innerHTML = '';
    const existingSpecialRow = teamSection.querySelector('.special-row');
    if (existingSpecialRow) {
        existingSpecialRow.remove();
    }

    const firstCardData = displayedTeamList[0];
    // Remaining cards for the main grid. 
    // If showing all, take from index 1. If not, take from index 1 up to INITIAL_TEAMS_COUNT.
    const remainingCardsForGrid = showAll ? displayedTeamList.slice(1) : displayedTeamList.slice(1, INITIAL_TEAMS_COUNT);

    // Create a new row for the first card and insert it before the grid
    const specialRowContainer = document.createElement('div');
    specialRowContainer.className = 'row justify-content-center special-row mb-4'; // Added mb-4 for spacing
    specialRowContainer.innerHTML = createTeamCardNew(firstCardData, 0, true); // Mark as special card
    teamGrid.parentNode.insertBefore(specialRowContainer, teamGrid);

    // Add the rest of the cards to the main grid
    remainingCardsForGrid.forEach((team, originalIndex) => {
        // originalIndex here is 0-based for `remainingCardsForGrid`, so add 1 to get actual index in `displayedTeamList`
        const actualIndex = originalIndex + 1;
        const isSpecialCard = false;
        teamGrid.insertAdjacentHTML('beforeend', createTeamCardNew(team, actualIndex, isSpecialCard));
    });

    // Handle "View More" / "View Less" button
    const buttonWrapperId = 'viewMoreButtonWrapper';
    let buttonWrapper = document.getElementById(buttonWrapperId);
    if (buttonWrapper) {
        buttonWrapper.remove();
    }

    if (displayedTeamList.length > INITIAL_TEAMS_COUNT) {
        buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'col-12 text-center mt-4';
        buttonWrapper.id = buttonWrapperId;

        if (showAll) {
            buttonWrapper.innerHTML = `
                <button class="btn btn-outline-danger btn-lg" id="viewMoreTeamsBtn">
                    View Less <i class="fas fa-chevron-up ms-2"></i>
                </button>
            `;
        } else {
            buttonWrapper.innerHTML = `
                <button class="btn btn-outline-danger btn-lg" id="viewMoreTeamsBtn">
                    View More Teams <i class="fas fa-chevron-down ms-2"></i>
                </button>
            `;
        }
        teamGrid.appendChild(buttonWrapper);
        document.getElementById('viewMoreTeamsBtn').addEventListener('click', toggleTeamsNew);
    }
}


// --- NEW toggle function ---
function toggleTeamsNew() {
    showingAll = !showingAll;
    renderTeamCardsNew(showingAll);
    
    if (!showingAll) {
        document.getElementById('team').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}


// Create team card HTML (Original - kept for reference, not used by new functions)
function createTeamCard(team, index) {
    let colClass = '';

    if (index < 3) {
        colClass = 'col-12 col-md-6 col-lg-4 team-tier-1';
    } else if (index < 5) {
        colClass = 'col-12 col-md-6 col-lg-6 team-tier-2';
    } else {
        colClass = 'col-12 col-md-6 col-lg-3 team-tier-3';
    }
    
    const nameDisplay = team.designation ? team.designation : team.name;
    
    return `
        <div class="${colClass} team-card-wrapper" data-index="${index}">
            <div class="team-card" style="animation-delay: ${(index % INITIAL_TEAMS_COUNT) * 0.1}s">
                <div class="team-image-wrapper">
                    <img src="${team.image}" alt="${nameDisplay}" class="team-image" loading="lazy">
                    <div class="team-overlay">
                        <i class="fas ${team.icon} team-icon"></i>
                    </div>
                </div>
                <div class="team-content">
                    <h3 class="team-name">${nameDisplay}</h3>
                    <p class="team-role">${team.name}</p>
                    <p class="team-description">${team.description}</p>
                </div>
            </div>
        </div>
    `;
}

// Render team cards (Original - kept for reference, not used by new functions)
function renderTeamCards(showAll = false) {
    const teamGrid = document.getElementById('teamGrid');
    
    const teamsToShow = showAll ? displayedTeamList : displayedTeamList.slice(0, INITIAL_TEAMS_COUNT);
    
    teamGrid.innerHTML = '';
    
    teamsToShow.forEach((team, index) => {
        teamGrid.insertAdjacentHTML('beforeend', createTeamCard(team, index));

        if (index === 2) {
            teamGrid.insertAdjacentHTML('beforeend', '<div class="w-100 d-none d-lg-block"></div>');
        }
        if (index === 4) {
            teamGrid.insertAdjacentHTML('beforeend', '<div class="w-100 d-none d-lg-block"></div>');
        }
    });
    
    if (!showAll && displayedTeamList.length > INITIAL_TEAMS_COUNT) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'col-12 text-center mt-4';
        buttonWrapper.id = 'viewMoreButtonWrapper';
        buttonWrapper.innerHTML = `
            <button class="btn btn-outline-danger btn-lg" id="viewMoreTeamsBtn">
                View More Teams <i class="fas fa-chevron-down ms-2"></i>
            </button>
        `;
        teamGrid.appendChild(buttonWrapper);
        
        document.getElementById('viewMoreTeamsBtn').addEventListener('click', toggleTeams);
    } else if (showAll) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'col-12 text-center mt-4';
        buttonWrapper.id = 'viewMoreButtonWrapper';
        buttonWrapper.innerHTML = `
            <button class="btn btn-outline-danger btn-lg" id="viewMoreTeamsBtn">
                View Less <i class="fas fa-chevron-up ms-2"></i>
            </button>
        `;
        teamGrid.appendChild(buttonWrapper);
        
        document.getElementById('viewMoreTeamsBtn').addEventListener('click', toggleTeams);
    }
}

function toggleTeams() {
    showingAll = !showingAll;
    renderTeamCards(showingAll);
    
    if (!showingAll) {
        document.getElementById('team').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayedTeamList = getShuffledTeams();
    renderTeamCardsNew(false);
});

// Team Data Loader for Volunteers Page

document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch team data from JSON file
    async function fetchTeamData() {
        try {
            const response = await fetch('../pages/team/team.json');
            if (!response.ok) {
                throw new Error('Failed to fetch team data');
            }
            const data = await response.json();
            return data.team;
        } catch (error) {
            console.error('Error fetching team data:', error);
            return [];
        }
    }

    // Function to create volunteer cards
    function createVolunteerCards(teamMembers) {
        // Get container elements
        const skillsTrainingContainer = document.getElementById('skills-training-team');
        const communityOutreachContainer = document.getElementById('community-outreach-team');
        
        if (!skillsTrainingContainer || !communityOutreachContainer) {
            console.error('Container elements not found');
            return;
        }
        
        // Clear existing placeholder content
        skillsTrainingContainer.innerHTML = '';
        communityOutreachContainer.innerHTML = '';
        
        // Distribute team members between the two sections
        teamMembers.forEach((member, index) => {
            const card = createTeamMemberCard(member);
            
            // Special case for Caleb Aboriomoh - place in community outreach team
            if (member.name.toLowerCase().includes('caleb')) {
                communityOutreachContainer.appendChild(card);
            }
            // First half of team members go to skills training, second half to community outreach
            else if (index < teamMembers.length / 2) {
                skillsTrainingContainer.appendChild(card);
            } else {
                communityOutreachContainer.appendChild(card);
            }
        });
    }
    
    // Function to create a single team member card
    function createTeamMemberCard(member) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 max-w-xs mx-auto cursor-pointer';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '800');
        
        // Determine image path with relative path for local development
        const imagePath = `../assets/${member.image}`;
        
        // Check if this is the founder (Oyodo Gideon)
        const isFounder = member.name.toLowerCase().includes('oyodo') && member.name.toLowerCase().includes('gideon');
        
        // Create card HTML structure
        card.innerHTML = `
            <div class="relative pb-[100%] overflow-hidden bg-gray-100"><!-- 1:1 square aspect ratio (100%) -->
                ${isFounder ? '<div class="absolute top-0 right-0 bg-primary text-white px-2 py-1 z-10 rounded-bl-lg font-bold">Founder</div>' : ''}
                <img src="${imagePath}" 
                     alt="${member.name}" 
                     class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div class="p-3"><!-- Further reduced padding -->
                <h3 class="text-lg font-semibold mb-1 text-text-primary">${member.name}</h3>
                <p class="text-primary text-sm font-medium mb-2">${isFounder ? 'Founder & Visionary' : 'Team Member'}</p>
                <p class="text-text-secondary text-sm mb-3 line-clamp-2">
                    ${member.bio.substring(0, 100)}${member.bio.length > 100 ? '...' : ''}
                </p>
                <div class="flex space-x-2">
                    <a href="#" class="text-text-secondary hover:text-primary transition-colors">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="text-text-secondary hover:text-primary transition-colors">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-text-secondary hover:text-primary transition-colors">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
            </div>
        `;
        
        // Add click event to show full bio in a modal
        card.addEventListener('click', function() {
            showBioModal(member);
        });
        
        return card;
    }
    
    // Function to show bio modal
    function showBioModal(member) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modalContainer.id = 'bio-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative';
        
        // Determine image path with relative path for local development
        const imagePath = `../assets/${member.image}`;
        
        // Check if this is the founder
        const isFounder = member.name.toLowerCase().includes('oyodo') && member.name.toLowerCase().includes('gideon');
        
        // Add content to modal
        modalContent.innerHTML = `
            <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl" id="close-modal">
                <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col sm:flex-row gap-4 items-start">
                <div class="w-full sm:w-1/3 relative pb-[100%] sm:pb-0 sm:h-40 overflow-hidden rounded-lg bg-gray-100">
                    ${isFounder ? '<div class="absolute top-0 right-0 bg-primary text-white px-2 py-1 z-10 rounded-bl-lg font-bold">Founder</div>' : ''}
                    <img src="${imagePath}" alt="${member.name}" class="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div class="w-full sm:w-2/3">
                    <h2 class="text-2xl font-bold text-text-primary">${member.name}</h2>
                    <p class="text-primary font-medium mb-3">${isFounder ? 'Founder & Visionary' : 'Team Member'}</p>
                    <div class="flex space-x-3 mb-4">
                        <a href="#" class="text-text-secondary hover:text-primary transition-colors">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" class="text-text-secondary hover:text-primary transition-colors">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="text-text-secondary hover:text-primary transition-colors">
                            <i class="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <h3 class="text-lg font-semibold mb-2">Biography</h3>
                <p class="text-text-secondary">${member.bio}</p>
            </div>
        `;
        
        // Add modal content to container
        modalContainer.appendChild(modalContent);
        
        // Add modal to body
        document.body.appendChild(modalContainer);
        
        // Add event listener to close button
        document.getElementById('close-modal').addEventListener('click', function(e) {
            e.stopPropagation();
            document.body.removeChild(modalContainer);
        });
        
        // Close modal when clicking outside content
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                document.body.removeChild(modalContainer);
            }
        });
    }
    
    // Initialize the page
    async function initPage() {
        const teamMembers = await fetchTeamData();
        if (teamMembers.length > 0) {
            createVolunteerCards(teamMembers);
        }
    }
    
    // Start the initialization
    initPage();
});
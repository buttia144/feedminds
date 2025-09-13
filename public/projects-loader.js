/**
 * Projects Loader
 * 
 * This script fetches project data from the MongoDB database via API
 * and dynamically renders it on the projects.html page.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get container elements
    const artworkContainer = document.getElementById('artwork-projects');
    const booksContainer = document.getElementById('book-projects');
    
    // Fetch projects from API
    fetchProjects();
    
    /**
     * Fetch all projects from the API
     */
    async function fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            
            const projects = await response.json();
            
            // Sort projects by display order
            projects.sort((a, b) => a.displayOrder - b.displayOrder);
            
            // Group projects by category
            const artworkProjects = projects.filter(project => project.category === 'Artwork');
            const bookProjects = projects.filter(project => project.category === 'Book');
            const otherProjects = projects.filter(project => project.category === 'Other');
            
            // Render projects by category
            if (artworkContainer) {
                renderProjects(artworkContainer, artworkProjects);
            }
            
            if (booksContainer) {
                renderProjects(booksContainer, bookProjects);
            }
            
            // If there's a container for other projects, render them too
            const otherContainer = document.getElementById('other-projects');
            if (otherContainer && otherProjects.length > 0) {
                renderProjects(otherContainer, otherProjects);
            }
            
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Fallback to static content if API fails
        }
    }
    
    /**
     * Render projects in the specified container
     * @param {HTMLElement} container - The container element
     * @param {Array} projects - Array of project objects
     */
    function renderProjects(container, projects) {
        // Clear existing content if needed
        // We're keeping the existing content as fallback in case of API failure
        if (projects.length === 0) return;
        
        // Clear container only if we have projects to display
        container.innerHTML = '';
        
        // Create project cards
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });
    }
    
    /**
     * Create a project card element
     * @param {Object} project - Project data object
     * @returns {HTMLElement} - Project card element
     */
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'group relative overflow-hidden rounded-xl bg-surface shadow-subtle transition-all duration-300 hover:shadow-subtle-lg';
        
        card.innerHTML = `
            <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden">
                <img src="${project.imageUrl}" alt="${project.title}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-6">
                <h3 class="mb-2 text-xl font-bold text-text-primary">${project.title}</h3>
                <p class="mb-4 text-text-secondary">${project.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-text-secondary">${project.createdDate}</span>
                    <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">${project.subcategory}</span>
                </div>
            </div>
        `;
        
        return card;
    }
});
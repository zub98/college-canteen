document.addEventListener('DOMContentLoaded', function() {
    const thoughtForm = document.getElementById('thoughtForm');
    const thoughtInput = document.getElementById('thoughtInput');
    const nameInput = document.getElementById('nameInput');
    const anonymousToggle = document.getElementById('anonymousToggle');
    const messagesContainer = document.querySelector('.messages-container');

    // Load existing thoughts from localStorage
    let thoughts = JSON.parse(localStorage.getItem('thoughts') || '[]');

    // Display existing thoughts
    function displayThoughts() {
        messagesContainer.innerHTML = '';
        thoughts.forEach(thought => {
            const thoughtElement = createThoughtElement(thought);
            messagesContainer.insertBefore(thoughtElement, messagesContainer.firstChild);
        });
    }

    // Handle form submission
    thoughtForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const text = thoughtInput.value.trim();
        const isAnonymous = anonymousToggle.checked;
        const name = isAnonymous ? 'अनजान मुसाफिर' : (nameInput.value.trim() || 'अनजान मुसाफिर');

        if (!text) {
            alert('कृपया कुछ लिखें!');
            return;
        }

        // Create new thought
        const newThought = {
            text: text,
            author: name,
            timestamp: new Date().getTime(),
            isAnonymous: isAnonymous
        };

        // Add to thoughts array
        thoughts.push(newThought);
        
        // Save to localStorage
        localStorage.setItem('thoughts', JSON.stringify(thoughts));

        // Add to display
        const thoughtElement = createThoughtElement(newThought);
        messagesContainer.insertBefore(thoughtElement, messagesContainer.firstChild);

        // Clear form
        thoughtInput.value = '';
        nameInput.value = '';
        
        // Show success message
        showToast('आपका संदेश साझा कर दिया गया है! ✨');
    });

    function createThoughtElement(thought) {
        const div = document.createElement('div');
        div.className = 'thought-card';
        
        const time = new Date(thought.timestamp).toLocaleString('hi-IN', {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric'
        });

        div.innerHTML = `
            <p class="message-text">${escapeHtml(thought.text)}</p>
            <div class="message-footer">
                <span class="author">${escapeHtml(thought.author)}</span>
                <span class="timestamp">${time}</span>
            </div>
        `;

        return div;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Initial display of thoughts
    displayThoughts();
}); 
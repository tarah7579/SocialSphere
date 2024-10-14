function loadJQuery(callback) {
    var script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    script.onload = callback;
    document.head.appendChild(script);
}

function handleEventActions() {
    $(document).ready(function() {
        // Handle Like Button Click
        $('.event-like-btn').click(function() {
            var eventId = $(this).data('event-id');
            var $this = $(this);  // Cache this to use in the callback

            // Check current state
            var isLiked = $this.hasClass('highlighted');

            // Optimistically update the UI
            $this.toggleClass('highlighted', !isLiked);
            $this.find('span').text(!isLiked ? 'Liked' : 'Like');
            var icon = $this.find('i');
            icon.addClass('animate');
            setTimeout(() => {
                icon.removeClass('animate');
            }, 600); // Duration of the animation

            // Send the AJAX request to like/unlike the event
            $.ajax({
                url: '/like_event/' + eventId + '/',
                method: 'POST',
                data: {
                    'csrfmiddlewaretoken': getCsrfToken()
                },
                success: function(response) {
                    console.log(response);
                    if (response.status === 'success') {
                        // Update the like count dynamically based on response
                        var likeCountElement = $this.closest('.event').find('.like-count');
                        if (likeCountElement.length) {
                            likeCountElement.text(`${response.total_likes} Likes`);
                        }
                    } else {
                        // Revert the UI changes if the request fails
                        $this.toggleClass('highlighted', isLiked);
                        $this.find('span').text(isLiked ? 'Liked' : 'Like');
                    }
                },
                error: function() {
                    // In case of an error, revert the UI changes
                    $this.toggleClass('highlighted', isLiked);
                    $this.find('span').text(isLiked ? 'Liked' : 'Like');
                    alert('Something went wrong. Please try again.');
                }
            });
        });
    });
   

    function getCsrfToken() {
        return $('meta[name="csrf-token"]').attr('content');
    }

    
}

function updateCommentCountInEventList(eventId, newCommentCount) {
    const eventElement = document.querySelector(`.event[data-event-id="${eventId}"]`);
    if (eventElement) {
      const commentCountElement = eventElement.querySelector('.comment-count');
      if (commentCountElement) {
        commentCountElement.textContent = `${newCommentCount} Comments`;
      }
    }
  }

  function handleEventClicks() {
    document.querySelectorAll('.event-clicks-btn').forEach(button => {
        button.addEventListener('click', function () {
            const eventId = this.getAttribute('data-event-id');
            recordClick(`/events/record_click/${eventId}/`);
        });
    });
}

// Handle general clicks on the landing page
function handleGeneralClickRecording() {
    document.addEventListener('click', function () {
        recordClick('/record_click/');  // General click recording
    });
}

// Unified function to send the click recording request
function recordClick(url) {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
        console.error('CSRF token not found.');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Click recorded successfully');
        } else {
            console.error('Failed to record click');
        }
    })
    .catch(error => console.error('Error recording click:', error));
}

// Function to retrieve CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function observeVisibleElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.event');
    hiddenElements.forEach((el) => observer.observe(el));
}

function initializeEventListeners() {
    document.addEventListener('DOMContentLoaded', (event) => {
        observeVisibleElements();
        handleEventClicks();
        handleGeneralClickRecording();
        handleModal();
    });
}

function handleModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalButton = document.querySelector('.close');

    function openModal(content) {
        if (modalBody) {
            modalBody.innerHTML = content;
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            if (window.history && window.history.pushState) {
                window.history.pushState('forward', null, './#eventDetail');
            }
        } else {
            console.error('Modal body not found.');
        }
    }

   function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        if (window.history && window.history.state === 'forward') {
            window.history.back();
        }
    }

    document.querySelectorAll('.event-detail-link').forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.href;

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    openModal(html);
                });
        });
    });

    closeModalButton.addEventListener('click', closeModal);

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    window.addEventListener('popstate', function() {
        if (modal.style.display === 'block') {
            closeModal();
        }
    });


}

function toggleText(eventId) {
    const captionText = document.getElementById('caption-text_' + eventId);
    const toggleBtn = document.getElementById('toggle-btn_' + eventId);

    // Retrieve full and truncated text from data attributes
    const fullText = captionText.getAttribute('data-fulltext');
    const truncatedText = captionText.getAttribute('data-truncated');

    // Log the current state for debugging
    console.log("Current Button Text:", toggleBtn.textContent);
    console.log("Full Text:", fullText);
    console.log("Truncated Text:", truncatedText);

    // Check the current button state and toggle text accordingly
    if (toggleBtn.textContent === 'See More') {
        captionText.innerHTML = fullText; // Show full text
        toggleBtn.textContent = 'See Less'; // Change button text
    } else {
        captionText.innerHTML = truncatedText; // Show truncated text
        toggleBtn.textContent = 'See More'; // Change button text
    }

    // Log after changing the text
    console.log("Updated Button Text:", toggleBtn.textContent);
    console.log("Updated Caption Text:", captionText.innerHTML);
}

window.onload = function() {
    const captions = document.querySelectorAll('.caption-text');

    captions.forEach(caption => {
        const fullText = caption.innerHTML.trim();
        const maxLength = 100;  // Maximum character length before truncating

        if (fullText.length > maxLength) {
            const truncatedText = fullText.substring(0, maxLength) + '...';

            // Store full and truncated text in custom attributes
            caption.setAttribute('data-fulltext', fullText);
            caption.setAttribute('data-truncated', truncatedText);

            // Set the initial truncated text
            caption.innerHTML = truncatedText; // Show truncated text initially
        } else {
            // If the text is short enough, just set it without truncation
            caption.setAttribute('data-fulltext', fullText);
            caption.setAttribute('data-truncated', fullText);
            // Optionally, you might want to hide the toggle button if not needed
            const toggleBtn = document.getElementById('toggle-btn_' + caption.id.split('_')[1]); // Assuming IDs like 'caption_1'
            if (toggleBtn) {
                toggleBtn.style.display = 'none'; // Hide if no truncation needed
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', handleModal);

// Load jQuery dynamically before executing handleEventActions
loadJQuery(handleEventActions);

// Initialize other event listeners
initializeEventListeners();



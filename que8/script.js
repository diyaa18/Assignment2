let currentPage = 1; // Track the current page

// Event listener for the "Load More" button
$('#load-more').on('click', function() {
    loadMoreContent();
});

function loadMoreContent() {
    // Make AJAX request to fetch the next page of content
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=5`, // API with pagination
        method: 'GET',
        success: function(data) {
            if (data.length > 0) {
                // Increment the page count only if there's content
                currentPage++;

                // Append each item from the response to the content list
                data.forEach(item => {
                    const listItem = $('<div></div>')
                        .addClass('list-item')
                        .text(`Post #${item.id}: ${item.title}`); // Example property usage
                    $('#content-list').append(listItem);
                });
            } else {
                // No more content; hide the "Load More" button
                $('#load-more').hide();
            }
        },
        error: function(error) {
            console.error("Error fetching content:", error);
            $('#load-more').hide(); // Hide button on error
        }
    });
}

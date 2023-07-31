$(document).ready(function() {
    $('.status-toggle').click(function() {
      const itemId = $(this).data('item-id'); // Get the itemId from the data attribute
      console.log('Received itemId:', itemId); // Check if the itemId is correct
  
      // Update the URL to the correct endpoint for updating the status
      $.ajax({
        type: 'POST',
        url: '/portfolio/update-status',
        data: { itemId: itemId }, // Pass the itemId in the AJAX request data
        success: function(response) {
          // Update the button text based on the new status
          if (response.status === true) {
            $(this).text('Active').removeClass('btn-danger').addClass('btn-success');
          } else {
            $(this).text('deActive').removeClass('btn-success').addClass('btn-danger');
          }
        },
        error: function(error) {
          console.error('Error updating status:', error.responseText);
        },
      });
    });
  });
  
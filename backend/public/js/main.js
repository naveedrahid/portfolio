$(document).ready(function () {
  $('.status-toggle').on('click', function () {
    const button = $(this);
    const itemId = button.data('item-id');
    Swal.fire({
      title: 'Are You Sure Want to change status?',
      showDenyButton: true,
      confirmButtonText: 'Update',
      denyButtonText: 'No Update',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: '/portfolio/update-status',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ itemId })
        })
        .done(function (data) {
          button.text(data.status ? 'Active' : 'deActive');
          button.removeClass('btn btn-success btn-danger');
          if (data.status === true) {
            button.addClass('btn btn-success');
          } else {
            button.addClass('btn btn-danger');
          }
        })
        .fail(function (error) {
          console.error('Error updating status:', error.responseJSON.message);
        });
      } else if (result.isDenied) {
        Swal.fire('Status not update Successfully!', '', 'info');
      }
    });
  });
});
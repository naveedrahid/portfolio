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

$(document).ready(function () {
  // Function to append a new row to the table with portfolio data
  const basePath = '/uploads/';
  function appendPortfolioRow(portfolio) {
    const statusBtnClass = portfolio.status === true ? 'btn btn-success' : 'btn btn-danger';
    const statusBtnText = portfolio.status === true ? 'Active' : 'deActive';

    const newRow = `
      <tr>
        <td>${portfolio.title}</td>
        <td><img src="${basePath + portfolio.featuredimage}" alt="${portfolio.title}" width="120"></td>
        <td>${portfolio.description}</td>
        <td class="text-center">
          <button class="status-toggle ${statusBtnClass}" data-item-id="${portfolio._id}">
            ${statusBtnText}
          </button>
        </td>
        <td class="text-center">
        <button class="btn btn-danger btn-circle deleteButton" data-item-id="${portfolio._id}">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn btn-info btn-circle editButton" data-toggle="modal" data-target="#editPortfolio" data-id="${portfolio._id}">
          <i class="fas fa-pencil-alt"></i>
        </button>
        </td>
      </tr>
    `;

    $('#portfolioTable tbody').append(newRow);
  }

  document.getElementById('addPortfolioForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const add_title = formData.get('add_title');
    const add_desc = formData.get('add_desc');
    if (!add_title || !add_desc) {
      alert('Please fill in all the required fields.');
      return;
    }

    fetch('/portfolio/create', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        $('#addPortfolio').modal('hide');
        appendPortfolioRow(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});
$(document).ready(function () {
  $('.deleteButton').on('click', function () {
    const deleteButton = $(this);
    const itemId = deleteButton.data('item-id');
    Swal.fire({
      title: 'Are You Sure Want to Delete This?',
      showDenyButton: true,
      confirmButtonText: 'Update',
      denyButtonText: 'No Update',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `/portfolio/delete/${itemId}`,
          type: 'DELETE',
          success: function (data) {
            console.log('Record deleted, image removed:', data);
            if (data.status === 'success') {
              deleteButton.closest('tr').remove();
            }
            $('#messageDiv').text('Record deleted successfully').addClass('bg-success py-5 my-5');
            setTimeout(() => {
              $('#messageDiv').remove();
            }, 3000);
          },
          error: function (xhr, status, error) {
            console.error('Error deleting record and removing image:', error);
          },
        });
      }
    }).catch((err) => {
      console.error('Error showing confirmation dialog:', err);
    });
  });
});


$(document).ready(function () {
  $('.editButton').on('click', function () {
    const editButton = $(this);
    const itemId = editButton.data('id');

    // Fetch data using AJAX and populate the modal
    $.ajax({
      type: 'GET',
      url: `/portfolio/${itemId}`,
      success: function (data) {
        $('#edit_id').val(data._id);
        $('#edit_title').val(data.title);
        $('#edit_desc').val(data.description);
        $('#edit_status').val(data.status ? 'Active' : 'Deactive');
        $('#old_image_filename').val(data.featuredimage); // Store old image filename

        // Open the modal
        $('#editPortfolio').modal('show');
      },
      error: function (xhr, status, error) {
        console.error('Error fetching portfolio item:', error);
      },
    });
  });
});



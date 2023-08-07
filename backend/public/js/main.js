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
        <td>
          Delete
          <a href="#" class="btn btn-danger btn-circle float-right">
            <i class="fas fa-trash"></i>
          </a>
        </td>
        <td>
          Edit
          <a href="#" class="btn btn-info btn-circle float-right">
            <i class="fas fa-pencil-alt"></i>
          </a>
        </td>
      </tr>
    `;

    $('#portfolioTable tbody').append(newRow);
  }

  document.getElementById('addPortfolioForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('/portfolio/create', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        $('#addPortfolio').modal('hide');
        // Append the new portfolio data to the table
        appendPortfolioRow(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error (if needed)
      });
  });

  // Rest of your code...
});

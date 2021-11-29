const $editButton = document.getElementById('editButton')
const $inputs = document.querySelectorAll('.forform')
const $editForm = document.getElementById('editForm')

const $upload = document.querySelector("[data-type-upload]")

$upload?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const spinner = `<div id="spinner" class="flexbox">
  <div>
    <div class="cm-spinner"></div>
  </div>
</div>`
  $upload.insertAdjacentHTML('beforeend', spinner)
  let spinnerDiv = document.getElementById('spinner')
  // const $file = document.querySelector("[data-type-input]")
  const formData = new FormData(event.target);
  // formData.append('file', $file[0]);
  let response = await fetch('/', {
    method: "POST",
    body: formData

  })

  if (response.ok) {
    window.location.href = 'http://localhost:3000/profile'
  } else {
    alert('Вы не авторизованы или загружаете неправильный формат')
    spinnerDiv.remove()
  }
})


$editButton?.addEventListener('click', async (event) => {
  event.preventDefault();
  $inputs.forEach(element => {
    element.style.display = "block"
  });
  const newButtonHtml = `<button type="submit" 
    class="btn btn-primary btn-lg" 
    id="submitButton">Save Changes</input>`
  $editButton.outerHTML = newButtonHtml

  $editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await fetch(`profile/edit/${event.target.dataset.entryid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: event.target.name.value,
        surname: event.target.surName.value,
        email: event.target.email.value,
      })
    })
    if (response.ok) {
      window.location.href = '/profile'
    }
  });
})







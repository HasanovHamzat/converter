

const $allFiles = document.querySelector("[data-type-filelinks]")
$allFiles.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    const response = await fetch(`/profile/download/${event.target.dataset.id}`, {
      method: "POST"

    })
    const result = await response.blob();
    console.log(result)
    const objectURL = window.URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = objectURL;
    a.download = "filename.csv";
    document.body.appendChild(a); 
    a.click();
    a.remove();


    console.log(response)


  }

})

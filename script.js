const container = document.querySelector(".wrapper"),
  inputField = container.querySelector(".form input"),
  generateButton = container.querySelector(".form button"),
  qrCodeImage = container.querySelector(".qr-code img"),
  downloadButton = container.querySelector(".download-btn");

let previousValue;

generateButton.addEventListener("click", () => {
  let inputValue = inputField.value.trim();
  if (!inputValue || previousValue === inputValue) return;
  previousValue = inputValue;
  generateButton.innerText = "Generating QR Code...";
  qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`;
  qrCodeImage.addEventListener("load", () => {
    container.classList.add("active");
    generateButton.innerText = "Generate QR Code";
    downloadButton.style.display = "block";
  });
});

downloadButton.addEventListener("click", () => {
  generateAndDownloadQR();
});

function generateAndDownloadQR() {
  const urlInput = inputField.value.trim();
  axios({
      url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${urlInput}`,
      method: 'GET',
      responseType: 'blob'
  })
      .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.setAttribute('download', 'QR.png');
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      })
      .catch((error) => {
          console.error('Error generating QR code:', error);
      });
}

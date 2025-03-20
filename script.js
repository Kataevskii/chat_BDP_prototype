document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const analyzeButton = document.getElementById('analyzeButton');
    const resultDiv = document.getElementById('result');
    const loadingIndicator = document.getElementById('loading');
    const uploadedImageDisplay = document.getElementById('uploadedImage');
    let currentImageResult = null; // Store the result for the current image

    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageDisplay.src = e.target.result;
                uploadedImageDisplay.style.display = 'block';
                // Generate and store a new result *only* when a new image is uploaded
                currentImageResult = Math.random() < 0.8 ? 'not-dangerous' : 'dangerous';
                 resultDiv.textContent = ''; // Clear previous result text
                resultDiv.classList.remove('dangerous', 'not-dangerous'); //remove previous classes.
            }
            reader.readAsDataURL(file);
        }
    });

    analyzeButton.addEventListener('click', function() {
        resultDiv.textContent = '';
        resultDiv.classList.remove('dangerous', 'not-dangerous');

        if (!imageUpload.files || imageUpload.files.length === 0) {
            resultDiv.textContent = "Please upload an image first.";
            return;
        }

        loadingIndicator.style.display = 'block';

        setTimeout(function() {
            loadingIndicator.style.display = 'none';

            // Use the stored result for the *current* image
            let resultText;
            if (currentImageResult === 'not-dangerous') {
                resultText = "Crack is not dangerous";
                resultDiv.classList.add('not-dangerous');
            } else {
                resultText = "Crack is dangerous";
                resultDiv.classList.add('dangerous');
            }

            resultDiv.textContent = resultText;

        }, 2000);
    });
});
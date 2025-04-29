document.addEventListener('DOMContentLoaded', () => {
    const floorSamplesDiv = document.getElementById('floor-samples');
    const roomImageUpload = document.getElementById('room-image-upload');
    const uploadedRoomImage = document.getElementById('uploaded-room');
    const overlayCanvas = document.getElementById('overlay-canvas');
    const ctx = overlayCanvas.getContext('2d');

    let selectedSampleImage = null;
    let roomImage = null;

    // Array of floor sample image URLs (replace with your actual image paths)
    const sampleImages = [
        'images/lvp_sample1.png',
        'images/lvp_sample2.png',
        'images/lvp_sample3.png',
        // Add more image URLs here
    ];

    // Load and display floor samples
    sampleImages.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl;
        img.classList.add('floor-sample');
        img.addEventListener('click', () => {
            selectedSampleImage = img;
            if (roomImage) {
                drawOverlay();
            }
        });
        floorSamplesDiv.appendChild(img);
    });

    // Handle room image upload
    roomImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedRoomImage.src = e.target.result;
                uploadedRoomImage.style.display = 'block';
                roomImage = new Image();
                roomImage.onload = () => {
                    overlayCanvas.width = roomImage.width;
                    overlayCanvas.height = roomImage.height;
                    if (selectedSampleImage) {
                        drawOverlay();
                    }
                };
                roomImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to draw the selected floor sample as an overlay
    function drawOverlay() {
        if (!selectedSampleImage || !roomImage) {
            return;
        }

        // Clear the canvas
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        // Pattern the canvas with the selected floor sample
        const pattern = ctx.createPattern(selectedSampleImage, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        // You might want to add more sophisticated controls here,
        // like adjusting the scale, rotation, or perspective of the overlay.
    }
});

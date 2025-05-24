document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const resultContainer = document.getElementById('resultContainer');
    const resultImage = document.getElementById('resultImage');

    // Drag and drop handlers
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evdocument.addEventListener('DOMContentLoaded', () => {
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        const resultContainer = document.getElementById('resultContainer');
        const resultImage = document.getElementById('resultImage');
    
        // Drag and drop handlers
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
    
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-over');
            });
        });
    
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('drag-over');
            });
        });
    
        uploadArea.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
    
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            handleFile(file);
        }
    
        function handleFileSelect(e) {
            const file = e.target.files[0];
            handleFile(file);
        }
    
        function handleFile(file) {
            if (!file) return;
    
            if (!file.type.startsWith('image/')) {
                showError('Please upload an image file');
                return;
            }
    
            if (file.size > 10 * 1024 * 1024) {
                showError('File size should be less than 10MB');
                return;
            }
    
            uploadFile(file);
        }
    
        function showError(message) {
            errorText.textContent = message;
            errorMessage.hidden = false;
            setTimeout(() => {
                errorMessage.hidden = true;
            }, 5000);
        }
    
        async function uploadFile(file) {
            const formData = new FormData();
            formData.append('image', file);
    
            loadingSpinner.hidden = false;
            errorMessage.hidden = true;
            resultContainer.hidden = true;
    
            try {
                const response = await fetch('http://localhost:5000/run-model', {
                    method: 'POST',
                    body: formData
                });
    
                if (response.ok && response.headers.get('content-type') === 'image/jpeg') {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    displayResult(imageUrl);
                } else {
                    const data = await response.json();
                    showError(data.error || 'An error occurred');
                }
            } catch (err) {
                showError(`Error: ${err.message}`);
            } finally {
                loadingSpinner.hidden = true;
            }
        }
    
        function displayResult(imageUrl) {
            resultImage.src = imageUrl;
            resultContainer.hidden = false;
            
            // Scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    
        // Add hover animation to upload button
        const uploadButton = document.querySelector('.upload-button');
        uploadButton.addEventListener('mouseover', () => {
            uploadButton.style.transform = 'translateY(-2px)';
            uploadButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    
        uploadButton.addEventListener('mouseout', () => {
            uploadButton.style.transform = 'translateY(0)';
            uploadButton.style.boxShadow = 'none';
        });
    
        // Add ripple effect to buttons
        function createRipple(event) {
            const button = event.currentTarget;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;
            
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${event.clientX - rect.left - radius}px`;
            ripple.style.top = `${event.clientY - rect.top - radius}px`;
            ripple.classList.add('ripple');
            
            const rippleContainer = document.createElement('span');
            rippleContainer.classList.add('ripple-container');
            
            rippleContainer.appendChild(ripple);
            button.appendChild(rippleContainer);
            
            setTimeout(() => {
                rippleContainer.remove();
            }, 1000);
        }
    
        document.querySelectorAll('.upload-button').forEach(button => {
            button.addEventListener('click', createRipple);
        });
    });entName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('drag-over');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('drag-over');
        });
    });

    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFile(file);
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        handleFile(file);
    }

    function handleFile(file) {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showError('Please upload an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            showError('File size should be less than 10MB');
            return;
        }

        uploadFile(file);
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.hidden = false;
        setTimeout(() => {
            errorMessage.hidden = true;
        }, 5000);
    }

    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('image', file);

        loadingSpinner.hidden = false;
        errorMessage.hidden = true;
        resultContainer.hidden = true;

        try {
            const response = await fetch('http://localhost:5000/run-model', {
                method: 'POST',
                body: formData
            });

            if (response.ok && response.headers.get('content-type') === 'image/jpeg') {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                displayResult(imageUrl);
            } else {
                const data = await response.json();
                showError(data.error || 'An error occurred');
            }
        } catch (err) {
            showError(`Error: ${err.message}`);
        } finally {
            loadingSpinner.hidden = true;
        }
    }

    function displayResult(imageUrl) {
        resultImage.src = imageUrl;
        resultContainer.hidden = false;
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Add hover animation to upload button
    const uploadButton = document.querySelector('.upload-button');
    uploadButton.addEventListener('mouseover', () => {
        uploadButton.style.transform = 'translateY(-2px)';
        uploadButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    uploadButton.addEventListener('mouseout', () => {
        uploadButton.style.transform = 'translateY(0)';
        uploadButton.style.boxShadow = 'none';
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');
        
        const rippleContainer = document.createElement('span');
        rippleContainer.classList.add('ripple-container');
        
        rippleContainer.appendChild(ripple);
        button.appendChild(rippleContainer);
        
        setTimeout(() => {
            rippleContainer.remove();
        }, 1000);
    }

    document.querySelectorAll('.upload-button').forEach(button => {
        button.addEventListener('click', createRipple);
    });
});
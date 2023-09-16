import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

function FileUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState(null);
  const [expirationTime, setExpirationTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(file);
        setSelectedImageDataUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Choose an image to upload.');
      return;
    }

    if (!expirationTime) {
      setError('Set an expiration time for the image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage, selectedImage.name);
    formData.append('expirationTime', expirationTime);

    try {
      const response = await axios.put("http://localhost:3001/v1/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        console.log(`Success: ${response.data.imageUrl}`);
        setImageUrl(response.data.imageUrl);
        setSubmitted(true);
        setError(""); // Clear any previous error
      } else {
        setError('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while uploading the image.');
    }
  };

  const closeImage = () => {
    setSelectedImage(null);
    setExpirationTime("");
  };

  const closeModal = () => {
    setSelectedImage(null);
    setExpirationTime("");
    setSubmitted(false);
    setError("");
  };

  return (
    <div className='main_cont'>
      <div className='components'>
        {submitted ? (
          <>
            <h2>Here is your Image Link</h2>
            <Modal onClose={closeModal} url={imageUrl} />
          </>
        ) : (
          <>
            <h2>Upload Your Image</h2>
            <div className='img_cont'>
              {!selectedImage ? (
                <>
                  <label className="custom-file-input-label" htmlFor="fileInput">
                    Click to Upload File
                  </label>
                  <input type="file" id='fileInput' style={{ display: "none" }} onChange={handleFileChange} />
                </>
              ) : (
                <>
                  <h4 className='change_pic' onClick={closeImage}>X</h4>
                  <img src={selectedImageDataUrl} alt="Selected" className='selected_img' />
                </>
              )}
            </div>

            <div className='submit'>
              <input type="text" placeholder='Set expiration time (min)' className='expire' onChange={(e) => setExpirationTime(e.target.value)} />
              <button onClick={handleSubmit}>Submit</button>
            </div>
            {error && <p className="error">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default FileUpload;

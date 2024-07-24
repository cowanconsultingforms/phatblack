import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'c3ww7p9q');

  try{
    const response = await axios.post('https://api.cloudinary.com/v1_1/dxptlsn6t/image/upload', formData);
    return response.data.secure_url; 
  } catch (error) {
    console.error('Error uploading to cloudinary: ', error);
    throw error;
  }
};

export default uploadImageToCloudinary;
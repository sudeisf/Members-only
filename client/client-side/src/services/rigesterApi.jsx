import axios from 'axios';

// Function to post data to the server and handle errors
export const postData = async (data) => {
    try {
        // Make the POST request
        const res = await axios.post('http://localhost:3001/api/register', data);

        // Log success and return data
        console.log('Success:', res.data);
        return res.data;
    } catch (err) {
        // Object to hold error messages
        const errObj = {};

        if (err.response) {
            // Handle server-side validation errors
            if (err.response.data.errors) {
                const validationErr = err.response.data.errors;
                validationErr.forEach((error) => {
                    errObj[error.path] = error.msg;
                });
                return errObj; // Return the error object
            } else {
                console.error('Error response:', err.response.data);
            }
        } else if (err.request) {
            // Handle network errors
            console.error('Error request:', err.request);
        } else {
            // Handle other errors
            console.error('Error:', err.message);
        }
        
        return { error: 'An unexpected error occurred.' }; // Fallback error message
    }
};

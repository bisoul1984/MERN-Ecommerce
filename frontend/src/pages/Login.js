import { API_BASE_URL } from '../config/api';

// ... in your handleSubmit function
const response = await axios.post(
    `${API_BASE_URL}/api/users/login`,
    { email, password }
); 
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000/api';

// Add list of endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  '/token/',
  '/users/'  // signup endpoint is public
];

class ApiClient {
    static authToken = null;

    static setAuthToken(token) {
        this.authToken = token;
        console.log('Setting auth token:', token); // Debug log
    }

    static async getHeaders(endpoint) {
        const isPublicEndpoint = PUBLIC_ENDPOINTS.some(publicPath => 
            endpoint.startsWith(publicPath)
        );
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (!isPublicEndpoint && this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
            console.log('Adding auth header:', headers['Authorization']); // Debug log
        }

        // console.log('Request headers:', headers); // Debug log
        return headers;
    }

    static async handleResponse(response) {
        console.log('Response status:', response.status); // Debug log
        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        if (!response.ok) {
            // Handle different error formats
            const errorMessage = data.message || 
                               data.detail || 
                               (typeof data === 'string' ? data : 'An error occurred');
            
            throw new Error(errorMessage);
        }
        return data;
    }

    static async get(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: await this.getHeaders(endpoint)
        });
        return this.handleResponse(response);
    }

    static async post(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: await this.getHeaders(endpoint),
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    }

    static async put(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: await this.getHeaders(endpoint),
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    }

    static async delete(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: await this.getHeaders(endpoint)
        });
        return this.handleResponse(response);
    }
}

export default ApiClient; 
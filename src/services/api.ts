// Common API service for the project
const API_BASE_URL = 'https://stoplight.io/mocks/modern/radar/950871457';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

interface AuthResponse {
  token: string;
}

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 123'
    };
  }

  // Token management methods
  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private setStoredToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearStoredToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Get current auth headers (includes stored token if available)
  private getAuthHeaders(): Record<string, string> {
    const token = this.getStoredToken();
    return {
      ...this.defaultHeaders,
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config: RequestInit = {
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      // Handle 204 No Content responses
      if (response.status === 204) {
        return {
          status: response.status,
        };
      }

      // Only try to parse JSON for other responses
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || 'An error occurred',
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  // Create user account
  async createUser(email: string): Promise<ApiResponse<unknown>> {
    return this.makeRequest('/auth/user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Verify user identity with OTP
  async verifyUser(email: string, otp: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.makeRequest<AuthResponse>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });

    // Store token if verification is successful
    if (response.data?.token) {
      this.setStoredToken(response.data.token);
    }

    return response;
  }

  // Get stored token
  getToken(): string | null {
    return this.getStoredToken();
  }

  // Clear stored token (for logout)
  logout(): void {
    this.clearStoredToken();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Get account details by ID
  async getAccountDetails(id: string): Promise<ApiResponse<unknown>> {
    return this.makeRequest(`/account/${id}`, {
      method: 'GET',
    });
  }

  // Get competitors list
  async getCompetitors(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/competitors', {
      method: 'GET',
    });
  }

  // Get contacts list
  async getContacts(): Promise<ApiResponse<unknown>> {
    return this.makeRequest('/contacts', {
      method: 'GET',
    });
  }

  // Get topic summaries
  async getTopicSummaries(): Promise<ApiResponse<unknown>> {
    return this.makeRequest('/topics/summaries', {
      method: 'GET',
    });
  }

  // Get topic incidence and engagement
  async getTopicIncidenceAndEngagement(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/topics/incidenceAndEngagement', {
      method: 'GET',
    });
  }

  // Get topic audience relevance
  async getTopicAudienceRelevance(): Promise<ApiResponse<unknown>> {
    return this.makeRequest('/topics/audienceRelevance', {
      method: 'GET',
    });
  }

  // Get content to promote
  async getContentToPromote(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/contentToPromote', {
      method: 'GET',
    });
  }

  // Get topics to write about
  async getTopicsToWriteAbout(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/topicsToWriteAbout', {
      method: 'GET',
    });
  }

  // Get topics incidence and engagement
  async getTopicsIncidenceAndEngagement(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/topicsIncidenceAndEngagement', {
      method: 'GET',
    });
  }

  // Get personalization score
  async getPersonalizationScore(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/personalizationScore', {
      method: 'GET',
    });
  }

  // Get content influenced revenue
  async getContentInfluencedRevenue(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/contentInfluencedRevenue', {
      method: 'GET',
    });
  }

  // Get new personalized engagements score
  async getNewPersonalizedEngagementsScore(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/newPersonalizedEngagementsScore', {
      method: 'GET',
    });
  }

  // Get personalized content engagement rate
  async getPersonalizedContentEngagementRate(): Promise<ApiResponse<unknown[]>> {
    return this.makeRequest('/radar/personalizedContentEngagementRate', {
      method: 'GET',
    });
  }


}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;
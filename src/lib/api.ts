// API configuration and utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.bidukbiduk.com/api';

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  alt_text?: string;
  category?: string;
  featured?: boolean;
  file?: string;
  file_url?: string;
}

// Destination types
export interface DestinationCategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  category: DestinationCategory;
  location: string;
  coordinates: {
    latitude?: number;
    longitude?: number;
  } & Record<string, unknown>;
  maps_url?: string;
  images: string | string[];
  entrance_fee?: string;
  facilities?: string[];
  operating_hours?: string[];
  contact_info?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Translation fields
  name_en?: string;
  name_ar?: string;
  name_cn?: string;
  name_fr?: string;
  name_es?: string;
  description_en?: string;
  description_ar?: string;
  description_cn?: string;
  description_fr?: string;
  description_es?: string;
}

export interface DestinationListResponse {
  success: boolean;
  message: string;
  data: Destination[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    current_page: number;
    total_pages: number;
  };
}

// Article types
export interface Article {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  featured_image_url: string;
  category: number;
  category_name: string;
  tags: string;
  tags_list: string[];
  status: string;
  publish_date: string | null;
  author: number;
  author_name: string;
  created_at: string;
  updated_at: string;
  // Translation fields
  title_en?: string;
  title_ar?: string;
  title_cn?: string;
  title_fr?: string;
  title_es?: string;
  content_en?: string;
  content_ar?: string;
  content_cn?: string;
  content_fr?: string;
  content_es?: string;
}

export interface ArticleListResponse {
  success: boolean;
  message: string;
  data: Article[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    current_page: number;
    total_pages: number;
  };
}

// Hotel types
export interface HotelImage {
  id: number;
  hotel: number;
  image: string;
  image_url?: string;
  caption?: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Hotel {
  hotel_id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  images: HotelImage[] | string[];
  book_url?: string;
  maps_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  total_rating: number;
  total_rating_users: number;
  // Translation fields
  name_en?: string;
  name_ar?: string;
  name_cn?: string;
  name_fr?: string;
  name_es?: string;
  description_en?: string;
  description_ar?: string;
  description_cn?: string;
  description_fr?: string;
  description_es?: string;
}

export interface HotelListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    success: boolean;
    message: string;
    data: {
      items: Hotel[];
      applied_queries: Record<string, unknown>;
    };
  };
}

// Package types
export interface PackageDestination {
  id: number;
  name: string;
  location: string;
  description: string;
}

export interface Package {
  package_id: number;
  name: string;
  description?: string;
  price: string;
  image?: string;
  image_url: string | null;
  is_active: boolean;
  total_rating: number;
  total_rating_users: number;
  destinations?: PackageDestination[];
  destination_details?: PackageDestination[]; // API returns this field
  created_at?: string;
  updated_at?: string;
  // Translation fields
  name_en?: string;
  name_ar?: string;
  name_cn?: string;
  name_fr?: string;
  name_es?: string;
  description_en?: string;
  description_ar?: string;
  description_cn?: string;
  description_fr?: string;
  description_es?: string;
}

export interface PackageListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    success: boolean;
    message: string;
    data: {
      items: Package[];
      applied_queries: Record<string, unknown>;
    };
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Generic API fetch function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// Gallery API functions
export const galleryApi = {
  // Get all gallery images
  getAll: async (): Promise<GalleryImage[]> => {
    try {
      const response = await apiCall<ApiResponse<GalleryImage[]>>('/gallery');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      return [];
    }
  },

  // Get featured/destination images
  getDestinations: async (): Promise<GalleryImage[]> => {
    try {
      const response = await apiCall<ApiResponse<GalleryImage[]>>('/gallery?featured=true');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch destination images:', error);
      // Fallback to all images if featured endpoint doesn't work
      return galleryApi.getAll();
    }
  },

  // Get images by category
  getByCategory: async (category: string): Promise<GalleryImage[]> => {
    try {
      const response = await apiCall<ApiResponse<GalleryImage[]>>(`/gallery?category=${category}`);
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch ${category} images:`, error);
      return [];
    }
  },
};

// Destinations API functions
export const destinationsApi = {
  // Get all destinations with pagination
  getAll: async (page: number = 1, pageSize: number = 12): Promise<DestinationListResponse> => {
    try {
      const response = await apiCall<DestinationListResponse>(`/destinations/?page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
      return { 
        success: false, 
        message: 'Failed to fetch destinations', 
        data: [], 
        pagination: { count: 0, next: null, previous: null, page_size: pageSize, current_page: page, total_pages: 0 } 
      };
    }
  },

  // Get active destinations only with pagination
  getActive: async (page: number = 1, pageSize: number = 12): Promise<DestinationListResponse> => {
    try {
      const response = await apiCall<DestinationListResponse>(`/destinations/?is_active=true&page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch active destinations:', error);
      return { 
        success: false, 
        message: 'Failed to fetch destinations', 
        data: [], 
        pagination: { count: 0, next: null, previous: null, page_size: pageSize, current_page: page, total_pages: 0 } 
      };
    }
  },

  // Get destination by ID
  getById: async (id: number): Promise<Destination | null> => {
    try {
      const response = await apiCall<{ success: boolean; message: string; data: Destination }>(`/destinations/${id}/`);
      console.log('📦 Raw API response for destination:', response);
      // Handle nested response structure
      if (response.data) {
        return response.data;
      }
      // Fallback to direct response if not nested
      return response as unknown as Destination;
    } catch (error) {
      console.error(`Failed to fetch destination with ID ${id}:`, error);
      return null;
    }
  },

  // Get destinations by category
  getByCategory: async (categoryId: number, page: number = 1, pageSize: number = 12): Promise<DestinationListResponse> => {
    try {
      const response = await apiCall<DestinationListResponse>(`/destinations/?category=${categoryId}&page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch destinations for category ${categoryId}:`, error);
      return { 
        success: false, 
        message: 'Failed to fetch destinations', 
        data: [], 
        pagination: { count: 0, next: null, previous: null, page_size: pageSize, current_page: page, total_pages: 0 } 
      };
    }
  },
};

// Hotels API functions
export const hotelsApi = {
  // Get all hotels
  getAll: async (page: number = 1, pageSize: number = 12): Promise<HotelListResponse> => {
    try {
      const response = await apiCall<HotelListResponse>(`/hotels/?page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
      return { 
        count: 0, 
        next: null, 
        previous: null, 
        results: { 
          success: false, 
          message: 'Failed to fetch hotels', 
          data: { items: [], applied_queries: {} } 
        } 
      };
    }
  },

  // Get active hotels only
  getActive: async (page: number = 1, pageSize: number = 12): Promise<HotelListResponse> => {
    try {
      const response = await apiCall<HotelListResponse>(`/hotels/?is_active=true&page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch active hotels:', error);
      return { 
        count: 0, 
        next: null, 
        previous: null, 
        results: { 
          success: false, 
          message: 'Failed to fetch hotels', 
          data: { items: [], applied_queries: {} } 
        } 
      };
    }
  },

  // Get hotel by ID
  getById: async (id: number): Promise<Hotel | null> => {
    try {
      console.log(`🔍 Fetching hotel with ID: ${id}`);
      const response = await apiCall<{ success: boolean; message: string; data: Hotel }>(`/hotels/${id}/`);
      console.log('🏨 Hotel API response:', response);
      
      // Handle nested response structure
      if (response.data) {
        console.log('✅ Hotel data found in response.data');
        return response.data;
      }
      // Fallback to direct response if not nested
      console.log('✅ Returning response directly');
      return response as unknown as Hotel;
    } catch (error) {
      console.error(`Failed to fetch hotel with ID ${id}:`, error);
      return null;
    }
  },
};

// Articles API functions
export const articlesApi = {
  // Get all articles with pagination (including drafts for testing)
  getAll: async (page: number = 1, pageSize: number = 10): Promise<ArticleListResponse> => {
    try {
      // Try without status filter to get all articles including drafts
      console.log(`📡 API Call: /articles?page=${page}&page_size=${pageSize}`);
      const response = await apiCall<ArticleListResponse>(`/articles?page=${page}&page_size=${pageSize}`);
      console.log("📥 Articles API raw response:", response);
      
      // If no data, try with explicit status filter
      if (!response.data || response.data.length === 0) {
        console.log("📡 Trying with status=all...");
        const allResponse = await apiCall<ArticleListResponse>(`/articles?status=all&page=${page}&page_size=${pageSize}`);
        console.log("📥 All articles response:", allResponse);
        return allResponse;
      }
      
      return response;
    } catch (error) {
      console.error('❌ Failed to fetch articles:', error);
      return { 
        success: false, 
        message: 'Failed to fetch articles', 
        data: [], 
        pagination: { count: 0, next: null, previous: null, page_size: pageSize, current_page: page, total_pages: 0 } 
      };
    }
  },

  // Get published articles only
  getPublished: async (page: number = 1, pageSize: number = 10): Promise<ArticleListResponse> => {
    try {
      const response = await apiCall<ArticleListResponse>(`/articles/?status=published&page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch published articles:', error);
      return { 
        success: false, 
        message: 'Failed to fetch articles', 
        data: [], 
        pagination: { count: 0, next: null, previous: null, page_size: pageSize, current_page: page, total_pages: 0 } 
      };
    }
  },

  // Get article by ID
  getById: async (id: number): Promise<Article | null> => {
    try {
      console.log(`📡 Fetching article with ID: ${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await apiCall<any>(`/articles/${id}/`);
      console.log("📥 Article detail response:", response);
      
      // Check if response has data property (wrapped response)
      if (response.data) {
        console.log("✅ Article data found in response.data");
        return response.data;
      }
      
      // Otherwise return response directly
      console.log("✅ Returning response directly");
      return response;
    } catch (error) {
      console.error(`❌ Failed to fetch article with ID ${id}:`, error);
      return null;
    }
  },

  // Get articles by category
  getByCategory: async (categoryId: number, page: number = 1, pageSize: number = 10): Promise<ArticleListResponse> => {
    try {
      const response = await apiCall<ArticleListResponse>(`/articles/?category=${categoryId}&page=${page}&page_size=${pageSize}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch articles for category ${categoryId}:`, error);
      return { 
        success: false, 
        message: 'Failed to fetch articles', 
        data: [], 
        pagination: { count: 0, next: null, previous: null, page_size: pageSize, current_page: page, total_pages: 0 } 
      };
    }
  },
};

// Packages API functions
export const packagesApi = {
  // Get all packages with pagination
  getAll: async (page: number = 1, pageSize: number = 12): Promise<PackageListResponse> => {
    try {
      console.log(`📡 API Call: /packages/?page=${page}&page_size=${pageSize}`);
      const response = await apiCall<PackageListResponse>(`/packages/?page=${page}&page_size=${pageSize}`);
      console.log("📦 Packages API response:", response);
      return response;
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      return {
        count: 0,
        next: null,
        previous: null,
        results: {
          success: false,
          message: 'Failed to fetch packages',
          data: {
            items: [],
            applied_queries: {},
          },
        },
      };
    }
  },

  // Get active packages only
  getActive: async (page: number = 1, pageSize: number = 12): Promise<PackageListResponse> => {
    try {
      console.log(`📡 API Call: /packages/?is_active=true&page=${page}&page_size=${pageSize}`);
      const response = await apiCall<PackageListResponse>(`/packages/?is_active=true&page=${page}&page_size=${pageSize}`);
      console.log("📦 Active packages response:", response);
      return response;
    } catch (error) {
      console.error('Failed to fetch active packages:', error);
      return {
        count: 0,
        next: null,
        previous: null,
        results: {
          success: false,
          message: 'Failed to fetch packages',
          data: {
            items: [],
            applied_queries: {},
          },
        },
      };
    }
  },

  // Get package by ID
  getById: async (id: number): Promise<Package | null> => {
    try {
      console.log(`📡 Fetching package with ID: ${id}`);
      const response = await apiCall<{ success: boolean; message: string; data: Package }>(`/packages/${id}/`);
      console.log("📦 Package detail response:", response);
      
      // Handle nested response structure
      if (response.data) {
        return response.data;
      }
      // Fallback to direct response if not nested
      return response as unknown as Package;
    } catch (error) {
      console.error(`Failed to fetch package with ID ${id}:`, error);
      return null;
    }
  },
};

// Translation helper functions
export const getTranslatedField = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  fieldName: string,
  language: string
): string => {
  // Map i18n language codes to backend language codes
  const langMap: Record<string, string> = {
    'en': 'en',
    'id': '', // Use default (no suffix)
    'ar': 'ar',
    'zh': 'cn', // Chinese uses 'cn' in backend
    'fr': 'fr',
    'es': 'es',
  };

  const backendLang = langMap[language] || '';
  
  console.log(`🌐 Translation Debug:`, {
    language,
    backendLang,
    fieldName,
    hasItem: !!item,
    itemKeys: item ? Object.keys(item).filter(k => k.includes(fieldName)) : []
  });
  
  // If Indonesian or default language, return the base field
  if (!backendLang || language === 'id') {
    const value = (item[fieldName] as string) || '';
    console.log(`📝 Using base field "${fieldName}":`, value.substring(0, 50) + '...');
    return value;
  }

  // Try to get translated field
  const translatedFieldName = `${fieldName}_${backendLang}`;
  const translatedValue = item[translatedFieldName];
  
  console.log(`📝 Translation field "${translatedFieldName}":`, {
    exists: !!translatedValue,
    value: translatedValue ? String(translatedValue).substring(0, 50) + '...' : 'N/A',
    fallback: !translatedValue ? `Using base "${fieldName}"` : 'N/A'
  });
  
  // Return translated value if exists, otherwise fallback to base field
  return (translatedValue as string) || (item[fieldName] as string) || '';
};

export const getHotelTranslation = (hotel: Hotel, language: string) => ({
  name: getTranslatedField(hotel, 'name', language),
  description: getTranslatedField(hotel, 'description', language),
});

export const getDestinationTranslation = (destination: Destination, language: string) => ({
  name: getTranslatedField(destination, 'name', language),
  description: getTranslatedField(destination, 'description', language),
});

export const getArticleTranslation = (article: Article, language: string) => ({
  title: getTranslatedField(article, 'title', language),
  content: getTranslatedField(article, 'content', language),
});

export const getPackageTranslation = (pkg: Package, language: string) => ({
  name: getTranslatedField(pkg, 'name', language),
  description: getTranslatedField(pkg, 'description', language),
});

export default galleryApi;

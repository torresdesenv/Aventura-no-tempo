/**
 * Lip Reading Service
 *
 * This service connects to the Flask API backend for actual lip reading processing
 */

// Use the PC's IP address instead of localhost for mobile testing
const API_URL = 'http://192.168.0.165:5000/api';

class LipReadingService {
  constructor() {
    this.isProcessing = false;
  }

  /**
   * Process video file for lip reading
   * @param {string} videoUri - URI of the video file
   * @returns {Promise<Object>} - Recognized text and confidence
   */
  async processVideo(videoUri) {
    if (this.isProcessing) {
      throw new Error('Already processing a video');
    }

    try {
      this.isProcessing = true;
      console.log('Processing video:', videoUri);

      // Convert video URI to blob for upload
      const blob = await this.dataURItoBlob(videoUri);

      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append('video', blob, 'video.mp4');

      console.log('Uploading to:', `${API_URL}/process-video`);

      // Send video to Flask API
      const response = await fetch(`${API_URL}/process-video`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (!result.success) {
        throw new Error(result.error || 'Processing failed');
      }

      return {
        text: result.text,
        confidence: result.confidence,
        timestamp: Date.now(),
        facesDetected: result.faces_detected || 1,
      };
    } catch (error) {
      console.error('Error processing video:', error);
      throw error;
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Process real-time camera frame
   * @param {string} frameUri - URI of the camera frame
   * @returns {Promise<Object>} - Real-time recognized text
   */
  async processRealtimeFrame(frameUri) {
    try {
      console.log('Processing realtime frame');

      // Convert frame URI to blob
      const blob = await this.dataURItoBlob(frameUri);

      const formData = new FormData();
      formData.append('frame', blob, 'frame.jpg');

      const response = await fetch(`${API_URL}/process-frame`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Processing failed');
      }

      return {
        text: result.text,
        confidence: result.confidence,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error processing realtime frame:', error);
      throw error;
    }
  }

  /**
   * Convert data URI to Blob
   * @param {string} dataURI - Data URI string
   * @returns {Promise<Blob>} - Blob object
   */
  async dataURItoBlob(dataURI) {
    try {
      // If it's already a file URI (expo-image-picker format)
      if (dataURI.startsWith('file://') || dataURI.startsWith('content://')) {
        const response = await fetch(dataURI);
        return await response.blob();
      }

      // If it's a data URI (base64)
      if (dataURI.startsWith('data:')) {
        const response = await fetch(dataURI);
        return await response.blob();
      }

      // If it's an HTTP URL
      if (dataURI.startsWith('http://') || dataURI.startsWith('https://')) {
        const response = await fetch(dataURI);
        return await response.blob();
      }

      throw new Error('Unsupported URI format');
    } catch (error) {
      console.error('Error converting URI to blob:', error);
      throw error;
    }
  }

  /**
   * Test connection to the API server
   * @returns {Promise<boolean>} - True if server is reachable
   */
  async testConnection() {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  /**
   * Get the current API URL (for debugging)
   */
  getApiUrl() {
    return API_URL;
  }
}

export default new LipReadingService();

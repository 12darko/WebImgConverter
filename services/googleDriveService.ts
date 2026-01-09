/**
 * Google Drive Integration Service
 * 
 * Provides Save to Drive and Open from Drive functionality.
 * Requires: VITE_GOOGLE_CLIENT_ID in .env
 * 
 * Setup in Google Cloud Console:
 * 1. Create project
 * 2. Enable Google Drive API + Google Picker API
 * 3. Create OAuth 2.0 Client ID (Web application)
 * 4. Add authorized JavaScript origins (localhost:3000, your-domain.com)
 */

// Load Google API Script dynamically
let gapiLoaded = false;
let pickerLoaded = false;
let tokenClient: any = null;
let accessToken: string | null = null;

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// Types for Google API
declare global {
    interface Window {
        gapi: any;
        google: any;
    }
}

/**
 * Load the Google API and Picker libraries
 */
export const loadGoogleDriveAPI = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (gapiLoaded && pickerLoaded) {
            resolve();
            return;
        }

        // Load GAPI
        const gapiScript = document.createElement('script');
        gapiScript.src = 'https://apis.google.com/js/api.js';
        gapiScript.onload = () => {
            window.gapi.load('picker', () => {
                pickerLoaded = true;
                if (gapiLoaded) resolve();
            });
            window.gapi.load('client', () => {
                gapiLoaded = true;
                if (pickerLoaded) resolve();
            });
        };
        gapiScript.onerror = reject;
        document.body.appendChild(gapiScript);

        // Load Google Identity Services
        const gisScript = document.createElement('script');
        gisScript.src = 'https://accounts.google.com/gsi/client';
        gisScript.onload = () => {
            if (!GOOGLE_CLIENT_ID) {
                console.warn('Google Client ID not configured');
                return;
            }
            tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: SCOPES,
                callback: (response: any) => {
                    if (response.access_token) {
                        accessToken = response.access_token;
                    }
                },
            });
        };
        gisScript.onerror = reject;
        document.body.appendChild(gisScript);
    });
};

/**
 * Request access token (triggers OAuth popup)
 */
export const requestAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!tokenClient) {
            reject(new Error('Google API not loaded'));
            return;
        }

        if (accessToken) {
            resolve(accessToken);
            return;
        }

        tokenClient.callback = (response: any) => {
            if (response.error) {
                reject(new Error(response.error));
                return;
            }
            accessToken = response.access_token;
            resolve(accessToken!);
        };

        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
};

/**
 * Save file to Google Drive
 */
export const saveToGoogleDrive = async (blob: Blob, filename: string): Promise<{ success: boolean; fileId?: string; error?: string }> => {
    try {
        const token = await requestAccessToken();

        const metadata = {
            name: filename,
            mimeType: blob.type,
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', blob);

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: form,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        return { success: true, fileId: result.id };
    } catch (error: any) {
        console.error('Save to Drive failed:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Open Google Drive Picker to select a file
 */
export const openFromGoogleDrive = async (): Promise<{ success: boolean; file?: File; error?: string }> => {
    try {
        const token = await requestAccessToken();

        return new Promise((resolve) => {
            const picker = new window.google.picker.PickerBuilder()
                .addView(window.google.picker.ViewId.DOCS_IMAGES)
                .setOAuthToken(token)
                .setDeveloperKey('') // Optional: Add API key for better quota
                .setCallback(async (data: any) => {
                    if (data.action === window.google.picker.Action.PICKED) {
                        const fileId = data.docs[0].id;
                        const fileName = data.docs[0].name;

                        // Download the file
                        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });

                        if (!response.ok) {
                            resolve({ success: false, error: 'Failed to download file' });
                            return;
                        }

                        const blob = await response.blob();
                        const file = new File([blob], fileName, { type: blob.type });
                        resolve({ success: true, file });
                    } else if (data.action === window.google.picker.Action.CANCEL) {
                        resolve({ success: false, error: 'Picker cancelled' });
                    }
                })
                .build();

            picker.setVisible(true);
        });
    } catch (error: any) {
        console.error('Open from Drive failed:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Check if Google Drive is configured
 */
export const isGoogleDriveConfigured = (): boolean => {
    return !!GOOGLE_CLIENT_ID;
};

export interface InquiryPayload {
  formType: 'contact' | 'trip-planner';
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  referenceNumber?: string;
  [key: string]: unknown;
}

export interface InquiryResult {
  success: boolean;
  mode: 'production' | 'dev';
  message: string;
}

/**
 * Submits an inquiry payload to the configured form webhook (e.g., Formspree, Web3Forms, Getform)
 * or simulates a successful submission in development mode if no endpoint is configured.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

  // Development mode: No endpoint provided, log cleanly and return dev confirmation
  if (!endpoint || endpoint.trim() === '') {
    console.group('🛎️ [Vibes of Egypt] Inquiry Submitted (Development Mode)');
    console.info(
      'Notice: VITE_FORM_ENDPOINT is not set. The form payload was not sent to a remote service.'
    );
    console.info('Submitted Payload:', payload);
    console.groupEnd();

    // Brief simulated network delay for authentic UI feedback
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      mode: 'dev',
      message: 'Inquiry received in dev mode (payload logged to console). Configure VITE_FORM_ENDPOINT to receive real emails.'
    };
  }

  // Production mode: POST JSON to form endpoint
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        siteUrl: window.location.origin,
        pageUrl: window.location.href
      })
    });

    if (!response.ok) {
      let serverError = `Submission failed (${response.status} ${response.statusText})`;
      try {
        const data = await response.json();
        if (data && typeof data === 'object') {
          if (typeof data.message === 'string') serverError = data.message;
          else if (typeof data.error === 'string') serverError = data.error;
        }
      } catch {
        // Fall back to HTTP status message if response is not JSON
      }
      throw new Error(serverError);
    }

    return {
      success: true,
      mode: 'production',
      message: 'Your inquiry has been successfully transmitted to our concierge team.'
    };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unable to transmit inquiry. Please check your network connection.');
    console.error('❌ [Vibes of Egypt] Form submission failed:', error);
    throw error;
  }
}

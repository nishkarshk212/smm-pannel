/**
 * AirSMM API Integration
 * Handles communication with AirSMM panel for order fulfillment
 */

const API_KEY = process.env.AIRSMM_API_KEY || '';
const API_URL = process.env.AIRSMM_API_URL || 'https://airsmm.com/api/v2';

interface AirSMMResponse {
  [key: string]: any;
}

/**
 * Make API request to AirSMM
 */
async function apiRequest(action: string, data: Record<string, any> = {}): Promise<AirSMMResponse> {
  try {
    const formData = new URLSearchParams();
    formData.append('key', API_KEY);
    formData.append('action', action);
    
    // Add additional data
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('AirSMM API Error:', error);
    throw new Error(`AirSMM API failed: ${error.message}`);
  }
}

/**
 * Place a new order
 */
export async function placeOrder(service: number, link: string, quantity: number): Promise<{orderId: number}> {
  const result = await apiRequest('add', {
    service: service,
    link: link,
    quantity: quantity,
  });

  if (result.error) {
    throw new Error(result.error);
  }

  return { orderId: result.order };
}

/**
 * Check order status
 */
export async function checkOrderStatus(orderId: number): Promise<{
  charge: string;
  start_count: string;
  status: string;
  remains: string;
  currency: string;
}> {
  const result = await apiRequest('status', { order: orderId });

  if (result.error) {
    throw new Error(result.error);
  }

  return result as any;
}

/**
 * Check multiple orders status
 */
export async function checkMultipleOrders(orderIds: number[]): Promise<AirSMMResponse> {
  const result = await apiRequest('status', { orders: orderIds.join(',') });

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
}

/**
 * Get account balance
 */
export async function getBalance(): Promise<{ balance: string; currency: string }> {
  const result = await apiRequest('balance');

  if (result.error) {
    throw new Error(result.error);
  }

  return result as any;
}

/**
 * Get available services
 */
export async function getServices(serviceId?: number): Promise<any[]> {
  const params: Record<string, any> = {};
  if (serviceId) {
    params.services = serviceId;
  }

  const result = await apiRequest('services', params);

  if (result.error) {
    throw new Error(result.error);
  }

  return Array.isArray(result) ? result : [];
}

/**
 * Create refill request
 */
export async function createRefill(orderId: number): Promise<{ refill: number }> {
  const result = await apiRequest('refill', { order: orderId });

  if (result.error) {
    throw new Error(result.error);
  }

  return result as any;
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: number): Promise<{ cancel: number }> {
  const result = await apiRequest('cancel', { order: orderId });

  if (result.error) {
    throw new Error(result.error);
  }

  return result as any;
}

/**
 * Map your internal service to AirSMM service ID
 * Update these mappings based on your AirSMM panel
 */
export function getServiceMapping(internalService: string): number {
  const mappings: Record<string, number> = {
    'telegram_members': 1, // Update with actual service ID from AirSMM
    'telegram_views': 2,   // Update with actual service ID from AirSMM
  };

  return mappings[internalService] || 1;
}

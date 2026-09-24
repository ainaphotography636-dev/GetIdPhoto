import type { OrderModel } from "../models/OrderModel";
import { idpSaasService, type IdpSaasService } from "./network/IdpSaasService";

export class OrderRepository {
  private idpSaasService: IdpSaasService;

  constructor(idpSaasService: IdpSaasService) {
    this.idpSaasService = idpSaasService;
  }

  async createOrder(
    specCode: string,
    imageDataURL: string,
  ): Promise<OrderModel> {
    const createWatermarkPhotoRes =
      await this.idpSaasService.makeWatermarkPhoto({
        specCode,
        imageBase64: toRawBase64(imageDataURL),
      });

    const orderId = createWatermarkPhotoRes.photoUuid;

    const newOrder: OrderModel = {
      orderId,
      specCode,
      status: "unpaid",
      croppedNoBgWatermarkImageUrl: createWatermarkPhotoRes.idPhotoUrl,
      issues: createWatermarkPhotoRes.issues,
    };

    return newOrder;
  }

  async getOrder(
    orderId: string,
    paymentIntentId: string,
  ): Promise<OrderModel> {
    const getOrderRes = await this.idpSaasService.verifyStripePaymentGetPhoto({
      photoUuid: orderId,
      paymentIntentId,
    });

    const order: OrderModel = {
      orderId: getOrderRes.photoUuid,
      specCode: getOrderRes.specCode,
      status: "ORDER_EFFECTIVELY",
      croppedNoBgNoWatermarkImageUrl: getOrderRes.idPhotoTempResultPhotoUrl,
      issues: [],
      orderAmountInCents: getOrderRes.amountInCents,
      orderCurrency: getOrderRes.currency,
      paymentStatus: getOrderRes.paymentStatus,
    };

    return order;
  }
}

/** idphoto.app expects raw base64, not a data: URL. */
function toRawBase64(imageDataURL: string): string {
  const value = imageDataURL.trim();
  const comma = value.indexOf(",");
  if (value.startsWith("data:") && comma !== -1) {
    return value.slice(comma + 1);
  }
  return value;
}

// Shared instance
export const orderRepository = new OrderRepository(idpSaasService);

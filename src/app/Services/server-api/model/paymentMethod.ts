/**
 * OrbitaliQ.DigitalWallet.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.6.5.506
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface PaymentMethod { 
    userId?: string | null;
    cardNumber?: string | null;
    cvv?: string | null;
    cardType?: string | null;
    cardBrand?: string | null;
    cardExpire?: string | null;
    cardHolderName?: string | null;
    cardHolderID?: string | null;
    id?: string | null;
    deactiev?: boolean;
    deactievDate?: string;
}

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


export interface TopUpDto { 
    paymentMethodId?: string | null;
    paymentExtendedData?: any | null;
    amount?: number;
    currency?: string | null;
    description?: string | null;
    externalId?: string | null;
}


export type CARD_BRAND = any;
export namespace CARD_BRAND {
    const AMEX: string;
    const DISCOVER: string;
    const MC: string;
    const VISA: string;
}
export type CARD_TYPE = any;
export namespace CARD_TYPE {
    const DEBIT: string;
    const CREDIT: string;
    const PREPAID: string;
    const UNKNOWN: string;
}
export type CARD_VERIFICATION_STATUS = any;
export namespace CARD_VERIFICATION_STATUS {
    const NO_MATCH: string;
    const MATCH: string;
    const NOT_CHECKED: string;
    const UNAVAILABLE: string;
}
/**
 * Card account expiration date
 * @typedef CardExpiration
 * @property {string} month - 2 character month
 * @property {string} year - 2 character year
 *
 * @tag Cards
 */
/** @template T
 *  @template K {extends keyof T}
 *  @typedef {Pick<Partial<T>, K> & Omit<T, K>} Optional
 */
/**
 * Card information collected for acquisition.
 * @typedef LinkCard
 * @property {string} cardNumber - All digits of the card
 * @property {CardExpiration} expiration - Card expiration date
 * @property {string} cardCvv - 3-4 digit card verification value
 * @property {string} holderName - Full name of the card holder
 * @property {Optional<CardBillingAddress, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'country'>} billingAddress - The billing address of the card
 * @property {boolean} [ cardOnFile = false ] - Indicates cardholder has authorized card to be stored for future payments. Only cards marked as card-on-file are eligible for automatic updates via card account updater
 *
 * @tag Cards
 */
/**
 * Card information that can be updated.
 * @typedef UpdateCard
 * @property {CardExpiration} expiration - Card expiration date
 * @property {string} cardCvv - 3-4 digit card verification value
 * @property {Optional<CardBillingAddress, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'country'>} billingAddress - The billing address of the card
*
 * @tag Cards
 */
/**
 * Card billing address
 * @typedef CardBillingAddress
 * @property {string} addressLine1 - string <= 32 characters
 * @property {string} addressLine2 - string <= 32 characters
 * @property {string} city - string <= 24 characters
 * @property {string} stateOrProvince - string <= 2 characters
 * @property {string} postalCode - string <= 5 characters
 * @property {string} country - string <= 2 characters
 *
 * @tag Cards
 */
/**
 * Card verification statuses
 * @typedef CardVerficationStatuses
 * @property {CARD_VERIFICATION_STATUS} cvv - Verification status of the CVV
 * @property {CARD_VERIFICATION_STATUS} addressLine1 - Verification status of addressLine1
 * @property {CARD_VERIFICATION_STATUS} postalCode - Verification status of the postalCode
 *
 * @tag Cards
 */
/**
 * Describes a Card account.
 * @typedef Card
 * @property {string} cardID - Card account identifier
 * @property {string} fingerprint - string <= 100 characters that is a unique fingerprint of a card
 * @property {CARD_BRAND} brand - The card brand
 * @property {CARD_TYPE} cardType - The type of the card
 * @property {string} lastFourCardNumber - Last four digits of the card
 * @property {string} bin - The BIN number of the card
 * @property {CardExpiration} expiration - The expiration info of the card
 * @property {string} holderName - The name of the card holder
 * @property {CardBillingAddress} billingAddress - The billing address of the card
 * @property {CardVerficationStatuses} cardVerfication - The results of submitting cardholder data to a card network for verification
 * @property {string} issuer - The name of the issuer
 * @property {string} issuerCountry - The country of the issuer
 * @property {string} merchantAccountID
 * @property {PaymentMethod[]} [paymentMethods]
 *
 * @example
 * {
 "billingAddress": {
   "addressLine1": "123 Main Street",
   "addressLine2": "Apt 302",
   "city": "Boulder",
   "country": "US",
   "postalCode": "80301",
   "stateOrProvince": "CO"
 },
 "bin": "123456",
 "brand": "Discover",
 "cardAccountUpdater": {
   "updateType": "number-update",
   "updatedOn": "2019-08-24T14:15:22Z"
 },
 "cardID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
 "cardOnFile": true,
 "cardType": "debit",
 "cardVerification": {
   "addressLine1": "match",
   "cvv": "match",
   "postalCode": "match"
 },
 "domesticPushToCard": "fast-funds",
 "expiration": {
   "month": "01",
   "year": "21"
 },
 "fingerprint": "9948962d92a1ce40c9f918cd9ece3a22bde62fb325a2f1fe2e833969de672ba3",
 "holderName": "Jules Jackson",
 "issuer": "GRINGOTTS BANK",
 "issuerCountry": "US",
 "lastFourCardNumber": "1234",
 "merchantAccountID": "50469144-f859-46dc-bdbd-9587c2fa7b42",
 "paymentMethods": [
   {
     "paymentMethodID": "9506dbf6-4208-44c3-ad8a-e4431660e1f2",
     "paymentMethodType": "card-payment"
   },
   {
     "paymentMethodID": "3f9969cf-a1f3-4d83-8ddc-229a506651cf",
     "paymentMethodType": "push-to-card"
   }
 ]
}
 *
 * @tag Cards
 */
/**
 * The Cards API.
 * @tag Cards
 */
export class Cards {
    constructor(moov: any);
    moov: any;
    /**
     * Retrieves details for the card with the specified ID.
     * The `CARDS_READ` scope enum is required when making a request from the browser.
     *
     * @param {string} accountID - Account to query
     * @param {string} cardID - Card to query
     * @returns {Promise<Card>}
     * @tag Cards
     */
    get(accountID: string, cardID: string): Promise<Card>;
    /**
     * Lists all the cards associated with a particular Moov account.
     * The `CARDS_READ` scope enum is required when making a request from the browser.
     *
     * @param {string} accountID - Account to query
     * @returns {Promise<Card[]>}
     * @tag Cards
     */
    list(accountID: string): Promise<Card[]>;
    /**
     * Links a card to a Moov account. Only use this endpoint if you have provided Moov with a
     * copy of your PCI attestation of compliance.
     * The `CARDS_WRITE` scope enum is required when making a request from the browser.
     *
     * @param {string} accountID - Account to link
     * @param {LinkCard} card - Card information
     * @param {boolean} [waitForPaymentMethods = false] whether to wait for payment methods to be created and included in response
     * @returns {Promise<Card>}
     * @tag Cards
     */
    link(accountID: string, card: LinkCard, waitForPaymentMethods?: boolean): Promise<Card>;
    /**
     * Updates a card in a Moov account. Only use this endpoint if you have provided Moov with a
     * copy of your PCI attestation of compliance.
     * The `CARDS_WRITE` scope enum is required when making a request from the browser.
     *
     * @param {string} accountID - Account linked to card
     * @param {string} cardID - Card to update
     * @param {UpdateCard} cardUpdates - Card information
     * @returns {Promise<Card>}
     * @tag Cards
     */
    update(accountID: string, cardID: string, cardUpdates: UpdateCard): Promise<Card>;
    /**
     * Disables a card with the specified ID.
     * The `CARDS_WRITE` scope enum is required when making a request from the browser.
     *
    * @param {string} accountID - Account to query
     * @param {string} cardID - Card to query
     * @returns {Promise<void>}
     * @tag Cards
     */
    disable(accountID: string, cardID: string): Promise<void>;
}
export type PaymentMethod = import('./paymentMethods.js').PaymentMethod;
/**
 * Card account expiration date
 */
export type CardExpiration = {
    /**
     * - 2 character month
     */
    month: string;
    /**
     * - 2 character year
     */
    year: string;
};
export type Optional<T, K> = Pick<Partial<T>, K> & Omit<T, K>;
/**
 * Card information collected for acquisition.
 */
export type LinkCard = {
    /**
     * - All digits of the card
     */
    cardNumber: string;
    /**
     * - Card expiration date
     */
    expiration: CardExpiration;
    /**
     * - 3-4 digit card verification value
     */
    cardCvv: string;
    /**
     * - Full name of the card holder
     */
    holderName: string;
    /**
     * - The billing address of the card
     */
    billingAddress: Optional<CardBillingAddress, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'country'>;
    /**
     * - Indicates cardholder has authorized card to be stored for future payments. Only cards marked as card-on-file are eligible for automatic updates via card account updater
     */
    cardOnFile?: boolean;
};
/**
 * Card information that can be updated.
 */
export type UpdateCard = {
    /**
     * - Card expiration date
     */
    expiration: CardExpiration;
    /**
     * - 3-4 digit card verification value
     */
    cardCvv: string;
    /**
     * - The billing address of the card
     */
    billingAddress: Optional<CardBillingAddress, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'country'>;
};
/**
 * Card billing address
 */
export type CardBillingAddress = {
    /**
     * - string <= 32 characters
     */
    addressLine1: string;
    /**
     * - string <= 32 characters
     */
    addressLine2: string;
    /**
     * - string <= 24 characters
     */
    city: string;
    /**
     * - string <= 2 characters
     */
    stateOrProvince: string;
    /**
     * - string <= 5 characters
     */
    postalCode: string;
    /**
     * - string <= 2 characters
     */
    country: string;
};
/**
 * Card verification statuses
 */
export type CardVerficationStatuses = {
    /**
     * - Verification status of the CVV
     */
    cvv: any;
    /**
     * - Verification status of addressLine1
     */
    addressLine1: any;
    /**
     * - Verification status of the postalCode
     */
    postalCode: any;
};
/**
 * Describes a Card account.
 */
export type Card = {
    /**
     * - Card account identifier
     */
    cardID: string;
    /**
     * - string <= 100 characters that is a unique fingerprint of a card
     */
    fingerprint: string;
    /**
     * - The card brand
     */
    brand: any;
    /**
     * - The type of the card
     */
    cardType: any;
    /**
     * - Last four digits of the card
     */
    lastFourCardNumber: string;
    /**
     * - The BIN number of the card
     */
    bin: string;
    /**
     * - The expiration info of the card
     */
    expiration: CardExpiration;
    /**
     * - The name of the card holder
     */
    holderName: string;
    /**
     * - The billing address of the card
     */
    billingAddress: CardBillingAddress;
    /**
     * - The results of submitting cardholder data to a card network for verification
     */
    cardVerfication: CardVerficationStatuses;
    /**
     * - The name of the issuer
     */
    issuer: string;
    /**
     * - The country of the issuer
     */
    issuerCountry: string;
    merchantAccountID: string;
    paymentMethods?: PaymentMethod[];
};
//# sourceMappingURL=cards.d.ts.map
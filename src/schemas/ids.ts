/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 * @example "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
 * @format uuid
 */
export type UUID = string

/**
 * Stringified ObjectId
 * @pattern [0-9a-fA-F]{24}
 * @example 551137c2f9e1fac808a5f572
 */
export type OID = string

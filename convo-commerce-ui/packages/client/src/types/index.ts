/* eslint-disable */
// TODO: Please remove this eslint disable once rest of the features are implemented.

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  items: Product[];
}

export const enum MessageType {
  TEXT = "TEXT",
  VIEW_ORDERS = "VIEW_ORDERS",
  VIEW_ORDER = "VIEW_ORDER",
  VIEW_ORDER_DETAILS = "VIEW_ORDER_DETAILS",
  SHOW_MORE_ORDERS = "SHOW_MORE_ORDERS",
  VIEW_PRODUCTS = "VIEW_PRODUCTS",
  VIEW_PRODUCT = "VIEW_PRODUCT",
  VIEW_PRODUCT_DETAILS = "VIEW_PRODUCT_DETAILS",
  SHOW_MORE_PRODUCTS = "SHOW_MORE_PRODUCTS",
}

export interface Message<T> {
  id: string;
  creatorId: string | "SERVER";
  type: T;
  content: any;
}

export interface TextMessage extends Message<MessageType.TEXT> {
  content: string;
}

export interface ViewOrdersMessage extends Message<MessageType.VIEW_ORDERS> {
  content: Order[];
}

export interface ViewProductsMessage
  extends Message<MessageType.VIEW_PRODUCTS> {
  content: Product[];
}

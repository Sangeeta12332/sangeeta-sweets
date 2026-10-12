import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  subtotal: number;
  image?: string;
}

export interface ICustomer {
  name: string;
  phone: string;
  email: string;
}

export interface IShippingAddress {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Pending' | 'COD' | 'Paid' | 'Failed';

export interface IOrder extends Document {
  orderNumber: string;
  customer: ICustomer;
  shippingAddress: IShippingAddress;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'Pay Online';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    weight: { type: String, required: true },
    subtotal: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema<IShippingAddress>(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: { type: CustomerSchema, required: true },
    shippingAddress: { type: ShippingAddressSchema, required: true },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'Pay Online'],
      default: 'Cash on Delivery',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'COD', 'Paid', 'Failed'],
      default: 'COD',
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
      index: true,
    },
    deliveryInstructions: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

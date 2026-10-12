import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWeightOption {
  label: string;
  price: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  ingredients: string[];
  weightOptions: IWeightOption[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isAvailable: boolean;
  stock: number;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const WeightOptionSchema = new Schema<IWeightOption>(
  {
    label: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true },
    images: { type: [String], default: ['/images/hero-sweets.jpg'] },
    ingredients: { type: [String], default: [] },
    weightOptions: { type: [WeightOptionSchema], default: [] },
    isFeatured: { type: Boolean, default: false, index: true },
    isBestSeller: { type: Boolean, default: false, index: true },
    isAvailable: { type: Boolean, default: true, index: true },
    stock: { type: Number, default: 50, min: 0 },
    tags: { type: [String], default: [] },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 12 },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search
ProductSchema.index({ name: 'text', description: 'text', shortDescription: 'text', tags: 'text' });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

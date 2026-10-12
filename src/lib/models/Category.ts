import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  itemCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: '' },
    image: { type: String, default: '/images/hero-sweets.jpg' },
    isActive: { type: Boolean, default: true },
    itemCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite during Next.js hot reload
export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

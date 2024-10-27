import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  identificacion: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  disponibles: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

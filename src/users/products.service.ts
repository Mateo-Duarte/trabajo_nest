import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from '../users/users.service'; // Importar UsersService para las validaciones

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly usersService: UsersService, // Inyectar UsersService
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Validar el ID del cliente
    const user = await this.usersService.findOneById(createProductDto.clientId); 
    if (!user) {
      throw new BadRequestException('El cliente no existe');
    }

    try {
      return this.productModel.create(createProductDto);
    } catch (error) {
      throw new BadRequestException("OCURRIÓ UN ERROR CON EL PAYLOAD");
    }
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete({ _id: id });
  }

  // Validar si el cliente puede comprar el producto
  async canPurchaseProduct(clientId: string, productId: string): Promise<boolean> {
    const user = await this.usersService.findOneById(clientId);
    if (!user) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Aquí puedes añadir más lógica para determinar si el cliente puede comprar el producto
    return product.disponibles > 0;
  }
}

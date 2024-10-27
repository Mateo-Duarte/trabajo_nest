import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }



  create(createUserDto: CreateUserDto) {
  try{
    return this.userModel.create(createUserDto);
  }catch (error){
    throw new BadRequestException("OCURRIO UN ERROR CON EL PAYLOAD")
  }
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete({_id: id});
  }

  findOneById(id: string) {
    return this.userModel.findById(id);
  }
  
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { DeepPartial, Model, Schema } from 'mongoose';
import { User, CurrentLocation } from '@types';
import { UpdateCurrentLocationDto } from './dto/update-current-location.dto';
import { AddContactDto } from './dto/add-contact.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async updateLocation(
    user: User,
    updateLocationDto: UpdateCurrentLocationDto,
  ) {
    const location = {
      longitude:
        updateLocationDto.longitude as unknown as DeepPartial<Schema.Types.String>,
      latitude:
        updateLocationDto.latitude as unknown as DeepPartial<Schema.Types.String>,
    };

    return await this.userModel.updateOne(
      { email: user.email },
      {
        location,
      },
    );
  }

  async addContact(user: User, addContactDto: AddContactDto) {
    const contact = await this.userModel.findOne({ _id: addContactDto._id });

    return await this.userModel.updateOne(
      {
        email: user.email,
      },
      {
        $push: { contact: contact },
      },
    );
  }
}

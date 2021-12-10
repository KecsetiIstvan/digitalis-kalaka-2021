import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Condition, DeepPartial, Model, Schema } from 'mongoose';
import { User, CurrentLocation, EmergencyContact } from '@types';
import { AddContactDto } from './dto/add-contact.dto';
import { AddEmergencyContactDto } from './dto/add-emergency-contact-dto';

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

  async updateLocation(user: User, location: any) {
    return await this.userModel.updateOne(
      { email: user.email },
      {
        location,
      },
    );
  }

  async addContact(user: User, addContactDto: AddContactDto) {
    const contact = await this.userModel.findOne({
      _id: addContactDto._id as Condition<string>,
    });

    return await this.userModel.updateOne(
      {
        email: user.email,
      },
      {
        $push: { contacts: contact },
      },
    );
  }

  async getContactsLocations(user: User) {
    return await (
      await this.userModel
        .findOne({ _id: user._id })
        .populate('contacts', '', this.userModel as any)
    ).contacts.map((contact) => {
      return {
        location: contact.location,
        firstName: contact.firstName,
        lastName: contact.lastName,
      };
    });
  }

  async getContact(id: string) {
    const contact = await this.userModel.findOne({ _id: id });
    const { password, ...retCont } = contact;
    return retCont;
  }

  async deleteContact(user: User, id: string) {
    const contact = user.contacts.filter((contact) => contact._id !== id);
    return await this.userModel.updateOne(
      {
        email: user.email,
      },
      {
        $set: { contacts: contact },
      },
    );
  }

  async addEmergencyContact(user: User, emergencyContact: AddEmergencyContactDto) {
    return 'asd';
  }

  async deleteEmergencyContact(user: User, emergencyContact: AddEmergencyContactDto) {
    return 'asd';
  }

  async getEmergencyContact(user: User, emergencyContact: AddEmergencyContactDto) {
    return 'asd';
  }

  async updateEmergencyContact(user: User, emergencyContact: AddEmergencyContactDto) {
    return 'asd';
  }
}

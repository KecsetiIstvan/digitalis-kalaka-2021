import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Condition, DeepPartial, Model, Schema, UpdateQuery } from 'mongoose';
import { User, CurrentLocation, EmergencyContact, Status } from '@types';
import { AddContactDto } from './dto/add-contact.dto';
import { AddEmergencyContactDto } from './dto/add-emergency-contact-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(
      _id,
      updateUserDto as unknown as User,
      { new: true },
    );

    return 'updated';
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

  async updateStatus(user: User, status: Status, isLocationShared: boolean) {
    return await this.userModel.updateOne(
      { email: user.email },
      {
        status,
        isLocationShared,
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
        profileImageUrl: contact.profileImageUrl,
        status: contact.status,
        isLocationShared: contact.status,
      };
    });
  }

  async getContact(id: string) {
    const contact = await this.userModel.findOne({ _id: id });
    return {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      location: contact.location,
      phone: contact.phone,
    };
  }

  async getAll() {
    return await this.userModel.find();
  }

  async deleteContact(user: User, id: string) {
    const userToDelete = await this.userModel.findOne({ _id: id });
    const userToDeleteFrom = await this.userModel
      .findOne({ _id: user._id })
      .populate('contacts', '', this.userModel as any);
    const contact = userToDeleteFrom.contacts.filter(
      (contact) => contact.email !== userToDelete.email,
    );

    return await this.userModel.updateOne(
      {
        email: user.email,
      },
      {
        contacts: contact,
      },
    );
  }

  async addEmergencyContact(
    user: User,
    emergencyContact: AddEmergencyContactDto,
  ) {
    return await this.userModel.updateOne(
      {
        email: user.email,
      },
      {
        $push: { emergencyContacts: emergencyContact },
      },
    );
  }

  async deleteEmergencyContact(user: User, id: string) {
    const emergencyContact = user.emergencyContacts.filter(
      (emergencyContact) => emergencyContact._id.toString() !== id,
    );

    return await this.userModel.updateOne(
      {
        email: user.email,
      },
      {
        emergencyContacts: emergencyContact,
      },
    );
  }

  async getEmergencyContact(user: User, id: string) {
    const contact = user.emergencyContacts.find(
      (item) => item._id.toString() === id,
    );
    return contact;
  }

  async updateEmergencyContact(user: User, id: string) {
    return 'asd';
  }
}

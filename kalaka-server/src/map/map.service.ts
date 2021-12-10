import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, Schema } from 'mongoose';
import { User } from '@types';

import { UserService } from '../user/user.service';
import { UpdateCurrentLocationDto } from './dto/update-current-location.dto';

@Injectable()
export class MapService {
  constructor(private readonly userService: UserService) {}

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

    return await this.userService.updateLocation(user, location);
  }

  async getLocations(user: User) {
    return await this.userService.getContactsLocations(user);
    //return await this.userService.find({ email: user.email });
    /*.contacts.map((contact) => {
      console.log(contact);
      return contact.location;
    });*/
  }
}

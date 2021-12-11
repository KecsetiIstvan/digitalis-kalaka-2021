import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, Schema } from 'mongoose';
import { User } from '@types';

import { UserService } from '../user/user.service';
import { UpdateCurrentLocationDto } from './dto/update-current-location.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

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
  }

  async updateStatus(user: User, updateStatusDto: UpdateStatusDto) {
    return await this.userService.updateStatus(
      user,
      updateStatusDto.status,
      updateStatusDto.isLocationShared as unknown as boolean,
    );
  }
}

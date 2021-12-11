import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Schema } from 'mongoose';
import { Command } from 'nestjs-command';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserSeed {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create:users',
    describe: 'create users',
  })
  async userSeed() {
    Array.from(Array(20)).map(async (item, index) => {
      await this.userService.create({
        email: `kalaka-user-${
          index + 1
        }@digitalis-kalaka.hu` as unknown as Schema.Types.String,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: '1234' as unknown as Schema.Types.String,
        phone: '123123' as unknown as Schema.Types.String,
      });
    });
  }
}

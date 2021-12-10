import { Controller, Post, Body, Get, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@decorators';
import { UpdateCurrentLocationDto } from './dto/update-current-location.dto';
import { User } from '@types';
import { AddContactDto } from './dto/add-contact.dto';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard())
  @Patch('me/location')
  updateLocation(
    @CurrentUser() user: User,
    @Body() updateCurrentLocationDto: UpdateCurrentLocationDto,
  ) {
    return this.userService.updateLocation(user, updateCurrentLocationDto);
  }

  @UseGuards(AuthGuard())
  @Patch('me/add-contact')
  addContact(@CurrentUser() user: User, @Body() addContactDto: AddContactDto) {
    return this.userService.addContact(user, addContactDto);
  }

  /*
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove([id]);
  }
  */
}

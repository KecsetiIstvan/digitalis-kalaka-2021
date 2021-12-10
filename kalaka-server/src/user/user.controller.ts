import { Controller, Post, Body, Get, UseGuards, Patch, Param, HttpStatus, HttpException } from '@nestjs/common';
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

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: number) {
    if (user.contacts.filter((contact) => contact.id === id).length > 0) {
      return this.userService.getContact(id);
    }
    return new HttpException(
      'A kért felhasználó nem az ismerősöd',
      HttpStatus.UNAUTHORIZED,
    );
  }

  /*
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

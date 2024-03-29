import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@decorators';
import { EmergencyContact, User } from '@types';
import { AddContactDto } from './dto/add-contact.dto';
import { AddEmergencyContactDto } from './dto/add-emergency-contact-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard())
  @Get('me')
  me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard())
  @Post('me/add-contact')
  addContact(@CurrentUser() user: User, @Body() addContactDto: AddContactDto) {
    return this.userService.addContact(user, addContactDto);
  }

  @UseGuards(AuthGuard())
  @Post('me/add-emergency-contact')
  addEmergencyContact(
    @CurrentUser() user: User,
    @Body() addEmergencyContactDto: AddEmergencyContactDto,
  ) {
    return this.userService.addEmergencyContact(user, addEmergencyContactDto);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOneContact(@CurrentUser() user: User, @Param('id') id: string) {
    if (user.contacts.includes(id as unknown as User)) {
      return this.userService.getContact(id);
    }
    return new HttpException(
      'A kért felhasználó nem az ismerősöd',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard())
  @Delete('contacts/:id')
  deleteContact(@CurrentUser() user: User, @Param('id') id: string) {
    if (user.contacts.includes(id as unknown as User)) {
      return this.userService.deleteContact(user, id);
    }
    return new HttpException(
      'A kért felhasználó nem az ismerősöd',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard())
  @Get('emergency-contacts/:id')
  findOneEmergencyContact(@CurrentUser() user: User, @Param('id') id: string) {
    if (
      user.emergencyContacts.filter(
        (emergencyContact) => emergencyContact._id.toString() === id,
      ).length > 0
    ) {
      return this.userService.getEmergencyContact(user, id);
    }
    return new HttpException(
      'A kért felhasználó nem az ismerősöd',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard())
  @Delete('emergency-contacts/:id')
  deleteEmergencyContact(@CurrentUser() user: User, @Param('id') id: string) {
    if (
      user.emergencyContacts.filter(
        (emergencyContact) => emergencyContact._id.toString() === id,
      ).length > 0
    ) {
      return this.userService.deleteEmergencyContact(user, id);
    }
    return new HttpException(
      'A kért felhasználó nem az ismerősöd',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard())
  @Patch('me')
  updateMe(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user._id, updateUserDto);
  }
  /*

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove([id]);
  }
  */
}

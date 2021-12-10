import { Controller, Post, Body, Get, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@decorators';
import { User } from '@types';
import { UpdateCurrentLocationDto } from './dto/update-current-location.dto';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  public constructor(private readonly mapService: MapService) {}

  @UseGuards(AuthGuard())
  @Patch('my-location')
  updateLocation(
    @CurrentUser() user: User,
    @Body() updateCurrentLocationDto: UpdateCurrentLocationDto,
  ) {
    return this.mapService.updateLocation(user, updateCurrentLocationDto);
  }

  @UseGuards(AuthGuard())
  @Get('')
  getLocations(@CurrentUser() user: User) {
    return this.mapService.getLocations(user);
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

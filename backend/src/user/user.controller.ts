import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/count')
  getFeedCount() {
    return this.userService.getFeedCount();
  }

  @Get(':id')
  getTarget(@Param('id') id) {
    return this.userService.getTarget(id);
  }

  @Post()
  addCurrentUser(@Body() body: any) {
    return this.userService.addUser(body);
  }

  @Post('/kill/:id')
  killTarget(@Param('id') id) {
    return this.userService.killTarget(id);
  }

  @Post('/fetchAzureUsers')
  fetchAzureUsers(@Body() body: any) {
    if (body.secKey === process.env.SECKEY) {
      this.userService.fetchAzureUsers();
    }
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/count')
  getFeedCount() {
    return this.userService.getFeedCount();
  }

  @Get('/alive')
  getAlivePlayers() {
    return this.userService.getAlivePlayers();
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
    } else {
      console.log('Incorrect seckey passed to generate users');
    }
  }
}

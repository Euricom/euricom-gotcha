import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttemptService } from './attempt.service';

@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Get()
  getAllAttempts() {
    return this.attemptService.getAllAttempts();
  }

  @Get('image/:filePath')
  async serveAvatar(@Param('filePath') filePath, @Res() res): Promise<any> {
    res.sendFile(filePath, { root: 'image' });
  }

  @Get(':id')
  getAttemptsOnCurrentUser(@Param('id') id: string) {
    return this.attemptService.getAttemptByTargetId(id);
  }

  @Post('/update/:id')
  updateAttempt(@Param('id') id: string, @Body() body: any) {
    return this.attemptService.updateAttempt(body.approved, id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  addAttempt(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    return this.attemptService.addAttempt(id, file, body);
  }
}

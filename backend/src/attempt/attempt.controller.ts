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
import { extname } from 'path';
import { diskStorage } from 'multer';
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
    this.attemptService.updateAttempt(body.approved, id);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './image',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  addAttempt(@Param('id') id: string, @UploadedFile() file, @Body() body) {
    return this.attemptService.addAttempt(id, file.path, body);
  }
}

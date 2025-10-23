import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
  constructor(private configService: ConfigService) {}

  getFileUrl(filename: string): string {
    const port = this.configService.get('PORT') || 3000;
    return `http://localhost:${port}/uploads/${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

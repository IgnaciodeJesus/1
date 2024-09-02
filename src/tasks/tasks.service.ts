import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as decompress from 'decompress';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('59 * * * * *') // Runs every 59 seconds for demonstration
  // Cron works with the following format: 'Seconds Minutes Hours Day Month Year'
  // There's an image sample of it's functionality in the Docs.md file
  async handleDownloadAndDecompress(): Promise<void> {
    this.logger.debug('Starting file download...');
    const url =
      'https://offshoreleaks-data.icij.org/offshoreleaks/csv/full-oldb.LATEST.zip'; // File URL
    const savePath = path.join(__dirname, '../../files/offshore_leaks.zip'); // Save path
    const outputDir = path.join(__dirname, '../../data/csv'); // Output directory

    try {
      const response = await axios({
        url: url,
        method: 'GET',
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(savePath);
      response.data.pipe(writer);

      await new Promise<void>((resolve, reject) => {
        writer.on('finish', () => {
          this.logger.debug('File download completed.');
          resolve();
        });
        writer.on('error', (error) => {
          this.logger.error('Error in file stream writing.', error);
          reject(error);
        });
      });

      await this.decompressFile(savePath, outputDir);
    } catch (error) {
      this.logger.error('Failed to download or decompress file:', error);
    }
  }

  // Decompress ZIP file and extract CSV files
  private async decompressFile(filePath: string, dest: string): Promise<void> {
    try {
      const files = await decompress(filePath, dest, {
        filter: (file) => file.path.endsWith('.csv'),
      });

      if (files.length > 0) {
        this.logger.debug(`Decompressed ${files.length} files successfully.`);
      } else {
        this.logger.error(
          'No files were decompressed, please check the archive format and filter.',
        );
      }

      // Uncomment block below -> Delete Zip (after decompression)

      /*
      fs.unlink(filePath, (err) => {
        if (err) this.logger.error('Failed to delete the ZIP file:', err);
      });
      */

      // Uncomment block below (until catch) -> Delete all decompressed CSV files

      /*
      files.forEach(file => {
        fs.unlink(path.join(dest, file.path), err => {
          if (err)
            this.logger.error(
              `Failed to delete decompressed file ${file.path}:`,
              err,
            );
        });
      });
      */
    } catch (error) {
      this.logger.error('Decompression failed:', error);
    }
  }
}

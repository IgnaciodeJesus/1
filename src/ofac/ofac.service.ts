import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class OfacService {
  private readonly logger = new Logger(OfacService.name);
  private readonly localFilePath = path.join(
    __dirname,
    '../../data/ofacData.json',
  ); // Local storage path for data (XML -> JSON)

  constructor() {
    this.downloadAndInitializeData();
  }

  // Preload, parse & save XML data to JSON
  private async downloadAndInitializeData(): Promise<void> {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN_ENHANCED.XML',
        responseType: 'arraybuffer',
      });
      const xmlData = response.data.toString('utf-8');
      const parsedData = await this.parseXml(xmlData);
      await fs.writeFile(this.localFilePath, JSON.stringify(parsedData));
      this.logger.log('OFAC data downloaded, parsed & saved successfully.');
    } catch (error) {
      this.logger.error('Failed to download, parse, or save XML:', error);
      throw new Error('Failed to download, parse, or save XML');
    }
  }

  private async parseXml(xmlData: string): Promise<any[]> {
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);
    return result.sanctionsData.entities.entity; // Extract entities from XML
  }

  // Search by name in local data
  public async searchByName(name: string): Promise<any[]> {
    try {
      const data = JSON.parse(await fs.readFile(this.localFilePath, 'utf-8'));
      return data
        .filter(
          (entry) => entry.names && this.processNames(entry.names.name, name),
        )
        .slice(0, 3); // Return top 3 matches
    } catch (error) {
      this.logger.error('Error accessing or reading local data:', error);
      throw new Error('Error in searching data by name');
    }
  }

  private processNames(names, query) {
    // Ensure names is always treated as an array
    if (!Array.isArray(names)) {
      names = [names];
    }
    return names.some((nameEntry) =>
      Array.isArray(nameEntry.translations.translation)
        ? nameEntry.translations.translation.some((translation) =>
            translation.formattedFullName
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
        : nameEntry.translations.translation.formattedFullName
            .toLowerCase()
            .includes(query.toLowerCase()),
    );
  }
}

import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  private readonly csvDirectory = path.join(__dirname, '../../data/csv');

  // Search for an entity in all CSV files in the data directory (Offshore Leaks)
  async searchEntity(entityName: string): Promise<any[]> {
    const files = fs.readdirSync(this.csvDirectory);
    let searchResults = [];

    for (const file of files) {
      if (file.endsWith('.csv')) {
        const fullPath = path.join(this.csvDirectory, file);
        const results = await this.searchInFile(fullPath, entityName);
        searchResults = searchResults.concat(results);
      }
    }

    // Sort by relevance score descending and take the top three results
    searchResults.sort((a, b) => b.relevance - a.relevance);
    return searchResults.slice(0, 3);
  }

  private async searchInFile(
    filePath: string,
    searchQuery: string,
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          const relevance = this.calculateRelevance(data, searchQuery);
          if (relevance > 0) {
            results.push({ data, relevance });
          }
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          this.logger.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  }

  private calculateRelevance(data: any, query: string): number {
    let relevance = 0;
    Object.values(data).forEach((value) => {
      if (typeof value === 'string' && value.includes(query)) {
        // Increase relevance for each occurrence of the query
        relevance += 1;
      }
    });
    return relevance;
  }

  private isMatch(data: any, query: string): boolean {
    return Object.values(data).some(
      (value) => typeof value === 'string' && value.includes(query),
    );
  }
}

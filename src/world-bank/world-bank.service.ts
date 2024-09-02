import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WorldBankService {
  private readonly logger = new Logger(WorldBankService.name);
  private readonly apiURL =
    'https://apigwext.worldbank.org/dvsvc/v1.0/json/APPLICATION/ADOBE_EXPRNCE_MGR/FIRM/SANCTIONED_FIRM';
  private readonly apiKey = 'z9duUaFUiEUYSHs97CU38fcZO7ipOPvm';

  // Fetch debarred firms from the World Bank API
  async fetchDebarredFirms(entityName: string): Promise<any[]> {
    try {
      const response = await axios.get(this.apiURL, {
        headers: {
          apikey: this.apiKey,
        },
      });
      const firms = response.data.response.ZPROCSUPP.filter((firm) => {
        return firm.SUPP_NAME.toLowerCase().includes(entityName.toLowerCase());
      }).map((firm) => ({
        firmName: firm.SUPP_NAME,
        address: firm.SUPP_ADDR,
        country: firm.SUPP_COUNTRY,
        fromDate: firm.DEBAR_FROM_DATE,
        toDate: firm.DEBAR_TO_DATE,
        grounds: firm.DEBAR_REASON,
      }));

      return firms.slice(0, 3); // Return the top 3
    } catch (error) {
      this.logger.error('Failed to retrieve data from World Bank API:', error);
      return [];
    }
  }
}

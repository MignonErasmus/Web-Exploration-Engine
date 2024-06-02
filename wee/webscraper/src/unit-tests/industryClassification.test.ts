/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { IndustryController } from '../industry-classification-app/industry.controller';
import { IndustryService } from '../industry-classification-app/industry.service';
import { HttpStatus } from '@nestjs/common';

// Mocking the IndustryService
jest.mock('../industry-classification-app/industry.service');

describe('IndustryController', () => {
  let controller: IndustryController;
  let service: IndustryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndustryController],
      providers: [IndustryService],
    }).compile();

    controller = module.get<IndustryController>(IndustryController);
    service = module.get<IndustryService>(IndustryService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('handleScrapeMetadata', () => {

    it('should throw an error for a URL that cannot be scraped - Pixabay', async () => {
      const url = 'https://pixabay.com/';

      // Mocking the behavior of scrapeMetadata to throw an error
      (service.scrapeMetadata as jest.Mock).mockRejectedValue(new Error('cannot scrape this website'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.handleScrapeMetadata(url, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cannot Scrape this Website' });
    });

    it('should throw an error for a URL that cannot be scraped - Amazon', async () => {
      const url = 'https://amazon.com/';

      // Mocking the behavior of scrapeMetadata to throw an error
      (service.scrapeMetadata as jest.Mock).mockRejectedValue(new Error('cannot scrape this website'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.handleScrapeMetadata(url, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cannot Scrape this Website' });
    });



    it('should return metadata when URL is provided - Takealot', async () => {
      const url = 'https://www.takealot.com';
      const metadata = {
        title: "Takealot.com: Online Shopping | SA's leading online store",
        description: "South Africa's leading online store. Fast, reliable delivery to your door. Many ways to pay. Shop anything you can imagine: TVs, laptops, cellphones, kitchen appliances, toys, books, beauty & more. Shop the mobile app anytime, anywhere.",
        keywords: null,
        ogTitle: "Takealot.com: Online Shopping | SA's leading online store",
        ogDescription: "South Africa's leading online store. Fast, reliable delivery to your door. Many ways to pay. Shop anything you can imagine: TVs, laptops, cellphones, kitchen appliances, toys, books, beauty & more. Shop the mobile app anytime, anywhere.",
        ogImage: "https://www.takealot.com/static/images/logo_transparent.png"
      };
      const industry = "E-commerce";

      jest.spyOn(service, 'scrapeMetadata').mockResolvedValue({ metadata, industry });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.handleScrapeMetadata(url, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ metadata, industry });
    });


    it('should return metadata when URL is provided - Amazon Music', async () => {
      const url = 'https://www.amazon.com/gp/dmusic/promotions/PrimeMusic';
      const metadata = {
        title: "Amazon Music Prime | Amazon.com",
        description: "Play all the music and top podcasts ad-free with your Prime membership. Shuffle play any artist, album, or playlist today on Amazon Music.",
        keywords: "Prime Music, Amazon.com",
        ogTitle: null,
        ogDescription: "Play all the music and top podcasts ad-free with your Prime membership. Shuffle play any artist, album, or playlist today on Amazon Music.",
        ogImage: null
      };
      const industry = "Entertainment";

      jest.spyOn(service, 'scrapeMetadata').mockResolvedValue({ metadata, industry });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.handleScrapeMetadata(url, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ metadata, industry });
    });


    it('should return metadata when URL is provided - ChatGPT', async () => {
      const url = 'https://www.chatgpt.com/$';
      const metadata = {
        title: "",
        description: null,
        keywords: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null
      };
      const industry = "No classification";

      jest.spyOn(service, 'scrapeMetadata').mockResolvedValue({ metadata, industry });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.handleScrapeMetadata(url, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ metadata, industry });
    });

    it('should return metadata when URL is provided - TheHealthSite', async () => {
      const url = 'https://www.thehealthsite.com/';
      const metadata = {
        title: "Health Tips, Health Care and Fitness Tips, Health News | TheHealthSite.com",
        description: "Complete health guide which includes fitness, beauty, diet, yoga, weight training, pregnancy, parenting, diseases & home remedies. Get weight loss tips, food & healthy recipes. Also watch health related videos at thehealthsite.com",
        keywords: "health,diet and fitness,health and fitness,weight loss,healthy recipes,beauty tips,home remedies,health articles,diseases and conditions,health videos,workout tips,weight training,beauty home remedies,yoga asanas",
        ogTitle: "Health Tips, Health Care and Fitness Tips, Health News | TheHealthSite.com",
        ogDescription: "Complete health guide which includes fitness, beauty, diet, yoga, weight training, pregnancy, parenting, diseases & home remedies. Get weight loss tips, food & healthy recipes. Also watch health related videos at thehealthsite.com",
        ogImage: "https://st1.thehealthsite.com/wp-content/uploads/2015/05/Banner_01.jpg"
      };
      const industry = "Healthcare";

      jest.spyOn(service, 'scrapeMetadata').mockResolvedValue({ metadata, industry });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.handleScrapeMetadata(url, res as any);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ metadata, industry });
    });


  });



});

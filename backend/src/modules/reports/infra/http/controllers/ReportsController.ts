import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetGeneralRankingReportService from '@modules/reports/services/GetGeneralRankingReportService';
import GetCourseRankingReportService from '@modules/reports/services/GetCourseRankingReportService';

export default class ReportsController {
  public async general(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getGeneralRankingReport = container.resolve(
      GetGeneralRankingReportService,
    );

    const filePath = await getGeneralRankingReport.execute();

    return response.json(filePath);
  }

  public async course(request: Request, response: Response): Promise<Response> {
    const getCourseRankingReport = container.resolve(
      GetCourseRankingReportService,
    );

    const filePath = await getCourseRankingReport.execute();

    return response.json(filePath);
  }
}

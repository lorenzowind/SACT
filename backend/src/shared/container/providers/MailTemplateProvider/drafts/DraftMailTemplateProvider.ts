import IMailTemplateProvider from '../models/IMailTemplateProvider';

class DraftMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default DraftMailTemplateProvider;

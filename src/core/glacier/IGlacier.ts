export default interface IGlacier {
  upload(body: string, filePathName: string, args?: any): Promise<void>;
}

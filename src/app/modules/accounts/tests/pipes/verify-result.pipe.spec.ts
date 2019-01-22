import { VerifyResultPipe } from '../../pipes/verify-result.pipe';

describe('VerifyResultPipe', () => {
  it('create an instance', () => {
    const pipe = new VerifyResultPipe();
    expect(pipe).toBeTruthy();
  });
});

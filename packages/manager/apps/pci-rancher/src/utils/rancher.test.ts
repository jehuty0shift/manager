import { isValidRancherName } from './rancher';

describe('Should validate rancher name', () => {
  it('When i add a valid rancher name', () => {
    expect(isValidRancherName('rancher1234')).toBe(true);
    expect(isValidRancherName('rancher1234-_.r')).toBe(true);
    expect(isValidRancherName('rANcher')).toBe(true);
    expect(
      isValidRancherName(
        '012345678901234567890123456789012345678901234567890123456789123',
      ),
    ).toBe(true);
  });

  describe('Invalid rancher name', () => {
    it('When i add invalid character in rancher name', () => {
      expect(isValidRancherName('ranche(r1xs23___4((')).toBe(false);
      expect(isValidRancherName('rancher1234-_.@')).toBe(false);
      expect(isValidRancherName('RancheR')).toBe(false);
    });

    it('When length is not valid', () => {
      expect(isValidRancherName('ra')).toBe(false);
      expect(
        isValidRancherName(
          '01234567890123456789012345678901234567890123456789012345678912345',
        ),
      ).toBe(false);
    });
    it('When i start with invalid character', () => {
      expect(isValidRancherName('-ran')).toBe(false);
      expect(isValidRancherName('.ran')).toBe(false);
      expect(isValidRancherName('_ran')).toBe(false);
      expect(isValidRancherName('ran-')).toBe(false);
    });
  });
});

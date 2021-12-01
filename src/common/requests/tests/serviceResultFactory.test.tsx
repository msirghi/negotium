import ServiceResultFactory from '../serviceResultFactory';
import { AxiosError, AxiosResponse } from 'axios';

describe('ServiceResultFactory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object with metadata', () => {
    const result = ServiceResultFactory.fromResponse({
      data: { test: 'test' },
      headers: {},
      status: 200,
    } as AxiosResponse);
    expect(result).toEqual({
      data: { test: 'test' },
      headers: {},
      status: 200,
    });
  });

  describe('fromError', () => {
    it('should throw an error if there are any in data object', () => {
      expect(() => {
        ServiceResultFactory.fromError({
          response: { data: { message: 'Message' } },
        } as AxiosError);
      }).toThrow();
    });

    it('should throw an error if there is no data object in response', () => {
      expect(() => {
        ServiceResultFactory.fromError({
          response: { anotherData: { message: 'Message' } },
        } as unknown as AxiosError);
      }).toThrow();
    });

    it('should throw generic error if response is not defined', () => {
      expect(() => {
        ServiceResultFactory.fromError({} as unknown as AxiosError);
      }).toThrow();
    });
  });
});

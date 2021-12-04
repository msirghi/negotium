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

  describe('convertMongoIdToJSId', () => {
    it('should return data if value is not an array', () => {
      const data = { data: 'test' };
      expect(ServiceResultFactory.convertMongoIdToJSId(data as any)).toEqual(
        data
      );
    });

    it('should return empty array if empty array is provided', () => {
      expect(ServiceResultFactory.convertMongoIdToJSId([])).toEqual([]);
    });

    it('should convert id to _id and return new array', () => {
      const input = [{ _id: 1 }];
      expect(
        ServiceResultFactory.convertMongoIdToJSId(input as any)[0].id
      ).toEqual(input[0]._id);
    });
  });
});

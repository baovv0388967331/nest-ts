import { Transform } from 'class-transformer';

export const ToNumberArray = () =>
  Transform(({ value }) => {
    if (!Array.isArray(value)) {
      const num = parseInt(value);
      if (num && !isNaN(num)) {
        return [num];
      }

      return [];
    }

    return value.reduce((r, v) => {
      const num = parseInt(v);
      if (num && !isNaN(num)) {
        r.push(v);
      }

      return r;
    }, []);
  });

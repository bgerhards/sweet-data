export const json = (text: string, { step = ' ' }: { step?: string } = {}): Promise<string> => {
  return new Promise(function (resolve, reject) {
    try {
      if (typeof text === "string") {
        return resolve(JSON.stringify(JSON.parse(text), null, step));
      }

      if (typeof text === "object") {
        return resolve(JSON.stringify(text, null, step));
      }

      throw new TypeError('Input must of type "object" or "string"');
    } catch (e) {
      reject(e);
    }
  });
};

export const jsonmin = (text: string): Promise<string> => {
  return new Promise(function (resolve, reject) {
    try {
      if (typeof text === "string") {
        var result = JSON.stringify(JSON.parse(text))
          .replace(/\s{0,}\{\s{0,}/g, "{")
          .replace(/\s{0,}\[$/g, "[")
          .replace(/\[\s{0,}/g, "[")
          .replace(/:\s{0,}\[/g, ':[')
          .replace(/\s{0,}\}\s{0,}/g, "}")
          .replace(/\s{0,}\]\s{0,}/g, "]")
          .replace(/\"\s{0,}\,/g, '",')
          .replace(/\,\s{0,}\"/g, ',"')
          .replace(/\"\s{0,}:/g, '":')
          .replace(/:\s{0,}\"/g, ':"')
          .replace(/:\s{0,}\[/g, ':[')
          .replace(/\,\s{0,}\[/g, ',[')
          .replace(/\,\s{2,}/g, ', ')
          .replace(/\]\s{0,},\s{0,}\[/g, '],[');

        return resolve(result);
      }

      if (typeof text === "object") {
        var result = JSON.stringify(text)
          .replace(/\s{0,}\{\s{0,}/g, "{")
          .replace(/\s{0,}\[$/g, "[")
          .replace(/\[\s{0,}/g, "[")
          .replace(/:\s{0,}\[/g, ':[')
          .replace(/\s{0,}\}\s{0,}/g, "}")
          .replace(/\s{0,}\]\s{0,}/g, "]")
          .replace(/\"\s{0,}\,/g, '",')
          .replace(/\,\s{0,}\"/g, ',"')
          .replace(/\"\s{0,}:/g, '":')
          .replace(/:\s{0,}\"/g, ':"')
          .replace(/:\s{0,}\[/g, ':[')
          .replace(/\,\s{0,}\[/g, ',[')
          .replace(/\,\s{2,}/g, ', ')
          .replace(/\]\s{0,},\s{0,}\[/g, '],[');

        return resolve(result);
      }

      throw new TypeError('Input must of type "object" or "string"');
    } catch (e) {
      reject(e);
    }
  });
};

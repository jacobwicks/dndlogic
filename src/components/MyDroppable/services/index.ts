export const generateId = ({
    item,
    index,
    toStringify
  } : {
    item: any,
    index: number,
    toStringify?: any
  }) => {
    const id : {
        item: string,
        index: number,
        [key: string] : any
    } = {
        item: typeof(item) === 'string' ? item : JSON.stringify(item),
        index
    };
if (toStringify) {
        Object.keys(toStringify)
            .forEach(key =>
              id[key] = toStringify[key]
            );
    }
     
    return JSON.stringify(id);
  };
  
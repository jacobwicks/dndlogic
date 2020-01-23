import _ from 'lodash';

const isExact = (string: string) =>
!!(string.slice(0,1) === '"' && string.slice(-1) === '"')


const removeQuotesFrom = (string: string) => {
  string = string.slice(1, string.length);
  return string.slice(0, -1);
}

//returns all objects in target array that exactly match value string
//either on .name property or any value in tags[string]
const getExactMatches = (value: string, target: any[], searchBy: string[]) => {
    const results = searchBy.reduce((accumulator: any, property) => {

      const isMatch = (item: any) => {
      if (typeof(item) === 'string') {
        return item.toLowerCase() === value.toLowerCase();
      } else if (!item[property]) {
          return;
        } else if (Array.isArray(item[property])) {
          return item[property].some((itemProperty: string) =>
            itemProperty.toLowerCase() === value.toLowerCase())
        } else {
          return item[property].toLowerCase() === value.toLowerCase();
        }
      }

      const thisResult = _.filter(target, isMatch)
      thisResult.forEach((result: any) => accumulator.push(result));
      return accumulator;
    }, [])

    return [...new Set([
      ...results
    ])]
}

//returns all objects in target array that match value string
//either on .name property or any value in tags[string]
const getMatches = (
  value: string, 
  target: any[], 
  searchBy: string[],
  includePartial?: boolean
  ) => {
  const re = new RegExp(_.escapeRegExp(value), 'i');
  
  const results = searchBy.reduce((accumulator: any[], property) => {

    const isMatch = (item: any) => {
      
      if (includePartial) {
        const re2 = new RegExp(_.escapeRegExp(item), 'i');
       if (re2.test(value)) return true;
      }
      if (typeof(item) === 'string') {
        return re.test(item)
      } else if (!item[property]) {
        return;
      } else if (Array.isArray(item[property])) {
        return item[property].some((itemProperty: string) => re.test(itemProperty))
      } else {
        return re.test(item[property]);
      }
    }


    const thisResult = _.filter(target, isMatch)
    thisResult.forEach(result => accumulator.push(result));
    return accumulator;
  }, [])


  
  return [...new Set([
    ...results
  ])]
}

//In the app, value is a searchstring provided by the user
//here, it's input that we're referring to
//must change the evaluation flow
const getAllResults = (
  values: string[], 
  items: any[], 
  searchBy: string[],
  includePartial ?: boolean
  ) => values
.reduce((accumulator: {
    mustHave: string[],
    results: any[],
    toFilterOut: any[]
}, value) => {
  //user requests exact value, but is not a must have
  if (isExact(value)) {

    value = removeQuotesFrom(value);
  accumulator.results = [...new Set([
    ...accumulator.results,
    ...getExactMatches(value, items, searchBy)
  ])];
  }
  //a - in front of the string indicates we are excluding matches of that value
  else if (value.slice(0, 1) === '-') {
    accumulator.toFilterOut.push(value.slice(1, value.length))
  } else {
   if (value.slice(0, 1) === '+') {
      value = value.slice(1, value.length)
      accumulator.mustHave.push(value);
      //if the user indicates a mustHave exact value
        if (isExact(value)) {
          value = removeQuotesFrom(value);

        accumulator.results = [...new Set([
          ...accumulator.results,
          ...getExactMatches(value, items, searchBy)
        ])];
        return accumulator;
        }
    }
    //if it's not excluded and not exact
  //new Set() pulls unique values
  accumulator.results = [...new Set([
    ...accumulator.results,
    ...getMatches(value, items, searchBy, includePartial)
  ])];
}
  return accumulator;
}, {
  mustHave: [],
  results: [],
  toFilterOut: []
})

//take each value in toFilterout
//and get the objects that match it
const getToFilterOut = (array: string[], results: any[], searchBy: string[]) => array
.map(value =>
  isExact(value)
  ? getExactMatches(removeQuotesFrom(value), results, searchBy)
  : getMatches(value, results, searchBy))
.reduce((acc, cur) => {
  cur.forEach(c => acc.push(c));
  return acc;
}, [])

//returns true if the value isEqual to some value in array
const isPresent = (value: string, array: string[]) =>
!!(array.some(itemInArray =>
  _.isEqual(value, itemInArray)))


const getItems = (items: any[]) => {
  if (items && Array.isArray(items)) {
    return items;
} else {
   return Object.keys(items).map((key: string) => {
      return {
        key,
        //@ts-ignore
        ...items[key]
      };
    })
}}

export const match = ({
  searchString,
  exact,
  includePartial,
  items,
  searchBy,
  simpleReturn
}: {
    searchString: string,
    exact ?: boolean
    includePartial ?: boolean,
    items: any,
    searchBy ?: string[],
    simpleReturn ?: string
}) => {
  if (!items) return;
  items = getItems(items);

  !searchBy && (searchBy = ['plain'])

    const values = exact
    ?[`"${searchString}"`]
    : searchString
    .split(" ")
    // eslint-disable-next-line
    .filter(v => {
        //@ts-ignore
      if (v === 0 || v) {
        return v;
      }
    });

    //  console.log(`getting all results of `, values, items, searchBy);
    let { results, mustHave, toFilterOut } = getAllResults(values, items, searchBy, includePartial);

    toFilterOut =  getToFilterOut(toFilterOut, results, searchBy);

    let finalResults = results
    .filter(result => !isPresent(result, toFilterOut))

    if (!!mustHave.length) {
      mustHave.forEach(mustHaveString => {
        /*if any item in finalResults is not in
          getMatches(mustHaveString, finalResults))
          then strip it out of finalResults*/
          if (isExact(mustHaveString)) {
            mustHaveString = removeQuotesFrom(mustHaveString);
            finalResults = finalResults
            //@ts-ignore
            .filter(result => isPresent(result, getExactMatches(mustHaveString, finalResults, searchBy)))
          } else {
          finalResults = finalResults
          //@ts-ignore
          .filter(result => isPresent(result, getMatches(mustHaveString, finalResults, searchBy)))
          }
      })
    }

return simpleReturn
  ? finalResults.map(result => result[simpleReturn])
  : finalResults
}

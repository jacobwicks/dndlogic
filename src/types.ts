export enum colors {
    blue = "blue",
    red = "red",
    yellow = "yellow",
    orange = 'orange',
    green = 'green',
    purple = 'purple',
    grey = 'grey'
  }

export enum directions {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export enum targetTypes {
    info = "info",
    group = "group",
  }

export enum matchTypes {
    exact = 'exact',
    partial = 'partial',
    partialInclusive = 'partialInclusive',
    none = 'none',
    any = 'any'
}

export interface IMatch {
    values: string[],
    type: keyof typeof matchTypes
}

export interface IExpression extends Array<IParenthesis | IOperator | ICondition>{}


export interface IInput {
  id: string,
  name: string,
  value: string
}

export interface IParenthesis {
    itemType: 'parenthesis',
    content: {
        parenType: 'open' | 'close' | 'pair',
        highlight?: boolean
    }
}

export interface IOperator {
    itemType: 'operator',
    content: {
        operatorType: 'and' | 'or' | 'not'
    }
}

export interface ICondition {
    itemType: 'condition',
    content:  IConditionContent
}

export interface IConditionContent {
  conditionId: string,
  open ?: boolean,
  target: ITarget,
  match: IMatch,
}

export interface ITarget {
  id: string,
}

export interface INewConditionPlaceholder {
  itemType: 'conditionPlaceholder'
}

export interface INewParenthesis {
  itemType: 'parenthesis',
  content: {
    parenType: 'pair' | 'open' | 'close'
  }
}

export interface INewComponents extends Array<INewConditionPlaceholder | IOperator | INewParenthesis>{}


export interface IAction {
  type: string,
  [key: string] : any
}
import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ExpressionContext } from '../../services/ExpressionContext';
import { INewComponents } from '../../types';

const newComponents: INewComponents = [
      {
          itemType: 'conditionPlaceholder',
      },
    {
      itemType: 'parenthesis',
      content: {
        parenType: 'pair'
      }
    },
    {
      itemType: 'parenthesis',
    content: {
      parenType: 'open'
    }
  },
    { itemType: 'parenthesis',
    content: {
      parenType: 'close'
    }
  },
    {
        itemType: 'operator',
        content: {
          operatorType: 'and'
        }
      },
    {
    itemType: 'operator',
    content: {
        operatorType: 'or'
    }
    },
    {
      itemType: 'operator',
      content: {
        operatorType: 'not'
      }
    },
]


const NewComponents = () => {
  const { dispatch } = useContext(ExpressionContext)
  const doubleClickFn = (droppableId: string, index: number) => {
      dispatch({
        type: 'insertNew',
        payload: {
          item: newComponents[index]
        }
      })
    }

  return (
    <MyDroppable
    droppableId={'newComponents'}
    direction={'horizontal'}
    doubleClickFn={doubleClickFn}
    header={`New Components - double click or drag and drop to add`}
    height={200}
    items={newComponents}
    />
  )}


export default NewComponents;

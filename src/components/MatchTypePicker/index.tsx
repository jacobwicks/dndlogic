import React, { useContext, Fragment } from 'react';
import { ExpressionContext } from '../../services/ExpressionContext';
import Picker from '../Picker';
import { 
    matchTypes,
    ICondition, 
    IParenthesis, 
    IOperator 
} from '../../types';

const getText : { [key: string] : string} = {
    exact: 'Exact',
    partial: 'Partial',
    partialInclusive: 'Inclusive',
    any: 'Any value',
    none: 'No value'
}

const MatchTypePicker = ({
    conditionId,
    exampleValues
}: {
    conditionId?: string
    exampleValues ?: {
        matchType ?: string,
        selectMatchType : (matchType: string | undefined) => void,

    }
}) => {
    const { dispatch, state } = useContext(ExpressionContext);
    const { expression } = state;
    const matchType = !exampleValues ? expression.find((item: ICondition | IParenthesis |IOperator) => {
            if (item.itemType === 'condition') {
                if (item.content.conditionId === conditionId) {
                    return true
                } else return false;
            } else return false;             
    }).content.match.type
    : exampleValues.matchType
    const text = matchType 
    ? getText[matchType] || matchType 
    : `no selection made`

    const options = Object.keys(matchTypes).map((matchType: string) => {
        return {
            key: matchType,
            text: getText[matchType] || matchType,
            value: matchType
        }
    })

    const explanation : { [key: string] : string} = {
        exact: 'Target value must exactly match one of the provided values (case insensitive).',
        partial: 'Whole target value must partially match at least one of the provided values.',
        partialInclusive: 'Part of target value must partially match at least one of the provided values.',
        none: 'No value entered in target.',
        any: 'Any value entered in target.'
    }

    const handleChange = (matchType: string) => 
    conditionId ?
      dispatch({
            type: 'matchTypeSelect',
            conditionId,
            matchType
        })
     : exampleValues && exampleValues.selectMatchType(matchType)

    const handleClear = () =>
    conditionId ?
    dispatch({
        type: 'matchTypeSelect', 
        conditionId,
        matchType: undefined
        })
        : exampleValues && exampleValues.selectMatchType(undefined)

    return   (
        <Fragment>
        <Picker 
        handleChange={handleChange}
        handleClear={handleClear}
        options={options}
        text={text}
        />
        {explanation[matchType] && explanation[matchType]}
        </Fragment>
)}

export default MatchTypePicker;
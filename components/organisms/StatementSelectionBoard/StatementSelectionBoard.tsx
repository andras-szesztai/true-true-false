import React, { useState } from 'react'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { ScreenMessage } from 'components/atoms/ScreenMessage'
import { GENERAL_ERROR } from 'constants/messages'

import { Props } from './types'
import { StatementContainer, StatementLabel, TextBoxRadio } from './styles'

const StatementSelectionBoard = ({ statements, isLoading, error }: Props) => {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    if (isLoading) return <div>Loading...</div>

    if (!statements || error)
        return <ScreenMessage text={error?.message || GENERAL_ERROR} />

    if ('error' in statements) return <ScreenMessage text={statements.error} />

    return (
        <>
            <div>
                {statements.map((s, i) => (
                    <StatementContainer
                        key={s.id}
                        noBorderTop={!!i}
                        isSelected={s.id === selectedId}
                    >
                        <StatementLabel htmlFor={`${s.id}`}>
                            {s.text}
                        </StatementLabel>
                        <TextBoxRadio
                            type="radio"
                            id={`${s.id}`}
                            onClick={() => setSelectedId(s.id)}
                            onFocus={() => setSelectedId(s.id)}
                        />
                    </StatementContainer>
                ))}
            </div>
            <Button
                text="Submit"
                onClick={() => {}}
                size={ButtonSizes.md}
                isDisabled={!selectedId}
                // isLoading={isLoading}
            />
        </>
    )
}

export default StatementSelectionBoard

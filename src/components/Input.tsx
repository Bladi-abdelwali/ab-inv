import React, { ChangeEvent } from 'react'

interface InputProps {
    className?: string
    type: 'code' | 'userName'
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
}

const Input: React.FC<InputProps> = ({
    className,
    type,
    value,
    onChange,
    error,
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value

        if (type === 'code') {
            const numericValue = inputValue.replace(/\D/g, '').slice(0, 4)
            const syntheticEvent = {
                target: { value: numericValue },
            } as ChangeEvent<HTMLInputElement>
            onChange(syntheticEvent)
        } else {
            onChange(e)
        }
    }

    const handleClear = () => {
        const event = {
            target: { value: '' },
        } as ChangeEvent<HTMLInputElement>
        onChange(event)
    }

    return (
        <div className={`${className} flex flex-col`}>
            <label
                htmlFor="access-code"
                className="text-[14px] font-medium leading-[21px] text-left text-[#111728] decoration-skip-ink-none mb-2"
            >
                {type === 'code' ? "Code d'accès" : 'Prénom NOM'}
            </label>

            <div className="relative">
                <input
                    type="text"
                    id="access-code"
                    placeholder={type === 'code' ? 'Code' : 'Prénom NOM'}
                    value={value}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm rounded-lg placeholder-[#7B869A] border 
            ${error ? 'border-red-500' : 'border-[#CDD4DF]'} 
            bg-[#F8FAFC]`}
                />
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`absolute inset-y-0 right-2 flex items-center hover:text-gray-600 ${error ? 'text-red-500' : 'text-gray-400'}`}
                    >
                        &times;
                    </button>
                )}
                {error && (
                    <p className="absolute top-full left-0 mt-2 text-red-500 text-sm">
                        {error || 'Code erroné'}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Input

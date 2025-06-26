import React from 'react'
import { Check } from 'lucide-react'

const CheckBox = ({ label, checked, onChange }) => {
    return (
        <label className='flex gap-2 items-center cursor-pointer'>
            <input type="checkbox"
                className='hidden'
                checked={checked}
                onChange={onChange} />
            <div className={`size-6 flex items-center justify-center gap-2 border-2 border-sec rounded-md ${checked ? 'bg-accent border-none' : 'bg-transparent'}`}>
                {checked && <Check className=' text-black size-4 ' />}
            </div>
            <span
            className={`flex-1 w-full ${
            checked? 'line-through text-sec':'text-white'}`}>
                {label}
            </span>
        </label>
    )
}

export default CheckBox
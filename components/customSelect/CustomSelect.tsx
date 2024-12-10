import type { SelectProps } from './select-types';
import Icons from '../../../../assets/icons/ui';
import {useEffect, useRef, useState} from 'preact/hooks';

export default function CustomSelect({ state, value, onChange, options, open, size, elemName, label, description }: SelectProps) {

  const { ArrowDown } = Icons;

  const [isOpen, setOpen] = useState(open ?? false);
  const [display, setDisplay] = useState(value);
  const valueInput = useRef<HTMLInputElement>(null);

  function handleOptionClick(value: SelectProps['options'][number]['value'], disabled: boolean) {
    if (disabled) return;
    setDisplay(value);
    isOpen && setOpen(false);
    if (valueInput.current) {
      valueInput.current.value = value;
      const onChangeEvt = new Event('input');
      valueInput.current.dispatchEvent(onChangeEvt);
    }
  }

  function handleInput(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      onChange(e);
    }
  }

  useEffect(() => {
    const close = () => isOpen && setOpen(false);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('click', close);
    };
  })
  
  useEffect(() => {
    setDisplay(value);
  }, [value]);

  useEffect(() => {
    setOpen(open ?? false);
  }, [open]);

  function selectStyleFab(state: SelectProps['state']) {
    const sizer: Record<NonNullable<SelectProps['size']>, string> = {
      'sm': 'h-7',
      'md': 'h-9', 
      'xl': 'h-11',
    }

    const baseStyle = `${sizer[size ?? 'md']} w-full px-2 pr-8 outline outline-0 border rounded hover:outline-1 focuse:outline-none flex flex-row items-center cursor-default relative truncate`;
    const styles: Record<SelectProps['state'], () => string> = {
      'default': () => `${baseStyle} border-grey hover:outline-grey focus:bg-donban-bg`,
      'valid': () => `${baseStyle} border-green hover:outline-green bg-input-bg-green focus:bg-input-focus-bg-green`,
      'error': () => `${baseStyle} border-red hover:outline-red bg-input-bg-red focus:bg-input-focus-bg-red`,
      'disabled': () => `w-full px-2 outline outline-0 border rounded hover:cursor-default text-grey`,
    };
    return styles[state](); 
  }

  function getSelectBody() {
    return (
      <div className="relative w-full">
        <input className="hidden" ref={valueInput} onChange={handleInput} name={elemName} value={value} />
        <input
          className={selectStyleFab(state)}
          {...(state !== 'disabled' && {onClick:() => !isOpen && setOpen(true)})}
          readonly={true}
          value={display}
          name={elemName}
          id={elemName}
        />
        <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-center" {...(state !== 'disabled' && {onClick:() => !isOpen && setOpen(true)})}>
          <ArrowDown />
        </div>
        { isOpen && (
          <ul className="border rounded border-grey py-2 px-1 flex flex-col gap-y-[1px] shadow-md absolute w-full cursor-default bg-white z-50">
            {
              options.map(({value, option, disabled}) =>
                <li
                  className={`min-h-[28px] px-1 py-[2px] rounded ${!disabled && 'hover:bg-light-blue'} ${disabled && 'text-grey cursor-not-allowed'}`}
                  onClick={(e) => {e.stopPropagation(), handleOptionClick(value, disabled ?? false)}}
                >
                  {option}
                </li>
              )
            }
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      { label && <label className="text-sm">{label}</label> }
          { getSelectBody() }
      { description && <div className="text-sm">{description}</div> }
    </div>
  )
}

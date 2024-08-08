//import statements

import { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'
import { SelectOption } from '../Types/types'
import { SelectProps } from '../Types/types'
import { OptionCard } from '../OptionCard/OptionCard'
import { useOptionsContext } from '../Context/OptionsContext'

export function Select({ isMultiple, value, onChange }: SelectProps) {
    const { options } = useOptionsContext();

    const [isOpen, setIsOpen] = useState(false) /*To handle toggling of dropdown box */
    const [highlightedIndex, setHighlightedIndex] = useState(0) /**by deufalt first one will highligheted */
    const containerRef = useRef<HTMLDivElement>(null) //reference of contianer div

    function clearOptions() {
        /**if it was multple select passing empty array
         * otherwise passing undefined value to clear the selected options
         */
        isMultiple ? onChange([]) : onChange(undefined);
    }

    /**making selection of options */
    function selectedOption(option: SelectOption) {
        if (isMultiple) {
            /**if we again select the selected value then we need to unselect it */
            if (value.includes(option)) {
                /**filter the array when the availbale item equals to current item */
                onChange(value.filter(op => op !== option))
            }
            else {
                /**if new value was selected */
                onChange([...value, option])
            }
        }
        else {
            if (option !== value) onChange(option);
        }

    }

    function isOptionSelected(option: SelectOption) {
        /**If it was multiple Select
         * current value array includes the selected option, then it was selected one
         * Otherwise (if Single Select) curret value equals to selected option, then it was selected one
         */
        return isMultiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        /**everytime when dropdown box collapses needs to highlight starts from 0 */
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    /**Handle Keyboard events */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev) //toggling the dropdown box
                    //also selecting the highilighted one if enter or space pressed
                    if (isOpen) selectedOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    /**when arrow pressed the dropdown must open to select */
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }
                    /**Calculting the new highlighed index value
                     * current index + when arrow was pressed down. then it should be incremented
                     * when arrow pressed up it should be decremented
                     */
                    const newVal = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    // console.log(newVal);

                    //new value must be in between 0 - total options length
                    if (newVal >= 0 && newVal < options.length) {
                        setHighlightedIndex(newVal);
                    }
                    break
                }
                case "Escape":
                    setIsOpen(false)
                    break
            }


        }
        //when keydown event happens calling the handler fn 
        containerRef.current?.addEventListener("keydown", handler);
        return () => {
            containerRef.current?.removeEventListener("keydown", handler);
        }

    }, [isOpen, highlightedIndex, options]) //needs to run the checks again if anyone of its dependecy changes

    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}
            ref={containerRef}
        >
            {/* Select Bar Section */}

            <span className={styles.value}>
            { 
                 isMultiple ? 
                 (
                   (value.length == 0) ? 
                       <span className='empty-msg'>Please Select</span> : (
                         (
                          <OptionCard options={Array.isArray(value) ? value : []} onOptionClick={selectedOption} />
                         )
                    )
                ) : value?.label
            }
            </span>
            {/* Clear btn section */}
            <button
                onClick={(e) => 
                    {
                        e.stopPropagation() /*stops triggering event of parent element */
                        clearOptions()
                    }
                  } 
                className={styles["clear-btn"]}
            >
                &times;
                
            </button>
             
             {/* Dvidider and dropdown symbol */}
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>

            {/* Options Section */}
            <ul className={`${styles.options} ${isOpen ? styles.show : ""} `}>
                {
                    options.map((option, index) => (
                        <li 
                            onClick={e => {
                                e.stopPropagation()
                                selectedOption(option)
                                setIsOpen(false) /**again closing the dropdown after selected */
                                }
                            }
                            onMouseEnter={
                                () => setHighlightedIndex(index)
                            }
                            key={option.id} 
                            className={
                                `${styles.option} 
                                 ${isOptionSelected(option) ? styles.selected : ""}
                                 ${index === highlightedIndex ? styles.highlighted : ""}`
                                }
                        >
                            {option.label}

                        </li>
                    ))
                }
            </ul>
        </div>
    )

}
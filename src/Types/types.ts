export type SelectOption = {        //type of option
    label: string
    id: string | number
}
type SingleSelectProps = {
    isMultiple?: false   /**optional one and also defaultly false */
    value?: SelectOption       //single option value
    onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
    isMultiple: true             /**multiple is true in this case*/
    value: SelectOption[]      //Array of options
    onChange: (value: SelectOption[]) => void   //going to be empty array or array of values
}

export type SelectProps = {            //type of Select Component props
   //Array of SelectOtpion
} & (SingleSelectProps | MultipleSelectProps) //Either it can be single select or multiple select

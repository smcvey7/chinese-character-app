import React, {useState, useMemo} from "react";
import countryList from 'react-select-country-list'
import Select from 'react-select'

function CountrySelector({ newUserInfo, setNewUserInfo }) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
    setNewUserInfo({
      ...newUserInfo,
      country: value.label
    })
  }

  return <Select options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector
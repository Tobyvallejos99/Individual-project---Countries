import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../redux/actions/index';
import style from '../SearchBar/searchbar.module.css'

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    function onSubmit(ele) {
        ele.preventDefault();
        if (search.length === 0) return alert('You should introduce a country');
        dispatch(searchCountries(search))
        setSearch('')
    }

    function onInputChange(ele) {
        ele.preventDefault();
        setSearch(ele.target.value)
    }

    return (
        <div>
        <form className={style.form} onSubmit={onSubmit}>
            <input className={style.form__input} type='text' placeholder='Write a country' onChange={onInputChange} value={search}/>
            <input className={style.form__button} type='submit' value='Submit'/>
        </form>
        </div>
    )
    }
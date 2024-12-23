import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleted,
    heroAdded
}  from '../actions'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroesDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addCase(heroAdded, (state, action) => {
            state.heroes.push(action.payload)
        })
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             }
//         case 'HERO_ADDED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         default: return state
//     }
// }

export default heroes;
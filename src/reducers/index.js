const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    filterActive: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.filterActive === 'all' ? 
                                action.payload :
                                action.payload.filter(item => item.element === state.filterActive),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }

        case 'HERO_DELETED':
            let newHeroesAfterDelete = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newHeroesAfterDelete,
                filteredHeroes: state.filterActive === 'all' ? 
                                newHeroesAfterDelete :
                                newHeroesAfterDelete.filter(item => item.element === state.filterActive)
            }
        case 'HERO_ADDED':
            let newHeroesAfterAdd = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroesAfterAdd,
                filteredHeroes: state.filterActive === 'all' ? 
                                newHeroesAfterAdd :
                                newHeroesAfterAdd.filter(item => item.element === state.filterActive)
            }
        case 'FILTER_ACTIVE_NEW':
            return {
                ...state,
                filterActive: action.payload,
                filteredHeroes: action.payload === 'all' ? 
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;
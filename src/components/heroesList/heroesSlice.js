import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesDeleted: (state, action) => {
            // state.heroes = state.heroes.filter(item => item.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload)
        },
        heroAdded: (state, action) => {
            // state.heroes.push(action.payload)
            heroesAdapter.addOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                // state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    state => state.filters.filterActive,
    selectAll,
    (filterActive, heroes) => {
        if (filterActive === 'all') {
            return heroes
        } else {
            return heroes.filter((item) => item.element === filterActive)
        }
    }
)

export default reducer;

export const {
    heroesDeleted,
    heroAdded
} = actions
export const initialStore = () => ({
	people: [],
	planets: [],
	vehicles: [],
	favorites: [],
	saved: []
});

const storeReducer = (state, action) => {
	switch (action.type) {
		case "SET_PEOPLE":
			return { ...state, people: action.payload };
		case "SET_PLANETS":
			return { ...state, planets: action.payload };
		case "SET_VEHICLES":
			return { ...state, vehicles: action.payload };
		case "ADD_FAVORITE":
			if (state.favorites.find(item => item.uid === action.payload.uid)) return state;
			return { ...state, favorites: [...state.favorites, action.payload] };
		case "REMOVE_FAVORITE":
			return {
				...state,
				favorites: state.favorites.filter(item => item.uid !== action.payload)
			};
		case "ADD_SAVED":
			if (state.saved.find(item => item.uid === action.payload.uid)) return state;
			return { ...state, saved: [...state.saved, action.payload] };
		case "REMOVE_SAVED":
			return {
				...state,
				saved: state.saved.filter(item => item.uid !== action.payload)
			};
		default:
			return state;
	}
};

export default storeReducer;
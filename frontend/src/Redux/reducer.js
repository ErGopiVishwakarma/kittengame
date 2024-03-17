import { UpdateScore, UserData } from "./actionType"

let initialValue = {
    name: '',
    defuseCards: [],
    currentCard: '',
    deck: [],
    score:0

}
export const reducer = (state = initialValue, { type, payload }) => {
    switch (type) {
        case UserData:
            return { ...state, ...payload }
        case UpdateScore:
            return {...state,score: state?.score + 1}
        default:
            return { ...state }
    }
}

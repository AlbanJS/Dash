import { Box } from "@mui/system";
import React, { useEffect, useReducer } from "react";
import MenuAppBar from "../components/home/navbar/home.component.navbar";
import TokenDecoder from "../services/token/token_decode";
import UserFetch from "../services/users/user_fetch";
import displayWidgets from "../services/widgetAdd/Widget_list";

export const WidgetContext = React.createContext()

const initialState = {
    user: null,
    widgets: []
};

function reducer(state, action) {
    switch (action.type) {
        case 'setUser':
            state.user = action.user
            if (action.user.widgets !== null) {
                state.widgets = action.user.widgets
            }
            return {
                ...state,
                user: state.user,
                widgets: state.widgets
            }
        case 'updateWidget':
            state.widgets = action.updateWidget.widgets
            return {
                ...state,
                widgets: state.widgets
            }
        case 'deleteWidget':
            state.widgets = action.deleteWidget
            return {
                ...state,
                widgets: state.widgets
            }
        default:
            throw new Error();
    }
}

function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        request()
    }, [])

    async function request() {
        if (localStorage.getItem("token") === null) {
            return false
        } else {
            localStorage.getItem("token")
            const tokenId = TokenDecoder()
            const result = await UserFetch(tokenId.sub)
            dispatch({ type: "setUser", user: result })
        }
    }

    const widgetList = (list) => {
        const output = displayWidgets(list)
        return output
    }

    return (
        <>
            {state.user !== null ?
                <WidgetContext.Provider value={{ widgetState: state.widgets, widgetDispatch: dispatch }}>
                    <MenuAppBar name={state.user.firstname} />
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        {widgetList(state.widgets)}
                    </div>
                </WidgetContext.Provider>
                :
                <Box>LOG IN TO USE THE DASHBOARD</Box>
            }
        </>
    );

}

export default Home
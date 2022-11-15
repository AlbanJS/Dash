import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminAppBar from '../components/admin/admin.component.navbar';
import { Box, Button, TextField, Typography } from '@mui/material';
import UsersFetch from '../services/users/users_fetch';
import UpdateUser from '../services/users/user_update';
import DeleteUser from '../services/users/user_delete';
import RegisterFetch from '../services/register/Register_fetch';

const initialState = {
    users: null,
    newFirstName: null,
    newLastName: null,
    newEmail: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'setUsers':
            state.users = action.users
            return {
                ...state,
                user: state.users,
            }
        case 'setNewFirstName':
            state.newFirstName = action.firstName
            return {
                ...state,
                newFirstName: state.newFirstName
            }
        case 'setNewLastName':
            state.newLastName = action.lastName
            return {
                ...state,
                newLastName: state.newLastName
            }
        case 'setNewEmail':
            state.newEmail = action.email
            return {
                ...state,
                newEmail: state.newEmail
            }
        default:
            throw new Error();
    }
}

export default function Admin() {

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [updateFields, setUpdateFields] = React.useState("")
    const [updateBox, setUpdateBox] = React.useState(false)
    const [createBox, setCreateBox] = React.useState(false)


    React.useEffect(() => {
        request()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        for (const key in form) {
            if (form[key] === "") {
                return false
            }
        }
        const result = await RegisterFetch(form)
        state.users.push(result)
        dispatch({ type: "setUsers", users: state.users })
        setCreateBox(!createBox)
    };

    async function request() {
        const result = await UsersFetch()
        dispatch({ type: "setUsers", users: result })
    }

    async function deleteUser(id) {
        const isId = (element) => element._id === id;
        const findIndex = state.users.findIndex(isId);
        state.users.splice(findIndex, 1)
        dispatch({ type: "setUsers", users: state.users })
        await DeleteUser(id)
    }

    async function updateUser(id) {
        let body = {
            firstname: null,
            lastname: null,
            email: null
        };
        for (const value of state.users) {
            if (id === value._id) {
                body.firstname = value.firstname
                body.lastname = value.lastname
                body.email = value.email
                if (state.newFirstName !== null) {
                    body.firstname = state.newFirstName
                    value.firstname = state.newFirstName
                }
                if (state.newLastName !== null) {
                    body.lastname = state.newLastName
                    value.lastname = state.newLastName
                }
                if (state.newEmail !== null) {
                    body.email = state.newEmail
                    value.email = state.newEmail
                }
            }
        }
        await UpdateUser(id, body)
        state.newFirstName = null
        state.newLastName = null
        state.newEmail = null
        setUpdateFields("")
        setUpdateBox(!updateBox)
    }

    function modify(id) {
        setUpdateFields(id)
        setUpdateBox(!updateBox)
    }

    return (
        <>
            <AdminAppBar />
            <Typography variant="h5" component="div" sx={{ m: 2, display: "flex", justifyContent: "center" }}>
                Users
            </Typography>
            <Box sx={{ ml: 20, mr: 20, display: "flex", alignItems: "center", flexDirection: "column" }}>
                <Button onClick={() => setCreateBox(!createBox)} sx={{ alignSelf: "flex-start" }}>Create a user</Button>
                {createBox && <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        sx={{ mb: 2 }}
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                    <TextField
                        sx={{ mb: 2 }}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                    <TextField
                        sx={{ mb: 2 }}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        sx={{ mb: 2 }}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        sx={{ mb: 2 }}
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_paswword"
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ maxWidth: 100, mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>}

                <TableContainer component={Paper} sx={{ m: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.users !== null && state.users.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {updateFields === row._id && updateBox ? <TextField onInput={e => dispatch({ type: "setNewFirstName", firstName: e.target.value })} size="small" defaultValue={row.firstname}></TextField> : row.firstname}
                                    </TableCell>

                                    <TableCell>
                                        {updateFields === row._id && updateBox ? <TextField onInput={e => dispatch({ type: "setNewLastName", lastName: e.target.value })} size="small" defaultValue={row.lastname}></TextField> : row.lastname}
                                    </TableCell>

                                    <TableCell>
                                        {updateFields === row._id && updateBox ? <TextField onInput={e => dispatch({ type: "setNewEmail", email: e.target.value })} size="small" defaultValue={row.email}></TextField> : row.email}
                                    </TableCell>

                                    <TableCell>
                                        {updateFields !== row._id && !updateBox ?
                                            <Button onClick={() => modify(row._id)} sx={{ p: 0 }}>Modify</Button>
                                            :
                                            <Button onClick={() => updateUser(row._id)} sx={{ p: 0 }}>Confirm</Button>}
                                        |
                                        {updateFields !== row._id && !updateBox ?
                                            <Button onClick={() => deleteUser(row._id)} sx={{ p: 0 }}>Delete</Button>
                                            :
                                            <Button onClick={() => modify("")} sx={{ p: 0 }}>Cancel</Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
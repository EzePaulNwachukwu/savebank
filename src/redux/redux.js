import { createSlice } from "@reduxjs/toolkit";




const bankapp = createSlice({

    name: "bank",
    initialState: {
        users: []

    },

    reducers: {

        // RegisterNewUser
        RegisterNewUser: (state, actions) => {
            const newUser = actions.payload;

            const existingUsers = JSON.parse(localStorage.getItem('savebank')) || [];

            const userExists = existingUsers.some(user => user.Email === newUser.Email);

            if (userExists) {
                alert('⛔, A user with this Email already exists.');
                return;
            }

            const updatedUsers = [...existingUsers, newUser];

            localStorage.setItem('savebank', JSON.stringify(updatedUsers));

            localStorage.setItem('currentUser', JSON.stringify(newUser));
            state.users = newUser;

        },
        // Log in existing user



        loginUser: {
            reducer: (state, action) => {
                const { success, user } = action.payload;

                if (success && user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    state.users = user;
                }
            },
            prepare: ({ Email, Password }) => {
                const users = JSON.parse(localStorage.getItem('savebank')) || [];

                const matchedUser = users.find(
                    user => user.Email === Email && user.Password === Password
                );

                if (matchedUser) {
                    return {
                        payload: {
                            success: true,
                            user: matchedUser
                        }
                    };
                } else {
                    return {
                        payload: {
                            success: false,
                            user: null
                        }
                    };
                }
            }
        },



        // Load logged-in user on app load
        loadUserFromStorage: (state) => {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
                state.users = JSON.parse(stored);
            }
        },



        addTransaction: (state, action) => {
            const transaction = action.payload;

            // Get all users
            const users = JSON.parse(localStorage.getItem('savebank')) || [];

            // Get the currently logged-in user
            const currentUser = state.users;

            // Loop and match by Email
            const updatedUsers = users.map(user => {
                if (user.Email === currentUser.Email) {
                    // Add transaction to matched user
                    const updatedUser = {
                        ...user,
                        Transaction: [...(user.Transaction || []), transaction]
                    };

                    // Update current user in Redux and localStorage
                    state.users = updatedUser;
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                    return updatedUser;
                }
                return user;
            });

            // Save updated users back to localStorage
            localStorage.setItem('savebank', JSON.stringify(updatedUsers));
        },



        // Logout user
        logoutUser: (state) => {
            state.users = null;
            localStorage.removeItem('currentUser');
        },

        deleteUserAccount: (state) => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) return;

            // Get all users
            const users = JSON.parse(localStorage.getItem('savebank')) || [];

            // Remove current user from list
            const updatedUsers = users.filter(user => user.Email !== currentUser.Email);

            // Update localStorage
            localStorage.setItem('savebank', JSON.stringify(updatedUsers));
            localStorage.removeItem('currentUser');

            // Update Redux state
            state.users = null;
        },


        updateUserProfile: (state, action) => {
            const { Email, currentpassword, newpassword, updatedFields } = action.payload;

            // Get current user and all users
            const currentUser = state.users;
            const users = JSON.parse(localStorage.getItem('savebank')) || [];

            // Validate: Email and current password must match
            if (currentUser?.Email !== Email || currentUser?.Password !== currentpassword) {
                alert('⛔ Email or current password is incorrect.');
                return;
            }

            // Prepare updated user object
            const updatedUser = {
                ...currentUser,
                ...updatedFields,
                Password: newpassword || currentUser.Password,
            };

            // Update users list
            const updatedUsers = users.map(user =>
                user.Email === Email ? updatedUser : user
            );

            // Sync state and localStorage
            state.users = updatedUser;
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('savebank', JSON.stringify(updatedUsers));

            alert('✅ Profile updated successfully!');
        },

        updateCurrency: (state, action) => {
            const { currency } = action.payload;

            const currentUser = state.users;
            const users = JSON.parse(localStorage.getItem('savebank')) || [];

            if (!currentUser) {
                alert('⛔ No user is currently logged in.');
                return;
            }

            // Update currentUser with new currency
            const updatedUser = {
                ...currentUser,
                currency,
            };

            // Update in users list
            const updatedUsers = users.map(user =>
                user.Email === currentUser.Email ? updatedUser : user
            );

            // Update state and localStorage
            state.users = updatedUser;
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('savebank', JSON.stringify(updatedUsers));

            alert('✅ Currency updated successfully!');
        },

        savingsgoalAndExpenseLimit: (state, actions) => {
            const { savinggoal, expenselimit } = actions.payload
            const currentUser = state.users;
            const users = JSON.parse(localStorage.getItem('savebank')) || [];

            if (!currentUser) {
                alert('⛔ No user is currently logged in.');
                return;
            }

            const updatedUser = {
                ...currentUser,
                savinggoal,
                expenselimit
            };

            const updatedUsers = users.map(user =>
                user.Email === currentUser.Email ? updatedUser : user
            );

            // Update state and localStorage
            state.users = updatedUser;
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('savebank', JSON.stringify(updatedUsers));

            alert('✅ Budget updated successfully!');


        },

        setBudget:(state,actions)=>{
            const {budgetCategory, budgetAmount} = actions.payload
               const currentUser = state.users;
            const users = JSON.parse(localStorage.getItem('savebank')) || [];

            if (!currentUser) {
                alert('⛔ No user is currently logged in.');
                return;
            }

             const updatedUser = {
                ...currentUser,
               budgetCategory, budgetAmount
            };

              const updatedUsers = users.map(user =>
                user.Email === currentUser.Email ? updatedUser : user
            );

             state.users = updatedUser;
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('savebank', JSON.stringify(updatedUsers));

            alert('✅ Budget set successfully!');

        }

    }


},

)
export default bankapp.reducer
export const { RegisterNewUser, loginUser, logoutUser, loadUserFromStorage, addTransaction, updateUserProfile, updateCurrency, savingsgoalAndExpenseLimit, deleteUserAccount, setBudget } = bankapp.actions
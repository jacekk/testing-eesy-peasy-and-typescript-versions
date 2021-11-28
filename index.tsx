import { generic, createStore, Generic, Thunk, Action, action, thunk } from 'easy-peasy';

interface AuthState {
    foo: Generic<string>;
}

interface AuthActions {
    setFoo: Action<AuthModel, string>;
}

// type ModelThunk<T = void> = Thunk<AuthModel, T, unknown, StoreModel>;

interface AuthThunks {
    setFooAsync: Thunk<AuthModel, string, unknown, StoreModel>;
}

interface AuthModel extends AuthState, AuthActions, AuthThunks {}

const auth: AuthModel = {
    foo: generic('111'),
    setFoo: action((state, newVal) => {
        state.foo = newVal;
    }),
    setFooAsync: thunk(async (actions, newVal) => {
        actions.setFoo(newVal);
    }),
}

interface StoreModel {
    auth: AuthModel,
}

const store = createStore({ auth });


(async () => {
    console.log('uno', store.getState());
    store.getActions().auth.setFoo('222');
    console.log('dos', store.getState());
    store.getActions().auth.setFooAsync('333');
    console.log('tres', store.getState());
})()
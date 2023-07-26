import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/redux/hooks';
import { Tab } from '@headlessui/react';
import Cookies from 'js-cookie'
import { setCredential, setLoggin } from '@/redux/feautres/auth/authSlice';

const myHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

var pruebaHeader = new Headers();
pruebaHeader.append("Cookie", "touken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCcnlhbiIsImV4cCI6MTY4OTM5Mjg4NX0.QuynHdDCqJKj2wUNWeYvUzVNwWGFHOa_n-Sh20GJUhk" );
pruebaHeader.append("Accept", 'application/json');

const pruebasCookies = async () => {
    // return await axios.get('http://127.0.0.1:8000/user/prueba', {
    //     withCredentials: true,
    //     pruebaHeader: {
    //         'Cookie': 'touken='+Cookies.get('touken')
    //     }
    // });
    console.log(Cookies.get('touken'));
    const respuesta = await fetch("http://127.0.0.1:8000/user/prueba", {
        method: 'GET',
        headers: pruebaHeader,
        redirect: 'follow'
    })

    if (respuesta.status === 200) {
        return await respuesta.json();
        // return await respuesta.json();
    } else {
        console.log(respuesta.status);
        return false;
    }

}

const  getTokenUser = async (name: string, password: string) => {

    var myHeader = new Headers();
    myHeader.append("Accept", "application/json");
    myHeader.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", name);
    urlencoded.append("password", password);

    // const respuesta = await axios.post("http://127.0.0.1:8000/user/token", urlencoded)

    const respuesta = await fetch("http://127.0.0.1:8000/user/token", {
        method: 'POST',
        body: urlencoded,
        headers: myHeaders,
        credentials: 'include',
        // credentials: 'same-origin',
        redirect: 'follow'
    })

    if (respuesta.status === 200) {
        return await respuesta.json();
        // return await respuesta.json();
    } else {
        console.log(respuesta.status);
        return false;
    }
}

export default function Login() {

    // const cookie = Cookies();


    const dispatch = useAppDispatch();

    const SignInSchema = Yup.object().shape({
        email: Yup.string().trim().required('El correo es necesario'),
        password: Yup.string().trim().required('Una contraseña es necesaria'),
        accesstoken: Yup.string()
    })

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (<>
     <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab className={({ selected }) =>
                        classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                    }>Login</Tab>
                 <Tab className={({ selected }) =>
                        classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                    }>Register</Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel 
                    className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}>
                    <div className="login">
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                accesstoken: ''
                            }}
                            validationSchema={SignInSchema}
                            onSubmit={ async (values) => {
                                const respuesta = await getTokenUser(values.email, values.password)
                                // const respuesta = await pruebasCookies()
                                console.log(respuesta)
                                if( respuesta ){
                                    Cookies.set('token', respuesta.access_token)
                                    dispatch(
                                        setLoggin({
                                            email: values.email, 
                                            password: values.password, 
                                            accesstoken: respuesta.access_token,
                                            logget: true
                                        })
                                    )
                                }
                            } }>
                                {(formikProps) => (
                                    <Form>
                                        <div className="relative mb-3" data-te-input-wrapper-init>

                                            <Field name="email"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>

                                            <label
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                                                Nombre
                                            </label>
                                            {formikProps.errors.email && formikProps.touched.email ? (
                                                <ErrorMessage name="email" component="div" />
                                            ) : null}
                                        </div>
                                        <div className="relative mb-3" data-te-input-wrapper-init>
                                            <Field name="password"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                                            <label
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                                                Passwrod
                                            </label>
                                            {formikProps.errors.password && formikProps.touched.password ? (
                                                <ErrorMessage name="password" component="div" />
                                            ) : null}
                                        </div>
                                    
                                        <button type='submit'>Sign In</button>
                                    </Form>
                                )}
                        </Formik>
                    </div>
                </Tab.Panel>
                <Tab.Panel
                    className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}>
                    <h5>REGISTER</h5>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
    </>)
}
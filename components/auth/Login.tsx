'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/redux/hooks';
import { setCredential } from '@/redux/feautres/auth/authSlice';
import getQueryClient from '@/util/getQueryClient';
import { Tab } from '@headlessui/react';

const getTokenUser = async () => {
    const revalidatedData = await fetch(`https://api.chucknorris.io/jokes/random`, {
        // next: { revalidate: 60 },
        cache: 'no-store',
        // headers: {
        //   'Authorization': 'Bearer ' + token,
        //   'Content-Type': 'application/json'
        // }
    })
}

export default function Login() {

    const dispatch = useAppDispatch();

    const SignInSchema = Yup.object().shape({
        email: Yup.string().trim().email('Invalid email').required('El correo es necesario'),
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
                            onSubmit={ (values) => {
                                console.log('Hacemos un submit')
                                dispatch(
                                    setCredential({
                                        email: values.email, 
                                        password: values.password, 
                                        accesstoken: values.accesstoken})
                                )
                            } }>
                                {(formikProps) => (
                                    <Form>
                                       <input
      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
    />
    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Input Pink
    </label>
                                        {formikProps.errors.email && formikProps.touched.email ? (
                                            <ErrorMessage name="email" component="div" />
                                        ) : null}

                                        <Field name="password" />
                                        {formikProps.errors.password && formikProps.touched.password ? (
                                            <ErrorMessage name="password" component="div" />
                                        ) : null}
                                    
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
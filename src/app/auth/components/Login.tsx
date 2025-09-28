'use client'

import React from 'react'
import { Form } from 'react-final-form'
import Button from '@/common/components/atoms/Button'
import { useLogin, providers } from '../../hooks/useLogin'
import InputField from '@/common/fields/Input' // Assuming this matches your register form
import { useRouter } from 'next/navigation'


export const Login = () => {
    const { post } = useLogin(providers.CREDENTIALS)

    const router = useRouter()

    const fields = [
        {
            name: 'email',
            placeholder: 'Email',
            label: "What's your email ?",
            required: true,
            type: 'email',
        },
        {
            name: 'password',
            placeholder: 'Password',
            label: 'What shall we keep your password ?',
            required: true,
            type: 'password',
        }
    ]

    return (
        <div>
            <Form
                onSubmit={(values: { email: string; password: string }) => post?.(values)}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className='space-y-3'>
                        {fields.map((field) => (
                            <div key={field.name} className='my-4'>
                                <InputField  {...field} />
                            </div>
                        ))}
                        <div className='flex justify-end'>
                            Don&apos;t have an account?&nbsp; 
                            <span onClick={() => router.push('')}>Register</span>
                        </div>
                        <Button type='submit' className='bg-primary w-full mt-4 rounded-lg font-bold'>
                            Submit
                        </Button>
                    </form>
                )}
            />
        </div>
    )
}

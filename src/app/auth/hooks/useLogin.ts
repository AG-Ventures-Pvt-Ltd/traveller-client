'use client'


import { logError } from '@/common/utils/logError';
import { signIn } from "next-auth/react";
import { notify } from '@/common/utils/notify';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export enum providers  {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    CREDENTIALS = 'credentials'
  } 
  
export const useLogin = (method: providers) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const error = searchParams.get('error')
        useEffect(() => {
            if (error) {
              router.push('/')
            }
          }, [error,router])
        

    
    if (method === providers.CREDENTIALS) {
        const post = async (values: { email: string; password: string }) => {
            try {
                const result = await signIn(method, {
                    email: values.email,
                    password: values.password,
                    callbackUrl : '/',
                    onError : () => router.push('/')
                });

                    if (result?.ok) {
                        notify.success('Login successful!')
                    }
                    if (result?.error) {
                        router.push('/')
                        notify.error(result?.error)
                    }      
            } catch (error) {
                logError({
                    error : error,
                    location : "src/app/(features)/auth/hooks/useLogin.ts",
                    when : 'loggin in user'
                })            
            }
        }

        return { post }
    }

    if (method === providers.GOOGLE) {

        const signInWithGoogle = async () => {
            try {
                const res = await signIn(
                        providers.GOOGLE, 
                        { 
                            callbackUrl : '/',
                            onError : () => router.push('/') 
                        })
                if (res?.ok) {
                    notify.success('Google login successful!')
                }
                if (res?.error) {
                    router.push('/')
                    notify.error(res.error)
                }
            } catch (error) {
                logError({
                    error: error,
                    location: "src/app/(features)/auth/hooks/useLogin.ts",
                    when: 'logging in with Google'
                })
            }
        }

        return { signInWithGoogle }
    }

    if (method === providers.FACEBOOK) {
        const signInWithFacebook = async () => {
            try {
                const res = await signIn(
                        providers.FACEBOOK, 
                        { 
                            callbackUrl : 'http://localhost:8000/auth', 
                        })
                if (res?.ok) {
                    notify.success('Google login successful!')
                }
                if (res?.error) {
                    router.push('/')
                    notify.error(res.error)
                }
            } catch (error) {
                logError({
                    error: error,
                    location: "src/app/(features)/auth/hooks/useLogin.ts",
                    when: 'logging in with Google'
                })
            }
        }

        return { signInWithFacebook }
    }

    return { post: async () => {}, signInWithGoogle: async () => {}, signInWithFacebook : async () => {} }
}


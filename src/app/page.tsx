'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import liff from '@line/liff'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { RegisterBodySchema } from './api/register/schema'

const Page = () => {
  const form = useForm({
    resolver: zodResolver(RegisterBodySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${liff.getAccessToken()}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to register')
    }

    form.reset()
    alert('Registration successful!')
    liff.closeWindow()
  })

  return (
    <Form {...form}>
      <div className="min-h-screen flex items-start justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-md p-6">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Register
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Please enter your details to register. All fields are required.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="mt-1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="mt-1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@gmail.com"
                      {...field}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="1234567890"
                      {...field}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="submit" className="w-full mt-2" size="lg">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  )
}

export default Page

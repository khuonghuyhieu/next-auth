'use client'

import * as Yup from 'yup'
import { MIN_LEN_PASSWORD } from '@/constants'

const FORM_LOGIN = {
  USER_NAME: 'username',
  PASSWORD: 'password',
}

const loginValues = {
  [FORM_LOGIN.USER_NAME]: '',
  [FORM_LOGIN.PASSWORD]: '',
}

const loginFormSchema = () =>
  Yup.object().shape({
    [FORM_LOGIN.USER_NAME]: Yup.string().trim().required('Please enter'),
    [FORM_LOGIN.PASSWORD]: Yup.string()
      .trim()
      .required('Please enter')
      .min(MIN_LEN_PASSWORD, 'Min password is 8'),
  })

export { loginFormSchema, loginValues, FORM_LOGIN }

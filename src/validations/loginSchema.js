'use client'

import * as Yup from 'yup'
import { MIN_LEN_PASSWORD } from '@/constants'

const FORM_LOGIN = {
  EMAIL: 'email',
  PASSWORD: 'password',
}

const loginValues = {
  [FORM_LOGIN.EMAIL]: '',
  [FORM_LOGIN.PASSWORD]: '',
}

const loginFormSchema = (t) =>
  Yup.object().shape({
    [FORM_LOGIN.EMAIL]: Yup.string()
      .trim()
      .required(t('validate.please_enter'))
      .email(t('validate.email_invalid')),
    [FORM_LOGIN.PASSWORD]: Yup.string()
      .trim()
      .required(t('validate.please_enter'))
      .min(MIN_LEN_PASSWORD, t('validate.min_password', { min: MIN_LEN_PASSWORD })),
  })

export { loginFormSchema, loginValues, FORM_LOGIN }

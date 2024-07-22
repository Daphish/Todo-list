import { Metadata } from "next";
import Login from './login'

export const metadata : Metadata = {
  title: 'Log-In | Todo-List',
}

export default function LoginP() {
 return (
  <>
    <Login />
  </>
 )
}
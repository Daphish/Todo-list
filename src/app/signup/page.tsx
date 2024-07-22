import { Metadata } from "next";
import Signup from './signup';

export const metadata : Metadata = {
    title: 'Sign-Up | Todo-List',
}

export default function SignupP() {
    return (
    <>
        <Signup />
    </>
  );
}

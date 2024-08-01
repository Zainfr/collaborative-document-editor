import { SignIn } from '@clerk/nextjs'


const SignInPage = () => {
    return (
        <main className='auth-page'>
            <SignIn></SignIn>
        </main>
    )
}

export default SignInPage
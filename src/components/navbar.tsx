import Link from "next/link"
import { authOptions } from '../app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {session ? (
                    <>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/template">Template</Link></li>
                        <li><Link href="/api/auth/signout">Sign Out</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link href="/api/auth/signin">Sign In</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}
import React from 'react'
import Link from 'next/link';

function Navbar() {
    return (
        <>
            <nav>
                <ul className='flex gap-x-3 items-center'>
                    <li className='font-bold text-md'>
                        <Link href="/">Home</Link>
                    </li>
                    <li className='font-bold'>
                        <Link href="/rewrite-tool">Rewrite Tool</Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar